import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  auth,
  BOOTSTRAP_ADMIN_EMAIL,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import {
  AddOn,
  Booking,
  CartItem,
  Category,
  City,
  Coupon,
  Decorator,
  OrderStatus,
  Product,
  Review,
  SupportTicket,
  UserProfile,
  WebsiteSetting,
} from '../types';
import {
  resolveAssetUrl,
  SEED_ADDONS,
  SEED_CATEGORIES,
  SEED_CITIES,
  SEED_COUPONS,
  SEED_DECORATORS,
  SEED_PRODUCTS,
  SEED_REVIEWS,
  SEED_WEBSITE_SETTINGS,
} from '../data/seedData';

export interface ToastMessage {
  id: string;
  title: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextValue {
  // Auth
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (name: string, email: string, phone: string, pass: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfileData: (partial: Partial<UserProfile>) => Promise<void>;

  // Catalog & Data
  products: Product[];
  categories: Category[];
  addOns: AddOn[];
  cities: City[];
  coupons: Coupon[];
  reviews: Review[];
  bookings: Booking[];
  supportTickets: SupportTicket[];
  decorators: Decorator[];
  allUsers: UserProfile[];
  websiteSettings: WebsiteSetting;

  // City & Personalization
  selectedCity: City;
  setSelectedCityById: (cityId: string) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  recentlyViewedIds: string[];
  recordRecentlyViewed: (productId: string) => void;

  // Cart & Coupon
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  applyCouponCode: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  getCityPrice: (basePrice: number, city?: City) => number;
  getRemainingSlotCapacity: (cityId: string, eventDate: string, timeSlot: string) => number;

  // Booking & Customer Actions
  createBookingRecord: (booking: Booking) => Promise<void>;
  updateBookingPaymentVerified: (
    bookingId: string,
    payload: {
      paymentStatus: Booking['paymentStatus'];
      amountPaid: number;
      balanceDue: number;
      razorpayOrderId: string;
      razorpayPaymentId: string;
      orderStatus: OrderStatus;
    }
  ) => Promise<void>;
  requestBookingCancellationOrReschedule: (
    booking: Booking,
    reason: string,
    requestType: 'CANCELLATION' | 'RESCHEDULE'
  ) => Promise<void>;
  submitReview: (review: Omit<Review, 'id' | 'createdAt'>) => Promise<void>;
  submitSupportTicket: (
    ticket: Omit<SupportTicket, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>;

  // Admin CRUD Operations
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  saveCategory: (category: Category) => Promise<void>;
  deleteCategory: (categoryId: string) => Promise<void>;
  saveAddOn: (addon: AddOn) => Promise<void>;
  deleteAddOn: (addonId: string) => Promise<void>;
  saveCity: (city: City) => Promise<void>;
  saveCoupon: (coupon: Coupon) => Promise<void>;
  deleteCoupon: (couponId: string) => Promise<void>;
  saveDecorator: (decorator: Decorator) => Promise<void>;
  deleteDecorator: (decoratorId: string) => Promise<void>;
  adminUpdateBooking: (booking: Booking) => Promise<void>;
  adminUpdateSupportTicket: (ticket: SupportTicket) => Promise<void>;
  saveWebsiteSettings: (settings: WebsiteSetting) => Promise<void>;
  seedInitialDatabaseIfNeeded: () => Promise<void>;
  resetLocalCatalogCustomizations: () => void;

  // UI Toasts
  toasts: ToastMessage[];
  showToast: (title: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

const sanitizeId = (raw: string) =>
  raw
    .trim()
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .slice(0, 120) || `id-${Date.now()}`;

const SEED_PRODUCT_IDS = new Set(SEED_PRODUCTS.map((p) => p.id));
const SEED_CATEGORY_IDS = new Set(SEED_CATEGORIES.map((c) => c.id));

const readLocalJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [dbAddOns, setDbAddOns] = useState<AddOn[]>([]);
  const [dbCities, setDbCities] = useState<City[]>([]);
  const [dbCoupons, setDbCoupons] = useState<Coupon[]>([]);
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [dbDecorators, setDbDecorators] = useState<Decorator[]>([]);
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [dbSettings, setDbSettings] = useState<WebsiteSetting | null>(null);

  // Local Admin Overrides (so Admin Panel changes persist immediately even without Google OAuth on Vercel)
  const [localProducts, setLocalProducts] = useState<Record<string, Product>>(() =>
    readLocalJson('bindu_admin_products_v3', {})
  );
  const [deletedProductIds, setDeletedProductIds] = useState<string[]>(() =>
    readLocalJson('bindu_deleted_products_v3', [])
  );
  const [localCategories, setLocalCategories] = useState<Record<string, Category>>(() =>
    readLocalJson('bindu_admin_categories_v3', {})
  );
  const [deletedCategoryIds, setDeletedCategoryIds] = useState<string[]>(() =>
    readLocalJson('bindu_deleted_categories_v3', [])
  );
  const [localAddOns, setLocalAddOns] = useState<Record<string, AddOn>>(() =>
    readLocalJson('bindu_admin_addons_v3', {})
  );
  const [deletedAddOnIds, setDeletedAddOnIds] = useState<string[]>(() =>
    readLocalJson('bindu_deleted_addons_v3', [])
  );
  const [localCities, setLocalCities] = useState<Record<string, City>>(() =>
    readLocalJson('bindu_admin_cities_v3', {})
  );
  const [localCoupons, setLocalCoupons] = useState<Record<string, Coupon>>(() =>
    readLocalJson('bindu_admin_coupons_v3', {})
  );
  const [deletedCouponIds, setDeletedCouponIds] = useState<string[]>(() =>
    readLocalJson('bindu_deleted_coupons_v3', [])
  );
  const [localSettings, setLocalSettings] = useState<WebsiteSetting | null>(() =>
    readLocalJson('bindu_admin_settings_v3', null)
  );

  const [selectedCityId, setSelectedCityId] = useState<string>(() => {
    return localStorage.getItem('utsav_city') || 'jaipur';
  });

  const [cart, setCart] = useState<CartItem[]>(() => readLocalJson('utsav_cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [wishlistIds, setWishlistIds] = useState<string[]>(() =>
    readLocalJson('utsav_wishlist', [])
  );
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() =>
    readLocalJson('utsav_recent', [])
  );

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Persist local state
  useEffect(() => {
    localStorage.setItem('utsav_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('utsav_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('utsav_recent', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bindu_admin_products_v3', JSON.stringify(localProducts));
    } catch {
      // ignore storage quota warnings for large base64 images
    }
  }, [localProducts]);

  useEffect(() => {
    localStorage.setItem('bindu_deleted_products_v3', JSON.stringify(deletedProductIds));
  }, [deletedProductIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bindu_admin_categories_v3', JSON.stringify(localCategories));
    } catch {
      // ignore
    }
  }, [localCategories]);

  useEffect(() => {
    localStorage.setItem('bindu_deleted_categories_v3', JSON.stringify(deletedCategoryIds));
  }, [deletedCategoryIds]);

  useEffect(() => {
    try {
      localStorage.setItem('bindu_admin_addons_v3', JSON.stringify(localAddOns));
    } catch {
      // ignore
    }
  }, [localAddOns]);

  useEffect(() => {
    localStorage.setItem('bindu_deleted_addons_v3', JSON.stringify(deletedAddOnIds));
  }, [deletedAddOnIds]);

  useEffect(() => {
    localStorage.setItem('bindu_admin_cities_v3', JSON.stringify(localCities));
  }, [localCities]);

  useEffect(() => {
    localStorage.setItem('bindu_admin_coupons_v3', JSON.stringify(localCoupons));
  }, [localCoupons]);

  useEffect(() => {
    localStorage.setItem('bindu_deleted_coupons_v3', JSON.stringify(deletedCouponIds));
  }, [deletedCouponIds]);

  useEffect(() => {
    if (localSettings) {
      localStorage.setItem('bindu_admin_settings_v3', JSON.stringify(localSettings));
    }
  }, [localSettings]);

  // 1. Auth Listener & Profile Bootstrap
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (!user) {
        setUserProfile(null);
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      try {
        const isBootstrapAdmin =
          user.email === BOOTSTRAP_ADMIN_EMAIL && user.emailVerified === true;
        let adminDocExists = false;
        try {
          const adminSnap = await getDoc(doc(db, 'admins', user.uid));
          adminDocExists = adminSnap.exists();
        } catch {
          adminDocExists = false;
        }
        setIsAdmin(isBootstrapAdmin || adminDocExists);

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        const nowIso = new Date().toISOString();

        if (userSnap.exists()) {
          const data = userSnap.data() as UserProfile;
          setUserProfile(data);
          if (data.wishlist) {
            try {
              setWishlistIds(JSON.parse(data.wishlist));
            } catch {
              // ignore
            }
          }
        } else if (user.emailVerified) {
          const newProfile: UserProfile = {
            uid: user.uid,
            name: (user.displayName || user.email?.split('@')[0] || 'Celebration Guest').slice(
              0,
              100
            ),
            email: (user.email || 'guest@utsavdekor.in').slice(0, 160),
            phone: (user.phoneNumber || '').slice(0, 30),
            defaultCity: selectedCityId,
            savedAddresses: '[]',
            wishlist: JSON.stringify(wishlistIds),
            createdAt: nowIso,
            updatedAt: nowIso,
          };
          try {
            await setDoc(userRef, newProfile);
            setUserProfile(newProfile);
          } catch (err) {
            handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}`);
          }
        }
      } catch (err) {
        console.error('Auth profile check warning:', err);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsub();
  }, []);

  // 2. Public Real-Time Listeners (Products, Categories, AddOns, Cities, Coupons, Reviews, WebsiteSettings)
  useEffect(() => {
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snap) => {
        setDbProducts(snap.docs.map((d) => d.data() as Product));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'products')
    );

    const unsubCategories = onSnapshot(
      collection(db, 'categories'),
      (snap) => {
        setDbCategories(snap.docs.map((d) => d.data() as Category));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'categories')
    );

    const unsubAddOns = onSnapshot(
      collection(db, 'addOns'),
      (snap) => {
        setDbAddOns(snap.docs.map((d) => d.data() as AddOn));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'addOns')
    );

    const unsubCities = onSnapshot(
      collection(db, 'cities'),
      (snap) => {
        setDbCities(snap.docs.map((d) => d.data() as City));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'cities')
    );

    const unsubCoupons = onSnapshot(
      collection(db, 'coupons'),
      (snap) => {
        setDbCoupons(snap.docs.map((d) => d.data() as Coupon));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'coupons')
    );

    const unsubReviews = onSnapshot(
      collection(db, 'reviews'),
      (snap) => {
        setDbReviews(snap.docs.map((d) => d.data() as Review));
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'reviews')
    );

    const unsubSettings = onSnapshot(
      doc(db, 'websiteSettings', 'global'),
      (snap) => {
        if (snap.exists()) {
          setDbSettings(snap.data() as WebsiteSetting);
        }
      },
      (err) => handleFirestoreError(err, OperationType.GET, 'websiteSettings/global')
    );

    return () => {
      unsubProducts();
      unsubCategories();
      unsubAddOns();
      unsubCities();
      unsubCoupons();
      unsubReviews();
      unsubSettings();
    };
  }, []);

  // 3. Authenticated Real-Time Listeners (Bookings, SupportTickets, Admin Collections)
  useEffect(() => {
    if (authLoading || !currentUser) {
      setBookings([]);
      setSupportTickets([]);
      setDbDecorators([]);
      setAllUsers([]);
      return;
    }

    const bookingsQuery = isAdmin
      ? collection(db, 'bookings')
      : query(collection(db, 'bookings'), where('userId', '==', currentUser.uid));

    const unsubBookings = onSnapshot(
      bookingsQuery,
      (snap) => {
        const list = snap.docs.map((d) => d.data() as Booking);
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setBookings(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'bookings')
    );

    const ticketsQuery = isAdmin
      ? collection(db, 'supportTickets')
      : query(collection(db, 'supportTickets'), where('userId', '==', currentUser.uid));

    const unsubTickets = onSnapshot(
      ticketsQuery,
      (snap) => {
        const list = snap.docs.map((d) => d.data() as SupportTicket);
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setSupportTickets(list);
      },
      (err) => handleFirestoreError(err, OperationType.LIST, 'supportTickets')
    );

    let unsubDecorators = () => {};
    let unsubUsers = () => {};

    if (isAdmin) {
      unsubDecorators = onSnapshot(
        collection(db, 'decorators'),
        (snap) => {
          setDbDecorators(snap.docs.map((d) => d.data() as Decorator));
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'decorators')
      );

      unsubUsers = onSnapshot(
        collection(db, 'users'),
        (snap) => {
          setAllUsers(snap.docs.map((d) => d.data() as UserProfile));
        },
        (err) => handleFirestoreError(err, OperationType.LIST, 'users')
      );
    }

    return () => {
      unsubBookings();
      unsubTickets();
      unsubDecorators();
      unsubUsers();
    };
  }, [authLoading, currentUser, isAdmin]);

  // Strict Deduplication & Catalog Merge:
  // Every product and every product photo appears ONCE and ONLY ONCE across the platform.
  const products = useMemo(() => {
    const map = new Map<string, Product>();
    const deletedSet = new Set(deletedProductIds);

    const normalizeProduct = (p: Product): Product => {
      let gallery = p.galleryImages;
      try {
        const parsed = JSON.parse(p.galleryImages || '[]');
        if (Array.isArray(parsed)) {
          gallery = JSON.stringify(parsed.map((img: string) => resolveAssetUrl(img)));
        }
      } catch {
        // ignore
      }
      return {
        ...p,
        primaryImage: resolveAssetUrl(p.primaryImage),
        galleryImages: gallery,
      };
    };

    // 1. Load the 88 unique official SEED_PRODUCTS with real BalloonDekor photos & descriptions
    SEED_PRODUCTS.forEach((p) => {
      if (!deletedSet.has(p.id)) {
        map.set(p.id, normalizeProduct(p));
      }
    });

    // 2. Merge Firestore products ONLY if they were explicitly edited after seed timestamp or newly created by Admin
    // (Skip stale/legacy seeded records so real BalloonDekor descriptions & photos are never overwritten)
    dbProducts.forEach((p) => {
      if (deletedSet.has(p.id)) return;
      if (!p.primaryImage || p.primaryImage.startsWith('/src/assets/images/')) return;
      const isSeedItem = SEED_PRODUCT_IDS.has(p.id);
      const wasEditedByAdmin = Boolean(p.updatedAt && p.updatedAt > '2026-11-05T08:00:00.000Z');
      if (isSeedItem && !wasEditedByAdmin) return;
      map.set(p.id, normalizeProduct(p));
    });

    // 3. Apply Local Admin overrides (instant edits / new products / uploaded photos)
    Object.values(localProducts).forEach((p) => {
      if (!deletedSet.has(p.id)) {
        map.set(p.id, normalizeProduct(p));
      }
    });

    // 4. Final pass: ensure strict uniqueness by slug, normalized title, AND primaryImage
    const seenSlugs = new Set<string>();
    const seenTitles = new Set<string>();
    const seenImages = new Set<string>();
    const uniqueList: Product[] = [];

    const allItems = Array.from(map.values());
    for (const item of allItems) {
      const normSlug = item.slug.trim().toLowerCase();
      const normTitle = item.title.trim().toLowerCase();
      const normImg = item.primaryImage.trim();

      if (seenSlugs.has(normSlug) || seenTitles.has(normTitle) || seenImages.has(normImg)) {
        // If there is a local admin override for this item, replace the earlier entry
        if (localProducts[item.id]) {
          const idx = uniqueList.findIndex(
            (u) =>
              u.slug.trim().toLowerCase() === normSlug ||
              u.title.trim().toLowerCase() === normTitle ||
              u.primaryImage.trim() === normImg
          );
          if (idx !== -1) {
            uniqueList[idx] = item;
          }
        }
        continue;
      }
      seenSlugs.add(normSlug);
      seenTitles.add(normTitle);
      seenImages.add(normImg);
      uniqueList.push(item);
    }

    return uniqueList;
  }, [dbProducts, localProducts, deletedProductIds]);

  const categories = useMemo(() => {
    const map = new Map<string, Category>();
    const deletedSet = new Set(deletedCategoryIds);

    SEED_CATEGORIES.forEach((c) => {
      if (!deletedSet.has(c.id)) {
        map.set(c.id, { ...c, bannerImage: resolveAssetUrl(c.bannerImage) });
      }
    });

    dbCategories.forEach((c) => {
      if (deletedSet.has(c.id)) return;
      // Ignore legacy 5-category seed records like 'baby-kids', 'wedding', 'other', 'romantic'
      if (!SEED_CATEGORY_IDS.has(c.id) && ['baby-kids', 'wedding', 'other', 'romantic'].includes(c.id)) {
        return;
      }
      map.set(c.id, { ...c, bannerImage: resolveAssetUrl(c.bannerImage) });
    });

    Object.values(localCategories).forEach((c) => {
      if (!deletedSet.has(c.id)) {
        map.set(c.id, { ...c, bannerImage: resolveAssetUrl(c.bannerImage) });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }, [dbCategories, localCategories, deletedCategoryIds]);

  const addOns = useMemo(() => {
    const map = new Map<string, AddOn>();
    const deletedSet = new Set(deletedAddOnIds);
    SEED_ADDONS.forEach((a) => {
      if (!deletedSet.has(a.id)) {
        map.set(a.id, { ...a, image: resolveAssetUrl(a.image) });
      }
    });
    dbAddOns.forEach((a) => {
      if (!deletedSet.has(a.id)) {
        map.set(a.id, { ...a, image: resolveAssetUrl(a.image) });
      }
    });
    Object.values(localAddOns).forEach((a) => {
      if (!deletedSet.has(a.id)) {
        map.set(a.id, { ...a, image: resolveAssetUrl(a.image) });
      }
    });
    return Array.from(map.values());
  }, [dbAddOns, localAddOns, deletedAddOnIds]);

  const cities = useMemo(() => {
    const map = new Map<string, City>();
    SEED_CITIES.forEach((c) => map.set(c.id, c));
    dbCities.forEach((c) => map.set(c.id, c));
    Object.values(localCities).forEach((c) => map.set(c.id, c));
    return Array.from(map.values());
  }, [dbCities, localCities]);

  const coupons = useMemo(() => {
    const map = new Map<string, Coupon>();
    const deletedSet = new Set(deletedCouponIds);
    SEED_COUPONS.forEach((c) => {
      if (!deletedSet.has(c.id)) map.set(c.id, c);
    });
    dbCoupons.forEach((c) => {
      if (!deletedSet.has(c.id)) map.set(c.id, c);
    });
    Object.values(localCoupons).forEach((c) => {
      if (!deletedSet.has(c.id)) map.set(c.id, c);
    });
    return Array.from(map.values());
  }, [dbCoupons, localCoupons, deletedCouponIds]);

  const reviews = useMemo(() => {
    const map = new Map<string, Review>();
    SEED_REVIEWS.forEach((r) => map.set(r.id, r));
    dbReviews.forEach((r) => map.set(r.id, r));
    return Array.from(map.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [dbReviews]);

  const decorators = useMemo(() => {
    const map = new Map<string, Decorator>();
    SEED_DECORATORS.forEach((d) => map.set(d.id, d));
    dbDecorators.forEach((d) => map.set(d.id, d));
    return Array.from(map.values());
  }, [dbDecorators]);

  const websiteSettings = useMemo(() => {
    const base = localSettings || dbSettings || SEED_WEBSITE_SETTINGS;
    return {
      ...base,
      brandName:
        !base.brandName || base.brandName.toLowerCase() === 'utsavdekor'
          ? 'Bindu flower'
          : base.brandName,
      supportPhone:
        !base.supportPhone || base.supportPhone.includes('82820')
          ? '+91 99835 62406'
          : base.supportPhone,
      whatsappNumber:
        !base.whatsappNumber || base.whatsappNumber.includes('82820')
          ? '919983562406'
          : base.whatsappNumber,
    };
  }, [dbSettings, localSettings]);

  const selectedCity = useMemo(() => {
    return cities.find((c) => c.id === selectedCityId && c.isEnabled) || cities[0] || SEED_CITIES[0];
  }, [cities, selectedCityId]);

  const setSelectedCityById = (cityId: string) => {
    setSelectedCityId(cityId);
    localStorage.setItem('utsav_city', cityId);
    const found = cities.find((c) => c.id === cityId);
    if (found) {
      showToast(`Location updated to ${found.name}`, 'info');
    }
  };

  const getCityPrice = (basePrice: number, city: City = selectedCity) => {
    return Math.round(basePrice * (city?.priceMultiplier || 1));
  };

  const getRemainingSlotCapacity = (cityId: string, eventDate: string, timeSlot: string) => {
    const cityObj = cities.find((c) => c.id === cityId) || selectedCity;
    if (!cityObj || !cityObj.isEnabled) return 0;

    try {
      const blocked: string[] = JSON.parse(cityObj.blockedDatesJson || '[]');
      if (blocked.includes(eventDate)) return 0;
    } catch {
      // ignore
    }

    const activeSlotBookings = bookings.filter(
      (b) =>
        b.cityId === cityId &&
        b.eventDate === eventDate &&
        b.timeSlot === timeSlot &&
        !['Cancelled', 'Refunded'].includes(b.orderStatus)
    ).length;

    return Math.max(0, cityObj.dailySlotCapacity - activeSlotBookings);
  };

  // Auth Actions
  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
    showToast('Signed in with Google successfully!');
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), pass);
    showToast('Signed in successfully!');
  };

  const registerWithEmail = async (name: string, email: string, phone: string, pass: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    await updateProfile(cred.user, { displayName: name.trim() });
    const nowIso = new Date().toISOString();
    const profile: UserProfile = {
      uid: cred.user.uid,
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 160),
      phone: phone.trim().slice(0, 30),
      defaultCity: selectedCity.id,
      savedAddresses: '[]',
      wishlist: JSON.stringify(wishlistIds),
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    if (cred.user.emailVerified) {
      try {
        await setDoc(doc(db, 'users', cred.user.uid), profile);
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `users/${cred.user.uid}`);
      }
    }
    setUserProfile(profile);
    showToast('Account created! Welcome to Bindu flower.');
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
    showToast('Password reset link sent to your email.', 'info');
  };

  const logout = async () => {
    await signOut(auth);
    showToast('Signed out safely.', 'info');
  };

  const updateUserProfileData = async (partial: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      ...partial,
      uid: currentUser.uid,
      createdAt: userProfile.createdAt,
      updatedAt: new Date().toISOString(),
    };
    setUserProfile(updated);
    if (currentUser.emailVerified) {
      try {
        await setDoc(doc(db, 'users', currentUser.uid), updated);
        showToast('Profile saved to your account.');
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `users/${currentUser.uid}`);
      }
    } else {
      showToast('Profile updated for your session.');
    }
  };

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists ? 'Removed from your Saved Wishlist' : 'Saved to your Celebration Wishlist',
        'info'
      );
      return next;
    });
  };

  const recordRecentlyViewed = (productId: string) => {
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 8);
    });
  };

  // Cart Actions
  const addToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `ci-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setCart((prev) => [...prev, { ...item, cartItemId }]);
    showToast(`Added "${item.title}" to your booking bag!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Removed item from bag.', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const addOnsTotal = item.selectedAddOns.reduce(
        (aSum, addon) => aSum + addon.price * addon.quantity,
        0
      );
      return sum + item.unitPrice * item.quantity + addOnsTotal;
    }, 0);
  }, [cart]);

  const cartDiscount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal < appliedCoupon.minOrderValue) return 0;
    if (appliedCoupon.discountType === 'FIXED') {
      return Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
    const raw = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    if (appliedCoupon.maxDiscount) {
      return Math.min(raw, appliedCoupon.maxDiscount);
    }
    return raw;
  }, [appliedCoupon, cartSubtotal]);

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  const applyCouponCode = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === normalized && c.isEnabled);
    if (!found) {
      return { ok: false, message: 'Invalid or expired coupon code.' };
    }
    if (cartSubtotal < found.minOrderValue) {
      return {
        ok: false,
        message: `Minimum order value of ₹${found.minOrderValue.toLocaleString('en-IN')} required for ${found.code}.`,
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied!`);
    return { ok: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Booking & Customer Mutations
  const createBookingRecord = async (booking: Booking) => {
    const cleanId = sanitizeId(booking.id);
    const payload: Booking = {
      ...booking,
      id: cleanId,
      customerName: booking.customerName.slice(0, 120),
      customerPhone: booking.customerPhone.slice(0, 30),
      customerEmail: booking.customerEmail.slice(0, 160),
      venueAddress: booking.venueAddress.slice(0, 600),
      specialInstructions: (booking.specialInstructions || '').slice(0, 1000),
      selectedThemeColor: (booking.selectedThemeColor || 'Signature Palette').slice(0, 120),
      itemsSummary: booking.itemsSummary.slice(0, 4000),
      addOnsSummary: (booking.addOnsSummary || '[]').slice(0, 2500),
      couponCode: (booking.couponCode || '').slice(0, 40),
      razorpayOrderId: (booking.razorpayOrderId || '').slice(0, 120),
      razorpayPaymentId: (booking.razorpayPaymentId || '').slice(0, 120),
      assignedDecoratorId: (booking.assignedDecoratorId || '').slice(0, 128),
      assignedDecoratorName: (booking.assignedDecoratorName || '').slice(0, 120),
    };

    try {
      await setDoc(doc(db, 'bookings', cleanId), payload);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `bookings/${cleanId}`);
    }
  };

  const updateBookingPaymentVerified = async (
    bookingId: string,
    payload: {
      paymentStatus: Booking['paymentStatus'];
      amountPaid: number;
      balanceDue: number;
      razorpayOrderId: string;
      razorpayPaymentId: string;
      orderStatus: OrderStatus;
    }
  ) => {
    const cleanId = sanitizeId(bookingId);
    try {
      await updateDoc(doc(db, 'bookings', cleanId), {
        paymentStatus: payload.paymentStatus,
        amountPaid: payload.amountPaid,
        balanceDue: payload.balanceDue,
        razorpayOrderId: payload.razorpayOrderId.slice(0, 120),
        razorpayPaymentId: payload.razorpayPaymentId.slice(0, 120),
        orderStatus: payload.orderStatus,
        updatedAt: new Date().toISOString(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `bookings/${cleanId}`);
    }
  };

  const requestBookingCancellationOrReschedule = async (
    booking: Booking,
    reason: string,
    requestType: 'CANCELLATION' | 'RESCHEDULE'
  ) => {
    if (!currentUser) return;
    const nowIso = new Date().toISOString();
    const note = `[${requestType} REQUEST]: ${reason}`.slice(0, 1000);

    if (requestType === 'CANCELLATION') {
      try {
        await updateDoc(doc(db, 'bookings', booking.id), {
          orderStatus: 'Cancellation Requested',
          specialInstructions: note,
          updatedAt: nowIso,
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `bookings/${booking.id}`);
      }
    }

    const ticketId = `tkt-${Date.now()}`;
    const ticket: SupportTicket = {
      id: ticketId,
      userId: currentUser.uid,
      userName: booking.customerName.slice(0, 100),
      userEmail: booking.customerEmail.slice(0, 160),
      orderNumber: booking.orderNumber.slice(0, 40),
      requestType,
      subject: `${requestType} Request for Order ${booking.orderNumber}`.slice(0, 160),
      message: reason.slice(0, 1500),
      status: 'OPEN',
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    try {
      await setDoc(doc(db, 'supportTickets', ticketId), ticket);
      showToast(`${requestType === 'CANCELLATION' ? 'Cancellation' : 'Reschedule'} request submitted.`);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `supportTickets/${ticketId}`);
    }
  };

  const submitReview = async (reviewInput: Omit<Review, 'id' | 'createdAt'>) => {
    const id = `rev-${Date.now()}`;
    const review: Review = {
      ...reviewInput,
      id,
      userName: reviewInput.userName.slice(0, 100),
      city: reviewInput.city.slice(0, 80),
      occasion: (reviewInput.occasion || 'Celebration').slice(0, 80),
      comment: reviewInput.comment.slice(0, 1000),
      createdAt: new Date().toISOString(),
    };
    try {
      await setDoc(doc(db, 'reviews', id), review);
      showToast('Thank you! Your review has been published.');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `reviews/${id}`);
    }
  };

  const submitSupportTicket = async (
    ticketInput: Omit<SupportTicket, 'id' | 'userId' | 'status' | 'createdAt' | 'updatedAt'>
  ) => {
    if (!currentUser) {
      showToast('Please sign in to submit a support ticket.', 'error');
      return;
    }
    const id = `tkt-${Date.now()}`;
    const nowIso = new Date().toISOString();
    const ticket: SupportTicket = {
      id,
      userId: currentUser.uid,
      userName: ticketInput.userName.slice(0, 100),
      userEmail: ticketInput.userEmail.slice(0, 160),
      orderNumber: (ticketInput.orderNumber || '').slice(0, 40),
      requestType: ticketInput.requestType,
      subject: ticketInput.subject.slice(0, 160),
      message: ticketInput.message.slice(0, 1500),
      status: 'OPEN',
      createdAt: nowIso,
      updatedAt: nowIso,
    };
    try {
      await setDoc(doc(db, 'supportTickets', id), ticket);
      showToast('Support ticket created! Our concierge team will respond shortly.');
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `supportTickets/${id}`);
    }
  };

  // Admin Operations (Instant Local State + Cloud Firestore Sync when authenticated)
  const saveProduct = async (product: Product) => {
    const id = sanitizeId(product.id);
    const nowIso = new Date().toISOString();
    const isDataUrl = product.primaryImage.startsWith('data:image/');
    const clean: Product = {
      ...product,
      id,
      slug: product.slug.slice(0, 160),
      title: product.title.slice(0, 160),
      description: product.description.slice(0, 3000),
      categoryId: product.categoryId.slice(0, 80),
      subcategoryId: product.subcategoryId.slice(0, 80),
      setupDuration: product.setupDuration.slice(0, 80),
      primaryImage: isDataUrl ? product.primaryImage : product.primaryImage.slice(0, 500),
      galleryImages: isDataUrl
        ? product.galleryImages || JSON.stringify([product.primaryImage])
        : (product.galleryImages || '[]').slice(0, 2500),
      includedItems: product.includedItems.slice(0, 2000),
      excludedItems: (product.excludedItems || '[]').slice(0, 1500),
      instructions: (product.instructions || '[]').slice(0, 1500),
      themeColors: (product.themeColors || '[]').slice(0, 500),
      createdAt: product.createdAt || nowIso,
      updatedAt: nowIso,
    };

    // Always persist immediately in local Admin state
    setLocalProducts((prev) => ({ ...prev, [id]: clean }));
    setDeletedProductIds((prev) => prev.filter((item) => item !== id));

    if (currentUser && isAdmin && !isDataUrl) {
      try {
        await setDoc(doc(db, 'products', id), clean);
        showToast(`Saved "${clean.title}" to Catalog & Cloud!`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `products/${id}`);
      }
    } else {
      showToast(`Saved "${clean.title}"! Changes are live on the website.`);
    }
  };

  const deleteProduct = async (productId: string) => {
    setDeletedProductIds((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
    setLocalProducts((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });

    if (currentUser && isAdmin) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        showToast('Product removed from Catalog & Firestore.');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
      }
    } else {
      showToast('Product removed from Catalog.');
    }
  };

  const saveCategory = async (category: Category) => {
    const id = sanitizeId(category.id);
    const nowIso = new Date().toISOString();
    const isDataUrl = category.bannerImage.startsWith('data:image/');
    const clean: Category = {
      ...category,
      id,
      slug: category.slug.slice(0, 120),
      name: category.name.slice(0, 120),
      description: category.description.slice(0, 600),
      bannerImage: isDataUrl ? category.bannerImage : category.bannerImage.slice(0, 500),
      subcategoriesJson: category.subcategoriesJson.slice(0, 3000),
      createdAt: category.createdAt || nowIso,
      updatedAt: nowIso,
    };

    setLocalCategories((prev) => ({ ...prev, [id]: clean }));
    setDeletedCategoryIds((prev) => prev.filter((item) => item !== id));

    if (currentUser && isAdmin && !isDataUrl) {
      try {
        await setDoc(doc(db, 'categories', id), clean);
        showToast(`Category "${clean.name}" saved.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `categories/${id}`);
      }
    } else {
      showToast(`Category "${clean.name}" updated!`);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    setDeletedCategoryIds((prev) => (prev.includes(categoryId) ? prev : [...prev, categoryId]));
    setLocalCategories((prev) => {
      const next = { ...prev };
      delete next[categoryId];
      return next;
    });

    if (currentUser && isAdmin) {
      try {
        await deleteDoc(doc(db, 'categories', categoryId));
        showToast('Deleted category.');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `categories/${categoryId}`);
      }
    } else {
      showToast('Category removed.');
    }
  };

  const saveAddOn = async (addon: AddOn) => {
    const id = sanitizeId(addon.id);
    const nowIso = new Date().toISOString();
    const isDataUrl = addon.image.startsWith('data:image/');
    const clean: AddOn = {
      ...addon,
      id,
      title: addon.title.slice(0, 120),
      category: addon.category,
      image: isDataUrl ? addon.image : addon.image.slice(0, 500),
      description: (addon.description || '').slice(0, 400),
      createdAt: addon.createdAt || nowIso,
      updatedAt: nowIso,
    };

    setLocalAddOns((prev) => ({ ...prev, [id]: clean }));
    setDeletedAddOnIds((prev) => prev.filter((item) => item !== id));

    if (currentUser && isAdmin && !isDataUrl) {
      try {
        await setDoc(doc(db, 'addOns', id), clean);
        showToast(`Add-on "${clean.title}" saved.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `addOns/${id}`);
      }
    } else {
      showToast(`Add-on "${clean.title}" saved!`);
    }
  };

  const deleteAddOn = async (addonId: string) => {
    setDeletedAddOnIds((prev) => (prev.includes(addonId) ? prev : [...prev, addonId]));
    setLocalAddOns((prev) => {
      const next = { ...prev };
      delete next[addonId];
      return next;
    });

    if (currentUser && isAdmin) {
      try {
        await deleteDoc(doc(db, 'addOns', addonId));
        showToast('Deleted add-on.');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `addOns/${addonId}`);
      }
    } else {
      showToast('Add-on removed.');
    }
  };

  const saveCity = async (city: City) => {
    const id = sanitizeId(city.id);
    const nowIso = new Date().toISOString();
    const clean: City = {
      ...city,
      id,
      name: city.name.slice(0, 80),
      slug: city.slug.slice(0, 80),
      state: city.state.slice(0, 80),
      blockedDatesJson: (city.blockedDatesJson || '[]').slice(0, 2000),
      createdAt: city.createdAt || nowIso,
      updatedAt: nowIso,
    };

    setLocalCities((prev) => ({ ...prev, [id]: clean }));

    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'cities', id), clean);
        showToast(`City "${clean.name}" updated.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `cities/${id}`);
      }
    } else {
      showToast(`City "${clean.name}" updated!`);
    }
  };

  const saveCoupon = async (coupon: Coupon) => {
    const id = sanitizeId(coupon.id);
    const nowIso = new Date().toISOString();
    const clean: Coupon = {
      ...coupon,
      id,
      code: coupon.code.toUpperCase().slice(0, 40),
      expiryDate: coupon.expiryDate.slice(0, 40),
      createdAt: coupon.createdAt || nowIso,
      updatedAt: nowIso,
    };

    setLocalCoupons((prev) => ({ ...prev, [id]: clean }));
    setDeletedCouponIds((prev) => prev.filter((item) => item !== id));

    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'coupons', id), clean);
        showToast(`Coupon "${clean.code}" saved.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `coupons/${id}`);
      }
    } else {
      showToast(`Coupon "${clean.code}" saved!`);
    }
  };

  const deleteCoupon = async (couponId: string) => {
    setDeletedCouponIds((prev) => (prev.includes(couponId) ? prev : [...prev, couponId]));
    setLocalCoupons((prev) => {
      const next = { ...prev };
      delete next[couponId];
      return next;
    });

    if (currentUser && isAdmin) {
      try {
        await deleteDoc(doc(db, 'coupons', couponId));
        showToast('Coupon deleted.');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `coupons/${couponId}`);
      }
    } else {
      showToast('Coupon removed.');
    }
  };

  const saveDecorator = async (decorator: Decorator) => {
    const id = sanitizeId(decorator.id);
    const nowIso = new Date().toISOString();
    const clean: Decorator = {
      ...decorator,
      id,
      name: decorator.name.slice(0, 100),
      phone: decorator.phone.slice(0, 30),
      cityId: decorator.cityId.slice(0, 80),
      cityName: decorator.cityName.slice(0, 80),
      specialty: decorator.specialty.slice(0, 120),
      createdAt: decorator.createdAt || nowIso,
      updatedAt: nowIso,
    };
    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'decorators', id), clean);
        showToast(`Decorator "${clean.name}" saved.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `decorators/${id}`);
      }
    } else {
      setDbDecorators((prev) => [...prev.filter((d) => d.id !== id), clean]);
      showToast(`Decorator "${clean.name}" saved.`);
    }
  };

  const deleteDecorator = async (decoratorId: string) => {
    if (currentUser && isAdmin) {
      try {
        await deleteDoc(doc(db, 'decorators', decoratorId));
        showToast('Decorator removed.');
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `decorators/${decoratorId}`);
      }
    } else {
      setDbDecorators((prev) => prev.filter((d) => d.id !== decoratorId));
      showToast('Decorator removed.');
    }
  };

  const adminUpdateBooking = async (booking: Booking) => {
    const id = sanitizeId(booking.id);
    const clean: Booking = {
      ...booking,
      id,
      updatedAt: new Date().toISOString(),
    };
    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'bookings', id), clean);
        showToast(`Order ${booking.orderNumber} updated to "${booking.orderStatus}"`);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `bookings/${id}`);
      }
    } else {
      setBookings((prev) => prev.map((b) => (b.id === id ? clean : b)));
      showToast(`Order ${booking.orderNumber} updated to "${booking.orderStatus}"`);
    }
  };

  const adminUpdateSupportTicket = async (ticket: SupportTicket) => {
    const id = sanitizeId(ticket.id);
    const clean: SupportTicket = {
      ...ticket,
      id,
      updatedAt: new Date().toISOString(),
    };
    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'supportTickets', id), clean);
        showToast(`Support ticket ${ticket.id} updated.`);
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `supportTickets/${id}`);
      }
    } else {
      setSupportTickets((prev) => prev.map((t) => (t.id === id ? clean : t)));
      showToast(`Support ticket ${ticket.id} updated.`);
    }
  };

  const saveWebsiteSettings = async (settings: WebsiteSetting) => {
    const clean: WebsiteSetting = {
      ...settings,
      id: 'global',
      brandName: settings.brandName.slice(0, 80),
      announcementText: settings.announcementText.slice(0, 250),
      supportPhone: settings.supportPhone.slice(0, 30),
      whatsappNumber: settings.whatsappNumber.slice(0, 30),
      supportEmail: settings.supportEmail.slice(0, 160),
      cancellationPolicySummary: settings.cancellationPolicySummary.slice(0, 1000),
      updatedAt: new Date().toISOString(),
    };

    setLocalSettings(clean);

    if (currentUser && isAdmin) {
      try {
        await setDoc(doc(db, 'websiteSettings', 'global'), clean);
        showToast('Website settings saved & synced to Cloud!');
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'websiteSettings/global');
      }
    } else {
      showToast('Website settings updated!');
    }
  };

  const resetLocalCatalogCustomizations = () => {
    setLocalProducts({});
    setDeletedProductIds([]);
    setLocalCategories({});
    setDeletedCategoryIds([]);
    setLocalAddOns({});
    setDeletedAddOnIds([]);
    setLocalCities({});
    setLocalCoupons({});
    setDeletedCouponIds([]);
    setLocalSettings(null);
    localStorage.removeItem('bindu_admin_products_v3');
    localStorage.removeItem('bindu_deleted_products_v3');
    localStorage.removeItem('bindu_admin_categories_v3');
    localStorage.removeItem('bindu_deleted_categories_v3');
    localStorage.removeItem('bindu_admin_addons_v3');
    localStorage.removeItem('bindu_deleted_addons_v3');
    localStorage.removeItem('bindu_admin_cities_v3');
    localStorage.removeItem('bindu_admin_coupons_v3');
    localStorage.removeItem('bindu_deleted_coupons_v3');
    localStorage.removeItem('bindu_admin_settings_v3');
    showToast('Restored official 88-product catalog!', 'info');
  };

  const seedInitialDatabaseIfNeeded = async () => {
    if (!currentUser || !isAdmin) {
      showToast('All 88 unique products & 13 categories are active locally! Sign in with Google Admin to sync to Cloud Firestore.', 'info');
      return;
    }
    try {
      for (const cat of SEED_CATEGORIES) {
        await setDoc(doc(db, 'categories', cat.id), cat);
      }
      for (const prod of SEED_PRODUCTS) {
        await setDoc(doc(db, 'products', prod.id), prod);
      }
      for (const addon of SEED_ADDONS) {
        await setDoc(doc(db, 'addOns', addon.id), addon);
      }
      for (const city of SEED_CITIES) {
        await setDoc(doc(db, 'cities', city.id), city);
      }
      for (const coup of SEED_COUPONS) {
        await setDoc(doc(db, 'coupons', coup.id), coup);
      }
      for (const dec of SEED_DECORATORS) {
        await setDoc(doc(db, 'decorators', dec.id), dec);
      }
      await setDoc(doc(db, 'websiteSettings', 'global'), SEED_WEBSITE_SETTINGS);
      showToast('All 88 unique products & 13 categories synced to live Firestore database!');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'seedDatabase');
    }
  };

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        authLoading,
        loginWithGoogle,
        loginWithEmail,
        registerWithEmail,
        resetPassword,
        logout,
        updateUserProfileData,
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
        selectedCity,
        setSelectedCityById,
        wishlistIds,
        toggleWishlist,
        recentlyViewedIds,
        recordRecentlyViewed,
        cart,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCouponCode,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        getCityPrice,
        getRemainingSlotCapacity,
        createBookingRecord,
        updateBookingPaymentVerified,
        requestBookingCancellationOrReschedule,
        submitReview,
        submitSupportTicket,
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
        toasts,
        showToast,
        dismissToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
