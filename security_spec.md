# Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: Every path not explicitly matched is rejected via `match /{document=**} { allow read, write: if false; }`.
2. **Verified Identity & Admin Role Isolation**:
   - Standard user writes require `isSignedIn() && isVerifiedUser()`.
   - Admin privileges (`isAdmin()`) require either a verified bootstrap email (`shriyanshsingh7581@gmail.com` with `email_verified == true`) or existence of `/databases/$(database)/documents/admins/$(request.auth.uid)`.
   - Non-admins can never write to `/admins/{adminId}`, `/products/{productId}`, `/categories/{categoryId}`, `/addOns/{addonId}`, `/cities/{cityId}`, `/coupons/{couponId}`, `/decorators/{decoratorId}`, or `/websiteSettings/{settingId}`.
3. **PII Isolation**:
   - `/users/{userId}` contains PII (`email`, `phone`, `savedAddresses`). Only `isOwner(userId) || isAdmin()` can `get` or `write`. `list` is strictly restricted to `isAdmin()`.
   - `/bookings/{bookingId}` contains customer contact details and venue addresses. Only `resource.data.userId == request.auth.uid || isAdmin()` can `get` or `list`.
   - `/supportTickets/{ticketId}` contains user email and order details. Only `resource.data.userId == request.auth.uid || isAdmin()` can `get` or `list`.
4. **Validation Blueprints (`isValid[Entity]`) & Strict Keys**:
   - Every `create` and `update` invokes `isValid[Entity](incoming())` and enforces `.keys().hasAll(...)`, `.keys().hasOnly(...)`, string `.size()` bounds, and numeric range invariants.
5. **Terminal State Locking & Action-Based Updates**:
   - On `/bookings/{bookingId}`, once `existing().orderStatus in ['Completed', 'Cancelled', 'Refunded']`, non-admin updates are permanently locked.
   - Customers can only update their own booking for two specific actions:
     1. Requesting cancellation or rescheduling (`orderStatus == 'Cancellation Requested'` and `affectedKeys().hasOnly(['orderStatus', 'specialInstructions', 'updatedAt'])`).
     2. Recording verified payment confirmation (`affectedKeys().hasOnly(['paymentStatus', 'amountPaid', 'balanceDue', 'razorpayOrderId', 'razorpayPaymentId', 'orderStatus', 'updatedAt'])`).
   - Immutable fields (`id`, `userId`, `orderNumber`, `createdAt`) can never be changed on update.

## 2. The "Dirty Dozen" Payloads

1. **Shadow Field Injection on User Profile**: Adding `"isAdmin": true` to `/users/{uid}` -> Rejected by `hasOnly()`.
2. **Unverified Admin Email Spoof**: Token with `email: "shriyanshsingh7581@gmail.com"` and `email_verified: false` attempting to write `/products/p1` -> Rejected by `isVerifiedUser()`.
3. **Cross-User PII Read**: User `uid_A` calling `get` on `/users/uid_B` -> Rejected by `isOwner(userId) || isAdmin()`.
4. **Unfiltered Bookings List Scrape**: Client calling `list` on `/bookings` without `where('userId', '==', request.auth.uid)` -> Rejected by `resource.data.userId == request.auth.uid`.
5. **Identity Spoofing on Booking Create**: User `uid_A` creating `/bookings/b1` with `userId: "uid_B"` -> Rejected by `data.userId == request.auth.uid`.
6. **Negative Price Injection on Booking**: User creating `/bookings/b1` with `totalAmount: -500` -> Rejected by `data.totalAmount >= 0`.
7. **Terminal Booking Mutation**: Customer updating `/bookings/b1` when `existing().orderStatus == 'Completed'` -> Rejected by terminal state lock.
8. **Customer Arbitrary Booking Price Edit**: Customer updating `totalAmount` on `/bookings/b1` -> Rejected by `affectedKeys().hasOnly(...)`.
9. **ID Poisoning Attack**: Creating a document with a 500-char ID or special characters -> Rejected by `isValidId(id)`.
10. **Denial-of-Wallet Oversized String**: Creating a review with a 50,000-character `comment` -> Rejected by `data.comment.size() <= 1000`.
11. **Timestamp Forgery**: Creating a booking or review where `createdAt != request.time` -> Rejected by temporal integrity rule.
12. **Unauthorized Product Price Tampering**: Regular signed-in user updating `/products/prod_1` -> Rejected by `isAdmin()`.
