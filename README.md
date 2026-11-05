# UtsavDekor — Celebration & Balloon Decoration Booking Platform

UtsavDekor is a full-stack Indian celebration and balloon decoration booking platform inspired by BalloonDekor. It combines a high-craft storefront, dynamic city-based pricing and slot availability, interactive celebration add-ons, Firebase Authentication & Firestore real-time persistence, server-verified Razorpay payments, PWA installability, and a 13-module Admin Control Center.

---

## Step-by-Step Setup & Deployment Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Project & Firestore Database
- This project is provisioned and wired to Firebase via `firebase-applet-config.json`.
- Real-time collections: `/users`, `/admins`, `/products`, `/categories`, `/addOns`, `/cities`, `/bookings`, `/coupons`, `/reviews`, `/supportTickets`, `/decorators`, and `/websiteSettings`.

### 3. Enable Firebase Authentication Providers
1. Open the [Firebase Console](https://console.firebase.google.com/) for your project (`gen-lang-client-0109570919`).
2. Navigate to **Authentication → Sign-in method**.
3. **Google Sign-In** is enabled automatically.
4. To enable **Email/Password** registration and login, click **Add new provider → Email/Password**, toggle **Enable**, and click **Save**.

### 4. Apply Database Security Rules
- Zero-trust security rules are defined in `firestore.rules` (and documented in `security_spec.md` + `firebase-blueprint.json`).
- They enforce strict schema validation (`isValid[Entity]`), PII isolation on `/users`, `/bookings`, and `/supportTickets`, terminal state locking on completed/cancelled orders, and role-based admin checks (`isAdmin()`).

### 5. Configure Cloudinary or Custom Product Media
- Studio celebration images are mapped in `src/data/seedData.ts` (`ASSET_MANIFEST`).
- In `/admin/products` and `/admin/categories`, admins can paste any Cloudinary or CDN image URL to update product galleries and category banners in real time.

### 6. Configure Razorpay Test Mode & Live Mode Credentials
Never expose secret keys in client code. Configure the following environment variables in `.env` (or your hosting provider's Secrets panel):
```env
RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxxx"
RAZORPAY_KEY_SECRET="your_razorpay_key_secret"
RAZORPAY_WEBHOOK_SECRET="your_razorpay_webhook_secret"
```
- **Test Mode**: Use keys starting with `rzp_test_` from **Razorpay Dashboard → Settings → API Keys**.
- **Live Mode**: Complete KYC in Razorpay Dashboard, switch to **Live Mode**, generate `rzp_live_` keys, and update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`.
- **Verification Guarantee**: Bookings are created as `Pending Payment` and only transition to `PAID_VERIFIED` / `PARTIAL_VERIFIED` after `/api/payments/verify` validates the HMAC-SHA256 signature on the server.

### 7. Configure Razorpay Payment Webhooks
1. In the Razorpay Dashboard, navigate to **Settings → Webhooks → + Add New Webhook**.
2. Set the Webhook URL to `https://<your-domain>/api/payments/webhook`.
3. Set a secret string and copy it into `RAZORPAY_WEBHOOK_SECRET`.
4. Select events: `payment.captured`, `order.paid`, and `payment.failed`.

### 8. Production Build & Deployment (Cloud Run / Vercel)
```bash
npm run build
npm start
```
- Connect your GitHub repository to Vercel or Cloud Run, configure the environment variables (`RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`), and attach your custom domain.
