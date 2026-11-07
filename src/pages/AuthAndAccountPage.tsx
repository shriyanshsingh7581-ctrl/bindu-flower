import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  LifeBuoy,
  LogOut,
  ShieldCheck,
  Calendar,
  Clock,
  Plus,
  Trash2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Booking, ORDER_STATUS_STEPS, SavedAddress } from '../types';

export const AuthPage: React.FC<{ mode: 'login' | 'register' | 'forgot' }> = ({ mode }) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, resetPassword, showToast } =
    useStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/account';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const handleGoogle = async () => {
    try {
      setBusy(true);
      await loginWithGoogle();
      navigate(redirectPath);
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Google Sign-In failed.', 'error');
    } finally {
      setBusy(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setBusy(true);
      if (mode === 'login') {
        await loginWithEmail(email, password);
        navigate(redirectPath);
      } else if (mode === 'register') {
        await registerWithEmail(name, email, phone, password);
        navigate(redirectPath);
      } else {
        await resetPassword(email);
      }
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Authentication error.', 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-14">
      <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#1C1618]/8 space-y-6 shadow-xs">
        <div className="text-center space-y-1.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C83E5B]">
            Bindu flower Account
          </p>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C1618]">
            {mode === 'login'
              ? 'Welcome Back'
              : mode === 'register'
              ? 'Create Your Celebration Account'
              : 'Reset Your Password'}
          </h1>
          <p className="text-xs text-[#6E5D5F]">
            Track your live decorator status, manage addresses, and access instant booking receipts.
          </p>
        </div>

        {mode !== 'forgot' && (
          <button
            type="button"
            onClick={handleGoogle}
            disabled={busy}
            className="w-full py-3 px-4 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-bold text-[#1C1618] hover:border-[#C83E5B] transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue with Verified Google Account</span>
          </button>
        )}

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#1C1618]/10" />
          <span className="flex-shrink mx-3 text-[11px] text-[#6E5D5F] uppercase">
            Or with Email
          </span>
          <div className="flex-grow border-t border-[#1C1618]/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99835 62406"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3.5 rounded-xl bg-[#C83E5B] text-white text-xs font-bold hover:bg-[#b0324d] transition-colors"
          >
            {mode === 'login'
              ? 'Sign In'
              : mode === 'register'
              ? 'Create Account'
              : 'Send Password Reset Link'}
          </button>
        </form>

        <div className="pt-3 border-t border-[#1C1618]/8 text-center text-xs text-[#6E5D5F] space-y-1.5">
          {mode === 'login' && (
            <>
              <p>
                New to Bindu flower?{' '}
                <Link to="/register" className="text-[#C83E5B] font-semibold hover:underline">
                  Create an account
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="hover:underline">
                  Forgot your password?
                </Link>
              </p>
            </>
          )}
          {mode !== 'login' && (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-[#C83E5B] font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const CustomerDashboardPage: React.FC = () => {
  const {
    currentUser,
    userProfile,
    isAdmin,
    logout,
    bookings,
    supportTickets,
    updateUserProfileData,
    requestBookingCancellationOrReschedule,
    submitSupportTicket,
  } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const activeSection = location.pathname.includes('/orders')
    ? 'orders'
    : location.pathname.includes('/addresses')
    ? 'addresses'
    : location.pathname.includes('/support')
    ? 'support'
    : location.pathname.includes('/profile')
    ? 'profile'
    : 'orders';

  const [profileName, setProfileName] = useState(
    userProfile?.name || currentUser?.displayName || ''
  );
  const [profilePhone, setProfilePhone] = useState(userProfile?.phone || '');

  // Saved Address State
  const savedAddressesList: SavedAddress[] = (() => {
    try {
      return JSON.parse(userProfile?.savedAddresses || '[]');
    } catch {
      return [];
    }
  })();

  const [addrLabel, setAddrLabel] = useState('Home');
  const [addrText, setAddrText] = useState('');
  const [addrCity, setAddrCity] = useState('Mumbai');
  const [addrPin, setAddrPin] = useState('');

  // Support Ticket Form State
  const [ticketType, setTicketType] = useState<
    'GENERAL' | 'RESCHEDULE' | 'CANCELLATION' | 'PARTNER'
  >('GENERAL');
  const [ticketOrderNo, setTicketOrderNo] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');

  // Modal for Booking Cancellation / Rescheduling
  const [actionModalBooking, setActionModalBooking] = useState<{
    booking: Booking;
    type: 'CANCELLATION' | 'RESCHEDULE';
  } | null>(null);
  const [actionReason, setActionReason] = useState('');

  if (!currentUser) {
    return <AuthPage mode="login" />;
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfileData({
      name: profileName.trim(),
      phone: profilePhone.trim(),
    });
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrText.trim()) return;
    const next: SavedAddress[] = [
      ...savedAddressesList,
      {
        id: `addr-${Date.now()}`,
        label: addrLabel,
        fullAddress: addrText.trim(),
        city: addrCity,
        pincode: addrPin.trim(),
      },
    ];
    await updateUserProfileData({ savedAddresses: JSON.stringify(next) });
    setAddrText('');
    setAddrPin('');
  };

  const handleDeleteAddress = async (id: string) => {
    const next = savedAddressesList.filter((a) => a.id !== id);
    await updateUserProfileData({ savedAddresses: JSON.stringify(next) });
  };

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMsg.trim()) return;
    await submitSupportTicket({
      userName: userProfile?.name || currentUser.displayName || 'Customer',
      userEmail: currentUser.email || 'customer@utsavdekor.in',
      orderNumber: ticketOrderNo.trim(),
      requestType: ticketType,
      subject: ticketSubject.trim(),
      message: ticketMsg.trim(),
    });
    setTicketSubject('');
    setTicketMsg('');
    setTicketOrderNo('');
  };

  const handleConfirmOrderAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionModalBooking || !actionReason.trim()) return;
    await requestBookingCancellationOrReschedule(
      actionModalBooking.booking,
      actionReason.trim(),
      actionModalBooking.type
    );
    setActionModalBooking(null);
    setActionReason('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#C83E5B]">
            Customer Dashboard
          </p>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C1618]">
            Namaste, {userProfile?.name || currentUser.displayName || currentUser.email}
          </h1>
          <p className="text-xs text-[#6E5D5F] mt-0.5">{currentUser.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              await logout();
              navigate('/');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-semibold text-[#C93B2B]"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'orders', to: '/account/orders', label: 'My Bookings & Tracking', icon: Package },
          { id: 'addresses', to: '/account/addresses', label: 'Saved Venue Addresses', icon: MapPin },
          { id: 'profile', to: '/account/profile', label: 'Profile Settings', icon: User },
          { id: 'support', to: '/account/support', label: 'Support & Rescheduling', icon: LifeBuoy },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeSection === tab.id;
          return (
            <Link
              key={tab.id}
              to={tab.to}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                active
                  ? 'bg-[#C83E5B] text-white'
                  : 'bg-white border border-[#1C1618]/10 text-[#6E5D5F] hover:text-[#1C1618]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Tab 1: My Bookings & Interactive Order Tracking */}
      {activeSection === 'orders' && (
        <div className="space-y-5">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#1C1618]/8 space-y-4">
              <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                No Celebration Bookings Yet
              </h2>
              <p className="text-xs text-[#6E5D5F]">
                Once you book a setup, you can track your decorator assignment and setup status in
                real time right here.
              </p>
              <Link
                to="/collections"
                className="inline-block px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
              >
                Explore Setups
              </Link>
            </div>
          ) : (
            bookings.map((bk) => {
              const stepIdx = ORDER_STATUS_STEPS.indexOf(bk.orderStatus);
              return (
                <div
                  key={bk.id}
                  className="bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C1618]/8">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-[#6E5D5F]">
                        <span className="font-bold text-[#C83E5B]">{bk.orderNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>Booked on {new Date(bk.createdAt).toLocaleDateString('en-IN')}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#1C1618]">
                          Payment: {bk.paymentStatus}
                        </span>
                      </div>
                      <h3 className="font-serif-display text-2xl font-bold text-[#1C1618] mt-1">
                        {bk.cityName} Celebration · {bk.eventDate} ({bk.timeSlot})
                      </h3>
                      <p className="text-xs text-[#6E5D5F] mt-0.5">Venue: {bk.venueAddress}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-lg font-bold text-[#1C1618] tabular-nums">
                        ₹{bk.totalAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs text-[#1E7E5A] font-semibold tabular-nums">
                        Paid: ₹{bk.amountPaid.toLocaleString('en-IN')} · Due: ₹
                        {bk.balanceDue.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Tracking Timeline */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-semibold text-[#1C1618]">
                        Current Stage: <span className="text-[#C83E5B]">{bk.orderStatus}</span>
                      </span>
                      <span className="text-[#6E5D5F]">
                        Decorator Crew: {bk.assignedDecoratorName || 'Assigning Crew'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                      {ORDER_STATUS_STEPS.map((st, idx) => {
                        const active = bk.orderStatus === st;
                        const done = stepIdx >= idx;
                        return (
                          <div
                            key={st}
                            className={`p-2.5 rounded-xl border text-[11px] ${
                              active
                                ? 'border-[#C83E5B] bg-[#C83E5B] text-white font-bold'
                                : done
                                ? 'border-[#1E7E5A]/30 bg-[#1E7E5A]/10 text-[#1E7E5A] font-semibold'
                                : 'border-[#1C1618]/8 bg-[#FAF7F2] text-[#6E5D5F]'
                            }`}
                          >
                            <span className="block text-[9px] opacity-75 tabular-nums">
                              0{idx + 1}
                            </span>
                            <span className="leading-tight block mt-0.5">{st}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Customer Order Actions */}
                  <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                    <Link
                      to={`/booking-confirmation?id=${bk.id}`}
                      className="text-xs font-semibold text-[#C83E5B] hover:underline"
                    >
                      View Printable Receipt & Details →
                    </Link>

                    {!['Completed', 'Cancelled', 'Refunded', 'Cancellation Requested'].includes(
                      bk.orderStatus
                    ) && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActionModalBooking({ booking: bk, type: 'RESCHEDULE' })
                          }
                          className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-semibold text-[#1C1618] hover:border-[#C83E5B]"
                        >
                          Request Reschedule
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActionModalBooking({ booking: bk, type: 'CANCELLATION' })
                          }
                          className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#C93B2B]/30 text-xs font-semibold text-[#C93B2B] hover:bg-[#C93B2B]/5"
                        >
                          Request Cancellation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Tab 2: Saved Venue Addresses */}
      {activeSection === 'addresses' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Saved Celebration Venues
            </h2>
            {savedAddressesList.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-[#1C1618]/8 text-xs text-[#6E5D5F]">
                No saved addresses yet. Add your home, office, or favorite party venue on the right.
              </div>
            ) : (
              savedAddressesList.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-[#C83E5B] uppercase">{addr.label}</span>
                    <p className="text-[#1C1618] font-medium">{addr.fullAddress}</p>
                    <p className="text-[#6E5D5F]">
                      {addr.city} — {addr.pincode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="text-[#6E5D5F] hover:text-[#C93B2B] p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#1C1618]/8">
            <h3 className="font-serif-display text-xl font-bold text-[#1C1618] mb-4">
              Add New Venue Address
            </h3>
            <form onSubmit={handleAddAddress} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Address Label</label>
                  <input
                    type="text"
                    value={addrLabel}
                    onChange={(e) => setAddrLabel(e.target.value)}
                    placeholder="Home / Parents' House"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">City</label>
                  <input
                    type="text"
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Complete Address</label>
                <textarea
                  rows={3}
                  required
                  value={addrText}
                  onChange={(e) => setAddrText(e.target.value)}
                  placeholder="Apartment, Street, Landmark..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Pincode</label>
                <input
                  type="text"
                  value={addrPin}
                  onChange={(e) => setAddrPin(e.target.value)}
                  placeholder="400050"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#1C1618] text-white font-semibold inline-flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Save Address
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 3: Profile Settings */}
      {activeSection === 'profile' && (
        <div className="max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-5">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Personal Profile Settings
          </h2>
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">Full Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">Mobile Number</label>
              <input
                type="tel"
                value={profilePhone}
                onChange={(e) => setProfilePhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">
                Registered Email (Read-Only)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 border border-[#1C1618]/10 text-[#6E5D5F]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#C83E5B] text-white font-semibold"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Tab 4: Customer Support Tickets */}
      {activeSection === 'support' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Your Support & Rescheduling Tickets
            </h2>
            {supportTickets.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-[#1C1618]/8 text-xs text-[#6E5D5F]">
                You have no open support tickets. Submit a ticket on the right for any assistance.
              </div>
            ) : (
              supportTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#C83E5B]">
                      {tkt.requestType} {tkt.orderNumber ? `· Order ${tkt.orderNumber}` : ''}
                    </span>
                    <span className="font-semibold text-[#1C1618]">{tkt.status}</span>
                  </div>
                  <p className="font-semibold text-[#1C1618]">{tkt.subject}</p>
                  <p className="text-[#6E5D5F]">{tkt.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-[#1C1618]/8">
            <h3 className="font-serif-display text-xl font-bold text-[#1C1618] mb-4">
              Raise a New Support / Reschedule Ticket
            </h3>
            <form onSubmit={handleSupportSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Request Type</label>
                <select
                  value={ticketType}
                  onChange={(e) => setTicketType(e.target.value as typeof ticketType)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                >
                  <option value="GENERAL">General Inquiry</option>
                  <option value="RESCHEDULE">Slot Rescheduling Request</option>
                  <option value="CANCELLATION">Order Cancellation Request</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">
                  Order Number (Optional)
                </label>
                <input
                  type="text"
                  value={ticketOrderNo}
                  onChange={(e) => setTicketOrderNo(e.target.value)}
                  placeholder="e.g. UD-2026-12345"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Brief summary of your request"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Message Details *</label>
                <textarea
                  rows={3}
                  required
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  placeholder="Share preferred new date/slot or customization details..."
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#C83E5B] text-white font-semibold"
              >
                Submit Support Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Cancellation / Reschedule */}
      {actionModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
            <h3 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              {actionModalBooking.type === 'CANCELLATION'
                ? 'Request Order Cancellation'
                : 'Request Slot Rescheduling'}
            </h3>
            <p className="text-xs text-[#6E5D5F]">
              Order: <strong>{actionModalBooking.booking.orderNumber}</strong>
            </p>
            <form onSubmit={handleConfirmOrderAction} className="space-y-3 text-xs">
              <textarea
                rows={3}
                required
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                placeholder={
                  actionModalBooking.type === 'CANCELLATION'
                    ? 'Please share the reason for cancellation...'
                    : 'Please enter your new preferred date and 3-hour time slot...'
                }
                className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActionModalBooking(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] text-[#6E5D5F] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
