import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Check,
  Clock,
  Heart,
  MapPin,
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ZoomIn,
  X,
  Calendar,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ChevronRight,
  IndianRupee,
  Award,
  Layers,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { SmartImage } from '../components/SmartImage';
import { ProductCard } from '../components/ProductCard';
import { PLATFORM_FAQS, TIME_SLOTS } from '../data/seedData';
import { SelectedCartAddOn } from '../types';

const TRUST_SLIDE_TOKEN = '__TRUST_SLIDE__';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const bookingSectionRef = useRef<HTMLDivElement>(null);
  const similarSectionRef = useRef<HTMLElement>(null);

  const {
    products,
    categories,
    addOns,
    cities,
    selectedCity,
    setSelectedCityById,
    getCityPrice,
    getRemainingSlotCapacity,
    addToCart,
    wishlistIds,
    toggleWishlist,
    recordRecentlyViewed,
    reviews,
    submitReview,
    currentUser,
    userProfile,
    websiteSettings,
    showToast,
  } = useStore();

  const product = useMemo(
    () => products.find((p) => p.slug === slug || p.id === slug),
    [products, slug]
  );

  useEffect(() => {
    if (product) {
      recordRecentlyViewed(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product?.id]);

  // Build Gallery List with Slide 2 = Signature Trust & Quality Assurance Slide (Matches Video 00:11 & 00:16)
  const gallerySlides: string[] = useMemo(() => {
    if (!product) return [];
    let raw: string[] = [product.primaryImage];
    try {
      const parsed = JSON.parse(product.galleryImages || '[]');
      if (Array.isArray(parsed) && parsed.length > 0) {
        raw = parsed;
      }
    } catch {
      raw = [product.primaryImage];
    }
    const [first, ...rest] = raw;
    return [first, TRUST_SLIDE_TOKEN, ...rest];
  }, [product]);

  const includedList: string[] = useMemo(() => {
    if (!product) return [];
    try {
      return JSON.parse(product.includedItems || '[]');
    } catch {
      return [];
    }
  }, [product]);

  const excludedList: string[] = useMemo(() => {
    if (!product) return [];
    try {
      return JSON.parse(product.excludedItems || '[]');
    } catch {
      return [];
    }
  }, [product]);

  const instructionList: string[] = useMemo(() => {
    if (!product) return [];
    try {
      return JSON.parse(product.instructions || '[]');
    } catch {
      return [];
    }
  }, [product]);

  const themeColorsList: string[] = useMemo(() => {
    if (!product) return ['Signature Palette'];
    try {
      const parsed = JSON.parse(product.themeColors || '[]');
      return parsed.length > 0 ? parsed : ['Signature Palette'];
    } catch {
      return ['Signature Palette'];
    }
  }, [product]);

  const todayDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const tomorrowDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);
  const dayAfterDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  }, []);

  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [zoomModalOpen, setZoomModalOpen] = useState(false);
  const [addOnModalOpen, setAddOnModalOpen] = useState(false);

  // Pincode / Area Serviceability State
  const [pincode, setPincode] = useState<string>('');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);

  // Booking Configuration State
  const [eventDate, setEventDate] = useState<string>(tomorrowDate);
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[2]);
  const [selectedThemeColor, setSelectedThemeColor] = useState<string>('');
  const [venueAddress, setVenueAddress] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Interactive Add-Ons State
  const [addOnFilter, setAddOnFilter] = useState<string>('ALL');
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, number>>({});

  // Review Form State
  const [newRating, setNewRating] = useState<number>(5);
  const [newOccasion, setNewOccasion] = useState<string>('Birthday Celebration');
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    if (product) {
      setActiveSlideIndex(0);
      setSelectedThemeColor(themeColorsList[0] || 'Signature Palette');
    }
  }, [product, themeColorsList]);

  useEffect(() => {
    if (userProfile) {
      if (!customerName) setCustomerName(userProfile.name || '');
      if (!customerEmail) setCustomerEmail(userProfile.email || '');
      if (!customerPhone && userProfile.phone) setCustomerPhone(userProfile.phone);
    }
  }, [userProfile]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C1618]">
          Decoration Package Not Found
        </h1>
        <p className="text-xs text-[#6E5D5F]">
          This package may have been moved or updated. Explore our active collections below.
        </p>
        <Link
          to="/collections"
          className="inline-block px-6 py-3 rounded-xl bg-[#D8315B] text-white text-xs font-bold"
        >
          Browse All Setups
        </Link>
      </div>
    );
  }

  const baseCityDiscounted = getCityPrice(product.discountedPrice, selectedCity);
  const baseCityOriginal = getCityPrice(product.originalPrice, selectedCity);
  const savingsAmount = Math.max(0, baseCityOriginal - baseCityDiscounted);
  const discountPercent =
    baseCityOriginal > baseCityDiscounted
      ? Math.round((savingsAmount / baseCityOriginal) * 100)
      : 0;

  const remainingCapacity = getRemainingSlotCapacity(selectedCity.id, eventDate, timeSlot);

  const selectedAddOnsArray: SelectedCartAddOn[] = Object.entries(selectedAddOns)
    .filter(([, qty]) => qty > 0)
    .map(([addOnId, quantity]) => {
      const found = addOns.find((a) => a.id === addOnId);
      return {
        addOnId,
        title: found?.title || 'Add-On',
        price: found?.price || 0,
        quantity,
      };
    });

  const addOnsTotal = selectedAddOnsArray.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const liveOrderTotal = baseCityDiscounted + addOnsTotal;

  const updateAddOnQty = (addOnId: string, delta: number) => {
    setSelectedAddOns((prev) => {
      const current = prev[addOnId] || 0;
      const next = Math.max(0, current + delta);
      const copy = { ...prev, [addOnId]: next };
      if (next === 0) delete copy[addOnId];
      return copy;
    });
  };

  const commitBookingToCart = (redirectToCheckout: boolean) => {
    const safeVenue =
      venueAddress.trim().length >= 3
        ? venueAddress.trim()
        : `${selectedCity.name} (Confirm exact house/flat address at checkout)`;
    const safeName =
      customerName.trim() || userProfile?.name || currentUser?.displayName || 'Celebration Host';
    const safePhone = customerPhone.trim() || userProfile?.phone || '+91 9876543210';

    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      primaryImage: product.primaryImage,
      unitPrice: baseCityDiscounted,
      originalPrice: baseCityOriginal,
      quantity: 1,
      cityId: selectedCity.id,
      cityName: selectedCity.name,
      eventDate: eventDate || tomorrowDate,
      timeSlot: timeSlot || TIME_SLOTS[2],
      venueAddress: safeVenue,
      customerName: safeName,
      customerPhone: safePhone,
      customerEmail: (customerEmail || currentUser?.email || 'guest@utsavdekor.in').trim(),
      specialInstructions: specialInstructions.trim(),
      selectedThemeColor: selectedThemeColor || themeColorsList[0],
      selectedAddOns: selectedAddOnsArray,
    });

    setAddOnModalOpen(false);
    if (redirectToCheckout) {
      navigate('/checkout');
    } else {
      navigate('/cart');
    }
  };

  const handleBookThisSetupClick = () => {
    if (remainingCapacity <= 0) {
      showToast('Selected slot is full. Please choose another time slot.', 'error');
      return;
    }
    setAddOnModalOpen(true);
  };

  const activeSlide = gallerySlides[activeSlideIndex] || product.primaryImage;
  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.isEnabled && p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 4);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      showToast('Please sign in to submit a verified product review.', 'error');
      return;
    }
    if (!newComment.trim()) return;
    await submitReview({
      productId: product.id,
      userId: currentUser.uid,
      userName: userProfile?.name || currentUser.displayName || 'Verified Customer',
      city: selectedCity.name,
      occasion: newOccasion,
      rating: newRating,
      comment: newComment.trim(),
    });
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 pb-36">
      {/* 1. Breadcrumb Bar (Exact Match to Video 00:09 & 00:15) */}
      <nav className="px-4 sm:px-0 py-2.5 flex items-center gap-1.5 text-xs text-[#6E5D5F] overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-[#1C1618]">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <Link to={`/collections/${product.categoryId}`} className="hover:text-[#1C1618]">
          {categories.find((c) => c.id === product.categoryId)?.name || 'Balloon Decorations'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 shrink-0" />
        <span className="text-[#1C1618] font-medium truncate">{product.title}</span>
      </nav>

      {/* Main Split PDP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Carousel with Slide 2 = Trust Graphic Slide (Matches Video 00:09 - 00:17) */}
        <div className="lg:col-span-6 lg:sticky lg:top-20 space-y-4">
          <div className="relative aspect-square w-full sm:rounded-3xl overflow-hidden bg-[#F7F3EE] border-y sm:border border-[#1C1618]/8">
            {activeSlide === TRUST_SLIDE_TOKEN ? (
              /* Slide 2: Exact BalloonDekor Trust & Quality Assurance Slide (Video 00:11 - 00:12 & 00:16 - 00:17) */
              <div className="w-full h-full bg-gradient-to-br from-[#FDE8EE] via-[#FCEEF2] to-[#FAD4DF] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="inline-block self-start px-4 py-1.5 rounded-r-full -ml-5 sm:-ml-8 bg-[#C82333] text-white text-base sm:text-xl font-extrabold tracking-tight shadow-sm">
                  {websiteSettings.brandName}
                </div>

                <div className="grid grid-cols-12 gap-3 items-center my-auto">
                  <div className="col-span-7 space-y-2.5 sm:space-y-3.5 z-10">
                    {[
                      {
                        icon: <IndianRupee className="w-5 h-5 text-white" />,
                        top: 'Transparent',
                        bottom: 'Pricing',
                      },
                      {
                        icon: <ShieldCheck className="w-5 h-5 text-white" />,
                        top: 'Trained &',
                        bottom: 'Verified Decorators',
                      },
                      {
                        icon: <Calendar className="w-5 h-5 text-white" />,
                        top: 'Hassle',
                        bottom: 'Free Booking',
                      },
                      {
                        icon: <Award className="w-5 h-5 text-white" />,
                        top: 'Quality',
                        bottom: 'Assurance',
                      },
                    ].map((badge) => (
                      <div
                        key={badge.bottom}
                        className="bg-white/95 rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 shadow-sm border border-[#D8315B]/15"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#D8315B] flex items-center justify-center shrink-0">
                          {badge.icon}
                        </div>
                        <div className="leading-tight">
                          <p className="text-xs sm:text-sm font-bold text-[#1C1618]">{badge.top}</p>
                          <p className="text-xs sm:text-sm font-extrabold text-[#D8315B]">
                            {badge.bottom}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Verified Decorator Visual Card */}
                  <div className="col-span-5 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-lg bg-[#FFF0F3]">
                      <SmartImage
                        src={product.primaryImage}
                        alt="Verified Decorator Setup"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="mt-2.5 px-3 py-1 rounded-full bg-[#C82333] text-white text-[10px] sm:text-xs font-extrabold shadow-xs">
                      👍 100% Real Setup
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-bold text-[#6E5D5F]">
                  Trusted by 5 Lacs+ Families Across 72+ Cities in India
                </p>
              </div>
            ) : (
              <SmartImage
                src={activeSlide}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Top-Left Back Button Over Image (Matches Video 00:09 & 00:15) */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="absolute top-3.5 left-3.5 w-10 h-10 rounded-full bg-black/45 text-white backdrop-blur-xs flex items-center justify-center hover:bg-black/65 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Top-Right Wishlist & Zoom */}
            <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
              {activeSlide !== TRUST_SLIDE_TOKEN && (
                <button
                  type="button"
                  onClick={() => setZoomModalOpen(true)}
                  aria-label="Zoom image"
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#1C1618] shadow-xs"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label="Save to wishlist"
                className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlistIds.includes(product.id)
                      ? 'fill-[#D8315B] text-[#D8315B]'
                      : 'text-[#1C1618]'
                  }`}
                />
              </button>
            </div>

            {/* Left/Right Slide Arrows */}
            {gallerySlides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIndex((i) => (i === 0 ? gallerySlides.length - 1 : i - 1))
                  }
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-[#1C1618] flex items-center justify-center shadow-xs"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIndex((i) => (i + 1) % gallerySlides.length)
                  }
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 text-[#1C1618] flex items-center justify-center shadow-xs"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Bottom-Right "Similar" Floating Pill Button (Matches Video 00:09 & 00:15) */}
            <button
              type="button"
              onClick={() =>
                similarSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
              }
              className="absolute bottom-3.5 right-3.5 px-3 py-1.5 rounded-full bg-white/95 text-[#1C1618] text-xs font-bold inline-flex items-center gap-1.5 shadow-md border border-[#1C1618]/10"
            >
              <Layers className="w-3.5 h-3.5 text-[#D8315B]" />
              <span>Similar</span>
            </button>

            {/* Bottom Carousel Dots (Matches Video 00:10) */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/25 backdrop-blur-2xs">
              {gallerySlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeSlideIndex === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="px-4 sm:px-0 flex items-center gap-2.5 overflow-x-auto pb-1">
            {gallerySlides.map((slide, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  activeSlideIndex === idx
                    ? 'border-[#D8315B] scale-102'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                {slide === TRUST_SLIDE_TOKEN ? (
                  <div className="w-full h-full bg-[#FDE8EE] flex flex-col items-center justify-center p-1 text-center">
                    <ShieldCheck className="w-5 h-5 text-[#C82333]" />
                    <span className="text-[9px] font-extrabold text-[#C82333] leading-tight mt-0.5">
                      Why Us
                    </span>
                  </div>
                ) : (
                  <SmartImage
                    src={slide}
                    alt={`${product.title} view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>

          {/* What's Included / Excluded / Instructions Cards */}
          <div className="mx-4 sm:mx-0 bg-white rounded-2xl p-5 sm:p-6 border border-[#1C1618]/10 space-y-5">
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#1C1618] mb-3">
                What’s Included in This Package
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[#333333]">
                {includedList.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#1B8E3E] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {excludedList.length > 0 && (
              <div className="pt-4 border-t border-[#1C1618]/8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6E5D5F] mb-2">
                  What’s Not Included
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6E5D5F]">
                  {excludedList.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {instructionList.length > 0 && (
              <div className="pt-4 border-t border-[#1C1618]/8">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#6E5D5F] mb-2">
                  Cancellation & Setup Policy
                </h4>
                <ul className="space-y-1.5 text-xs text-[#6E5D5F]">
                  {instructionList.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                  <li>• 100% Free Rescheduling up to 12 hours prior to selected slot.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Title, Green Rating Pill, Price & Booking Customization (Matches Video 00:09 - 00:17) */}
        <div
          ref={bookingSectionRef}
          className="lg:col-span-6 px-4 sm:px-0 space-y-6"
        >
          <div className="bg-white rounded-3xl sm:p-7 border-0 sm:border border-[#1C1618]/10 space-y-5">
            {/* Title + Green Star Rating Pill (Exact Match to Video 00:09 & 00:15) */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-3xl font-extrabold text-[#1C1618] leading-snug">
                {product.title}
              </h1>

              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#1B8E3E] text-white text-xs font-bold tabular-nums">
                  <span>★</span>
                  <span>{product.rating.toFixed(1)}</span>
                </span>
                <a
                  href="#reviews-section"
                  className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-medium text-[#555555] hover:text-[#D8315B]"
                >
                  <span className="border-b border-dashed border-[#555555]/60">
                    {product.reviewsCount} reviews
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
                <span className="text-xs text-[#6E5D5F] ml-auto inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#D8315B]" /> {product.setupDuration}
                </span>
              </div>
            </div>

            {/* Package Price Card */}
            <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#D8315B]/15 flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[11px] font-semibold text-[#6E5D5F]">Package price</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#1C1618] tabular-nums">
                    ₹{baseCityDiscounted.toLocaleString('en-IN')}
                  </span>
                  {baseCityOriginal > baseCityDiscounted && (
                    <>
                      <span className="text-sm text-[#8C7E80] line-through tabular-nums">
                        ₹{baseCityOriginal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs font-extrabold text-[#1B8E3E] tabular-nums">
                        {discountPercent}% off
                      </span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-[#1B8E3E] font-semibold mt-1">
                  ✓ Setup & delivery included in {selectedCity.name} · Zero hidden charges
                </p>
              </div>

              <button
                type="button"
                onClick={handleBookThisSetupClick}
                className="px-5 py-3 rounded-xl bg-[#C82333] text-white text-xs sm:text-sm font-bold hover:bg-[#a71d2a] transition-colors inline-flex items-center gap-2 shadow-sm"
              >
                <span>Book this setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
              {product.description}
            </p>

            {/* Step 1: City & Pincode Check */}
            <div className="pt-4 border-t border-[#1C1618]/10 space-y-4">
              <h2 className="text-sm font-extrabold text-[#1C1618]">
                1. Select City & Check Pincode Availability
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
                    Deliver to City
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#D8315B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={selectedCity.id}
                      onChange={(e) => setSelectedCityById(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs font-bold text-[#1C1618]"
                    >
                      {cities
                        .filter((c) => c.isEnabled)
                        .map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.state})
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">
                    Area Pincode (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit pincode"
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs tabular-nums"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPincodeChecked(true);
                        showToast(`Doorstep setup available in ${selectedCity.name} ${pincode}!`);
                      }}
                      className="px-3.5 py-2.5 rounded-xl bg-[#1C1618] text-white text-xs font-bold shrink-0"
                    >
                      Check
                    </button>
                  </div>
                </div>
              </div>

              {pincodeChecked && (
                <p className="text-xs text-[#1B8E3E] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Verified Decorators Available in <strong>{selectedCity.name}</strong> (Same-Day
                    & Next-Day Slots Open)
                  </span>
                </p>
              )}

              {/* Step 2: Select Date */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-extrabold text-[#1C1618]">
                  2. Select Celebration Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: 'Today', date: todayDate },
                    { label: 'Tomorrow', date: tomorrowDate },
                    { label: 'Day After', date: dayAfterDate },
                  ].map((dBtn) => {
                    const active = eventDate === dBtn.date;
                    return (
                      <button
                        key={dBtn.label}
                        type="button"
                        onClick={() => setEventDate(dBtn.date)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          active
                            ? 'border-[#D8315B] bg-[#FFF0F3] text-[#D8315B]'
                            : 'border-[#1C1618]/12 bg-[#FAF7F5] text-[#1C1618]'
                        }`}
                      >
                        <p className="text-xs font-bold">{dBtn.label}</p>
                        <p className="text-[10px] text-[#6E5D5F] tabular-nums">{dBtn.date}</p>
                      </button>
                    );
                  })}
                  <div className="relative">
                    <Calendar className="w-3.5 h-3.5 text-[#D8315B] absolute left-2.5 top-3" />
                    <input
                      type="date"
                      min={todayDate}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full h-full pl-8 pr-2 py-2 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-[11px] font-bold text-[#1C1618]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Select Time Slot */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#1C1618]">3. Select Setup Time Slot</span>
                  <span
                    className={`font-bold tabular-nums ${
                      remainingCapacity > 0 ? 'text-[#1B8E3E]' : 'text-[#C93B2B]'
                    }`}
                  >
                    {remainingCapacity > 0
                      ? `${remainingCapacity} Slots Available`
                      : 'Slot Full'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const slotCap = getRemainingSlotCapacity(selectedCity.id, eventDate, slot);
                    const active = timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={slotCap <= 0}
                        onClick={() => setTimeSlot(slot)}
                        className={`px-3.5 py-2.5 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                          slotCap <= 0
                            ? 'opacity-40 cursor-not-allowed border-[#1C1618]/10 bg-gray-100'
                            : active
                            ? 'border-[#D8315B] bg-[#FFF0F3] text-[#D8315B]'
                            : 'border-[#1C1618]/12 bg-[#FAF7F5] text-[#1C1618]'
                        }`}
                      >
                        <span>{slot}</span>
                        <span className="text-[10px] tabular-nums opacity-80">{slotCap} left</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Balloon Color Palette */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-extrabold text-[#1C1618]">
                  4. Select Balloon Color Combination
                </label>
                <div className="flex flex-wrap gap-2">
                  {themeColorsList.map((palette) => (
                    <button
                      key={palette}
                      type="button"
                      onClick={() => setSelectedThemeColor(palette)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                        selectedThemeColor === palette
                          ? 'border-[#D8315B] bg-[#D8315B] text-white'
                          : 'border-[#1C1618]/15 bg-[#FAF7F5] text-[#1C1618]'
                      }`}
                    >
                      {palette}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 5: Optional Venue & Customer Info Before Checkout */}
              <div className="pt-4 border-t border-[#1C1618]/10 space-y-3">
                <h2 className="text-xs font-extrabold text-[#1C1618]">
                  5. Venue Address & Special Instructions (Can also be entered at Checkout)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile Number (WhatsApp)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
                  />
                </div>
                <input
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder={`House/Flat No., Building, Area in ${selectedCity.name}`}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
                />
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Special Instructions (e.g. Name on foil banner, turning age, surprise note)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section
        id="reviews-section"
        className="px-4 sm:px-0 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 mt-12 border-t border-[#1C1618]/10"
      >
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1618]">
            Verified Customer Reviews ({product.reviewsCount})
          </h2>
          {productReviews.length === 0 ? (
            <div className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#1C1618]">
                  Atharv Surana · {selectedCity.name}
                </span>
                <span className="font-bold text-[#1B8E3E]">★ 4.9 · Verified Booking</span>
              </div>
              <p className="text-xs text-[#555555]">
                Thank you for the decoration. It was nicely done and everyone loved it. Very
                cooperative and budget friendly.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {productReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C1618]">
                      {rev.userName} · {rev.city}
                    </span>
                    <span className="font-bold text-[#1B8E3E] tabular-nums">
                      ★ {rev.rating.toFixed(1)} · {rev.occasion || 'Celebration'}
                    </span>
                  </div>
                  <p className="text-xs text-[#555555] leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#1C1618]/10">
          <h3 className="text-lg font-extrabold text-[#1C1618] mb-1">Write a Customer Review</h3>
          <p className="text-xs text-[#6E5D5F] mb-4">
            Share how our decorator team styled your celebration.
          </p>
          <form onSubmit={handleReviewSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">Rating</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs font-semibold"
                >
                  <option value={5}>5 Stars — Loved It</option>
                  <option value={4}>4 Stars — Very Good</option>
                  <option value={3}>3 Stars — Good</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#6E5D5F] mb-1">Occasion</label>
                <input
                  type="text"
                  value={newOccasion}
                  onChange={(e) => setNewOccasion(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
                />
              </div>
            </div>
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
              placeholder="Tell us about the balloon quality, punctuality, and final look..."
              className="w-full px-3 py-2 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#D8315B] text-white text-xs font-bold hover:bg-[#b8254a]"
            >
              Submit Verified Review
            </button>
          </form>
        </div>
      </section>

      {/* FAQs */}
      <section className="px-4 sm:px-0 space-y-4 pt-10 mt-10 border-t border-[#1C1618]/10">
        <h2 className="text-xl font-extrabold text-[#1C1618]">
          Frequently Asked Questions About Setup
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PLATFORM_FAQS.slice(0, 4).map((faq) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl p-5 border border-[#1C1618]/10 space-y-1.5"
            >
              <h3 className="text-xs font-bold text-[#1C1618]">{faq.q}</h3>
              <p className="text-xs text-[#6E5D5F] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Similar Products Section */}
      {relatedProducts.length > 0 && (
        <section
          ref={similarSectionRef}
          id="similar-products"
          className="px-4 sm:px-0 space-y-4 pt-10 mt-10 border-t border-[#1C1618]/10"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1 h-6 rounded-full bg-[#D8315B]" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1618]">
              Similar Setups You May Like
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* 2. Exact Sticky Bottom Booking Action Bar (Matches Video 00:09 - 00:17) */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-white border-t border-[#1C1618]/12 shadow-[0_-6px_24px_rgba(0,0,0,0.08)] px-4 pt-2.5 pb-2">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Package Price */}
            <div>
              <span className="block text-[11px] text-[#6E5D5F] font-medium">Package price</span>
              <span className="text-xl sm:text-2xl font-extrabold text-[#1C1618] tabular-nums">
                ₹{liveOrderTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Right: WhatsApp Chat Box + Crimson "Book this setup ->" Button */}
            <div className="flex items-center gap-2.5">
              <a
                href={`https://wa.me/${websiteSettings.whatsappNumber || '918282025444'}?text=${encodeURIComponent(
                  `Hi ${websiteSettings.brandName}! I want to inquire about "${product.title}" (₹${baseCityDiscounted}) in ${selectedCity.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center px-3 py-1.5 rounded-xl border border-[#25D366]/50 bg-[#F0FDF4] text-[#1C1618] hover:bg-[#DCFCE7] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
                <span className="text-[10px] font-bold leading-tight mt-0.5">Chat</span>
              </a>

              <button
                type="button"
                onClick={handleBookThisSetupClick}
                className="px-6 sm:px-8 py-3.5 rounded-xl bg-[#C82333] text-white text-xs sm:text-sm font-extrabold hover:bg-[#a71d2a] transition-colors inline-flex items-center gap-2 shadow-md"
              >
                <span>Book this setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Micro Reassurance Line (Matches Video 00:09 & 00:15: "✓ Setup & delivery included • Date & time in cart") */}
          <div className="mt-1.5 pt-1 border-t border-[#1C1618]/6 flex items-center justify-center gap-2 text-[11px] font-semibold text-[#1B8E3E]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Setup & delivery included</span>
            <span className="text-[#6E5D5F]">•</span>
            <span className="text-[#555555]">Date & time in cart</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Add-Ons & Slot Confirmation Popup Modal */}
      {addOnModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 max-h-[90vh] flex flex-col justify-between shadow-2xl border border-[#1C1618]/10">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1618]/8">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#D8315B]">
                  Step 2 of 3 · Customize Your Celebration
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1C1618]">
                  Make It Extra Special with Add-Ons
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAddOnModalOpen(false)}
                className="p-2 rounded-xl bg-[#FAF7F5] text-[#6E5D5F] hover:text-[#1C1618]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#F5F2EE] rounded-xl my-3 overflow-x-auto shrink-0">
              {[
                'ALL',
                'Cakes & Florals',
                'Lighting & Neon',
                'Balloons & Props',
                'Photo & Keepsakes',
              ].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setAddOnFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                    addOnFilter === cat
                      ? 'bg-white text-[#1C1618] shadow-xs'
                      : 'text-[#6E5D5F] hover:text-[#1C1618]'
                  }`}
                >
                  {cat === 'ALL' ? 'All Add-Ons' : cat}
                </button>
              ))}
            </div>

            {/* Add-Ons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1">
              {addOns
                .filter(
                  (a) => a.isEnabled && (addOnFilter === 'ALL' || a.category === addOnFilter)
                )
                .map((addon) => {
                  const qty = selectedAddOns[addon.id] || 0;
                  return (
                    <div
                      key={addon.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                        qty > 0
                          ? 'border-[#D8315B] bg-[#FFF0F3]'
                          : 'border-[#1C1618]/10 bg-[#FAF7F5]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <SmartImage
                          src={addon.image}
                          alt={addon.title}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#1C1618] line-clamp-1">
                            {addon.title}
                          </p>
                          <p className="text-[11px] text-[#6E5D5F] line-clamp-1">
                            {addon.description}
                          </p>
                          <p className="text-xs font-extrabold text-[#D8315B] tabular-nums mt-0.5">
                            ₹{addon.price.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => updateAddOnQty(addon.id, 1)}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#D8315B]/30 text-xs font-bold text-[#D8315B] shrink-0"
                        >
                          + Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-white rounded-xl border border-[#D8315B] px-2.5 py-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => updateAddOnQty(addon.id, -1)}
                            className="text-[#D8315B]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold tabular-nums">{qty}</span>
                          <button
                            type="button"
                            onClick={() => updateAddOnQty(addon.id, 1)}
                            className="text-[#D8315B]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 mt-4 border-t border-[#1C1618]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#6E5D5F]">
                  Package (₹{baseCityDiscounted.toLocaleString('en-IN')}) + Add-Ons (₹
                  {addOnsTotal.toLocaleString('en-IN')})
                </p>
                <p className="text-xl font-extrabold text-[#1C1618] tabular-nums">
                  Total: ₹{liveOrderTotal.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => commitBookingToCart(false)}
                  className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-[#FAF7F5] border border-[#1C1618]/15 text-xs font-bold text-[#1C1618]"
                >
                  View in Cart
                </button>
                <button
                  type="button"
                  onClick={() => commitBookingToCart(true)}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#C82333] text-white text-xs font-extrabold hover:bg-[#a71d2a]"
                >
                  Proceed to Payment →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* High-Res Image Zoom Modal */}
      {zoomModalOpen && activeSlide !== TRUST_SLIDE_TOKEN && (
        <div
          onClick={() => setZoomModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
        >
          <div className="relative max-w-5xl w-full">
            <button
              type="button"
              onClick={() => setZoomModalOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-[#F4C2C2] flex items-center gap-1 text-xs font-semibold"
            >
              <X className="w-5 h-5" /> Close Zoom
            </button>
            <SmartImage
              src={activeSlide}
              alt={product.title}
              className="w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
