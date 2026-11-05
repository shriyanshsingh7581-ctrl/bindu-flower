import React, { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sparkles,
  CalendarCheck,
  Users,
  CreditCard,
  MapPin,
  UserCheck,
  Calendar,
  Tag,
  MessageSquare,
  Settings,
  Plus,
  Trash2,
  Database,
  ShieldAlert,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  AddOn,
  Booking,
  Category,
  City,
  Coupon,
  Decorator,
  OrderStatus,
  Product,
  SubcategoryItem,
} from '../types';
import { ASSET_MANIFEST } from '../data/seedData';

const ALL_ORDER_STATUSES: OrderStatus[] = [
  'Pending Payment',
  'Payment Received',
  'Booking Confirmed',
  'Decorator Assigned',
  'Preparation Started',
  'Decorator On The Way',
  'Setup In Progress',
  'Completed',
  'Cancellation Requested',
  'Cancelled',
  'Refund Processing',
  'Refunded',
];

export const AdminDashboardPage: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    loginWithGoogle,
    products,
    categories,
    addOns,
    cities,
    coupons,
    reviews,
    bookings,
    supportTickets,
    decorators,
    allUsers,
    websiteSettings,
    saveProduct,
    deleteProduct,
    saveCategory,
    deleteCategory,
    saveAddOn,
    deleteAddOn,
    saveCity,
    saveCoupon,
    deleteCoupon,
    saveDecorator,
    deleteDecorator,
    adminUpdateBooking,
    adminUpdateSupportTicket,
    saveWebsiteSettings,
    seedInitialDatabaseIfNeeded,
  } = useStore();

  const location = useLocation();
  const subPath = location.pathname.replace('/admin', '').replace(/^\//, '') || 'overview';

  // Filters for Bookings
  const [orderSearch, setOrderSearch] = useState('');
  const [orderCityFilter, setOrderCityFilter] = useState('ALL');

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  // Category Form State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [newSubName, setNewSubName] = useState('');
  // AddOn Form State
  const [editingAddOn, setEditingAddOn] = useState<Partial<AddOn> | null>(null);
  // City Form State
  const [editingCity, setEditingCity] = useState<Partial<City> | null>(null);
  const [blockDateInput, setBlockDateInput] = useState('');
  // Coupon Form State
  const [editingCoupon, setEditingCoupon] = useState<Partial<Coupon> | null>(null);
  // Decorator Form State
  const [editingDecorator, setEditingDecorator] = useState<Partial<Decorator> | null>(null);
  // Settings Form State
  const [settingsDraft, setSettingsDraft] = useState(websiteSettings);

  // Metrics
  const metrics = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const totalRevenue = bookings
      .filter((b) => !['Cancelled', 'Refunded'].includes(b.orderStatus))
      .reduce((s, b) => s + b.amountPaid, 0);
    const totalBookedValue = bookings.reduce((s, b) => s + b.totalAmount, 0);
    const todaysBookings = bookings.filter(
      (b) => b.eventDate === todayStr || b.createdAt.startsWith(todayStr)
    ).length;
    const pendingBookings = bookings.filter((b) =>
      ['Pending Payment', 'Payment Received', 'Booking Confirmed', 'Decorator Assigned'].includes(
        b.orderStatus
      )
    ).length;
    const completedBookings = bookings.filter((b) => b.orderStatus === 'Completed').length;
    const cancelledBookings = bookings.filter((b) =>
      ['Cancelled', 'Refunded', 'Cancellation Requested'].includes(b.orderStatus)
    ).length;

    return {
      totalRevenue,
      totalBookedValue,
      totalBookings: bookings.length,
      todaysBookings,
      pendingBookings,
      completedBookings,
      cancelledBookings,
      totalCustomers: Math.max(allUsers.length, 4),
    };
  }, [bookings, allUsers]);

  if (!currentUser || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl p-8 border border-[#1C1618]/10 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#C83E5B]/10 text-[#C83E5B] flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C1618]">
            Admin Authorization Required
          </h1>
          <p className="text-xs text-[#6E5D5F] leading-relaxed">
            Only verified platform administrators (such as{' '}
            <code className="font-mono-tabular text-[#1C1618]">shriyanshsingh7581@gmail.com</code>{' '}
            or users listed in <code className="font-mono-tabular">/admins</code>) can modify
            products, categories, bookings, and pricing in Firestore.
          </p>
          <button
            type="button"
            onClick={loginWithGoogle}
            className="px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-bold hover:bg-[#b0324d]"
          >
            Sign In with Admin Google Account
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', to: '/admin/orders', label: 'Bookings', icon: CalendarCheck },
    { id: 'products', to: '/admin/products', label: 'Products', icon: Package },
    { id: 'categories', to: '/admin/categories', label: 'Categories', icon: Layers },
    { id: 'addons', to: '/admin/addons', label: 'Add-Ons', icon: Sparkles },
    { id: 'payments', to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { id: 'cities', to: '/admin/cities', label: 'Cities', icon: MapPin },
    { id: 'calendar', to: '/admin/calendar', label: 'Calendar & Slots', icon: Calendar },
    { id: 'decorators', to: '/admin/decorators', label: 'Decorators', icon: UserCheck },
    { id: 'coupons', to: '/admin/coupons', label: 'Coupons', icon: Tag },
    { id: 'customers', to: '/admin/customers', label: 'Customers & Support', icon: Users },
    { id: 'reviews', to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'settings', to: '/admin/settings', label: 'Content & Settings', icon: Settings },
  ];

  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;
    const nowIso = new Date().toISOString();
    const id =
      editingProduct.id ||
      `prod-${editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
    const slug =
      editingProduct.slug ||
      editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);

    await saveProduct({
      id,
      slug,
      title: editingProduct.title,
      description: editingProduct.description || 'Curated Bindu flower celebration package.',
      categoryId: editingProduct.categoryId || 'birthday',
      subcategoryId: editingProduct.subcategoryId || 'rose-gold-birthday',
      originalPrice: Number(editingProduct.originalPrice) || 4999,
      discountedPrice: Number(editingProduct.discountedPrice) || 3499,
      rating: Number(editingProduct.rating) || 4.9,
      reviewsCount: Number(editingProduct.reviewsCount) || 25,
      setupDuration: editingProduct.setupDuration || '90 Mins',
      primaryImage: editingProduct.primaryImage || ASSET_MANIFEST.birthdayRoseGold,
      galleryImages:
        editingProduct.galleryImages ||
        JSON.stringify([editingProduct.primaryImage || ASSET_MANIFEST.birthdayRoseGold]),
      includedItems:
        editingProduct.includedItems ||
        JSON.stringify(['200+ Metallic & Pastel Balloons', 'Backdrop & Lighting Setup']),
      excludedItems: editingProduct.excludedItems || JSON.stringify(['Tableware']),
      instructions:
        editingProduct.instructions || JSON.stringify(['Damage-free 3M Command hook setup.']),
      themeColors:
        editingProduct.themeColors || JSON.stringify(['Rose Gold & White', 'Champagne Gold']),
      isTrending: Boolean(editingProduct.isTrending),
      isEnabled: editingProduct.isEnabled !== false,
      createdAt: editingProduct.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingProduct(null);
  };

  const handleSaveCategoryForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name) return;
    const nowIso = new Date().toISOString();
    const id =
      editingCategory.id ||
      editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    await saveCategory({
      id,
      slug: editingCategory.slug || id,
      name: editingCategory.name,
      description: editingCategory.description || 'Curated celebration category.',
      bannerImage: editingCategory.bannerImage || ASSET_MANIFEST.heroBanner,
      subcategoriesJson: editingCategory.subcategoriesJson || '[]',
      isEnabled: editingCategory.isEnabled !== false,
      sortOrder: Number(editingCategory.sortOrder) || 1,
      createdAt: editingCategory.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingCategory(null);
  };

  const handleSaveAddOnForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddOn || !editingAddOn.title) return;
    const nowIso = new Date().toISOString();
    const id =
      editingAddOn.id ||
      `addon-${editingAddOn.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)}`;
    await saveAddOn({
      id,
      title: editingAddOn.title,
      category: editingAddOn.category || 'Balloons & Props',
      price: Number(editingAddOn.price) || 499,
      image: editingAddOn.image || ASSET_MANIFEST.birthdayRoseGold,
      description: editingAddOn.description || '',
      isMandatory: Boolean(editingAddOn.isMandatory),
      isEnabled: editingAddOn.isEnabled !== false,
      createdAt: editingAddOn.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingAddOn(null);
  };

  const handleSaveCityForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCity || !editingCity.name) return;
    const nowIso = new Date().toISOString();
    const id =
      editingCity.id || editingCity.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40);
    await saveCity({
      id,
      name: editingCity.name,
      slug: editingCity.slug || id,
      state: editingCity.state || 'India',
      priceMultiplier: Number(editingCity.priceMultiplier) || 1.0,
      dailySlotCapacity: Number(editingCity.dailySlotCapacity) || 10,
      sameDayCutoffHour: Number(editingCity.sameDayCutoffHour) || 17,
      blockedDatesJson: editingCity.blockedDatesJson || '[]',
      isEnabled: editingCity.isEnabled !== false,
      createdAt: editingCity.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingCity(null);
  };

  const handleSaveCouponForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon || !editingCoupon.code) return;
    const nowIso = new Date().toISOString();
    const id = editingCoupon.id || `coup-${editingCoupon.code.toLowerCase()}`;
    await saveCoupon({
      id,
      code: editingCoupon.code.toUpperCase(),
      discountType: editingCoupon.discountType || 'PERCENTAGE',
      discountValue: Number(editingCoupon.discountValue) || 10,
      minOrderValue: Number(editingCoupon.minOrderValue) || 1999,
      maxDiscount: Number(editingCoupon.maxDiscount) || 1000,
      expiryDate: editingCoupon.expiryDate || '2027-12-31',
      usageLimit: Number(editingCoupon.usageLimit) || 500,
      usedCount: Number(editingCoupon.usedCount) || 0,
      isEnabled: editingCoupon.isEnabled !== false,
      createdAt: editingCoupon.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingCoupon(null);
  };

  const handleSaveDecoratorForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDecorator || !editingDecorator.name) return;
    const nowIso = new Date().toISOString();
    const id = editingDecorator.id || `dec-${Date.now()}`;
    const cityObj = cities.find((c) => c.id === editingDecorator.cityId) || cities[0];
    await saveDecorator({
      id,
      name: editingDecorator.name,
      phone: editingDecorator.phone || '+91 98201 00000',
      cityId: cityObj.id,
      cityName: cityObj.name,
      specialty: editingDecorator.specialty || 'Balloon Arches & Canopies',
      rating: Number(editingDecorator.rating) || 4.9,
      isAvailable: editingDecorator.isAvailable !== false,
      createdAt: editingDecorator.createdAt || nowIso,
      updatedAt: nowIso,
    });
    setEditingDecorator(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-[#1C1618] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#F4C2C2]">
            Bindu flower Control Center
          </p>
          <h1 className="font-serif-display text-3xl font-bold text-white">
            Enterprise Admin & Booking Operations
          </h1>
          <p className="text-xs text-white/70 mt-1">
            Authenticated as {currentUser.email} · Real-Time Firestore Persistence
          </p>
        </div>

        <button
          type="button"
          onClick={seedInitialDatabaseIfNeeded}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold hover:bg-[#b0324d] shrink-0"
        >
          <Database className="w-4 h-4" />
          <span>Sync Seed Catalog to Firestore</span>
        </button>
      </div>

      {/* Horizontal Admin Module Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            subPath === item.id || (subPath === 'content' && item.id === 'settings');
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                active
                  ? 'bg-[#C83E5B] text-white'
                  : 'bg-white border border-[#1C1618]/10 text-[#6E5D5F] hover:text-[#1C1618]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* MODULE 1: OVERVIEW */}
      {subPath === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/8">
              <p className="text-xs text-[#6E5D5F]">Verified Paid Revenue</p>
              <p className="text-2xl font-bold text-[#1E7E5A] tabular-nums mt-1">
                ₹{metrics.totalRevenue.toLocaleString('en-IN')}
              </p>
              <p className="text-[11px] text-[#6E5D5F] mt-1 tabular-nums">
                Gross GMV: ₹{metrics.totalBookedValue.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/8">
              <p className="text-xs text-[#6E5D5F]">Total Bookings</p>
              <p className="text-2xl font-bold text-[#1C1618] tabular-nums mt-1">
                {metrics.totalBookings}
              </p>
              <p className="text-[11px] text-[#C83E5B] mt-1 tabular-nums">
                Today’s Active: {metrics.todaysBookings}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/8">
              <p className="text-xs text-[#6E5D5F]">Pending / In-Progress</p>
              <p className="text-2xl font-bold text-[#D97706] tabular-nums mt-1">
                {metrics.pendingBookings}
              </p>
              <p className="text-[11px] text-[#1E7E5A] mt-1 tabular-nums">
                Completed: {metrics.completedBookings}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/8">
              <p className="text-xs text-[#6E5D5F]">Catalog & Cities</p>
              <p className="text-2xl font-bold text-[#1C1618] tabular-nums mt-1">
                {products.length} Setups
              </p>
              <p className="text-[11px] text-[#6E5D5F] mt-1 tabular-nums">
                {categories.length} Categories · {cities.length} Cities
              </p>
            </div>
          </div>

          {/* Popular Products Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                Top Performing Celebration Packages
              </h2>
              <Link
                to="/admin/products"
                className="text-xs font-semibold text-[#C83E5B] hover:underline"
              >
                Manage All Products →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1C1618]/10 text-[#6E5D5F]">
                    <th className="py-2.5 pr-4">Package Title</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4">Price</th>
                    <th className="py-2.5 px-4">Rating</th>
                    <th className="py-2.5 pl-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1618]/6">
                  {products.slice(0, 6).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 pr-4 font-semibold text-[#1C1618]">{p.title}</td>
                      <td className="py-3 px-4 text-[#6E5D5F]">{p.categoryId}</td>
                      <td className="py-3 px-4 font-bold tabular-nums">
                        ₹{p.discountedPrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 tabular-nums">
                        ★ {p.rating.toFixed(1)} ({p.reviewsCount})
                      </td>
                      <td className="py-3 pl-4 font-semibold text-[#1E7E5A]">
                        {p.isEnabled ? 'Active' : 'Disabled'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: BOOKING MANAGEMENT */}
      {subPath === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search by Order ID (e.g. UD-2026...), Customer Name or Phone..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs"
            />
            <select
              value={orderCityFilter}
              onChange={(e) => setOrderCityFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs font-semibold"
            >
              <option value="ALL">All Cities</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {bookings.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-[#1C1618]/8 text-xs text-[#6E5D5F]">
              No customer bookings recorded yet. Place a booking from the storefront to manage it in
              real time.
            </div>
          ) : (
            bookings
              .filter((b) => {
                if (orderCityFilter !== 'ALL' && b.cityId !== orderCityFilter) return false;
                if (orderSearch.trim()) {
                  const q = orderSearch.toLowerCase();
                  return (
                    b.orderNumber.toLowerCase().includes(q) ||
                    b.customerName.toLowerCase().includes(q) ||
                    b.customerPhone.toLowerCase().includes(q)
                  );
                }
                return true;
              })
              .map((bk) => (
                <div
                  key={bk.id}
                  className="bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-4 text-xs"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[#1C1618]/8">
                    <div>
                      <span className="font-bold text-[#C83E5B] text-sm">{bk.orderNumber}</span>
                      <span className="mx-2 text-[#6E5D5F]">·</span>
                      <span className="font-semibold text-[#1C1618]">
                        {bk.customerName} ({bk.customerPhone})
                      </span>
                      <p className="text-[#6E5D5F] mt-1">
                        {bk.cityName} · Event: <strong>{bk.eventDate}</strong> ({bk.timeSlot}) ·
                        Venue: {bk.venueAddress}
                      </p>
                      {bk.specialInstructions && (
                        <p className="text-[#D97706] font-medium mt-1">
                          Instructions: {bk.specialInstructions}
                        </p>
                      )}
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-base font-bold text-[#1C1618] tabular-nums">
                        Total: ₹{bk.totalAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-[#1E7E5A] font-semibold tabular-nums">
                        Paid: ₹{bk.amountPaid.toLocaleString('en-IN')} ({bk.paymentStatus})
                      </p>
                    </div>
                  </div>

                  {/* Admin Controls: Update Status & Assign Decorator */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block font-semibold text-[#6E5D5F] mb-1">
                        Update Order Status (Real-Time)
                      </label>
                      <select
                        value={bk.orderStatus}
                        onChange={(e) =>
                          adminUpdateBooking({
                            ...bk,
                            orderStatus: e.target.value as OrderStatus,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold text-[#1C1618]"
                      >
                        {ALL_ORDER_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#6E5D5F] mb-1">
                        Assign Decorator Crew
                      </label>
                      <select
                        value={bk.assignedDecoratorId || ''}
                        onChange={(e) => {
                          const dec = decorators.find((d) => d.id === e.target.value);
                          adminUpdateBooking({
                            ...bk,
                            assignedDecoratorId: dec?.id || '',
                            assignedDecoratorName: dec ? `${dec.name} (${dec.phone})` : 'Unassigned',
                            orderStatus:
                              bk.orderStatus === 'Booking Confirmed'
                                ? 'Decorator Assigned'
                                : bk.orderStatus,
                          });
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold text-[#1C1618]"
                      >
                        <option value="">-- Select Crew --</option>
                        {decorators.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} — {d.cityName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex gap-2">
                      {bk.orderStatus === 'Cancellation Requested' && (
                        <button
                          type="button"
                          onClick={() =>
                            adminUpdateBooking({
                              ...bk,
                              orderStatus: 'Cancelled',
                              paymentStatus:
                                bk.amountPaid > 0 ? 'REFUND_PROCESSING' : bk.paymentStatus,
                            })
                          }
                          className="px-4 py-2 rounded-xl bg-[#C93B2B] text-white font-semibold"
                        >
                          Approve Cancellation
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}

      {/* MODULE 3: PRODUCT MANAGEMENT */}
      {subPath === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Product Catalog ({products.length})
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingProduct({
                  title: '',
                  categoryId: 'birthday',
                  subcategoryId: 'rose-gold-birthday',
                  originalPrice: 5499,
                  discountedPrice: 3999,
                  setupDuration: '90 Mins',
                  primaryImage: ASSET_MANIFEST.birthdayRoseGold,
                  isEnabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          </div>

          {editingProduct && (
            <form
              onSubmit={handleSaveProductForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] space-y-4 text-xs"
            >
              <h3 className="font-serif-display text-xl font-bold text-[#1C1618]">
                {editingProduct.id ? 'Edit Product' : 'Create New Decoration Package'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Package Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, title: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Category</label>
                  <select
                    value={editingProduct.categoryId || 'birthday'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Subcategory Slug</label>
                  <input
                    type="text"
                    value={editingProduct.subcategoryId || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, subcategoryId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Discounted Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.discountedPrice || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountedPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Setup Duration</label>
                  <input
                    type="text"
                    value={editingProduct.setupDuration || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, setupDuration: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">
                  Primary Image URL (Cloudinary or Asset Path)
                </label>
                <input
                  type="text"
                  value={editingProduct.primaryImage || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, primaryImage: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save Product to Firestore
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.primaryImage}
                    alt={p.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1C1618] truncate">{p.title}</p>
                    <p className="text-[#6E5D5F] tabular-nums">
                      ₹{p.discountedPrice.toLocaleString('en-IN')} · {p.categoryId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(p)}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(p.id)}
                    className="p-1.5 text-[#C93B2B]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 4: CATEGORY & SUBCATEGORY MANAGEMENT */}
      {subPath === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Categories & Unlimited Subcategories
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingCategory({
                  name: '',
                  description: '',
                  bannerImage: ASSET_MANIFEST.heroBanner,
                  subcategoriesJson: '[]',
                  isEnabled: true,
                  sortOrder: categories.length + 1,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Create Category
            </button>
          </div>

          {editingCategory && (
            <form
              onSubmit={handleSaveCategoryForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Category Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name || ''}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Banner Image URL</label>
                  <input
                    type="text"
                    value={editingCategory.bannerImage || ''}
                    onChange={(e) =>
                      setEditingCategory({ ...editingCategory, bannerImage: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={editingCategory.sortOrder || 1}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        sortOrder: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">
                  Add Subcategory (e.g. Bindu Flower, Cocomelon, Canopy)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSubName}
                    onChange={(e) => setNewSubName(e.target.value)}
                    placeholder="New subcategory name..."
                    className="flex-1 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newSubName.trim()) return;
                      let currentSubs: SubcategoryItem[] = [];
                      try {
                        currentSubs = JSON.parse(editingCategory.subcategoriesJson || '[]');
                      } catch {
                        currentSubs = [];
                      }
                      const slug = newSubName
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-');
                      currentSubs.push({ id: slug, name: newSubName.trim(), slug });
                      setEditingCategory({
                        ...editingCategory,
                        subcategoriesJson: JSON.stringify(currentSubs),
                      });
                      setNewSubName('');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#1C1618] text-white font-semibold"
                  >
                    + Add Subcategory
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save Category
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((c) => {
              let subs: SubcategoryItem[] = [];
              try {
                subs = JSON.parse(c.subcategoriesJson || '[]');
              } catch {
                subs = [];
              }
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display text-xl font-bold text-[#1C1618]">{c.name}</h3>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory(c)}
                        className="px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                      >
                        Edit / Add Subcategories
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCategory(c.id)}
                        className="text-[#C93B2B] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#6E5D5F]">
                    {subs.map((s) => s.name).join(' · ')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 5: ADD-ONS MANAGEMENT */}
      {subPath === 'addons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Interactive Add-Ons ({addOns.length})
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingAddOn({
                  title: '',
                  category: 'Cakes & Florals',
                  price: 599,
                  isEnabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add New Add-On
            </button>
          </div>

          {editingAddOn && (
            <form
              onSubmit={handleSaveAddOnForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs"
            >
              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#6E5D5F] mb-1">Add-On Title *</label>
                <input
                  type="text"
                  required
                  value={editingAddOn.title || ''}
                  onChange={(e) => setEditingAddOn({ ...editingAddOn, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={editingAddOn.price || 0}
                  onChange={(e) =>
                    setEditingAddOn({ ...editingAddOn, price: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingAddOn(null)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F2]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1C1618]">{a.title}</p>
                  <p className="text-[#C83E5B] font-semibold tabular-nums">
                    ₹{a.price} · {a.category}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAddOn(a)}
                    className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAddOn(a.id)}
                    className="text-[#C93B2B] p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 6: PAYMENTS & TRANSACTIONS */}
      {subPath === 'payments' && (
        <div className="bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Payment Ledger & Razorpay Transactions
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1C1618]/10 text-[#6E5D5F]">
                  <th className="py-2.5 pr-4">Order ID</th>
                  <th className="py-2.5 px-4">Customer</th>
                  <th className="py-2.5 px-4">Mode</th>
                  <th className="py-2.5 px-4">Amount Paid</th>
                  <th className="py-2.5 px-4">Balance Due</th>
                  <th className="py-2.5 px-4">Razorpay Payment ID</th>
                  <th className="py-2.5 pl-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1618]/6">
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td className="py-3 pr-4 font-bold text-[#1C1618]">{b.orderNumber}</td>
                    <td className="py-3 px-4">{b.customerName}</td>
                    <td className="py-3 px-4">{b.paymentMode}</td>
                    <td className="py-3 px-4 font-bold text-[#1E7E5A] tabular-nums">
                      ₹{b.amountPaid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-bold text-[#C83E5B] tabular-nums">
                      ₹{b.balanceDue.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 font-mono-tabular text-[11px]">
                      {b.razorpayPaymentId || '—'}
                    </td>
                    <td className="py-3 pl-4 font-semibold">{b.paymentStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODULE 7 & 8: CITIES & CALENDAR SLOT CAPACITY */}
      {(subPath === 'cities' || subPath === 'calendar') && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              City Service Locations, Slot Capacity & Blocked Dates
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingCity({
                  name: '',
                  state: '',
                  priceMultiplier: 1.0,
                  dailySlotCapacity: 10,
                  sameDayCutoffHour: 17,
                  isEnabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Service City
            </button>
          </div>

          {editingCity && (
            <form
              onSubmit={handleSaveCityForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">City Name *</label>
                  <input
                    type="text"
                    required
                    value={editingCity.name || ''}
                    onChange={(e) => setEditingCity({ ...editingCity, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">State</label>
                  <input
                    type="text"
                    value={editingCity.state || ''}
                    onChange={(e) => setEditingCity({ ...editingCity, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Price Multiplier (e.g. 1.0)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    value={editingCity.priceMultiplier || 1}
                    onChange={(e) =>
                      setEditingCity({
                        ...editingCity,
                        priceMultiplier: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Slot Crew Capacity
                  </label>
                  <input
                    type="number"
                    value={editingCity.dailySlotCapacity || 10}
                    onChange={(e) =>
                      setEditingCity({
                        ...editingCity,
                        dailySlotCapacity: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={blockDateInput}
                  onChange={(e) => setBlockDateInput(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!blockDateInput) return;
                    let list: string[] = [];
                    try {
                      list = JSON.parse(editingCity.blockedDatesJson || '[]');
                    } catch {
                      list = [];
                    }
                    if (!list.includes(blockDateInput)) list.push(blockDateInput);
                    setEditingCity({
                      ...editingCity,
                      blockedDatesJson: JSON.stringify(list),
                    });
                    setBlockDateInput('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#1C1618] text-white font-semibold"
                >
                  Block Date
                </button>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingCity(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save City Settings
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => (
              <div
                key={city.id}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-xl font-bold text-[#1C1618]">
                    {city.name} ({city.state})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setEditingCity(city)}
                    className="px-3 py-1 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  >
                    Configure
                  </button>
                </div>
                <p className="text-[#6E5D5F] tabular-nums">
                  Multiplier: {city.priceMultiplier}x · Crew Capacity/Slot: {city.dailySlotCapacity}{' '}
                  · Same-Day Cutoff: {city.sameDayCutoffHour}:00 HRS
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 9: DECORATORS */}
      {subPath === 'decorators' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Decorator Crews ({decorators.length})
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingDecorator({
                  name: '',
                  phone: '+91 ',
                  cityId: 'mumbai',
                  specialty: 'Balloon Arches & Canopies',
                  isAvailable: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Decorator Crew
            </button>
          </div>

          {editingDecorator && (
            <form
              onSubmit={handleSaveDecoratorForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] grid grid-cols-1 sm:grid-cols-4 gap-4 items-end text-xs"
            >
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Crew Lead Name *</label>
                <input
                  type="text"
                  required
                  value={editingDecorator.name || ''}
                  onChange={(e) =>
                    setEditingDecorator({ ...editingDecorator, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Phone</label>
                <input
                  type="text"
                  value={editingDecorator.phone || ''}
                  onChange={(e) =>
                    setEditingDecorator({ ...editingDecorator, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">City</label>
                <select
                  value={editingDecorator.cityId || 'mumbai'}
                  onChange={(e) =>
                    setEditingDecorator({ ...editingDecorator, cityId: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save Crew
                </button>
                <button
                  type="button"
                  onClick={() => setEditingDecorator(null)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F2]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {decorators.map((d) => (
              <div
                key={d.id}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#1C1618]">
                    {d.name} · {d.cityName}
                  </p>
                  <p className="text-[#6E5D5F]">
                    {d.phone} · {d.specialty}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteDecorator(d.id)}
                  className="text-[#C93B2B] p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 10: COUPONS */}
      {subPath === 'coupons' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Promotional Coupons ({coupons.length})
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingCoupon({
                  code: '',
                  discountType: 'PERCENTAGE',
                  discountValue: 15,
                  minOrderValue: 2499,
                  isEnabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-semibold"
            >
              <Plus className="w-4 h-4" /> Create Coupon
            </button>
          </div>

          {editingCoupon && (
            <form
              onSubmit={handleSaveCouponForm}
              className="bg-white rounded-3xl p-6 border border-[#C83E5B] grid grid-cols-1 sm:grid-cols-5 gap-4 items-end text-xs"
            >
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 uppercase"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Type</label>
                <select
                  value={editingCoupon.discountType || 'PERCENTAGE'}
                  onChange={(e) =>
                    setEditingCoupon({
                      ...editingCoupon,
                      discountType: e.target.value as 'PERCENTAGE' | 'FIXED',
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FIXED">Fixed Amount (₹)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Discount Value</label>
                <input
                  type="number"
                  value={editingCoupon.discountValue || 10}
                  onChange={(e) =>
                    setEditingCoupon({
                      ...editingCoupon,
                      discountValue: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div>
                <label className="block font-semibold text-[#6E5D5F] mb-1">Min Order (₹)</label>
                <input
                  type="number"
                  value={editingCoupon.minOrderValue || 1999}
                  onChange={(e) =>
                    setEditingCoupon({
                      ...editingCoupon,
                      minOrderValue: Number(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#C83E5B] text-white font-semibold"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCoupon(null)}
                  className="px-3 py-2 rounded-xl bg-[#FAF7F2]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-[#C83E5B] text-sm">{c.code}</p>
                  <p className="text-[#6E5D5F] tabular-nums">
                    {c.discountType === 'PERCENTAGE'
                      ? `${c.discountValue}% OFF`
                      : `₹${c.discountValue} OFF`}{' '}
                    · Min ₹{c.minOrderValue}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => deleteCoupon(c.id)}
                  className="text-[#C93B2B] p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 11: CUSTOMERS & SUPPORT TICKETS */}
      {subPath === 'customers' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Support, Reschedule & Partner Inquiries ({supportTickets.length})
            </h2>
            {supportTickets.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 border border-[#1C1618]/8 text-xs text-[#6E5D5F]">
                No open support tickets.
              </div>
            ) : (
              supportTickets.map((tkt) => (
                <div
                  key={tkt.id}
                  className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#C83E5B]">
                      {tkt.requestType} · {tkt.userName} ({tkt.userEmail})
                    </span>
                    <select
                      value={tkt.status}
                      onChange={(e) =>
                        adminUpdateSupportTicket({
                          ...tkt,
                          status: e.target.value as typeof tkt.status,
                        })
                      }
                      className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                    >
                      <option value="OPEN">OPEN</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="RESOLVED">RESOLVED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>
                  <p className="font-semibold text-[#1C1618]">{tkt.subject}</p>
                  <p className="text-[#6E5D5F]">{tkt.message}</p>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-6 space-y-4">
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Registered Customers ({allUsers.length})
            </h2>
            <div className="space-y-3">
              {allUsers.map((u) => (
                <div
                  key={u.uid}
                  className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 text-xs flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-[#1C1618]">{u.name}</p>
                    <p className="text-[#6E5D5F]">
                      {u.email} {u.phone ? `· ${u.phone}` : ''}
                    </p>
                  </div>
                  <span className="text-[#6E5D5F]">{u.defaultCity || 'Mumbai'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 12: REVIEWS */}
      {subPath === 'reviews' && (
        <div className="space-y-4">
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Verified Customer Reviews ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-5 border border-[#1C1618]/8 space-y-2 text-xs"
              >
                <div className="flex justify-between font-bold text-[#1C1618]">
                  <span>
                    {r.userName} ({r.city})
                  </span>
                  <span className="text-[#B8860B]">★ {r.rating.toFixed(1)}</span>
                </div>
                <p className="text-[#6E5D5F]">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 13: WEBSITE CONTENT & SETTINGS */}
      {(subPath === 'settings' || subPath === 'content') && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await saveWebsiteSettings(settingsDraft);
          }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-5 max-w-3xl text-xs"
        >
          <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
            Website Branding, Announcement Bar & Booking Rules
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">Brand Name</label>
              <input
                type="text"
                value={settingsDraft.brandName}
                onChange={(e) =>
                  setSettingsDraft({ ...settingsDraft, brandName: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">
                Advance Payment Percentage (%)
              </label>
              <input
                type="number"
                min={10}
                max={100}
                value={settingsDraft.advancePercentage}
                onChange={(e) =>
                  setSettingsDraft({
                    ...settingsDraft,
                    advancePercentage: Number(e.target.value),
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#6E5D5F] mb-1">
              Top Promotional Announcement Text
            </label>
            <input
              type="text"
              value={settingsDraft.announcementText}
              onChange={(e) =>
                setSettingsDraft({ ...settingsDraft, announcementText: e.target.value })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">Support Phone</label>
              <input
                type="text"
                value={settingsDraft.supportPhone}
                onChange={(e) =>
                  setSettingsDraft({ ...settingsDraft, supportPhone: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settingsDraft.whatsappNumber}
                onChange={(e) =>
                  setSettingsDraft({ ...settingsDraft, whatsappNumber: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#6E5D5F] mb-1">Support Email</label>
              <input
                type="email"
                value={settingsDraft.supportEmail}
                onChange={(e) =>
                  setSettingsDraft({ ...settingsDraft, supportEmail: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#6E5D5F] mb-1">
              Cancellation Policy Summary
            </label>
            <textarea
              rows={2}
              value={settingsDraft.cancellationPolicySummary}
              onChange={(e) =>
                setSettingsDraft({
                  ...settingsDraft,
                  cancellationPolicySummary: e.target.value,
                })
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#C83E5B] text-white font-semibold"
          >
            Save Global Settings to Firestore
          </button>
        </form>
      )}
    </div>
  );
};
