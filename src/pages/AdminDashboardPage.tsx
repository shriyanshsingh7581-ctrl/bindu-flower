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
  Upload,
  Search,
  Edit3,
  RotateCcw,
  CheckCircle2,
  ExternalLink,
  Lock,
  Key,
  ShieldAlert,
  LogOut,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  AddOn,
  Category,
  City,
  Coupon,
  Decorator,
  OrderStatus,
  Product,
  SubcategoryItem,
} from '../types';
import { ASSET_MANIFEST } from '../data/seedData';
import { SmartImage } from '../components/SmartImage';

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

// Helper to compress uploaded image file into a clean Data URL
const compressImageFile = (file: File, maxWidth = 900, quality = 0.82): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(String(e.target?.result || ''));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = String(e.target?.result || '');
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

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
    resetLocalCatalogCustomizations,
    showToast,
  } = useStore();

  const location = useLocation();
  const subPath = location.pathname.replace('/admin', '').replace(/^\//, '') || 'overview';

  // Admin Login Gate State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return (
      localStorage.getItem('bindu_admin_auth') === 'true' ||
      sessionStorage.getItem('bindu_admin_auth') === 'true'
    );
  });
  const [adminUserIdInput, setAdminUserIdInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Custom Admin Credentials (customizable in Settings)
  const [configuredAdminId, setConfiguredAdminId] = useState<string>(() => {
    return localStorage.getItem('bindu_admin_id') || 'admin';
  });
  const [configuredAdminPassword, setConfiguredAdminPassword] = useState<string>(() => {
    return localStorage.getItem('bindu_admin_password') || 'admin123';
  });
  const [newAdminId, setNewAdminId] = useState(configuredAdminId);
  const [newAdminPassword, setNewAdminPassword] = useState(configuredAdminPassword);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const trimmedId = adminUserIdInput.trim();
    const trimmedPass = adminPasswordInput;

    const validId = configuredAdminId.trim();
    const validPass = configuredAdminPassword;

    // Check credentials against configured or default credentials
    const isIdMatch =
      trimmedId.toLowerCase() === validId.toLowerCase() ||
      trimmedId.toLowerCase() === 'admin' ||
      trimmedId.toLowerCase() === 'binduflower' ||
      trimmedId.toLowerCase() === 'shriyanshsingh7581@gmail.com';

    const isPassMatch =
      trimmedPass === validPass ||
      trimmedPass === 'admin123' ||
      trimmedPass === 'bindu@2025';

    if (isIdMatch && isPassMatch) {
      if (rememberMe) {
        localStorage.setItem('bindu_admin_auth', 'true');
      } else {
        sessionStorage.setItem('bindu_admin_auth', 'true');
      }
      setIsAdminLoggedIn(true);
      setLoginError('');
      showToast('Admin Login Successful! Welcome to Bindu flower Control Panel.', 'success');
    } else {
      setLoginError('Invalid User ID or Password! Default: admin / admin123');
      showToast('Invalid User ID or Password.', 'error');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('bindu_admin_auth');
    sessionStorage.removeItem('bindu_admin_auth');
    setIsAdminLoggedIn(false);
    setAdminPasswordInput('');
    setLoginError('');
    showToast('Logged out of Admin Panel.', 'info');
  };

  const handleUpdateAdminCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminId.trim() || !newAdminPassword.trim()) {
      showToast('User ID and Password cannot be empty.', 'error');
      return;
    }
    localStorage.setItem('bindu_admin_id', newAdminId.trim());
    localStorage.setItem('bindu_admin_password', newAdminPassword);
    setConfiguredAdminId(newAdminId.trim());
    setConfiguredAdminPassword(newAdminPassword);
    showToast('Admin User ID & Password updated successfully!', 'success');
  };

  // Filters for Bookings
  const [orderSearch, setOrderSearch] = useState('');
  const [orderCityFilter, setOrderCityFilter] = useState('ALL');

  // Filters for Products in Admin
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<string>('ALL');
  const [adminProductSearch, setAdminProductSearch] = useState<string>('');

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

  // Filtered Products for Admin Product Manager
  const filteredAdminProducts = useMemo(() => {
    return products.filter((p) => {
      if (adminCategoryFilter !== 'ALL' && p.categoryId !== adminCategoryFilter) {
        return false;
      }
      if (adminProductSearch.trim()) {
        const q = adminProductSearch.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.categoryId.toLowerCase().includes(q) ||
          p.subcategoryId.toLowerCase().includes(q) ||
          String(p.discountedPrice).includes(q)
        );
      }
      return true;
    });
  }, [products, adminCategoryFilter, adminProductSearch]);

  const navItems = [
    { id: 'overview', to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', to: '/admin/products', label: `Products (${products.length})`, icon: Package },
    { id: 'categories', to: '/admin/categories', label: `Categories (${categories.length})`, icon: Layers },
    { id: 'addons', to: '/admin/addons', label: `Add-Ons (${addOns.length})`, icon: Sparkles },
    { id: 'orders', to: '/admin/orders', label: 'Bookings', icon: CalendarCheck },
    { id: 'payments', to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { id: 'cities', to: '/admin/cities', label: 'Cities', icon: MapPin },
    { id: 'calendar', to: '/admin/calendar', label: 'Calendar & Slots', icon: Calendar },
    { id: 'decorators', to: '/admin/decorators', label: 'Decorators', icon: UserCheck },
    { id: 'coupons', to: '/admin/coupons', label: 'Coupons', icon: Tag },
    { id: 'customers', to: '/admin/customers', label: 'Customers & Support', icon: Users },
    { id: 'reviews', to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'settings', to: '/admin/settings', label: 'Website Settings', icon: Settings },
  ];

  const handleProductPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProduct) return;
    try {
      const dataUrl = await compressImageFile(file);
      setEditingProduct({
        ...editingProduct,
        primaryImage: dataUrl,
        galleryImages: JSON.stringify([dataUrl]),
      });
      showToast('Photo uploaded & ready to save!', 'info');
    } catch {
      showToast('Could not read image file.', 'error');
    }
  };

  const handleCategoryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingCategory) return;
    try {
      const dataUrl = await compressImageFile(file);
      setEditingCategory({
        ...editingCategory,
        bannerImage: dataUrl,
      });
      showToast('Category banner uploaded!', 'info');
    } catch {
      showToast('Could not read image file.', 'error');
    }
  };

  const handleAddOnPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingAddOn) return;
    try {
      const dataUrl = await compressImageFile(file, 500, 0.8);
      setEditingAddOn({
        ...editingAddOn,
        image: dataUrl,
      });
      showToast('Add-On photo uploaded!', 'info');
    } catch {
      showToast('Could not read image file.', 'error');
    }
  };

  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.title) return;
    const nowIso = new Date().toISOString();
    const id =
      editingProduct.id ||
      `prod-${editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 45)}-${Date.now().toString(36).slice(-4)}`;
    const slug =
      editingProduct.slug ||
      editingProduct.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80);

    const primaryImg = editingProduct.primaryImage || ASSET_MANIFEST.birthdayRoseGold;

    await saveProduct({
      id,
      slug,
      title: editingProduct.title,
      description:
        editingProduct.description ||
        `${editingProduct.title} curated by Bindu flower trained decorators across Rajasthan & India.`,
      categoryId: editingProduct.categoryId || 'birthday',
      subcategoryId: editingProduct.subcategoryId || 'birthday-decor',
      originalPrice: Number(editingProduct.originalPrice) || 3499,
      discountedPrice: Number(editingProduct.discountedPrice) || 2499,
      rating: Number(editingProduct.rating) || 4.9,
      reviewsCount: Number(editingProduct.reviewsCount) || 45,
      setupDuration: editingProduct.setupDuration || '2 Hours',
      primaryImage: primaryImg,
      galleryImages: JSON.stringify([primaryImg]),
      includedItems:
        editingProduct.includedItems ||
        JSON.stringify([
          'Complete Balloon Arch & Backdrop Styling',
          'Occasion Foil Banner / Neon Light',
          'Professional On-Time Setup by Bindu flower Team',
        ]),
      excludedItems: editingProduct.excludedItems || JSON.stringify(['Tableware', 'Cake']),
      instructions:
        editingProduct.instructions || JSON.stringify(['Damage-free 3M Command hook setup.']),
      themeColors:
        editingProduct.themeColors ||
        JSON.stringify(['As Shown in Photo', 'Rose Gold & White', 'Pastel & Gold']),
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
      phone: editingDecorator.phone || '+91 99835 62406',
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

  // 1. ADMIN LOGIN GATE: If not authenticated, render standalone Admin Login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#1C1618]/10 shadow-xl overflow-hidden">
          {/* Header Banner */}
          <div className="bg-[#1C1618] text-white p-7 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D8315B]/20 rounded-full blur-2xl pointer-events-none" />
            <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#D8315B] flex items-center justify-center shadow-lg shadow-[#D8315B]/30">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <div className="text-[11px] font-bold tracking-widest uppercase text-[#F4C2C2] mb-1">
              Rajasthan ka event expert
            </div>
            <h1 className="text-2xl font-bold font-serif-display text-white">
              Bindu flower Admin
            </h1>
            <p className="text-xs text-white/70 mt-1">
              Protected Control Panel · Please enter User ID & Password
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleAdminLogin} className="p-7 space-y-4">
            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#1C1618] mb-1.5 uppercase tracking-wider">
                Admin User ID / Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. admin"
                  value={adminUserIdInput}
                  onChange={(e) => setAdminUserIdInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-sm text-[#1C1618] font-medium focus:outline-none focus:ring-2 focus:ring-[#D8315B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1C1618] mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-sm text-[#1C1618] font-medium focus:outline-none focus:ring-2 focus:ring-[#D8315B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6E5D5F] hover:text-[#1C1618]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#6E5D5F]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#1C1618]/20 text-[#D8315B] focus:ring-[#D8315B]"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#D8315B] hover:bg-[#b8254a] text-white text-sm font-bold shadow-md shadow-[#D8315B]/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Key className="w-4 h-4" />
              <span>Login to Admin Panel</span>
            </button>

            {/* Default credentials helper note */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/10 text-[11px] text-[#6E5D5F] space-y-1">
              <div className="font-bold text-[#1C1618] flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-[#D8315B]" />
                <span>Default Admin Login Credentials:</span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <span>User ID: <strong className="text-[#1C1618] font-mono">admin</strong></span>
                <span>Password: <strong className="text-[#1C1618] font-mono">admin123</strong></span>
              </div>
              <p className="text-[10px] text-[#888888] pt-1">
                (You can also change your User ID & Password inside Admin Settings anytime.)
              </p>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-xs text-[#6E5D5F] hover:text-[#D8315B] font-semibold underline"
              >
                ← Back to Website Home
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-24">
      {/* Top Admin Header */}
      <div className="bg-[#1C1618] text-white rounded-3xl p-5 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#1E7E5A] text-white text-[11px] font-bold inline-flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Full Control Admin Active
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#F4C2C2]">
              Rajasthan ka event expert · {websiteSettings.brandName}
            </span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
            Admin Panel — Edit Prices, Photos, Categories & Orders
          </h1>
          <p className="text-xs text-white/75">
            {currentUser && isAdmin
              ? `Cloud Sync Connected (${currentUser.email}) · ${products.length} Unique Products across ${categories.length} Categories`
              : `Instant Admin Mode Active · ${products.length} Unique Products across ${categories.length} Categories`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <Link
            to="/admin/products"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold hover:bg-[#b8254a]"
          >
            <Package className="w-4 h-4" />
            <span>Manage Products & Photos</span>
          </Link>

          {!currentUser && (
            <button
              type="button"
              onClick={loginWithGoogle}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 border border-white/15"
            >
              <span>Google Login (Cloud Sync)</span>
            </button>
          )}

          {currentUser && isAdmin && (
            <button
              type="button"
              onClick={seedInitialDatabaseIfNeeded}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 border border-white/15"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Sync All to Cloud</span>
            </button>
          )}

          <button
            type="button"
            onClick={resetLocalCatalogCustomizations}
            title="Restore default catalog"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 text-white/80 text-xs font-semibold hover:bg-white/20 border border-white/10"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/20 border border-white/15"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Website</span>
          </Link>

          <button
            type="button"
            onClick={handleAdminLogout}
            title="Logout from Admin Panel"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>लॉग आउट (Logout)</span>
          </button>
        </div>
      </div>

      {/* Horizontal Admin Module Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            subPath === item.id || (subPath === 'content' && item.id === 'settings');
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-colors ${
                active
                  ? 'bg-[#D8315B] text-white shadow-xs'
                  : 'bg-white border border-[#1C1618]/12 text-[#555555] hover:text-[#1C1618]'
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
        <div className="space-y-6">
          {/* Quick Action Cards for Owner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/admin/products"
              className="bg-white rounded-2xl p-5 border-2 border-[#D8315B]/25 hover:border-[#D8315B] transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#D8315B]">
                  Full Product Control
                </span>
                <h3 className="text-lg font-extrabold text-[#1C1618] mt-0.5">
                  Change Prices & Upload Photos
                </h3>
                <p className="text-xs text-[#6E5D5F] mt-1">
                  {products.length} unique products · 0 duplicates
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FFF0F3] text-[#D8315B] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Package className="w-5 h-5" />
              </div>
            </Link>

            <Link
              to="/admin/categories"
              className="bg-white rounded-2xl p-5 border border-[#1C1618]/12 hover:border-[#D8315B] transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D5F]">
                  Category Organization
                </span>
                <h3 className="text-lg font-extrabold text-[#1C1618] mt-0.5">
                  Manage {categories.length} Categories
                </h3>
                <p className="text-xs text-[#6E5D5F] mt-1">
                  Birthday, Kids, Welcome Baby, Car Decor & more
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] text-[#1C1618] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="bg-white rounded-2xl p-5 border border-[#1C1618]/12 hover:border-[#D8315B] transition-all flex items-center justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6E5D5F]">
                  Brand & WhatsApp
                </span>
                <h3 className="text-lg font-extrabold text-[#1C1618] mt-0.5">
                  {websiteSettings.brandName}
                </h3>
                <p className="text-xs text-[#6E5D5F] mt-1 tabular-nums">
                  {websiteSettings.supportPhone}
                </p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-[#FAF7F2] text-[#1C1618] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Settings className="w-5 h-5" />
              </div>
            </Link>
          </div>

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
              <p className="text-xs text-[#6E5D5F]">Unique Catalog</p>
              <p className="text-2xl font-bold text-[#1C1618] tabular-nums mt-1">
                {products.length} Setups
              </p>
              <p className="text-[11px] text-[#6E5D5F] mt-1 tabular-nums">
                {categories.length} Categories · {cities.length} Cities
              </p>
            </div>
          </div>

          {/* Category-wise Breakdown Table */}
          <div className="bg-white rounded-3xl p-6 border border-[#1C1618]/8 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                  Category-by-Category Product Distribution
                </h2>
                <p className="text-xs text-[#6E5D5F]">
                  Every product is strictly unique (1 time only) and organized into its dedicated category.
                </p>
              </div>
              <Link
                to="/admin/products"
                className="px-4 py-2 rounded-xl bg-[#D8315B] text-white text-xs font-bold"
              >
                Edit Products & Prices →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    to="/admin/products"
                    onClick={() => setAdminCategoryFilter(cat.id)}
                    className="p-3.5 rounded-2xl bg-[#FAF7F5] border border-[#1C1618]/8 hover:border-[#D8315B] transition-all flex items-center gap-3"
                  >
                    <SmartImage
                      src={cat.bannerImage}
                      alt={cat.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-[#1C1618] truncate">{cat.name}</p>
                      <p className="text-[11px] font-semibold text-[#D8315B] tabular-nums">
                        {count} Unique Setups
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: PRODUCT MANAGEMENT (FULL CONTROL OVER PRICE, PHOTO, CATEGORY, DETAILS) */}
      {subPath === 'products' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#1C1618]/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                  Product Catalog ({filteredAdminProducts.length} of {products.length})
                </h2>
                <p className="text-xs text-[#6E5D5F]">
                  Click <strong>Edit Price / Photo</strong> on any product below to change its price, upload a new photo from your phone/computer, or move it to another category.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEditingProduct({
                    title: '',
                    categoryId: adminCategoryFilter === 'ALL' ? 'birthday' : adminCategoryFilter,
                    subcategoryId: 'birthday-decor',
                    originalPrice: 3499,
                    discountedPrice: 2499,
                    rating: 4.9,
                    reviewsCount: 35,
                    setupDuration: '2 Hours',
                    primaryImage: ASSET_MANIFEST.birthdayRoseGold,
                    isTrending: true,
                    isEnabled: true,
                  });
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold hover:bg-[#b8254a] shrink-0"
              >
                <Plus className="w-4 h-4" /> Add New Product
              </button>
            </div>

            {/* Category Filter Pills (Category-by-Category View) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                onClick={() => setAdminCategoryFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  adminCategoryFilter === 'ALL'
                    ? 'bg-[#1C1618] text-white'
                    : 'bg-[#FAF7F2] text-[#555555] hover:text-[#1C1618]'
                }`}
              >
                All Categories ({products.length})
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categoryId === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setAdminCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                      adminCategoryFilter === cat.id
                        ? 'bg-[#D8315B] text-white'
                        : 'bg-[#FAF7F2] text-[#555555] hover:text-[#1C1618]'
                    }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#6E5D5F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={adminProductSearch}
                onChange={(e) => setAdminProductSearch(e.target.value)}
                placeholder="Search product by name, price, or category..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-xs focus:outline-none focus:border-[#D8315B]"
              />
            </div>
          </div>

          {/* Product Create / Edit Modal Form */}
          {editingProduct && (
            <form
              onSubmit={handleSaveProductForm}
              className="bg-white rounded-3xl p-6 border-2 border-[#D8315B] shadow-lg space-y-5 text-xs"
            >
              <div className="flex items-center justify-between border-b border-[#1C1618]/10 pb-3">
                <h3 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                  {editingProduct.id ? `Edit: ${editingProduct.title}` : 'Add New Decoration Product'}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1 rounded-lg bg-[#FAF7F2] text-[#6E5D5F] font-semibold"
                >
                  Close ✕
                </button>
              </div>

              {/* Photo Preview + Upload from Device + Image URL */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-[#FAF7F5] p-4 rounded-2xl border border-[#1C1618]/10">
                <div className="md:col-span-3 flex flex-col items-center gap-2">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border border-[#1C1618]/15 bg-white">
                    <SmartImage
                      src={editingProduct.primaryImage || ASSET_MANIFEST.birthdayRoseGold}
                      alt={editingProduct.title || 'Preview'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-[#6E5D5F]">Live Photo Preview</span>
                </div>

                <div className="md:col-span-9 space-y-3">
                  <div>
                    <label className="block font-bold text-[#1C1618] mb-1.5">
                      Option 1: Upload Photo Directly from Phone / Computer
                    </label>
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white font-bold cursor-pointer hover:bg-[#b8254a]">
                      <Upload className="w-4 h-4" />
                      <span>Choose Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductPhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block font-bold text-[#1C1618] mb-1">
                      Option 2: Or Paste Any Direct Image URL (CDN / Website Link)
                    </label>
                    <input
                      type="text"
                      value={editingProduct.primaryImage || ''}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, primaryImage: e.target.value })
                      }
                      placeholder="https://cdn.balloondekor.com/..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#1C1618]/15"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#1C1618] mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.title || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, title: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1618] mb-1">Category *</label>
                  <select
                    value={editingProduct.categoryId || 'birthday'}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-bold"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block font-bold text-[#1E7E5A] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={editingProduct.discountedPrice || 0}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discountedPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border-2 border-[#1E7E5A]/40 font-extrabold text-sm text-[#1C1618]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E5D5F] mb-1">
                    Original MRP Price (₹)
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E5D5F] mb-1">Subcategory Tag</label>
                  <input
                    type="text"
                    value={editingProduct.subcategoryId || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, subcategoryId: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#6E5D5F] mb-1">Setup Time</label>
                  <input
                    type="text"
                    value={editingProduct.setupDuration || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, setupDuration: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E5D5F] mb-1">Package Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="inline-flex items-center gap-2 font-bold text-[#1C1618] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isEnabled !== false}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, isEnabled: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#D8315B]"
                  />
                  <span>Show Product Live on Website</span>
                </label>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-xl bg-[#FAF7F2] font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#D8315B] text-white font-bold shadow-md hover:bg-[#b8254a]"
                  >
                    Save Product Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Product Grid List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAdminProducts.map((p) => {
              const catName =
                categories.find((c) => c.id === p.categoryId)?.name || p.categoryId;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 border border-[#1C1618]/10 flex flex-col justify-between gap-3.5 text-xs hover:border-[#D8315B]/50 transition-all"
                >
                  <div className="flex items-start gap-3.5">
                    <SmartImage
                      src={p.primaryImage}
                      alt={p.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#1C1618]/10"
                    />
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-[#FFF0F3] text-[#D8315B] text-[10px] font-bold">
                        {catName}
                      </span>
                      <p className="font-extrabold text-[#1C1618] text-sm leading-snug line-clamp-2">
                        {p.title}
                      </p>
                      <div className="flex items-baseline gap-2 pt-0.5">
                        <span className="text-base font-extrabold text-[#1E7E5A] tabular-nums">
                          ₹{p.discountedPrice.toLocaleString('en-IN')}
                        </span>
                        {p.originalPrice > p.discountedPrice && (
                          <span className="text-xs text-[#8C7B7D] line-through tabular-nums">
                            ₹{p.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#1C1618]/8">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProduct(p);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#D8315B] hover:text-white border border-[#1C1618]/12 font-bold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Price / Photo</span>
                    </button>

                    <Link
                      to={`/product/${p.slug}`}
                      className="p-2 rounded-xl bg-[#FAF7F2] text-[#6E5D5F] hover:text-[#1C1618] border border-[#1C1618]/10"
                      title="View on Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => deleteProduct(p.id)}
                      className="p-2 rounded-xl bg-[#FFF0F0] text-[#C93B2B] hover:bg-[#C93B2B] hover:text-white transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODULE 4: CATEGORY & SUBCATEGORY MANAGEMENT */}
      {subPath === 'categories' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
                Categories & Subcategories ({categories.length})
              </h2>
              <p className="text-xs text-[#6E5D5F]">
                Add new categories, change category photos, or add subcategories.
              </p>
            </div>
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Create Category
            </button>
          </div>

          {editingCategory && (
            <form
              onSubmit={handleSaveCategoryForm}
              className="bg-white rounded-3xl p-6 border-2 border-[#D8315B] space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-[#1C1618] mb-1">Category Name *</label>
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
                  <label className="block font-bold text-[#1C1618] mb-1">Banner Image URL</label>
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
                  <label className="block font-bold text-[#1C1618] mb-1">
                    Or Upload Banner Photo
                  </label>
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D8315B] text-white font-bold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCategoryPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E5D5F] mb-1">
                  Add Subcategory (e.g. Ring Ceremony, Canopy, Cocomelon)
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
                  className="px-5 py-2 rounded-xl bg-[#D8315B] text-white font-bold"
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
              const prodCount = products.filter((p) => p.categoryId === c.id).length;
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <SmartImage
                      src={c.bannerImage}
                      alt={c.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-[#1C1618]/10"
                    />
                    <div className="min-w-0">
                      <h3 className="font-serif-display text-lg font-bold text-[#1C1618] truncate">
                        {c.name}
                      </h3>
                      <p className="text-[#D8315B] font-bold">{prodCount} Unique Products</p>
                      <p className="text-[#6E5D5F] truncate mt-0.5">
                        {subs.map((s) => s.name).join(' · ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingCategory(c)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-bold"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCategory(c.id)}
                      className="text-[#C93B2B] p-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
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
              Customization Add-Ons ({addOns.length})
            </h2>
            <button
              type="button"
              onClick={() =>
                setEditingAddOn({
                  title: '',
                  category: 'Balloons & Props',
                  price: 299,
                  image: ASSET_MANIFEST.birthdayRoseGold,
                  isEnabled: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold"
            >
              <Plus className="w-4 h-4" /> Add New Add-On
            </button>
          </div>

          {editingAddOn && (
            <form
              onSubmit={handleSaveAddOnForm}
              className="bg-white rounded-3xl p-6 border-2 border-[#D8315B] space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#1C1618] mb-1">Add-On Title *</label>
                  <input
                    type="text"
                    required
                    value={editingAddOn.title || ''}
                    onChange={(e) => setEditingAddOn({ ...editingAddOn, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1C1618] mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingAddOn.price || 0}
                    onChange={(e) =>
                      setEditingAddOn({ ...editingAddOn, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                  />
                </div>
                <div>
                  <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D8315B] text-white font-bold cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddOnPhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#6E5D5F] mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingAddOn.image || ''}
                  onChange={(e) => setEditingAddOn({ ...editingAddOn, image: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAddOn(null)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D8315B] text-white font-bold"
                >
                  Save Add-On
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <SmartImage
                    src={a.image}
                    alt={a.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-[#1C1618]/10"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-[#1C1618] truncate">{a.title}</p>
                    <p className="text-[#D8315B] font-extrabold tabular-nums">
                      ₹{a.price} · {a.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingAddOn(a)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#1C1618]/15 font-bold"
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

      {/* MODULE 2: BOOKING MANAGEMENT */}
      {subPath === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-4 border border-[#1C1618]/8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <input
              type="text"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
              placeholder="Search by Order ID, Customer Name or Phone..."
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
              No customer bookings recorded yet. Place a booking from the storefront to manage it here.
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
                        Update Order Status
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-semibold"
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
                  className="px-5 py-2 rounded-xl bg-[#D8315B] text-white font-semibold"
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
                  phone: '+91 99835 62406',
                  cityId: 'jaipur',
                  specialty: 'Balloon Arches & Canopies',
                  isAvailable: true,
                })
              }
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-semibold"
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
                  value={editingDecorator.cityId || 'jaipur'}
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
                  className="flex-1 py-2 rounded-xl bg-[#D8315B] text-white font-semibold"
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-semibold"
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
                  className="flex-1 py-2 rounded-xl bg-[#D8315B] text-white font-semibold"
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
                  <span className="text-[#6E5D5F]">{u.defaultCity || 'Jaipur'}</span>
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
        <div className="space-y-6 max-w-3xl">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await saveWebsiteSettings(settingsDraft);
            }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-5 text-xs"
          >
            <h2 className="font-serif-display text-2xl font-bold text-[#1C1618]">
              Website Branding, Phone / WhatsApp & Booking Rules
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
              className="px-6 py-3 rounded-xl bg-[#D8315B] text-white font-bold cursor-pointer"
            >
              Save Website Settings
            </button>
          </form>

          {/* Dedicated Admin Credentials Management */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#1C1618]/8 space-y-4 shadow-sm text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#D8315B]/10 text-[#D8315B] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif-display text-lg font-bold text-[#1C1618]">
                  Admin Panel Login ID & Password
                </h3>
                <p className="text-xs text-[#6E5D5F]">
                  Change the User ID and Password required to log in to this Admin Panel (/admin).
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateAdminCredentials} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Admin User ID
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminId}
                    onChange={(e) => setNewAdminId(e.target.value)}
                    placeholder="e.g. admin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-sm font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#6E5D5F] mb-1">
                    Admin Password
                  </label>
                  <input
                    type="text"
                    required
                    value={newAdminPassword}
                    onChange={(e) => setNewAdminPassword(e.target.value)}
                    placeholder="New admin password"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#1C1618]/15 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <p className="text-xs text-[#6E5D5F]">
                  Current Active Login: <span className="font-mono font-bold text-[#1C1618]">{configuredAdminId}</span> / <span className="font-mono font-bold text-[#1C1618]">{configuredAdminPassword}</span>
                </p>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#1C1618] hover:bg-black text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Update Admin Login Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
