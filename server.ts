import express from 'express';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Raw body capture for Razorpay Webhook HMAC verification
  app.use(
    express.json({
      verify: (req: express.Request & { rawBody?: string }, _res, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  // 1. Check Razorpay Server Configuration Status (Never exposes secret keys)
  app.get('/api/payments/config', (_req, res) => {
    const keyId = process.env.RAZORPAY_KEY_ID || '';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
    const isConfigured = Boolean(
      keyId &&
        keySecret &&
        keyId !== 'rzp_test_your_key_id_here' &&
        keySecret !== 'your_razorpay_key_secret_here'
    );
    const mode = keyId.startsWith('rzp_live_') ? 'LIVE' : 'TEST';

    res.json({
      configured: isConfigured,
      keyId: isConfigured ? keyId : null,
      webhookConfigured: Boolean(
        webhookSecret && webhookSecret !== 'your_razorpay_webhook_secret_here'
      ),
      mode,
    });
  });

  // 2. Create Server-Side Razorpay Order via Razorpay Orders REST API
  app.post('/api/payments/create-order', async (req, res) => {
    try {
      const keyId = process.env.RAZORPAY_KEY_ID || '';
      const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

      if (
        !keyId ||
        !keySecret ||
        keyId === 'rzp_test_your_key_id_here' ||
        keySecret === 'your_razorpay_key_secret_here'
      ) {
        res.status(503).json({
          error:
            'Razorpay server credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured in environment variables yet. Bookings are saved as Pending Payment until credentials are provided.',
          code: 'RAZORPAY_NOT_CONFIGURED',
        });
        return;
      }

      const { amountInInr, receipt, notes } = req.body;
      const numericAmount = Number(amountInInr);
      if (!numericAmount || numericAmount <= 0) {
        res.status(400).json({ error: 'Invalid order amount.' });
        return;
      }

      const amountInPaise = Math.round(numericAmount * 100);
      const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

      const response = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authHeader}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: String(receipt || `rcpt_${Date.now()}`).slice(0, 40),
          notes: notes || {},
        }),
      });

      const orderData = await response.json();
      if (!response.ok) {
        res.status(response.status).json({
          error: orderData?.error?.description || 'Failed to create Razorpay order.',
        });
        return;
      }

      res.json({
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
      });
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : 'Unexpected server error creating order.',
      });
    }
  });

  // 3. Server-Side Cryptographic Payment Signature Verification
  app.post('/api/payments/verify', (req, res) => {
    try {
      const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
      if (!keySecret || keySecret === 'your_razorpay_key_secret_here') {
        res.status(503).json({
          verified: false,
          error: 'RAZORPAY_KEY_SECRET is not configured on the server.',
        });
        return;
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        res.status(400).json({
          verified: false,
          error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature.',
        });
        return;
      }

      const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(payload)
        .digest('hex');

      const isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, 'utf8'),
        Buffer.from(String(razorpay_signature), 'utf8')
      );

      if (!isValid) {
        res.status(400).json({
          verified: false,
          error: 'Invalid Razorpay cryptographic signature.',
        });
        return;
      }

      res.json({
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        verifiedAt: new Date().toISOString(),
      });
    } catch (error) {
      res.status(500).json({
        verified: false,
        error: error instanceof Error ? error.message : 'Payment verification failed.',
      });
    }
  });

  // 4. Razorpay Webhook Endpoint (X-Razorpay-Signature HMAC-SHA256 verification)
  app.post(
    '/api/payments/webhook',
    (req: express.Request & { rawBody?: string }, res: express.Response) => {
      try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '';
        const signature = req.headers['x-razorpay-signature'];

        if (!webhookSecret || webhookSecret === 'your_razorpay_webhook_secret_here') {
          res.status(503).json({ error: 'Webhook secret not configured.' });
          return;
        }

        if (!signature || typeof signature !== 'string' || !req.rawBody) {
          res.status(400).json({ error: 'Missing webhook signature or payload.' });
          return;
        }

        const expectedSignature = crypto
          .createHmac('sha256', webhookSecret)
          .update(req.rawBody)
          .digest('hex');

        if (expectedSignature !== signature) {
          res.status(400).json({ error: 'Invalid webhook signature.' });
          return;
        }

        const event = req.body?.event;
        const paymentEntity = req.body?.payload?.payment?.entity;

        res.status(200).json({
          received: true,
          event,
          orderId: paymentEntity?.order_id || null,
          paymentId: paymentEntity?.id || null,
        });
      } catch (error) {
        res.status(500).json({
          error: error instanceof Error ? error.message : 'Webhook processing error.',
        });
      }
    }
  );

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UtsavDekor Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
