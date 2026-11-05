import crypto from 'crypto';

// Vercel Serverless Function handler for /api/payments/:action
export default async function handler(req: any, res: any) {
  const url = String(req.url || '');
  const action =
    req.query?.action ||
    (url.includes('/config')
      ? 'config'
      : url.includes('/create-order')
      ? 'create-order'
      : url.includes('/verify')
      ? 'verify'
      : url.includes('/webhook')
      ? 'webhook'
      : '');

  // 1. GET /api/payments/config
  if (action === 'config') {
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

    return res.status(200).json({
      configured: isConfigured,
      keyId: isConfigured ? keyId : null,
      webhookConfigured: Boolean(
        webhookSecret && webhookSecret !== 'your_razorpay_webhook_secret_here'
      ),
      mode,
    });
  }

  // 2. POST /api/payments/create-order
  if (action === 'create-order') {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const keyId = process.env.RAZORPAY_KEY_ID || '';
      const keySecret = process.env.RAZORPAY_KEY_SECRET || '';

      if (
        !keyId ||
        !keySecret ||
        keyId === 'rzp_test_your_key_id_here' ||
        keySecret === 'your_razorpay_key_secret_here'
      ) {
        return res.status(503).json({
          error:
            'Razorpay server credentials (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET) are not configured in environment variables yet.',
          code: 'RAZORPAY_NOT_CONFIGURED',
        });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { amountInInr, receipt, notes } = body;
      const numericAmount = Number(amountInInr);
      if (!numericAmount || numericAmount <= 0) {
        return res.status(400).json({ error: 'Invalid order amount.' });
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
        return res.status(response.status).json({
          error: orderData?.error?.description || 'Failed to create Razorpay order.',
        });
      }

      return res.status(200).json({
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
        keyId,
      });
    } catch (error) {
      return res.status(500).json({
        error: error instanceof Error ? error.message : 'Unexpected server error creating order.',
      });
    }
  }

  // 3. POST /api/payments/verify
  if (action === 'verify') {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      const keySecret = process.env.RAZORPAY_KEY_SECRET || '';
      if (!keySecret || keySecret === 'your_razorpay_key_secret_here') {
        return res.status(503).json({
          verified: false,
          error: 'RAZORPAY_KEY_SECRET is not configured on the server.',
        });
      }

      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          verified: false,
          error: 'Missing razorpay_order_id, razorpay_payment_id, or razorpay_signature.',
        });
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
        return res.status(400).json({
          verified: false,
          error: 'Invalid Razorpay cryptographic signature.',
        });
      }

      return res.status(200).json({
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        verifiedAt: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).json({
        verified: false,
        error: error instanceof Error ? error.message : 'Payment verification failed.',
      });
    }
  }

  // 4. POST /api/payments/webhook
  if (action === 'webhook') {
    return res.status(200).json({ received: true });
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
