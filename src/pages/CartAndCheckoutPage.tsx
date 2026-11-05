import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  Tag,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Calendar,
  FileText,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';
import { Booking, ORDER_STATUS_STEPS } from '../types';

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: (response: unknown) => void) => void;
    };
  }
}

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    coupons,
  } = useStore();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponFeedback({ ok: res.ok, msg: res.message });
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-[#F3ECE3] flex items-center justify-center mx-auto text-[#C83E5B]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1618]">
          Your Celebration Bag is Empty
        </h1>
        <p className="text-xs sm:text-sm text-[#6E5D5F] max-w-md mx-auto">
          Explore our curated birthday ring arches, candlelight canopies, kids storybook themes,
          and Bindu Flower setups to begin planning your event.
        </p>
        <Link
          to="/collections"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold hover:bg-[#b0324d]"
        >
          <span>Explore Celebration Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1618]">
          Your Celebration Booking Bag
        </h1>
        <p className="text-xs text-[#6E5D5F] mt-1">
          Review your selected setups, event slot details, and custom add-ons before checkout.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const addOnsTotal = item.selectedAddOns.reduce(
              (s, a) => s + a.price * a.quantity,
              0
            );
            const itemLineTotal = item.unitPrice * item.quantity + addOnsTotal;

            return (
              <div
                key={item.cartItemId}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 flex flex-col sm:flex-row gap-5"
              >
                <Link
                  to={`/product/${item.slug}`}
                  className="w-full sm:w-40 aspect-[4/3] rounded-xl overflow-hidden bg-[#F3ECE3] shrink-0"
                >
                  <SmartImage
                    src={item.primaryImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-serif-display text-xl font-bold text-[#1C1618] hover:text-[#C83E5B]"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#6E5D5F] hover:text-[#C93B2B] p-1"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#6E5D5F]">
                      <span>City: {item.cityName}</span>
                      <span aria-hidden="true">·</span>
                      <span>Date: {item.eventDate}</span>
                      <span aria-hidden="true">·</span>
                      <span>Slot: {item.timeSlot}</span>
                      <span aria-hidden="true">·</span>
                      <span>Palette: {item.selectedThemeColor}</span>
                    </div>

                    <p className="text-xs text-[#6E5D5F] mt-1">
                      Venue: <span className="text-[#1C1618]">{item.venueAddress}</span>
                    </p>

                    {item.selectedAddOns.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-[#1C1618]/6">
                        <p className="text-[11px] font-semibold text-[#1C1618] mb-1">
                          Selected Add-Ons:
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] text-[#6E5D5F]">
                          {item.selectedAddOns.map((addon) => (
                            <span key={addon.addOnId} className="tabular-nums">
                              {addon.title} × {addon.quantity} (₹
                              {(addon.price * addon.quantity).toLocaleString('en-IN')})
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#1C1618]/8">
                    <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-xl border border-[#1C1618]/12 px-2.5 py-1">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                        className="text-[#1C1618]"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold tabular-nums px-1">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                        className="text-[#1C1618]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-bold text-[#1C1618] tabular-nums">
                        ₹{itemLineTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary & Coupon Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-6 sticky top-24">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Booking Price Summary
          </h2>

          {/* Coupon Application */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#6E5D5F]">
              Promotional Coupon Code
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1E7E5A]/10 border border-[#1E7E5A]/30 text-xs">
                <div>
                  <span className="font-bold text-[#1E7E5A]">{appliedCoupon.code}</span>
                  <span className="text-[#6E5D5F] ml-1.5 tabular-nums">
                    (-₹{cartDiscount.toLocaleString('en-IN')} saved)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[#C93B2B] font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter UTSAV15 or WELCOME500"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs uppercase font-semibold"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1C1618] text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </form>
            )}
            {couponFeedback && (
              <p
                className={`text-[11px] ${
                  couponFeedback.ok ? 'text-[#1E7E5A]' : 'text-[#C93B2B]'
                }`}
              >
                {couponFeedback.msg}
              </p>
            )}

            {/* Available Coupons Hint */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {coupons
                .filter((c) => c.isEnabled)
                .map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCouponInput(c.code);
                      const res = applyCouponCode(c.code);
                      setCouponFeedback({ ok: res.ok, msg: res.message });
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#C83E5B] hover:underline font-medium"
                  >
                    <Tag className="w-3 h-3" /> {c.code}
                  </button>
                ))}
            </div>
          </div>

          {/* Line Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-[#1C1618]/8 text-xs">
            <div className="flex justify-between text-[#6E5D5F]">
              <span>Packages & Add-Ons Subtotal</span>
              <span className="font-semibold text-[#1C1618] tabular-nums">
                ₹{cartSubtotal.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-[#6E5D5F]">
              <span>On-Site Decorator Crew & Setup</span>
              <span className="font-semibold text-[#1E7E5A]">FREE</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#1E7E5A] font-semibold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#1C1618] pt-3 border-t border-[#1C1618]/8 tabular-nums">
              <span>Total Payable</span>
              <span>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full py-3.5 px-5 rounded-xl bg-[#C83E5B] text-white text-xs font-bold hover:bg-[#b0324d] transition-colors flex items-center justify-center gap-2"
          >
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon,
    coupons,
    currentUser,
    userProfile,
    websiteSettings,
    createBookingRecord,
    updateBookingPaymentVerified,
    clearCart,
    showToast,
  } = useStore();
  const navigate = useNavigate();

  const firstItem = cart[0];
  const [customerName, setCustomerName] = useState(
    firstItem?.customerName || userProfile?.name || currentUser?.displayName || ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    firstItem?.customerPhone || userProfile?.phone || ''
  );
  const [customerEmail, setCustomerEmail] = useState(
    firstItem?.customerEmail || userProfile?.email || currentUser?.email || ''
  );
  const [venueAddress, setVenueAddress] = useState(firstItem?.venueAddress || '');
  const [specialInstructions, setSpecialInstructions] = useState(
    firstItem?.specialInstructions || ''
  );
  const [paymentMode, setPaymentMode] = useState<'FULL' | 'ADVANCE'>('FULL');
  const [preferredChannel, setPreferredChannel] = useState<
    'UPI' | 'CARD' | 'NETBANKING' | 'WALLET'
  >('UPI');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; msg: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [razorpayStatus, setRazorpayStatus] = useState<{
    configured: boolean;
    mode: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/payments/config')
      .then((r) => r.json())
      .then((data) => setRazorpayStatus(data))
      .catch(() => setRazorpayStatus({ configured: false, mode: 'TEST' }));
  }, []);

  if (cart.length === 0) {
    return <CartPage />;
  }

  const advancePercent = websiteSettings.advancePercentage || 40;
  const amountDueNow =
    paymentMode === 'FULL'
      ? cartTotal
      : Math.max(1, Math.round((cartTotal * advancePercent) / 100));
  const balanceLater = Math.max(0, cartTotal - amountDueNow);

  const handleCheckoutCoupon = () => {
    if (!couponInput.trim()) return;
    const res = applyCouponCode(couponInput);
    setCouponMsg({ ok: res.ok, msg: res.message });
  };

  const handlePlaceOrderAndPay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please sign in with Google or Email to confirm your booking.', 'error');
      navigate('/login?redirect=/checkout');
      return;
    }
    if (!customerName.trim() || !customerPhone.trim() || !venueAddress.trim()) {
      showToast('Please complete your name, phone number, and venue address.', 'error');
      return;
    }

    setSubmitting(true);
    const nowIso = new Date().toISOString();
    const bookingId = `bk-${Date.now()}`;
    const orderNumber = `UD-${new Date().getFullYear()}-${String(Date.now()).slice(-5)}`;

    const itemsSummary = JSON.stringify(
      cart.map((c) => ({
        productId: c.productId,
        title: c.title,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
        themeColor: c.selectedThemeColor,
      }))
    );

    const addOnsSummary = JSON.stringify(cart.flatMap((c) => c.selectedAddOns));

    const initialBooking: Booking = {
      id: bookingId,
      orderNumber,
      userId: currentUser.uid,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: (customerEmail || currentUser.email || 'guest@utsavdekor.in').trim(),
      cityId: firstItem.cityId,
      cityName: firstItem.cityName,
      eventDate: firstItem.eventDate,
      timeSlot: firstItem.timeSlot,
      venueAddress: venueAddress.trim(),
      specialInstructions: specialInstructions.trim(),
      selectedThemeColor: firstItem.selectedThemeColor,
      itemsSummary,
      addOnsSummary,
      subtotal: cartSubtotal,
      discountAmount: cartDiscount,
      couponCode: appliedCoupon?.code || '',
      totalAmount: cartTotal,
      paymentMode,
      amountPaid: 0,
      balanceDue: cartTotal,
      paymentStatus: 'PENDING',
      razorpayOrderId: '',
      razorpayPaymentId: '',
      orderStatus: 'Pending Payment',
      assignedDecoratorId: '',
      assignedDecoratorName: 'Assigning City Crew',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    try {
      // 1. Save Booking in Firestore with Pending Payment status (Never mark paid without server verification)
      await createBookingRecord(initialBooking);

      // 2. Request Server-Side Razorpay Order Creation
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountInInr: amountDueNow,
          receipt: orderNumber,
          notes: {
            bookingId,
            orderNumber,
            city: firstItem.cityName,
            eventDate: firstItem.eventDate,
            preferredChannel,
          },
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.orderId || !window.Razorpay) {
        // Razorpay keys not yet configured in environment: keep booking strictly as Pending Payment
        clearCart();
        showToast(
          'Booking created as Pending Payment. Configure Razorpay keys to complete live payment.',
          'info'
        );
        navigate(`/booking-confirmation?id=${bookingId}`);
        return;
      }

      // 3. Launch Official Razorpay Checkout Modal (UPI, Cards, NetBanking, Wallets)
      const rzp = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: websiteSettings.brandName,
        description: `Order ${orderNumber} · ${firstItem.cityName}`,
        order_id: orderData.orderId,
        prefill: {
          name: customerName.trim(),
          email: customerEmail.trim(),
          contact: customerPhone.trim(),
        },
        theme: {
          color: '#C83E5B',
        },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 4. Verify Cryptographic HMAC Signature on the Backend Server
          const verifyRes = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyJson = await verifyRes.json();

          if (verifyRes.ok && verifyJson.verified === true) {
            await updateBookingPaymentVerified(bookingId, {
              paymentStatus: paymentMode === 'FULL' ? 'PAID_VERIFIED' : 'PARTIAL_VERIFIED',
              amountPaid: amountDueNow,
              balanceDue: balanceLater,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              orderStatus: 'Booking Confirmed',
            });
            clearCart();
            showToast('Payment verified! Your celebration booking is confirmed.');
            navigate(`/booking-confirmation?id=${bookingId}`);
          } else {
            showToast(
              verifyJson.error || 'Payment signature verification failed. Booking remains Pending.',
              'error'
            );
            navigate(`/booking-confirmation?id=${bookingId}`);
          }
        },
        modal: {
          ondismiss: () => {
            clearCart();
            showToast('Payment window closed. Booking saved under Pending Payment.', 'info');
            navigate(`/booking-confirmation?id=${bookingId}`);
          },
        },
      });

      rzp.open();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Could not complete checkout request.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* BalloonDekor-Style 3-Step Checkout Progress Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#1C1618]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1C1618]">
            Secure Celebration Checkout & Payment
          </h1>
          <p className="text-xs text-[#6E5D5F] mt-0.5">
            100% On-Time Setup Guarantee · Zero Hidden Charges · Instant Booking Confirmation
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-[#1E7E5A] hover:underline"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>1. Bag & Add-Ons</span>
          </Link>
          <span className="text-[#6E5D5F]">→</span>
          <span className="flex items-center gap-1.5 text-[#C83E5B] font-bold">
            <span>2. Venue & Slot</span>
          </span>
          <span className="text-[#6E5D5F]">→</span>
          <span className="flex items-center gap-1.5 text-[#1C1618]">
            <span>3. Payment</span>
          </span>
        </div>
      </div>

      {!currentUser && (
        <div className="bg-[#D97706]/10 border border-[#D97706]/30 rounded-2xl p-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 text-xs text-[#1C1618]">
            <AlertTriangle className="w-5 h-5 text-[#D97706] shrink-0" />
            <span>
              Please sign in to your {websiteSettings.brandName} account so your booking and live
              order tracking are securely linked to your profile.
            </span>
          </div>
          <Link
            to="/login?redirect=/checkout"
            className="px-4 py-2 rounded-xl bg-[#1C1618] text-white text-xs font-semibold"
          >
            Sign In / Register
          </Link>
        </div>
      )}

      <form
        onSubmit={handlePlaceOrderAndPay}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
      >
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-6">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            1. Customer & Event Venue Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF7F2] border border-[#1C1618]/8 text-xs">
            <div>
              <span className="text-[#6E5D5F] block">Selected City</span>
              <strong className="text-[#1C1618]">{firstItem.cityName}</strong>
            </div>
            <div>
              <span className="text-[#6E5D5F] block">Event Date</span>
              <strong className="text-[#1C1618]">{firstItem.eventDate}</strong>
            </div>
            <div>
              <span className="text-[#6E5D5F] block">Setup Time Slot</span>
              <strong className="text-[#1C1618]">{firstItem.timeSlot}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter recipient / host name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
                Mobile Number (WhatsApp Active) *
              </label>
              <input
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
              Email Address (For Official Receipt & Tracking) *
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
              Full Delivery / Venue Address (House/Flat No, Building, Landmark) *
            </label>
            <textarea
              rows={3}
              required
              value={venueAddress}
              onChange={(e) => setVenueAddress(e.target.value)}
              placeholder="House/Flat No, Floor, Society/Hotel Name, Street, Landmark, Pincode"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
              Special Instructions / Name on Foil Letters / Cake Message
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Surprise for Ananya, call before ringing doorbell, Rose Gold & White balloons"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
            />
          </div>

          {/* Step 2: Payment Schedule Selection (100% Full vs Advance) */}
          <div className="pt-4 border-t border-[#1C1618]/8 space-y-3">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              2. Select Payment Schedule
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMode('FULL')}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  paymentMode === 'FULL'
                    ? 'border-[#C83E5B] bg-[#C83E5B]/8'
                    : 'border-[#1C1618]/12 bg-[#FAF7F2]'
                }`}
              >
                <p className="text-xs font-bold text-[#1C1618]">Pay 100% Full Amount Now</p>
                <p className="text-lg font-bold text-[#C83E5B] tabular-nums mt-1">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </p>
                <p className="text-[11px] text-[#6E5D5F] mt-0.5">
                  Zero balance hassle on the day of your celebration
                </p>
              </button>

              {websiteSettings.allowAdvancePayment && (
                <button
                  type="button"
                  onClick={() => setPaymentMode('ADVANCE')}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    paymentMode === 'ADVANCE'
                      ? 'border-[#C83E5B] bg-[#C83E5B]/8'
                      : 'border-[#1C1618]/12 bg-[#FAF7F2]'
                  }`}
                >
                  <p className="text-xs font-bold text-[#1C1618]">
                    Pay {advancePercent}% Booking Advance Now
                  </p>
                  <p className="text-lg font-bold text-[#C83E5B] tabular-nums mt-1">
                    ₹
                    {Math.max(1, Math.round((cartTotal * advancePercent) / 100)).toLocaleString(
                      'en-IN'
                    )}
                  </p>
                  <p className="text-[11px] text-[#6E5D5F] mt-0.5">
                    Pay remaining ₹
                    {(
                      cartTotal - Math.max(1, Math.round((cartTotal * advancePercent) / 100))
                    ).toLocaleString('en-IN')}{' '}
                    after decorator arrival
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Step 3: Preferred Payment Method (BalloonDekor Payment Options) */}
          <div className="pt-4 border-t border-[#1C1618]/8 space-y-3">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              3. Preferred Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'UPI' as const,
                  title: 'Instant UPI Apps',
                  subtitle: 'Google Pay · PhonePe · Paytm · BHIM UPI',
                },
                {
                  id: 'CARD' as const,
                  title: 'Credit / Debit Cards',
                  subtitle: 'Visa · MasterCard · RuPay · Amex',
                },
                {
                  id: 'NETBANKING' as const,
                  title: 'NetBanking (All Banks)',
                  subtitle: 'HDFC · ICICI · SBI · Axis · Kotak & 40+ more',
                },
                {
                  id: 'WALLET' as const,
                  title: 'Mobile Wallets & PayLater',
                  subtitle: 'Amazon Pay · Mobikwik · Freecharge',
                },
              ].map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPreferredChannel(method.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    preferredChannel === method.id
                      ? 'border-[#C83E5B] bg-[#C83E5B]/8'
                      : 'border-[#1C1618]/12 bg-[#FAF7F2]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1C1618]">{method.title}</span>
                    <span
                      className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        preferredChannel === method.id
                          ? 'border-[#C83E5B] bg-[#C83E5B]'
                          : 'border-[#1C1618]/30'
                      }`}
                    >
                      {preferredChannel === method.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#6E5D5F] mt-1">{method.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary, Coupon Box & Razorpay Gateway Action */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-6 sticky top-24">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Order & Payment Summary
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-[#1C1618]/8">
            {cart.map((item) => (
              <div key={item.cartItemId} className="pt-3 first:pt-0 text-xs space-y-1">
                <div className="flex justify-between font-semibold text-[#1C1618]">
                  <span>
                    {item.title} × {item.quantity}
                  </span>
                  <span className="tabular-nums">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[11px] text-[#6E5D5F]">
                  {item.cityName} · {item.eventDate} · {item.timeSlot}
                </p>
                {item.selectedAddOns.map((a) => (
                  <div key={a.addOnId} className="flex justify-between text-[11px] text-[#6E5D5F]">
                    <span>
                      + {a.title} × {a.quantity}
                    </span>
                    <span className="tabular-nums">
                      ₹{(a.price * a.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Direct Promo / Coupon Box on Payment Page */}
          <div className="pt-4 border-t border-[#1C1618]/8 space-y-2">
            <label className="block text-xs font-semibold text-[#6E5D5F]">
              Have a Promo / Discount Code?
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#1E7E5A]/10 border border-[#1E7E5A]/30 text-xs">
                <div>
                  <span className="font-bold text-[#1E7E5A]">{appliedCoupon.code}</span>
                  <span className="text-[#6E5D5F] ml-1.5 tabular-nums">
                    (-₹{cartDiscount.toLocaleString('en-IN')} off)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-[#C93B2B] font-semibold hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter UTSAV15 or WELCOME500"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs uppercase font-semibold"
                />
                <button
                  type="button"
                  onClick={handleCheckoutCoupon}
                  className="px-4 py-2 rounded-xl bg-[#1C1618] text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>
            )}
            {couponMsg && (
              <p className={`text-[11px] ${couponMsg.ok ? 'text-[#1E7E5A]' : 'text-[#C93B2B]'}`}>
                {couponMsg.msg}
              </p>
            )}
            {!appliedCoupon && (
              <div className="flex flex-wrap gap-2 pt-0.5">
                {coupons
                  .filter((c) => c.isEnabled)
                  .map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        setCouponInput(c.code);
                        const res = applyCouponCode(c.code);
                        setCouponMsg({ ok: res.ok, msg: res.message });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-[#C83E5B] hover:underline font-medium"
                    >
                      <Tag className="w-3 h-3" /> {c.code}
                    </button>
                  ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-[#1C1618]/8 text-xs">
            <div className="flex justify-between text-[#6E5D5F]">
              <span>Packages & Add-Ons Subtotal</span>
              <span className="tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#6E5D5F]">
              <span>Decorator Crew Visit & Setup Charges</span>
              <span className="font-semibold text-[#1E7E5A]">FREE</span>
            </div>
            {cartDiscount > 0 && (
              <div className="flex justify-between text-[#1E7E5A] font-semibold">
                <span>Discount ({appliedCoupon?.code})</span>
                <span className="tabular-nums">-₹{cartDiscount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-[#1C1618] pt-2 border-t border-[#1C1618]/8">
              <span>Total Order Value</span>
              <span className="tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-[#C83E5B] pt-1">
              <span>Payable Now ({paymentMode === 'FULL' ? '100%' : `${advancePercent}%`})</span>
              <span className="tabular-nums">₹{amountDueNow.toLocaleString('en-IN')}</span>
            </div>
            {balanceLater > 0 && (
              <div className="flex justify-between text-xs text-[#6E5D5F]">
                <span>Remaining Balance Later</span>
                <span className="tabular-nums">₹{balanceLater.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          {/* Razorpay Gateway Notice */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#1C1618]/10 text-[11px] text-[#6E5D5F] space-y-1">
            <div className="flex items-center justify-between font-semibold text-[#1C1618]">
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C83E5B]" />
                Razorpay Secure ({preferredChannel} · UPI · Cards · NetBanking)
              </span>
              <span className="text-[10px] uppercase">
                {razorpayStatus?.configured
                  ? `${razorpayStatus.mode} MODE READY`
                  : 'SERVER VERIFICATION ACTIVE'}
              </span>
            </div>
            <p>
              Bookings transition to Paid only after server-side HMAC-SHA256 cryptographic
              signature verification.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-xl bg-[#C83E5B] text-white text-xs font-bold hover:bg-[#b0324d] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {submitting
                ? 'Creating Verified Order...'
                : `Pay ₹${amountDueNow.toLocaleString('en-IN')} via ${preferredChannel} / Razorpay`}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('id') || '';
  const { bookings } = useStore();

  const booking = bookings.find((b) => b.id === bookingId || b.orderNumber === bookingId);

  if (!booking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif-display text-3xl font-bold text-[#1C1618]">
          Loading Your Booking Receipt...
        </h1>
        <p className="text-xs text-[#6E5D5F]">
          You can view and track all your bookings in real time inside your Customer Dashboard.
        </p>
        <Link
          to="/account/orders"
          className="inline-block px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
        >
          Go to My Orders
        </Link>
      </div>
    );
  }

  const currentStepIdx = ORDER_STATUS_STEPS.indexOf(booking.orderStatus);
  const isVerifiedPaid =
    booking.paymentStatus === 'PAID_VERIFIED' || booking.paymentStatus === 'PARTIAL_VERIFIED';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#1C1618]/8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1C1618]/8">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isVerifiedPaid
                  ? 'bg-[#1E7E5A]/15 text-[#1E7E5A]'
                  : 'bg-[#D97706]/15 text-[#D97706]'
              }`}
            >
              {isVerifiedPaid ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : (
                <Clock className="w-6 h-6" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C83E5B]">
                Order ID: {booking.orderNumber}
              </p>
              <h1 className="font-serif-display text-3xl font-bold text-[#1C1618]">
                {isVerifiedPaid
                  ? 'Celebration Booking Confirmed!'
                  : 'Booking Registered — Pending Payment Verification'}
              </h1>
              <p className="text-xs text-[#6E5D5F] mt-1">
                Current Status: <strong className="text-[#1C1618]">{booking.orderStatus}</strong> ·
                Payment Status: <strong className="text-[#1C1618]">{booking.paymentStatus}</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-semibold text-[#1C1618] self-start"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>
        </div>

        {/* Interactive Real-Time Order Tracking Timeline */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#1C1618]">
            Live Celebration Order Tracking Timeline
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ORDER_STATUS_STEPS.map((step, index) => {
              const reached = currentStepIdx >= index;
              const isCurrent = booking.orderStatus === step;
              return (
                <div
                  key={step}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    isCurrent
                      ? 'border-[#C83E5B] bg-[#C83E5B]/8 text-[#C83E5B] font-bold'
                      : reached
                      ? 'border-[#1E7E5A]/30 bg-[#1E7E5A]/5 text-[#1E7E5A] font-semibold'
                      : 'border-[#1C1618]/8 bg-[#FAF7F2] text-[#6E5D5F]'
                  }`}
                >
                  <p className="text-[10px] uppercase opacity-75 tabular-nums">Step 0{index + 1}</p>
                  <p className="mt-0.5">{step}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event & Payment Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#1C1618]/8 text-xs">
          <div className="space-y-2">
            <h3 className="font-bold text-[#1C1618] text-sm">Event & Venue Coordinates</h3>
            <p className="flex items-center gap-2 text-[#6E5D5F]">
              <MapPin className="w-3.5 h-3.5 text-[#C83E5B]" />
              <span>
                {booking.cityName} — {booking.venueAddress}
              </span>
            </p>
            <p className="flex items-center gap-2 text-[#6E5D5F]">
              <Calendar className="w-3.5 h-3.5 text-[#C83E5B]" />
              <span>
                {booking.eventDate} ({booking.timeSlot})
              </span>
            </p>
            <p className="text-[#6E5D5F]">
              Customer: <strong className="text-[#1C1618]">{booking.customerName}</strong> (
              {booking.customerPhone})
            </p>
            <p className="text-[#6E5D5F]">
              Assigned Crew:{' '}
              <strong className="text-[#1C1618]">
                {booking.assignedDecoratorName || 'Assigning City Crew'}
              </strong>
            </p>
          </div>

          <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-[#1C1618]/8">
            <h3 className="font-bold text-[#1C1618] text-sm">Financial Summary</h3>
            <div className="flex justify-between text-[#6E5D5F]">
              <span>Total Booking Value</span>
              <span className="font-bold text-[#1C1618] tabular-nums">
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-[#1E7E5A]">
              <span>Verified Amount Paid</span>
              <span className="font-bold tabular-nums">
                ₹{booking.amountPaid.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="flex justify-between text-[#C83E5B]">
              <span>Remaining Balance Due</span>
              <span className="font-bold tabular-nums">
                ₹{booking.balanceDue.toLocaleString('en-IN')}
              </span>
            </div>
            {booking.razorpayPaymentId && (
              <p className="text-[11px] text-[#6E5D5F] pt-1 font-mono-tabular">
                Razorpay Payment ID: {booking.razorpayPaymentId}
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            to="/account/orders"
            className="px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
          >
            Track Live in My Account
          </Link>
          <Link
            to="/collections"
            className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-semibold text-[#1C1618]"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
};
