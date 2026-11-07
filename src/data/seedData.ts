import {
  AddOn,
  Category,
  City,
  Coupon,
  Decorator,
  Product,
  Review,
  WebsiteSetting,
} from '../types';

import heroBannerImg from '../assets/images/hero_festive_celebration_1793892771323.jpg';
import birthdayRoseGoldImg from '../assets/images/decor_birthday_rosegold_1793892772357.jpg';
import kidsThemeImg from '../assets/images/decor_kids_theme_1793892774203.jpg';
import romanticAnniversaryImg from '../assets/images/decor_romantic_anniversary_1793892775207.jpg';
import babyShowerImg from '../assets/images/decor_baby_shower_1793892775843.jpg';
import weddingHaldiImg from '../assets/images/decor_wedding_haldi_1793892777149.jpg';
import romanticRedRoomImg from '../assets/images/bd_romantic_red_room_1793894843571.jpg';
import jungleSafariKidsImg from '../assets/images/bd_jungle_safari_kids_1793894845234.jpg';
import carBootSurpriseImg from '../assets/images/bd_car_boot_surprise_1793894847226.jpg';
import cabanaTerraceImg from '../assets/images/bd_cabana_terrace_setup_1793894847583.jpg';
import welcomeBabyRingImg from '../assets/images/bd_welcome_baby_blue_pink_1793894849670.jpg';
import blackGoldMilestoneImg from '../assets/images/bd_black_gold_milestone_1793894849806.jpg';

// Real BalloonDekor CDN Assets + Local Bundled Fallbacks
export const ASSET_MANIFEST = {
  heroBanner: 'https://cdn.balloondekor.com/30/lush-floral-banner-decor.avif',
  birthdayRoseGold: 'https://cdn.balloondekor.com/14/1744720943222.webp',
  kidsTheme: 'https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp',
  romanticAnniversary: 'https://cdn.balloondekor.com/29/1784709508118-669326.webp',
  babyShower: 'https://cdn.balloondekor.com/26/1744709216881.webp',
  weddingHaldi: 'https://cdn.balloondekor.com/43/1746262234082.webp',
  romanticRedRoom: 'https://cdn.balloondekor.com/29/1744791701209.webp',
  jungleSafariKids: 'https://cdn.balloondekor.com/28/jungle-adventure-decoration-1785562694914-257877.webp',
  carBootSurprise: 'https://cdn.balloondekor.com/35/1739435443848.webp',
  cabanaTerrace: 'https://cdn.balloondekor.com/19/1753684185903.webp',
  welcomeBabyRing: 'https://cdn.balloondekor.com/20/welcome-baby-princess-decoration.webp',
  blackGoldMilestone: 'https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp',
  // Official BalloonDekor Banners & Category Cards
  kidsBirthdayBanner: 'https://cdn.balloondekor.com/22/kids-banner-for-birthday.webp',
  diwaliFestiveBanner: 'https://cdn.balloondekor.com/30/lush-floral-banner-decor.avif',
  corporateBanner: 'https://cdn.balloondekor.com/images/30/fe8b04d6-e90b-468a-a37b-7843ec2f801a.webp',
  trustSlideGraphic: 'https://cdn.balloondekor.com/13/1782992365220-289031.webp',
  // Local fallback bundle map
  localHeroFallback: heroBannerImg,
  localBirthdayFallback: birthdayRoseGoldImg,
};

const LEGACY_PATH_MAP: Record<string, string> = {
  '/src/assets/images/hero_festive_celebration_1793892771323.jpg': heroBannerImg,
  '/src/assets/images/decor_birthday_rosegold_1793892772357.jpg': birthdayRoseGoldImg,
  '/src/assets/images/decor_kids_theme_1793892774203.jpg': kidsThemeImg,
  '/src/assets/images/decor_romantic_anniversary_1793892775207.jpg': romanticAnniversaryImg,
  '/src/assets/images/decor_baby_shower_1793892775843.jpg': babyShowerImg,
  '/src/assets/images/decor_wedding_haldi_1793892777149.jpg': weddingHaldiImg,
  '/src/assets/images/bd_romantic_red_room_1793894843571.jpg': romanticRedRoomImg,
  '/src/assets/images/bd_jungle_safari_kids_1793894845234.jpg': jungleSafariKidsImg,
  '/src/assets/images/bd_car_boot_surprise_1793894847226.jpg': carBootSurpriseImg,
  '/src/assets/images/bd_cabana_terrace_setup_1793894847583.jpg': cabanaTerraceImg,
  '/src/assets/images/bd_welcome_baby_blue_pink_1793894849670.jpg': welcomeBabyRingImg,
  '/src/assets/images/bd_black_gold_milestone_1793894849806.jpg': blackGoldMilestoneImg,
};

export function resolveAssetUrl(rawUrl?: string): string {
  if (!rawUrl) return ASSET_MANIFEST.birthdayRoseGold;
  const trimmed = rawUrl.trim();
  if (LEGACY_PATH_MAP[trimmed]) {
    return LEGACY_PATH_MAP[trimmed];
  }
  for (const [legacyKey, bundledUrl] of Object.entries(LEGACY_PATH_MAP)) {
    const fileName = legacyKey.split('/').pop();
    if (fileName && trimmed.endsWith(fileName)) {
      return bundledUrl;
    }
  }
  return trimmed;
}

export const TIME_SLOTS = [
  '09:00 AM - 12:00 PM',
  '12:00 PM - 03:00 PM',
  '03:00 PM - 06:00 PM',
  '06:00 PM - 09:00 PM',
  '09:00 PM - 11:30 PM',
];

export const PLATFORM_FAQS: { q: string; a: string }[] = [
  {
    q: 'Are setup and delivery charges included in the package price?',
    a: 'Yes! All prices shown on Bindu flower are 100% transparent and all-inclusive of materials, doorstep delivery, and on-site installation by our trained decorator crew.',
  },
  {
    q: 'Can I customize the balloon colors or foil banner text?',
    a: 'Absolutely! You can select your preferred color palette or add special instructions before booking, or message our team on WhatsApp (+91 99835 62406) for custom themes.',
  },
  {
    q: 'Will the decoration damage my walls or paint?',
    a: 'No. Our trained decorators use damage-free 3M Command hooks, removable paper masking tape, and freestanding ring/arch stands so your walls remain spotless.',
  },
  {
    q: 'How early should I book my slot, and is same-day booking available?',
    a: 'We recommend booking 24–48 hours in advance for peak slots, but we also offer express same-day decoration within 3–4 hours across Jaipur, Rajasthan & 70+ cities.',
  },
  {
    q: 'What is the cancellation and rescheduling policy?',
    a: 'Rescheduling is 100% free up to 12 hours before your scheduled time slot. Cancellations made 24+ hours before the slot receive a full refund.',
  },
];

const NOW_ISO = '2026-11-05T08:00:00.000Z';

export const SEED_WEBSITE_SETTINGS: WebsiteSetting = {
  id: 'global',
  brandName: 'Bindu flower',
  announcementText: 'Happy Diwali ✦ A little light. A lot of celebration.',
  supportPhone: '+91 99835 62406',
  whatsappNumber: '919983562406',
  supportEmail: 'support@binduflower.com',
  advancePercentage: 40,
  allowAdvancePayment: true,
  cancellationPolicySummary:
    '100% free rescheduling up to 12 hours before slot. Full refund on cancellations made 24+ hours prior to event slot.',
  updatedAt: NOW_ISO,
};

export const SEED_CITIES: City[] = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    slug: 'jaipur',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 18,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    slug: 'udaipur',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 14,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'jodhpur',
    name: 'Jodhpur',
    slug: 'jodhpur',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 14,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'kota',
    name: 'Kota',
    slug: 'kota',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 12,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'ajmer',
    name: 'Ajmer',
    slug: 'ajmer',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 12,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'bikaner',
    name: 'Bikaner',
    slug: 'bikaner',
    state: 'Rajasthan',
    priceMultiplier: 1.0,
    dailySlotCapacity: 10,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    state: 'Delhi / Noida / Gurugram',
    priceMultiplier: 1.0,
    dailySlotCapacity: 18,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    priceMultiplier: 1.0,
    dailySlotCapacity: 16,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    slug: 'bengaluru',
    state: 'Karnataka',
    priceMultiplier: 1.0,
    dailySlotCapacity: 16,
    sameDayCutoffHour: 19,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    priceMultiplier: 1.0,
    dailySlotCapacity: 14,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'pune',
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    priceMultiplier: 1.0,
    dailySlotCapacity: 12,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'chennai',
    name: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    priceMultiplier: 1.0,
    dailySlotCapacity: 12,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    priceMultiplier: 1.0,
    dailySlotCapacity: 12,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    priceMultiplier: 1.0,
    dailySlotCapacity: 10,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    slug: 'chandigarh',
    state: 'Punjab / UT',
    priceMultiplier: 1.0,
    dailySlotCapacity: 10,
    sameDayCutoffHour: 18,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    slug: 'lucknow',
    state: 'Uttar Pradesh',
    priceMultiplier: 1.0,
    dailySlotCapacity: 9,
    sameDayCutoffHour: 17,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'bhopal',
    name: 'Bhopal',
    slug: 'bhopal',
    state: 'Madhya Pradesh',
    priceMultiplier: 1.0,
    dailySlotCapacity: 9,
    sameDayCutoffHour: 17,
    blockedDatesJson: '[]',
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];

// 13 Distinct Categories Matching BalloonDekor.com
export const SEED_CATEGORIES: Category[] = [
  {
    id: 'birthday',
    slug: 'birthday',
    name: 'Birthday Decoration',
    description:
      'Birthday balloon decoration at home across India. Choose from simple pastel arches, rose gold backdrops, and boho setups.',
    bannerImage: 'https://cdn.balloondekor.com/33/birthday-decoration-d67f374a-0151-409d-96ea-36e9527e0ffc.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'simple-birthday', name: 'Simple Home Decor', slug: 'simple-birthday' },
      { id: 'rose-gold-birthday', name: 'Rose Gold Themes', slug: 'rose-gold-birthday' },
      { id: 'arch-backdrop', name: 'Arch & Ring Backdrops', slug: 'arch-backdrop' },
      { id: 'boho-birthday', name: 'Boho & Pastel Themes', slug: 'boho-birthday' },
    ]),
    isEnabled: true,
    sortOrder: 1,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'kids-themes',
    slug: 'kids-themes',
    name: 'Kids Birthday Decoration',
    description:
      'Fun-filled character themes for every celebration: Cocomelon, Baby Shark, Boss Baby, Jungle Safari, Frozen, and Mermaid.',
    bannerImage: 'https://cdn.balloondekor.com/33/kids-birthday-decoration-4b6bce2b-e65d-40fa-bdea-3f1367688305.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'cocomelon-theme', name: 'Cocomelon Theme', slug: 'cocomelon-theme' },
      { id: 'baby-shark', name: 'Baby Shark Theme', slug: 'baby-shark' },
      { id: 'boss-baby', name: 'Boss Baby Theme', slug: 'boss-baby' },
      { id: 'jungle-safari', name: 'Jungle Theme', slug: 'jungle-safari' },
      { id: 'frozen-princess', name: 'Frozen Theme', slug: 'frozen-princess' },
      { id: 'mermaid-theme', name: 'Mermaid Theme', slug: 'mermaid-theme' },
    ]),
    isEnabled: true,
    sortOrder: 2,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'newborn-welcome',
    slug: 'newborn-welcome',
    name: 'Welcome Baby Decoration',
    description:
      'Heartwarming newborn homecoming balloon arches, baby girl princess themes, and baby boy welcome setups.',
    bannerImage: 'https://cdn.balloondekor.com/33/newborn-welcome.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'baby-girl-welcome', name: 'Welcome Baby Girl', slug: 'baby-girl-welcome' },
      { id: 'baby-boy-welcome', name: 'Welcome Baby Boy', slug: 'baby-boy-welcome' },
      { id: 'naming-ceremony', name: 'Naming Ceremony', slug: 'naming-ceremony' },
    ]),
    isEnabled: true,
    sortOrder: 3,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'baby-shower',
    slug: 'baby-shower',
    name: 'Baby Shower Decoration',
    description:
      'Oh Baby neon backdrops, Mom-to-Be ring setups, floral baby shower stages, and teddy bear gender reveal setups.',
    bannerImage: 'https://cdn.balloondekor.com/33/baby-shower-decoration-1ba3a3a3-d2eb-40e6-98bd-aed4eb907984.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'oh-baby-ring', name: 'Oh Baby Ring Setups', slug: 'oh-baby-ring' },
      { id: 'mom-to-be', name: 'Mom To Be Backdrops', slug: 'mom-to-be' },
      { id: 'gender-reveal', name: 'Teddy & Gender Reveal', slug: 'gender-reveal' },
    ]),
    isEnabled: true,
    sortOrder: 4,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'anniversary',
    slug: 'anniversary',
    name: 'Romantic Anniversary Decoration',
    description:
      'Red heart bedroom surprises, rose-petal pathways, warm fairy lights, and luxury anniversary ring backdrops.',
    bannerImage: 'https://cdn.balloondekor.com/22/1783502314282-483479.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'anniversary-room', name: 'Bedroom Surprises', slug: 'anniversary-room' },
      { id: 'anniversary-backdrop', name: 'Anniversary Ring Backdrops', slug: 'anniversary-backdrop' },
    ]),
    isEnabled: true,
    sortOrder: 5,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'wedding-suit',
    slug: 'wedding-suit',
    name: 'Wedding, Haldi & First Night',
    description:
      'From Haldi and Mehndi marigold stages to Bride Welcome and romantic First Night bedroom decor.',
    bannerImage: 'https://cdn.balloondekor.com/33/wedding-decoration-0c8b0952-fe10-44cb-ac91-8f640239beaf.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'haldi-mehndi', name: 'Haldi & Mehndi Decor', slug: 'haldi-mehndi' },
      { id: 'bride-welcome', name: 'Bride Welcome', slug: 'bride-welcome' },
      { id: 'first-night', name: 'First Night Decor', slug: 'first-night' },
    ]),
    isEnabled: true,
    sortOrder: 6,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'bachelorette',
    slug: 'bachelorette',
    name: 'Bachelorette Party',
    description:
      'Glamorous Bride-to-Be foil setups, rose gold bachelorette wall arches, and shimmer sequin rings.',
    bannerImage: 'https://cdn.balloondekor.com/33/bachelorette-decoration-83f7bd3a-a52d-4755-b8a5-4b6d3126f5e0.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'bride-to-be', name: 'Bride To Be Setups', slug: 'bride-to-be' },
      { id: 'bachelorette-ring', name: 'Bachelorette Ring Arches', slug: 'bachelorette-ring' },
    ]),
    isEnabled: true,
    sortOrder: 7,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'balloon-bouquets',
    slug: 'balloon-bouquets',
    name: 'Balloon Hampers & Bouquets',
    description:
      'Delivered ready-to-gift helium-style balloon hampers, golden noir bouquets, and romantic surprise stands.',
    bannerImage: 'https://cdn.balloondekor.com/48/cute-happy-birthday-balloon-bouquet.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'birthday-bouquet', name: 'Birthday Bouquets', slug: 'birthday-bouquet' },
      { id: 'romantic-bouquet', name: 'Romantic & Proposal Bouquets', slug: 'romantic-bouquet' },
    ]),
    isEnabled: true,
    sortOrder: 8,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'car-decoration',
    slug: 'car-decoration',
    name: 'Car Decoration & Car Boot',
    description:
      'Luxury fresh rose bridal car decoration for weddings and surprise car boot trunk setups.',
    bannerImage: 'https://cdn.balloondekor.com/33/wedding-car-decoration-f5faedd9-d4b3-4072-8633-ab69c9522db0.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'wedding-car-decor', name: 'Wedding Car Decoration', slug: 'wedding-car-decor' },
      { id: 'car-boot-decor', name: 'Car Boot Surprise', slug: 'car-boot-decor' },
    ]),
    isEnabled: true,
    sortOrder: 9,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'corporate-events',
    slug: 'corporate-events',
    name: 'Shop and Office Decor',
    description:
      'Cafe opening entrance gates, showroom inauguration balloon pillars, and corporate gala stage setups.',
    bannerImage: 'https://cdn.balloondekor.com/33/office-decoration-b84c3312-f4cd-4baf-8d1f-b03d28c61242.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'shop-opening', name: 'Shop & Cafe Opening', slug: 'shop-opening' },
      { id: 'corporate-gala', name: 'Corporate Office Gala', slug: 'corporate-gala' },
    ]),
    isEnabled: true,
    sortOrder: 10,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'halloween-decor',
    slug: 'halloween-decor',
    name: 'Spooky Halloween Decorations',
    description:
      'Decor to Die For — spooky orange, black, and ghost theme Halloween party balloon setups.',
    bannerImage: 'https://cdn.balloondekor.com/22/haloween-category-image.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'halloween-party', name: 'Halloween Home & Ring Setups', slug: 'halloween-party' },
    ]),
    isEnabled: true,
    sortOrder: 11,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'festive-special',
    slug: 'festive-special',
    name: 'Diwali, Annaprashan & Bindu Flower',
    description:
      'Traditional marigold floral torans, Teen Patti Diwali party decor, Annaprashan stages, and Bindu Flower artistry.',
    bannerImage: 'https://cdn.balloondekor.com/22/diwali-decor.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'diwali-decor', name: 'Diwali Decoration', slug: 'diwali-decor' },
      { id: 'annaprashan-decor', name: 'Annaprashan & Marigold', slug: 'annaprashan-decor' },
      { id: 'bindu-flower-decor', name: 'Bindu Flower Special', slug: 'bindu-flower-decor' },
    ]),
    isEnabled: true,
    sortOrder: 12,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'romantic-surprises',
    slug: 'romantic-surprises',
    name: 'Canopy & Proposal Decorations',
    description:
      'Dreamy net canopy setups, Marry Me proposal backdrops, and intimate bedroom celebrations.',
    bannerImage: 'https://cdn.balloondekor.com/22/1783500843904-747603.webp',
    subcategoriesJson: JSON.stringify([
      { id: 'canopy-setup', name: 'Canopy Decoration', slug: 'canopy-setup' },
      { id: 'marry-me-proposal', name: 'Proposal Decoration', slug: 'marry-me-proposal' },
    ]),
    isEnabled: true,
    sortOrder: 13,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];


// Helper to build a complete Product record with real BalloonDekor.com data and zero duplication
function makeProduct(p: {
  id: string;
  slug: string;
  title: string;
  categoryId: string;
  subcategoryId: string;
  discountedPrice: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  primaryImage: string;
  galleryImages?: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  setupDuration?: string;
  description: string;
  includedItems: string[];
  excludedItems?: string[];
  themeColors?: string[];
}): Product {
  const gallery = p.galleryImages && p.galleryImages.length > 0 ? p.galleryImages : [p.primaryImage];
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    categoryId: p.categoryId,
    subcategoryId: p.subcategoryId,
    originalPrice: p.originalPrice,
    discountedPrice: p.discountedPrice,
    rating: p.rating,
    reviewsCount: p.reviewsCount,
    setupDuration: p.setupDuration || "1 - 1.5 Hours",
    primaryImage: p.primaryImage,
    galleryImages: JSON.stringify(gallery),
    includedItems: JSON.stringify(
      p.includedItems.length > 0
        ? p.includedItems
        : [
            "All Materials, Setup & Decor Included",
            "150–200 High-Grade Metallic & Pastel Balloons",
            "Occasion Theme Foil Banner / Neon Sign (as shown in photo)",
            "Professional On-Site Installation by Trained Decorator Crew",
          ]
    ),
    excludedItems: JSON.stringify(
      p.excludedItems && p.excludedItems.length > 0
        ? p.excludedItems
        : [
            "Cake & Tableware (available separately in Add-Ons)",
            "Rental stands/LED marquee letters are collected the next day",
          ]
    ),
    instructions: JSON.stringify([
      "Please keep a plug point within 6–8 feet if your package includes fairy lights or neon signs.",
      "We use removable, wall-safe 3M hooks and paper tape.",
      "Except balloons, rental props (stands, neon lights, tables) are collected the next day.",
    ]),
    themeColors: JSON.stringify(
      p.themeColors && p.themeColors.length > 0
        ? p.themeColors
        : ["As Shown in Photo", "Rose Gold & White", "Gold & White", "Pastel Pink & White"]
    ),
    isTrending: Boolean(p.isFeatured || p.isBestseller || p.reviewsCount >= 90),
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  };
}

// ============================================================================
// 88 UNIQUE PRODUCTS FROM BALLOONDEKOR.COM (REAL PHOTOS, DESCRIPTIONS & INCLUSIONS)
// ============================================================================
export const SEED_PRODUCTS: Product[] = [
  makeProduct({
      "id": "prod-simple-balloon-decor-for-home",
      "slug": "simple-balloon-decor-for-home",
      "title": "Simple Balloon Decor for Home",
      "categoryId": "birthday",
      "subcategoryId": "simple-birthday",
      "discountedPrice": 1499,
      "originalPrice": 1999,
      "rating": 4.9,
      "reviewsCount": 313,
      "primaryImage": "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680249-529705.webp",
          "https://cdn.balloondekor.com/14/simple-balloon-decor-for-home-1785476680693-701604.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Balloon Decor for Home offers an easy, no-fuss birthday setup with fifty balloons on the ceiling, fifty more on the floor, a Happy Birthday foil, and frill ribbons for a neat finish. It's made for birthdays and works well in a living room, bedroom, or any wall corner you'd like to turn into a small party spot. Pick from black-white or silver-white-black for a clean look, blue-white and pink-blue for a child's room, or multicolors if you want something more playful. It's an affordable option that still gives the space a proper celebratory feel. Add balloon clusters near the doorway for extra coverage. Order this setup for a quick, budget-friendly birthday decoration at home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on Ceiling",
          "50 Balloons  on floor",
          "Happy Birthday Foil",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-rose-gold-birthday-home-decor",
      "slug": "rose-gold-birthday-home-decor",
      "title": "Rose Gold Birthday Home Decor",
      "categoryId": "birthday",
      "subcategoryId": "rose-gold-birthday",
      "discountedPrice": 1999,
      "originalPrice": 2499,
      "rating": 4.9,
      "reviewsCount": 352,
      "primaryImage": "https://cdn.balloondekor.com/14/1744720943222.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/1744720943222.webp",
          "https://cdn.balloondekor.com/14/1744720942871.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Rose Gold Birthday Home Decor fills the space with fifty balloons on the ceiling and eighty more across the floor, joined by a Happy Birthday foil, two star foils, and a single warm fairy light for a soft glow. Built around a rose gold theme, it works beautifully in a living room, bedroom, or any wall you'd like turned into a birthday backdrop. The fairy light adds a gentle sparkle once evening sets in without feeling overly bright. It's simple enough for an everyday birthday yet still photo-ready for cake cutting. Pair it with a small dessert table or balloon cluster near the entrance. Order this decoration for a soft, rose gold birthday look at home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on Ceiling",
          "50 Balloons on Floor",
          "Happy Birthday Foil",
          "2 Star Foil",
          "One Fairy Light"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-adorable-birthday-arch-backdrop",
      "slug": "adorable-birthday-arch-backdrop",
      "title": "Adorable Birthday Arch Backdrop",
      "categoryId": "birthday",
      "subcategoryId": "arch-backdrop",
      "discountedPrice": 2499,
      "originalPrice": 3299,
      "rating": 5,
      "reviewsCount": 374,
      "primaryImage": "https://cdn.balloondekor.com/14/1744890426934.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/1744890426934.webp",
          "https://cdn.balloondekor.com/14/1744890426561.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Adorable Birthday Arch Backdrop wraps the wall in a 150-balloon arch, a Happy Birthday bunting, two soft fairy lights, and twenty more balloons scattered across the floor for a fuller look. It's designed for birthdays and works nicely in a living room, bedroom, or any wall corner you'd like turned into a party backdrop. Choose from peach-white-golden or pink-white for a gentle, sweet look, or go bolder with silver-white-black and red-black. The fairy lights add a nice touch once the room lights are dimmed for the cake-cutting moment. It's a compact yet complete setup that suits both kids and adult birthdays alike. Order this backdrop for a charming, ready-to-go birthday decoration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "150 Balloons Arch",
          "Happy Birthday Bunting",
          "2 Fairy Lights",
          "20 Balloons on floor"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-blush-glow-birthday-theme",
      "slug": "blush-glow-birthday-theme",
      "title": "Blush & Glow Birthday Theme",
      "categoryId": "birthday",
      "subcategoryId": "rose-gold-birthday",
      "discountedPrice": 2199,
      "originalPrice": 2399,
      "rating": 4.9,
      "reviewsCount": 287,
      "primaryImage": "https://cdn.balloondekor.com/14/1748087900974.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/1748087900974.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Blush & Glow Birthday Theme is all about soft, romantic tones, built around 180 balloons on the wall, 20 more on the floor, two foil balloons, and a Happy Birthday foil banner. You can choose between a warm white-golden palette or a sweet pink-white combination, both suited to a living room, bedroom, or any small space you want to turn into a pretty party corner. The soft blush styling makes it a lovely pick for a birthday celebration, especially for someone who prefers understated elegance over bold theme decor. Add fairy lights, a name banner, or balloon numbers to complete the look. Opt for this blush and glow setup for a birthday that feels effortlessly pretty.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "180 Pc Balloon On Wall ",
          "20 Pc Balloon On Floor",
          "2 Pc Foil",
          "Happy Birthday Foil Banner "
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-boho-theme-birthday-decoration",
      "slug": "boho-theme-birthday-decoration",
      "title": "Boho Theme Birthday Decoration",
      "categoryId": "birthday",
      "subcategoryId": "boho-birthday",
      "discountedPrice": 8499,
      "originalPrice": 9999,
      "rating": 4.9,
      "reviewsCount": 357,
      "primaryImage": "https://cdn.balloondekor.com/14/boho-theme-birthday-decoration-2.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/boho-theme-birthday-decoration-2.webp",
          "https://cdn.balloondekor.com/14/boho-theme-birthday-decoration.webp"
      ],
      "isFeatured": true,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This boho theme birthday decoration pairs a balloon ring with dry pampas grass for a soft, earthy look that feels different from the usual bright party decor. A Happy Birthday neon sign adds a festive glow, and fifty extra balloons fill in the space around the ring for a fuller finish. The muted, natural styling suits a living room, terrace, or hall hosting a birthday celebration with a relaxed, aesthetic vibe. Bring your own cake table to sit beneath the ring for the perfect boho-styled centrepiece. Add macrame hangings or rattan accents nearby to lean further into the theme. Choose this boho decoration for a birthday that feels effortlessly stylish and calm.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Balloon Ring Decoration",
          "Dry Pampas Decoration",
          "Happy Birthday Neon",
          "50 Extra Balloons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Cake Table"
      ]
  }),
  makeProduct({
      "id": "prod-rosy-ring-premium-backdrop",
      "slug": "rosy-ring-premium-backdrop",
      "title": "Rosy Ring Premium Backdrop",
      "categoryId": "birthday",
      "subcategoryId": "arch-backdrop",
      "discountedPrice": 7499,
      "originalPrice": 7999,
      "rating": 4.8,
      "reviewsCount": 113,
      "primaryImage": "https://cdn.balloondekor.com/14/rosy-ring-premium-backdrop-3.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/rosy-ring-premium-backdrop-3.webp",
          "https://cdn.balloondekor.com/14/rosy-ring-premium-backdrop-2.webp",
          "https://cdn.balloondekor.com/14/rosy-ring-premium-backdrop.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This premium ring backdrop makes a bold statement with 300 balloons covering its circular frame, a Happy Birthday neon light, two round cake tables, and fifty extra balloons you can place on the floor or ceiling for added coverage. It suits both birthdays and anniversaries, working well in banquet halls, large living rooms, or event spaces where you want a striking circular focal point. Choose from palettes like black and silver, multicolors, or rose gold and pink to match your celebration. Fresh flowers aren't included, so those can be arranged separately if you want a floral touch. Book this ring backdrop for a celebration that photographs beautifully from every angle.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "300 Balloons on the Backdrop",
          "Happy Birthday Neon Light",
          "Two Circular Round Cake Tables",
          "50 Extra Balloons on Floor or Ceiling"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Flowers Not Included"
      ]
  }),
  makeProduct({
      "id": "prod-ceiling-balloon-decoration-for-home",
      "slug": "ceiling-balloon-decoration-for-home",
      "title": "Ceiling Balloon Decoration for Home",
      "categoryId": "birthday",
      "subcategoryId": "simple-birthday",
      "discountedPrice": 2999,
      "originalPrice": 3499,
      "rating": 4.8,
      "reviewsCount": 114,
      "primaryImage": "https://cdn.balloondekor.com/14/1738156651529.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/1738156651529.webp",
          "https://cdn.balloondekor.com/14/1738156651988.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This home decoration goes big on volume, with 100 balloons filling the ceiling and another 100 spread across the floor and wall, joined by a Happy Birthday foil and frill ribbons for a finished look. It's ideal when you want a room to feel completely taken over by balloons for a birthday celebration, whether that's a bedroom, living room, or hall. Choose from palettes like black and silver, golden silver and black, or peach white and golden to match your theme. Curtains aren't included, so the balloons remain the star of the show. Add a name foil or age foil for a more personal touch. Book this ceiling-to-floor balloon decoration for maximum birthday impact.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "100 Balloons on Ceiling",
          "Happy Birthday Foil",
          "100 Balloons on Floor and Wall",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Curtains"
      ]
  }),
  makeProduct({
      "id": "prod-birthday-decoration-at-home",
      "slug": "birthday-decoration-at-home",
      "title": "Birthday Decoration at Home",
      "categoryId": "birthday",
      "subcategoryId": "simple-birthday",
      "discountedPrice": 1599,
      "originalPrice": 1799,
      "rating": 4.9,
      "reviewsCount": 554,
      "primaryImage": "https://cdn.balloondekor.com/14/birthday-decoration-at-home-1785477350622-675428.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/birthday-decoration-at-home-1785477350622-675428.webp",
          "https://cdn.balloondekor.com/14/birthday-decoration-at-home-1785477350242-231135.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This birthday decoration at home keeps things simple and pocket-friendly, with forty balloons floated on the ceiling and fifty to sixty more spread across the floor for a full, festive room. A Happy Birthday foil balloon and ribbons finish the look without any extra fuss. It's an easy fit for a bedroom, living room, or any small space you want turned into a party corner for the day. With colour choices ranging from blue-pink and multicolours to red-gold, red-white, and white-golden, there's something to suit almost anyone's taste. Add balloon numbers or a name banner if you'd like a bit more personalisation. Order this simple room decoration for a birthday that still feels properly celebrated.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "40 Balloons on Ceiling",
          "50-60 Balloons on Floor",
          "Happy Birthday Foil",
          "Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ],
      "themeColors": [
          "Black, White",
          "Blue, White",
          "Rose Gold, White",
          "Gold, White"
      ]
  }),
  makeProduct({
      "id": "prod-blue-balloon-decoration",
      "slug": "blue-balloon-decoration",
      "title": "Blue Balloon Decoration",
      "categoryId": "kids-themes",
      "subcategoryId": "boss-baby",
      "discountedPrice": 2399,
      "originalPrice": 2799,
      "rating": 4.9,
      "reviewsCount": 485,
      "primaryImage": "https://cdn.balloondekor.com/28/blue-balloon-decoration-1785563300915-625138.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/blue-balloon-decoration-1785563300915-625138.webp",
          "https://cdn.balloondekor.com/28/blue-balloon-decoration-1785563300639-867636.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Despite its name, Blue Balloon Decoration isn't locked into just one colour; it includes a 160-balloon arch, a Happy Birthday banner, a balloon pillar topped with an age foil, and extra balloons scattered across the floor for a complete party look. It's a great fit for a living room, bedroom, or any corner of the house turned into a celebration zone for your child's birthday. You can choose from palettes like blue-white-silver, gold-white, or orange-white-green depending on what matches your child's taste best. Add superhero capes, cartoon cutouts, or a name foil for extra personality. This one works well for birthdays or a small family get-together. Book it today and let us handle the setup.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Balloon Arch of 160 Balloons",
          "Happy Birthday Banner",
          "Balloon Pillar of 20 Balloons with Age Foil on Top",
          "20 Balloons on Floor"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-simple-balloon-decoration-at-home",
      "slug": "simple-balloon-decoration-at-home",
      "title": "Simple Balloon Decoration at Home",
      "categoryId": "kids-themes",
      "subcategoryId": "baby-shark",
      "discountedPrice": 2299,
      "originalPrice": 2499,
      "rating": 5,
      "reviewsCount": 482,
      "primaryImage": "https://cdn.balloondekor.com/28/1752493028961.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/1752493028961.webp",
          "https://cdn.balloondekor.com/28/1752493028664.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Balloon Decoration at Home combines a 150-balloon arch with a Happy Birthday banner, a golden shimmer curtain backdrop, and ribbons for a neat, glimmering finish. The shimmer curtain adds a bit of sparkle behind the balloon arch, making the setup feel more polished than a plain balloon arrangement while still being simple to put together. It suits a living room, bedroom, or small hall for a birthday celebration at home, and works nicely for a child's party despite its simple, adaptable styling. Add balloon numbers or a name cutout for a personal touch. Pick this simple setup for an easy, at-home birthday decoration that still looks festive.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "150 Balloon Arch",
          "Happy Birthday Banner",
          "Golden Shimmer Curatin",
          "Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-colorful-balloon-decoration",
      "slug": "colorful-balloon-decoration",
      "title": "Colorful Balloon Decoration",
      "categoryId": "kids-themes",
      "subcategoryId": "cocomelon-theme",
      "discountedPrice": 1799,
      "originalPrice": 2099,
      "rating": 4.9,
      "reviewsCount": 411,
      "primaryImage": "https://cdn.balloondekor.com/14/colorful-balloon-decoration-1785564150106-550701.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/colorful-balloon-decoration-1785564150106-550701.webp",
          "https://cdn.balloondekor.com/14/colorful-balloon-decoration-1785564149654-147889.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Colorful Balloon Decoration fills the room generously with seventy balloons on the ceiling and eighty more across the floor, anchored by a Happy Birthday foil balloon and frill ribbon detailing. It's a straightforward, high-volume balloon setup without a backdrop, making the whole room feel part of the celebration rather than just one wall. This works well for both adult and kids' birthdays, and suits a living room, hall, or bedroom you want to feel completely transformed. Choose from red-green-white, golden-silver-black, or red-green-golden depending on the age and taste of the birthday person. It pairs nicely with a simple cake table set up in the middle of the room. Book this decoration for a room that feels fully festive.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Happy Birthday Foil",
          "70 Balloons on Ceiling",
          "80 Balloons on Floor",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-jungle-adventure-decoration",
      "slug": "jungle-adventure-decoration",
      "title": "Jungle Adventure Decoration",
      "categoryId": "kids-themes",
      "subcategoryId": "jungle-safari",
      "discountedPrice": 3999,
      "originalPrice": 4599,
      "rating": 4.8,
      "reviewsCount": 398,
      "primaryImage": "https://cdn.balloondekor.com/28/jungle-adventure-decoration-1785562694914-257877.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/jungle-adventure-decoration-1785562694914-257877.webp",
          "https://cdn.balloondekor.com/28/jungle-adventure-decoration-1785562694454-464744.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Jungle Adventure Decoration is anchored by a customized 5x5 foot flex on the wall, joined by six animal foil balloons, a 200-balloon arch, and fifty more balloons across the ceiling and floor. It's a fuller jungle-themed setup for a kids birthday, working well in a living room or hall with enough wall space for the printed flex to stand out. Colour options include darkblue-lightblue-white, multicolors, orange-white-green, and red-green-golden, all of which suit an earthy jungle palette nicely. Toy animals or leaf garlands scattered around would round out the adventure theme. Book this decoration and send your child on a jungle adventure for their birthday.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Customized Flex (5*5 Feet) on wall",
          "6 Animal Foil Balloon",
          "Balloon Arch of 200 Balloons",
          "20 Balloons on Ceiling",
          "30 Balloons on Floor",
          "Frill Ribbon"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-basic-cocomelon-setup",
      "slug": "basic-cocomelon-setup",
      "title": "Basic Cocomelon Setup",
      "categoryId": "kids-themes",
      "subcategoryId": "cocomelon-theme",
      "discountedPrice": 1999,
      "originalPrice": 2399,
      "rating": 4.8,
      "reviewsCount": 373,
      "primaryImage": "https://cdn.balloondekor.com/28/basic-cocomelon-setup-1785564330336-921652.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/basic-cocomelon-setup-1785564330336-921652.webp",
          "https://cdn.balloondekor.com/28/basic-cocomelon-setup-1785564330126-766810.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "If your little one is obsessed with Cocomelon, this basic setup brings the theme home with a 70-balloon arch, two star foil balloons, two round Cocomelon foils, one Cocomelon character foil, a Happy Birthday banner, and balloons scattered across the floor. It's a compact, budget-friendly option that still fills up a living room or bedroom corner nicely for a kids birthday celebration. Choose from color combinations like blue-white-silver, peach-white-golden, or purple-pink-white to keep the balloon shades cheerful and coordinated. Pair it with a Cocomelon cake topper or a few extra character cutouts for a more complete theme. Book this setup and give your toddler a party they'll love.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Happy Birthday Banner",
          "2 Star Foil Balloons",
          "2 Cocomelon Round Foil Balloons",
          "1 Cocomelon Foil",
          "Balloon Arch of 70 Balloons",
          "30 Balloons on Floor"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-balloon-arch-setup",
      "slug": "balloon-arch-setup",
      "title": "Balloon Arch Setup",
      "categoryId": "kids-themes",
      "subcategoryId": "mermaid-theme",
      "discountedPrice": 2099,
      "originalPrice": 2499,
      "rating": 4.9,
      "reviewsCount": 387,
      "primaryImage": "https://cdn.balloondekor.com/14/balloon-arch-setup.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/balloon-arch-setup.webp",
          "https://cdn.balloondekor.com/14/balloon-arch-setup-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This Balloon Arch Setup keeps the focus on one big, beautiful centerpiece: a 180-balloon arch mounted on the wall, twenty extra balloons scattered on the floor, and a Happy Birthday banner strung across the top. Its clean, uncluttered look makes it a great fit for a living room, hall, or society clubhouse for a kids birthday party. Since the design suits both boys and girls, you can choose the balloon colours from options like gold-white, red-gold, or silver-white-black to match your child's personality. Add on a name foil or a few themed props if you want to build it up further. Get in touch to book this arch for your child's next birthday.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Balloon Arch Setup on the Wall with 180 Balloons",
          "20 Extra Balloons for the Floor",
          "HBD Foil",
          "Name Foil Upto 6 Letter"
      ],
      "excludedItems": [
          "Teddy Bear",
          "Plants"
      ]
  }),
  makeProduct({
      "id": "prod-jungle-theme-1st-birthday-decor",
      "slug": "jungle-theme-1st-birthday-decor",
      "title": "Jungle Theme 1st Birthday Decor",
      "categoryId": "kids-themes",
      "subcategoryId": "jungle-safari",
      "discountedPrice": 14999,
      "originalPrice": 17599,
      "rating": 4.9,
      "reviewsCount": 188,
      "primaryImage": "https://cdn.balloondekor.com/images/28/e4a50ee2-7274-47f6-bccd-02d1fe75e494.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/images/28/e4a50ee2-7274-47f6-bccd-02d1fe75e494.webp",
          "https://cdn.balloondekor.com/images/28/59bd6632-cde3-4175-9a39-f3c94ac44651.webp",
          "https://cdn.balloondekor.com/images/28/44f6c459-32a0-4767-a886-475658624f0c.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Jungle Theme 1st Birthday Decor is built for that milestone first birthday, with three customised flex backdrops, 350 balloons across the display, four animal cutouts, name and number LED lights, three cake tables, and two focus lights. This larger setup suits a living room, hall, or banquet space hosting a bigger gathering of family and friends for the occasion. The animal cutouts and layered LED lighting make the jungle theme feel immersive rather than just a backdrop with balloons. You can add extra animal props or name cutouts to personalise it further, and it pairs naturally with green foliage accents for a fuller safari feel. Book this jungle setup and celebrate your baby's first birthday in real style.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "3 Customized Flex Backdrop with Stand",
          "350 Balloons for Backdrop Decoration",
          "4 Animal Cutouts",
          "Name LED Light",
          "Number LED Light",
          "3 Cake Table",
          "2 Focus Light"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Artificial Green Leaves"
      ]
  }),
  makeProduct({
      "id": "prod-mermaid-lagoon-birthday-decoration",
      "slug": "mermaid-lagoon-birthday-decoration",
      "title": "Mermaid Lagoon Birthday Decoration",
      "categoryId": "kids-themes",
      "subcategoryId": "mermaid-theme",
      "discountedPrice": 14999,
      "originalPrice": 15999,
      "rating": 4.6,
      "reviewsCount": 180,
      "primaryImage": "https://cdn.balloondekor.com/28/1747984795469.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/1747984795469.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "The Mermaid Lagoon Birthday Decoration turns any stage or hall corner into an underwater fantasy for your child's big day. It includes an 8x8 ft customized backdrop, a 250-balloon arrangement, four themed cutouts, and an age neon light that lights up the number in style. Set in dreamy purple-white or purple-pink-white tones, the look suits kids' birthday parties held at home, in banquet halls, or party venues with room for a proper stage setup. Add shell or starfish props, or a matching cake table, to complete the lagoon feel. This mermaid theme is a lovely pick for a girl's birthday; reserve yours and dive into the celebration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Customized Backdrop (8*8Ft)",
          "250 Pc Balloon On Backdrop ",
          "4 Pc Cutout",
          "Age Neon Light"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-barbie-dreamland-birthday-theme",
      "slug": "barbie-dreamland-birthday-theme",
      "title": "Barbie Dreamland Birthday Theme",
      "categoryId": "kids-themes",
      "subcategoryId": "frozen-princess",
      "discountedPrice": 12499,
      "originalPrice": 12999,
      "rating": 4.7,
      "reviewsCount": 180,
      "primaryImage": "https://cdn.balloondekor.com/28/1748072313086.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/28/1748072313086.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Barbie Dreamland Birthday Theme creates a full pink fantasy for the birthday girl, with a circular customized backdrop decorated with 280 balloons, 20 extra balloons on the floor, two balloon pillars with cutouts, a foil balloon pillar, an age LED, and a customized cake table all included. Styled in pink or a pink-white combination, it's a stage-level setup that suits banquet halls, large living rooms, or any space where you want the full dollhouse effect. It's a dream choice for birthday parties, and pairs beautifully with a convertible car prop, a heart-shaped welcome sign, or matching balloon bouquets. Go with this Dreamland setup and give her a birthday straight out of the box.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Circle Customized Backdrop ",
          "280 Balloons On Backdrop ",
          "20 Balloon On Floor ",
          "2 Pc Balloon Pilar With Cutout",
          "1 Balloon Pilar With Foil ",
          "1 Age Led ",
          "1 Customized Cake Table "
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-simple-home-balloon-decoration",
      "slug": "simple-home-balloon-decoration",
      "title": "Simple Home Balloon Decoration",
      "categoryId": "kids-themes",
      "subcategoryId": "boss-baby",
      "discountedPrice": 1499,
      "originalPrice": 1799,
      "rating": 4.9,
      "reviewsCount": 554,
      "primaryImage": "https://cdn.balloondekor.com/14/1743570639756.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/1743570639756.webp",
          "https://cdn.balloondekor.com/14/1743570639497.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Home Balloon Decoration keeps things easy and affordable with fifty balloons filling the ceiling, fifty more spread across the floor and wall, a Happy Birthday foil, and ribbons tying the look together. It's a great fit for birthdays and kids' birthdays alike, turning any living room or bedroom into a festive space without a big budget. Pick from black-gold or black-silver for a sleek look, red-white or red-black for something bold, or blue-white and pink-white if you're decorating for a child. It sets up quickly while still giving the room a proper party feel. Add a small banner or balloon cluster near the entrance for extra impact. Choose this package for a fuss-free birthday setup at home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on Ceiling",
          "50 Balloons on floor and wall",
          "Happy Birthday Foil",
          "Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ],
      "themeColors": [
          "Black, White",
          "Blue, White",
          "Rose Gold, White",
          "Gold, White"
      ]
  }),
  makeProduct({
      "id": "prod-welcome-baby-princess-decoration",
      "slug": "welcome-baby-princess-decoration",
      "title": "Welcome Baby Princess Decoration",
      "categoryId": "newborn-welcome",
      "subcategoryId": "baby-girl-welcome",
      "discountedPrice": 3899,
      "originalPrice": 4499,
      "rating": 4.8,
      "reviewsCount": 489,
      "primaryImage": "https://cdn.balloondekor.com/20/welcome-baby-princess-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/20/welcome-baby-princess-decoration.webp",
          "https://cdn.balloondekor.com/20/welcome-baby-princess-decoration-3.webp",
          "https://cdn.balloondekor.com/20/welcome-baby-princess-decoration-4.webp",
          "https://cdn.balloondekor.com/20/welcome-baby-princess-decoration-2.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Welcome Baby Princess Decoration pairs a ten-foot flower pathway with a 100-balloon wall arch, foot and bottle foils rising from tall 25-balloon pillars, and welcome baby foil, framed by frill curtains, with balloons filling the floor and ceiling too. The flower pathway leading up to the balloon display gives this one a fairytale, princess-worthy entrance that suits a hallway opening into a living room. Frill ribbons finish the balloon sections neatly throughout. Choose from pink-white-rosegold, purple-white, or blue-white-silver to keep the princess theme going. Pairing it with a small tiara or princess prop for photos is a sweet extra. Book this decoration for a truly regal welcome for your baby girl.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "2 Frill Curtains on Wall",
          "Welcome Baby Foil Balloon",
          "Balloon Arch of 100 Balloons on Wall",
          "1 Foot Foil on a Balloon Pillar of 25 Balloons",
          "1 Bottle Foil on a Balloon Pillar of 25 Balloons",
          "20 Balloons on Floor",
          "30 Balloons on Ceiling",
          "Frill Ribbons",
          "10 Feet Flower Pathway"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-baby-homecoming-setup",
      "slug": "baby-homecoming-setup",
      "title": "Baby Homecoming Setup",
      "categoryId": "newborn-welcome",
      "subcategoryId": "baby-boy-welcome",
      "discountedPrice": 3899,
      "originalPrice": 4499,
      "rating": 4.7,
      "reviewsCount": 570,
      "primaryImage": "https://cdn.balloondekor.com/14/baby-homecoming-setup.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/14/baby-homecoming-setup.webp",
          "https://cdn.balloondekor.com/14/baby-homecoming-setup-2.webp",
          "https://cdn.balloondekor.com/20/baby-homecoming-setup-1785503208643-709099.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Baby Homecoming Setup blends balloons and flowers together, pairing a 170-balloon wall arch, welcome and baby foils, and thirty ceiling balloons with a ten-foot pathway spelling out 'Welcome' in fresh flowers leading up to it. Frill ribbons finish the balloon portion neatly. This combination of a floral pathway and a full balloon arch makes it a good fit for a hallway that opens into a living room, giving the homecoming a proper grand-entrance feel. Choose from blue-white-silver, purple-white, or a soft multicolor mix for the balloon portion. Pairing it with soft welcome-home music playing as guests arrive completes the mood nicely. Book this setup for a warm, flower-lined homecoming for your baby boy.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Welcome Foil",
          "1 Baby Foil Balloon",
          "Balloon Arch of 170 Balloons on Wall",
          "30 Balloons on Ceiling",
          "Frill Ribbons",
          "Welcome Written with Flower",
          "10 Feet Pathway"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-welcome-balloon-setup",
      "slug": "welcome-balloon-setup",
      "title": "Welcome Balloon Setup",
      "categoryId": "newborn-welcome",
      "subcategoryId": "baby-boy-welcome",
      "discountedPrice": 1999,
      "originalPrice": 2399,
      "rating": 5,
      "reviewsCount": 610,
      "primaryImage": "https://cdn.balloondekor.com/20/welcome-balloon-setup-1785502627367-467800.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/20/welcome-balloon-setup-1785502627367-467800.webp",
          "https://cdn.balloondekor.com/20/welcome-balloon-setup-1785502627017-67864.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Welcome Balloon Setup gives your newborn a warm homecoming with a Welcome Baby foil, two star foils, a soft fairy light, fifty balloons overhead on the ceiling, and fifty more spread across the floor and wall, all tied together with frill ribbons. It's designed for the welcome baby ceremony and fits neatly into a living room, bedroom, or nursery corner. Leaning toward a baby girl theme, it looks lovely in pink-white-rosegold or peach-white-golden, though you can just as easily choose blue-white-silver or multicolors if you'd prefer something different. Add a small name plaque or flower basket near the entrance for a finishing touch. Reserve this setup and give your baby girl the sweet welcome she deserves.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Welcome Baby Foil",
          "4 Star Foils",
          "1 Fairy Light",
          "50 Balloons on Ceiling",
          "50 Balloons on Floor and Wall",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-simple-welcome-balloon-decoration",
      "slug": "simple-welcome-balloon-decoration",
      "title": "Simple Welcome Balloon Decoration",
      "categoryId": "newborn-welcome",
      "subcategoryId": "baby-girl-welcome",
      "discountedPrice": 1699,
      "originalPrice": 2099,
      "rating": 4.9,
      "reviewsCount": 317,
      "primaryImage": "https://cdn.balloondekor.com/27/1744644785613.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/27/1744644785613.webp",
          "https://cdn.balloondekor.com/27/1744644785284.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Welcome Balloon Decoration keeps the newborn's homecoming easy and affordable with fifty balloons on the ceiling and seventy more spread across the floor and wall, topped off with a Welcome foil balloon. It's designed for the welcome baby ceremony and suits a living room, bedroom, or entryway you want to brighten up for the occasion. Choose blue-white or pink-blue for a playful touch, or go with pink-white-rosegold and red-white if you'd prefer something softer. Even at this simple scale, the sheer number of balloons gives the room a full, festive look the moment guests walk in. Add a small welcome signboard for a more personal feel. Book this setup for a warm and simple welcome home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on ceiling",
          "70 Balloons on Floor and Wall",
          "Welcome Foil Balloon"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-home-decoration-for-newborn-welcome",
      "slug": "home-decoration-for-newborn-welcome",
      "title": "Home Decoration for Newborn Welcome",
      "categoryId": "newborn-welcome",
      "subcategoryId": "naming-ceremony",
      "discountedPrice": 3799,
      "originalPrice": 4299,
      "rating": 4.8,
      "reviewsCount": 310,
      "primaryImage": "https://cdn.balloondekor.com/20/home-decoration-for-newborn-welcome-1785505822342-575495.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/20/home-decoration-for-newborn-welcome-1785505822342-575495.webp",
          "https://cdn.balloondekor.com/20/home-decoration-for-newborn-welcome-1785505822048-245697.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Welcoming a newborn home is one of life's sweetest moments, and this wall-mounted decoration sets the mood beautifully with a 250-balloon arch as its centrepiece. A customised banner carries your baby's name, six star foils and a cloud foil float above for a dreamy sky effect, and fifty more balloons cover the floor below. Since it's attached directly to the wall rather than a stand, it's a neat fit for an entryway, hallway, or living room corner where family will gather to meet the baby. Add soft pastel balloon bunches nearby for extra warmth. Go with this simple, budget-friendly setup to give your little one a lovely first welcome home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Customized Banner for Baby",
          "250 Balloons Arch",
          "6 Star Foils",
          "Cloud Foil",
          "50 Balloons on Floor"
      ],
      "excludedItems": [
          "No Helium Gas",
          "No Stand ( This is Attached with Wall)"
      ]
  }),
  makeProduct({
      "id": "prod-simple-welcome-decor-for-baby-girl",
      "slug": "simple-welcome-decor-for-baby-girl",
      "title": "Simple Welcome Decor for Baby Girl",
      "categoryId": "newborn-welcome",
      "subcategoryId": "baby-girl-welcome",
      "discountedPrice": 1499,
      "originalPrice": 1799,
      "rating": 4.8,
      "reviewsCount": 621,
      "primaryImage": "https://cdn.balloondekor.com/20/simple-welcome-decor-for-baby-girl-1785502016034-550669.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/20/simple-welcome-decor-for-baby-girl-1785502016034-550669.webp",
          "https://cdn.balloondekor.com/20/simple-welcome-decor-for-baby-girl-1785502015792-628570.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Welcome Decor for Baby Girl keeps the celebration light and pretty, with a welcome foil balloon and a footprint-shaped foil marking the occasion, backed by fifty balloons on the ceiling and fifty more across the wall, all finished with soft frill ribbons. It's an easy, budget-friendly way to mark your daughter's homecoming without needing a full backdrop or props. The setup suits a bedroom or a compact living room nicely, giving the space a festive feel right when she arrives. Pick from gentle shades like pink-white-rosegold, purple-white, or blue-white-silver to keep the mood soft and feminine. A small nameplate near the door pairs well with this look. Book this decor to welcome your baby girl home warmly.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Welcome Foil",
          "1 Footprint Foil",
          "50 Balloons on the Ceiling",
          "50 Balloons on the Wall",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-dreamy-baby-shower-balloons",
      "slug": "dreamy-baby-shower-balloons",
      "title": "Dreamy Baby Shower Balloons",
      "categoryId": "baby-shower",
      "subcategoryId": "oh-baby-ring",
      "discountedPrice": 2999,
      "originalPrice": 3299,
      "rating": 4.9,
      "reviewsCount": 955,
      "primaryImage": "https://cdn.balloondekor.com/26/1744709216881.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/26/1744709216881.webp",
          "https://cdn.balloondekor.com/26/1744709306226.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Dreamy Baby Shower Balloons leans into a starry night feel, with a moon foil balloon and four small star foils floating above a 170-balloon arch, while frill curtains frame the wall and two baby foils sit on their own balloon pillars. Twenty balloons drift near the ceiling and frill ribbons finish the edges neatly. This dreamy, celestial touch makes it a nice pick for an evening baby shower held in a living room or hall. Choose from black-gold for drama or softer shades like peach-white-golden and purple-pink-white for a gentler dream-like feel. Pairing it with fairy lights after dusk really brings the starry theme to life. Book this setup for a dreamy, memorable baby shower evening.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " 2 Frill Curtains ",
          " Baby Shower Foil Balloon ",
          " 2 Baby Foil Balloons on a Balloon Pillar of 15 Balloons each ",
          " Balloon Arch of 170 Balloons ",
          " 20 Balloons on Ceiling ",
          " 4 Small Star Foil Balloons ",
          " 1 Moon Foil Balloon ",
          " Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-oh-baby-decor-for-mom-to-be",
      "slug": "oh-baby-decor-for-mom-to-be",
      "title": "Oh Baby Decor for Mom to be",
      "categoryId": "baby-shower",
      "subcategoryId": "mom-to-be",
      "discountedPrice": 3499,
      "originalPrice": 3999,
      "rating": 4.9,
      "reviewsCount": 287,
      "primaryImage": "https://cdn.balloondekor.com/26/1744707961794.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/26/1744707961794.webp",
          "https://cdn.balloondekor.com/26/1744708095983.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Oh Baby Decor for Mom to Be is built specifically for the baby shower, with sixty balloons filling the top of the setup, eighty more across the floor, an Oh Baby foil, a soft cloth backdrop, and two baby bottle foil balloons for a playful detail. It suits a living room, hall, or any space set aside to celebrate the mom-to-be. Choose blue-white-silver or silver-white-black for a gender-neutral look, or go with golden-silver-black and multicolors for something richer. The cloth backdrop gives the whole setup a soft, premium finish that photographs beautifully. Pair it with a dessert table or a small throne chair for mom. Reserve this premium decoration for a baby shower to remember.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "60 Balloons on Top",
          "80 Balloons on Floor",
          "Oh Baby Foil",
          "Cloth Backdrop",
          "2 Bottle Foil"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-luxe-oh-baby-wall-setup",
      "slug": "luxe-oh-baby-wall-setup",
      "title": "Luxe Oh Baby Wall Setup",
      "categoryId": "baby-shower",
      "subcategoryId": "oh-baby-ring",
      "discountedPrice": 2899,
      "originalPrice": 3499,
      "rating": 4.9,
      "reviewsCount": 431,
      "primaryImage": "https://cdn.balloondekor.com/27/1744628934532.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/27/1744628934532.webp",
          "https://cdn.balloondekor.com/27/1744628934205.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Luxe Oh Baby Wall Setup dresses up the wall with a 200-balloon arch, two soft fairy lights, a round Oh Baby signboard, and golden butterfly cutouts scattered around for a touch of elegance. It's designed for baby showers and welcome baby celebrations, fitting beautifully into a living room, hall, or any space set aside for mom-to-be to be celebrated. Choose blue-pink or pink-blue if you already know the baby's gender, or keep it neutral with blue-white-silver, pink-white-rosegold, or purple-pink-white. The round signboard makes a lovely photo backdrop for the parents-to-be. Pair it with a small gift table or dessert spread nearby. Reserve this luxe setup for a baby shower or welcome celebration that feels genuinely special.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "200 Balloon Arch Decoration",
          "2 fairy Lights",
          "Oh Baby Round Board",
          "Golden Butterfly Cutouts"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-flower-backdrop-for-baby-shower",
      "slug": "flower-backdrop-for-baby-shower",
      "title": "Flower Backdrop for Baby Shower",
      "categoryId": "baby-shower",
      "subcategoryId": "mom-to-be",
      "discountedPrice": 12999,
      "originalPrice": 14999,
      "rating": 4.7,
      "reviewsCount": 20,
      "primaryImage": "https://cdn.balloondekor.com/26/1734524306882.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/26/1734524306882.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Flower Backdrop for Baby Shower keeps the design refreshingly simple: a generous 8x8 foot green backdrop layered with fresh-looking flowers, styled exactly as shown in the reference photo. There's no balloon clutter here, just a clean wall of greenery and blooms that gives the space an elegant, natural feel. It works beautifully in a living room or hall with a clear wall, and photographs well in daylight. Because the look is floral-first, it pairs effortlessly with a decorated chair or small stool for the mom-to-be to sit in front of the backdrop. This setup suits families who prefer a softer, garden-like feel over a bright balloon theme. Book this backdrop for an elegant, botanical baby shower look.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " Green Backdrop (8*8 feet) ",
          " Backdrop Decorated with Flowers (same as photo)"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Sofa"
      ]
  }),
  makeProduct({
      "id": "prod-teddy-bear-gender-reveal-decoration",
      "slug": "teddy-bear-gender-reveal-decoration",
      "title": "Teddy Bear Gender Reveal Decoration",
      "categoryId": "baby-shower",
      "subcategoryId": "gender-reveal",
      "discountedPrice": 8499,
      "originalPrice": 9999,
      "rating": 4.3,
      "reviewsCount": 98,
      "primaryImage": "https://cdn.balloondekor.com/26/1740814618473.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/26/1740814618473.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Announce the big news with the Teddy Bear Gender Reveal Decoration, built around a large 300-balloon backdrop arch, fifty balloons along the wall, a teddy bear accent, and a fully customizable backdrop where the reveal itself can take place. It suits a living room, hall, or any space set aside for a gender reveal party with family and friends. Since it's customizable, you can go with blue, pink, or a mixed blue-pink palette that reveals the surprise as guests watch, or stick to purple-pink-white for a softer look either way. Pair it with balloon-popping props or confetti poppers for the big reveal moment. Choose this decoration to make your announcement unforgettable.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "300 Balloon Backdrop Arch",
          "50 Wall Balloon Decoration",
          "Teddy",
          "Customizable Backdrop"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-giggling-baby-shower-setup",
      "slug": "giggling-baby-shower-setup",
      "title": "Giggling Baby Shower Setup",
      "categoryId": "baby-shower",
      "subcategoryId": "oh-baby-ring",
      "discountedPrice": 1799,
      "originalPrice": 2199,
      "rating": 4.8,
      "reviewsCount": 965,
      "primaryImage": "https://cdn.balloondekor.com/26/1784203653450-580459.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/26/1784203653450-580459.webp",
          "https://cdn.balloondekor.com/26/1784203674968-105908.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Giggling Baby Shower Setup adds two baby foil balloons alongside the baby shower foil, with fifty balloons overhead and another fifty spread across the floor and walls, finished with frill ribbons for a tidy look. It keeps things playful and full without needing a dedicated backdrop, making it an easy option for a bedroom or compact living room. The generous balloon spread means the room feels celebratory from every angle, not just one wall. Choose from palettes like blue-white-silver, gold-white, or a gentle purple-pink-white to match your shower's theme. A small table for cupcakes or favors pairs well with this setup. Book it today for a cheerful, balloon-filled baby shower at home.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Baby Shower Foil Balloons",
          "2 Baby Foil Balloons",
          "50 Balloons on Ceiling",
          "50 Balloons on Floor and Walls",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Window Curtain"
      ]
  }),
  makeProduct({
      "id": "prod-anniversary-home-decoration",
      "slug": "anniversary-home-decoration",
      "title": "Anniversary Home Decoration",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-room",
      "discountedPrice": 2199,
      "originalPrice": 2999,
      "rating": 4.9,
      "reviewsCount": 165,
      "primaryImage": "https://cdn.balloondekor.com/29/1784709508118-669326.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/29/1784709508118-669326.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Anniversary Home Decoration keeps the celebration warm and simple with fifty balloons filling the ceiling, fifty more across the floor, and a Happy Anniversary foil as the centerpiece. It's designed for anniversary celebrations and suits a living room, hall, or bedroom you'd like to dress up for the occasion. Choose from classic combinations like red-gold and red-white for a romantic touch, or go with black-silver, gold-white, and white-golden for something more refined. Since the balloons here are air-filled rather than helium, they work nicely lined along the wall or scattered across furniture rather than floating. Pair it with candles or a small dinner table setup for a complete evening. Reserve this decoration and celebrate another year of togetherness in style.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on Ceiling",
          "50 Balloons on Floor",
          "Happy Anniversary Foil",
          "One Light",
          "Four Star Foils"
      ],
      "excludedItems": [
          "No Helium Balloons"
      ]
  }),
  makeProduct({
      "id": "prod-red-anniversary-home-decor",
      "slug": "red-anniversary-home-decor",
      "title": "Red Anniversary Home Decor",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-room",
      "discountedPrice": 2099,
      "originalPrice": 2499,
      "rating": 4.8,
      "reviewsCount": 185,
      "primaryImage": "https://cdn.balloondekor.com/29/1744791701209.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/29/1744791701209.webp",
          "https://cdn.balloondekor.com/29/1744791700866.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Red Anniversary Home Decor sets a romantic tone with fifty balloons on the ceiling, fifty more across the floor, a Happy Anniversary foil, and a single fairy light adding warmth to the room. It's made for anniversary celebrations and suits a living room, hall, or bedroom you want to transform for the evening. True to its name, red-white and red-gold bring out the classic anniversary feel, though pink-white-rosegold and purple-pink-white work just as nicely for a softer touch. The fairy light keeps the mood intimate once the lights are dimmed for dinner. Add rose petals or candles nearby for a more romantic finish. Choose this decoration and mark another year of marriage in style.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on ceiling",
          "50 Balloons on Floor",
          "Happy Anniversary Foil",
          "1 Fairy Lights"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-anniversary-bliss-setup",
      "slug": "anniversary-bliss-setup",
      "title": "Anniversary Bliss Setup",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-room",
      "discountedPrice": 2499,
      "originalPrice": 2999,
      "rating": 4.6,
      "reviewsCount": 255,
      "primaryImage": "https://cdn.balloondekor.com/29/1744888510950.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/29/1744888510950.webp",
          "https://cdn.balloondekor.com/29/1744888731625.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This Anniversary Bliss Setup keeps things cheerful and celebratory with a bright Happy Anniversary banner and a 150-balloon arch as its centerpiece. Two fairy lights add a gentle glow, while frill ribbons tie the whole look together. It's built for anniversary celebrations and suits a hall or living room where friends and family can join in the festivities. Choose from palettes like black-gold, golden-silver-black, or peach-white-golden to match the occasion. Pair it with a cake table or additional balloon clusters for a bigger celebration. Get in touch with our team to book this cheerful setup and celebrate your special day surrounded by the people you love.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " Happy Anniversary Banner",
          "150 Balloons Arch",
          "2 Fairy Lights",
          " Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-happy-anniversary-backdrop-decoration",
      "slug": "happy-anniversary-backdrop-decoration",
      "title": "Happy Anniversary Backdrop Decoration",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-backdrop",
      "discountedPrice": 6499,
      "originalPrice": 7899,
      "rating": 4.6,
      "reviewsCount": 135,
      "primaryImage": "https://cdn.balloondekor.com/images/29/fd8f43b0-23c2-4e6c-8000-1e5207b435ff.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/images/29/fd8f43b0-23c2-4e6c-8000-1e5207b435ff.webp",
          "https://cdn.balloondekor.com/images/29/a72c9af7-344e-4821-8e2a-5896b3ac39c0.webp",
          "https://cdn.balloondekor.com/images/29/0a07a9ed-374c-4e7b-be71-833bec592525.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Happy Anniversary Backdrop Decoration is built around a customized flex backdrop on its own stand, filled out with 170 balloons across the backdrop, another 30 spread across the floor and wall, and a focus light to keep the display looking sharp. It works well for couples who want a proper backdrop to pose in front of, whether the celebration is at home, in a hotel room, or a small hall with close family. The flex backdrop can be personalised with the couple's names, wedding date, or a chosen anniversary message. It suits a living room just as easily as a bedroom, depending on where you'd like the celebration centred. Book this backdrop today and make your anniversary feel picture-perfect.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Customized Flex Backdrop with Stand",
          "170 Balloons for Backdrop Decoration",
          "30 Balloons for Floor & Wall Decoration",
          "Focus Light"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Flower Bouquet"
      ]
  }),
  makeProduct({
      "id": "prod-romantic-anniversary-surprise-decor",
      "slug": "romantic-anniversary-surprise-decor",
      "title": "Romantic Anniversary Surprise Decor",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-room",
      "discountedPrice": 2599,
      "originalPrice": 2999,
      "rating": 5,
      "reviewsCount": 287,
      "primaryImage": "https://cdn.balloondekor.com/29/1744809473917.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/29/1744809473917.webp",
          "https://cdn.balloondekor.com/29/1744809473426.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Romantic Anniversary Surprise Decor goes all in on romance with fifty red balloons, a Happy Anniversary foil, two fairy lights, a heart shape crafted entirely from fresh rose petals, four heart foil balloons, and a ring-shaped foil balloon as a sweet nod to the occasion. It's designed for anniversaries and works beautifully in a bedroom or living room where you want to surprise your partner. Classic red and red-gold keep the romantic mood front and center, while peach-white-golden and red-black offer a slightly different take. The rose heart makes a striking centerpiece for photos and a proposal-style moment. Pair it with scented candles for extra atmosphere. Reserve this surprise setup and make your anniversary evening one to remember.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Red Balloons",
          "Happy Anniversary Foil",
          "2 fairy Lights",
          "Heart Shape from Rose",
          "4 Heart foil balloons",
          "One Ring Foil"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-romantic-anniversary-room-celebration",
      "slug": "romantic-anniversary-room-celebration",
      "title": "Romantic Anniversary Room Celebration",
      "categoryId": "anniversary",
      "subcategoryId": "anniversary-room",
      "discountedPrice": 2399,
      "originalPrice": 2499,
      "rating": 4.4,
      "reviewsCount": 183,
      "primaryImage": "https://cdn.balloondekor.com/29/1744815775277.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/29/1744815775277.webp",
          "https://cdn.balloondekor.com/29/1744815774935.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Romantic Anniversary Room Celebration fills the room with fifty balloons on the ceiling and fifty more on the floor, a Happy Anniversary foil, three heart-shaped foils, and frill ribbons for a soft, romantic finish. It's designed for the Anniversary occasion and works beautifully in a bedroom or hotel room where you want a private, intimate celebration with your partner. Colour choices include black-gold, black-white, gold-white, and red-white, so you can set a mood that's either warm and golden or bold and passionate. Add rose petals or candles to make the evening feel even more special. Book this room celebration and mark another year of togetherness in style.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " Ceiling Decorated with 50 Balloons ",
          " Floor Decorated with 50 Balloons ",
          " Happy Anniversary Foil ",
          " 3 Heart-Shaped Foils ",
          " Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ],
      "themeColors": [
          "Black, White",
          "Blue, White",
          "Rose Gold, White",
          "Gold, White"
      ]
  }),
  makeProduct({
      "id": "prod-sunshine-haldi-decoration",
      "slug": "sunshine-haldi-decoration",
      "title": "Sunshine Haldi Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 7899,
      "originalPrice": 7999,
      "rating": 4.4,
      "reviewsCount": 89,
      "primaryImage": "https://cdn.balloondekor.com/43/1746262234082.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/43/1746262234082.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Sunshine Haldi Decoration keeps to a cheerful yellow and white cloth backdrop, dressed with artificial flowers and five marigold blooms placed across the panel for that classic haldi glow. It's built for the haldi ceremony and works well on a terrace, lawn, or indoor hall wherever the family chooses to hold the ritual. The bright yellow base captures the sunny, festive energy haldi functions are known for, without needing too many extra elements. Since seating and stands aren't part of this package, it pairs well with your own floor cushions or a simple sitting arrangement nearby. Add marigold garlands around the seating for extra warmth. Order this decoration for a bright, sunshine-filled haldi setup.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Yellow And White Cloth Backdrop",
          "Artificial Flower",
          "5 Marigold Flower On Bckdrop "
      ],
      "excludedItems": [
          "No Helium Gas",
          "Table for sitting",
          "4 stands "
      ]
  }),
  makeProduct({
      "id": "prod-indoor-haldi-setup",
      "slug": "indoor-haldi-setup",
      "title": "Indoor Haldi Setup",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 7899,
      "originalPrice": 7999,
      "rating": 4.8,
      "reviewsCount": 78,
      "primaryImage": "https://cdn.balloondekor.com/43/1746262232498.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/43/1746262232498.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Indoor Haldi Setup layers a red, yellow, and white cloth backdrop with a glowing Haldi neon sign, an artificial flower arch, decorative hangings, and a customized flex that can be personalized with names or a message. It's designed for indoor haldi ceremonies and suits a living room or hall where the family can gather comfortably for the ritual. The mix of red, yellow, and white keeps the palette traditional while still feeling bright and celebratory. The neon light adds a modern touch that photographs well once the room lighting is lowered for the evening. Pair it with marigold strings or a small seating area for elders. Book this setup for a colorful, ready-made indoor haldi celebration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Red, Yellow And White Cloths Backdrop",
          "Haldi Neon Light On Backdrop",
          "Artificial Flower Arch On Backdrop",
          "Customized Haldi Bacdrop",
          "Decorative Hanging On Backdrop",
          "Customized Haldi Flex"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-traditional-haldi-decoration",
      "slug": "traditional-haldi-decoration",
      "title": "Traditional Haldi Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 14999,
      "originalPrice": 15999,
      "rating": 4.6,
      "reviewsCount": 78,
      "primaryImage": "https://cdn.balloondekor.com/43/1746449814281.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/43/1746449814281.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Traditional Haldi Decoration goes back to classic roots with a banana leaf backdrop, fresh flowers layered across it, and an urli placed as the centerpiece for the ritual. It's built for the haldi ceremony and suits a lawn, terrace, or courtyard where a more rustic, temple-style setting feels appropriate. Banana leaves bring an authentic South Indian or traditional touch that sets this apart from the usual cloth-and-flex backdrops most haldi setups use. The urli works beautifully as a floating flower bowl right at the center of the ceremony space. Pair it with marigold garlands and brass diyas for an even more traditional finish. Reserve this decoration for a haldi ceremony rooted in tradition.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Banana Leaf Backdrop",
          "Flower On Backdrop",
          "1 Urli"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-yellow-vibes-only-haldi-setup",
      "slug": "yellow-vibes-only-haldi-setup",
      "title": "Yellow Vibes Only Haldi Setup",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 24499,
      "originalPrice": 26499,
      "rating": 4.9,
      "reviewsCount": 77,
      "primaryImage": "https://cdn.balloondekor.com/43/1746440146827.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/43/1746440146827.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Yellow Vibes Only Haldi Setup makes a real statement with a ten-by-ten-foot square stand decorated in flowers and cloth, two wooden crates for rustic styling, two urlis as floating flower centerpieces, and two stools completing the seating arrangement. It's a premium build made for the haldi ceremony and suits larger lawns, terraces, or outdoor venues with room for the full structure. The wooden crates and stools give the space a rustic, earthy character that stands apart from the usual cloth-and-flower backdrops. It works well for families wanting a bigger, more elaborate haldi function. Pair it with marigold garlands and yellow drapes throughout the venue. Reserve this premium setup for a haldi ceremony that truly stands out.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Square Shape Stand (10*10 Feet)",
          "Stand Decorated with Flowers and Cloth",
          "2 Wooden Crate",
          "2 Urli",
          "2 Tool"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-vibe-vows-mehndi-decoration",
      "slug": "vibe-vows-mehndi-decoration",
      "title": "Vibe & Vows Mehndi Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 7999,
      "originalPrice": 8599,
      "rating": 4.7,
      "reviewsCount": 99,
      "primaryImage": "https://cdn.balloondekor.com/43/1748249329240.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/43/1748249329240.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Vibe & Vows Mehndi Decoration sets a warm, festive scene for the mehndi ceremony, with an 8x8 ft cloth backdrop, an artificial flower arch, four decorative hangings, and the word Mehndi written across the backdrop for a personalized touch. It's designed to suit a living room, terrace, or banquet hall set up for the celebration, giving guests a proper spot for photos and the ceremony itself. The floral styling pairs naturally with fairy lights, floor cushions, or a dupatta-draped seating area to complete the mehndi mood. It also works well alongside matching decor for the sangeet if you're celebrating over multiple days. Get in touch and set the tone for a joyful mehndi evening with this decoration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Cloth Backdrop (8*8Ft)",
          "Artificial Flower Arch On Backdrop ",
          "4 Pc Decorative Hanging On Backdrop ",
          "Written Mehndi On Backdrop"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Sofa For Sitting "
      ]
  }),
  makeProduct({
      "id": "prod-desi-tadka-mehndi-decoration",
      "slug": "desi-tadka-mehndi-decoration",
      "title": "Desi Tadka Mehndi Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "haldi-mehndi",
      "discountedPrice": 17999,
      "originalPrice": 21999,
      "rating": 4.8,
      "reviewsCount": 88,
      "primaryImage": "https://cdn.balloondekor.com/44/1746529383750.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/44/1746529383750.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Desi Tadka Mehndi Decoration brings together a cloth backdrop, artificial flowers, five decorative hangings, a string light for evening glow, two flower vases, and a covered sofa for the bride and her guests to settle into. It's designed for the mehndi ceremony and suits a living room, terrace, or hall set aside for the celebration. The string light makes this setup work particularly well once the sun goes down, giving the backdrop a warm, glowing finish. The covered sofa and flower vases add a coordinated, put-together look rather than separate rented pieces. Pair it with dholki music and floor seating for guests. Choose this decoration for a true desi-style mehndi evening.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Cloth Backdrop",
          "Artificial Flower On Backdrop",
          "5 Pc Hanging On Backdrop",
          "1 String Light",
          "2 Flower Vase",
          "Sofa With Cover"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-kanku-pagla-welcome-home-decoration",
      "slug": "kanku-pagla-welcome-home-decoration",
      "title": "Kanku Pagla Welcome Home Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "bride-welcome",
      "discountedPrice": 3999,
      "originalPrice": 4999,
      "rating": 4.7,
      "reviewsCount": 359,
      "primaryImage": "https://cdn.balloondekor.com/37/kanku-pagla-welcome-home-decoration-1785747029627-103181.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/37/kanku-pagla-welcome-home-decoration-1785747029627-103181.webp",
          "https://cdn.balloondekor.com/37/kanku-pagla-welcome-home-decoration-1785747029295-682415.webp",
          "https://cdn.balloondekor.com/37/kanku-pagla-welcome-home-decoration-1785747028988-302717.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Rooted in the traditional Kanku Pagla ritual, this welcome decoration lays a fifteen-foot flower pathway using a full kilogram of marigold mixed with rose and white flowers, creating a rich, fragrant walkway for the bride's entrance. It's designed for the doorway and floor area leading into the home, honouring the custom while still looking visually striking for photos. Plate decoration is not included in this package, so that element would need to be arranged separately if part of your ritual. The marigold and rose combination gives the pathway a traditional yet vibrant look. Book this Kanku Pagla welcome decoration to bring proper ritual charm to the bride's homecoming.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "15 ft Flower Decoration Pathway",
          "1 kg Marie Gold",
          "Rose & White Flower Mixed Decoration"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Plate Decoration"
      ]
  }),
  makeProduct({
      "id": "prod-romantic-love-room-canopy-decoration",
      "slug": "romantic-love-room-canopy-decoration",
      "title": "Romantic Love Room Canopy Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "first-night",
      "discountedPrice": 3199,
      "originalPrice": 3999,
      "rating": 5,
      "reviewsCount": 189,
      "primaryImage": "https://cdn.balloondekor.com/19/romantic-love-room-canopy-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/19/romantic-love-room-canopy-decoration.webp",
          "https://cdn.balloondekor.com/29/romantic-love-room-canopy-decoration.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Romantic Love Room Canopy Decoration is made for an anniversary, set up in a bedroom, living room or hall. It comes with 50 balloons, a canopy curtain, three fairy lights, a love foil, three star foils and frill ribbons. The lights keep the setup glowing after sunset and in photos. All materials, delivery and setup are included, and the decorator finishes in about 1.5 to 2 hours. Choose your city and a time slot to book it online.",
      "includedItems": [
          "50 Balloons for Decoration",
          "Canopy Curtain",
          "3 Fairy Lights",
          "One Love Foil",
          "3 Star Foils",
          "Frill Ribbons"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-just-married-floral-balloon-decor",
      "slug": "just-married-floral-balloon-decor",
      "title": "Just Married Floral Balloon Decor",
      "categoryId": "wedding-suit",
      "subcategoryId": "first-night",
      "discountedPrice": 2799,
      "originalPrice": 3999,
      "rating": 4.5,
      "reviewsCount": 155,
      "primaryImage": "https://cdn.balloondekor.com/23/1740474124859.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/23/1740474124859.webp",
          "https://cdn.balloondekor.com/23/1740474124316.webp",
          "https://cdn.balloondekor.com/23/1740474124629.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This decoration marks the wedding night clearly with a Just Married foil, two heart foils, fifty balloons spread across the ceiling and floor, rose petals sprinkled over the bed, and frill ribbons for a neat finishing touch. It's designed specifically for the bedroom on the night after the wedding, giving the couple a warm, romantic space to begin their life together. Choose from palettes like classic red, red and gold, or red and white to keep the traditional romantic tone. A lamp is not included in this package, so the ambience comes through the balloons and petals instead. Book this just married decoration for a first night that feels beautifully complete.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "50 Balloons on Ceiling & Floor",
          "Just Married Foil",
          "Rose Petal Sprinkle on Bed",
          "2 Heart Foil",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Lamp"
      ]
  }),
  makeProduct({
      "id": "prod-romantic-couple-night-decoration",
      "slug": "romantic-couple-night-decoration",
      "title": "Romantic Couple Night Decoration",
      "categoryId": "wedding-suit",
      "subcategoryId": "first-night",
      "discountedPrice": 3799,
      "originalPrice": 4299,
      "rating": 4.9,
      "reviewsCount": 160,
      "primaryImage": "https://cdn.balloondekor.com/23/1767618938279.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/23/1767618938279.webp",
          "https://cdn.balloondekor.com/23/1767618937991.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Set the mood for a couple's first night together with the Romantic Couple Night Decoration. This setup includes 60 balloons for the ceiling, 20 balloons spread across the room and bed, a Love foil balloon, scattered rose petals, and frill ribbons for a soft, romantic finish. It's designed for the bedroom, making it a lovely choice for a wedding night or any intimate anniversary surprise. You can add candles, fairy lights, or a name balloon for the couple to personalise the room further. It pairs beautifully with soft music and a small dessert or wine setup nearby. Book this decoration and give the evening the romantic touch it deserves.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "60 Balloons for Celling Decoration",
          "20 Balloons for Room & Bed Decoration",
          "Love Foil Balloon",
          "Rose Patels",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-bride-to-be-party-decoration",
      "slug": "bride-to-be-party-decoration",
      "title": "Bride to be Party Decoration",
      "categoryId": "bachelorette",
      "subcategoryId": "bride-to-be",
      "discountedPrice": 2599,
      "originalPrice": 2799,
      "rating": 4.6,
      "reviewsCount": 130,
      "primaryImage": "https://cdn.balloondekor.com/21/bride-to-be-party-decoration-1785821918853-579095.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/bride-to-be-party-decoration-1785821918853-579095.webp",
          "https://cdn.balloondekor.com/21/bride-to-be-party-decoration-1785821918456-490147.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Bride to be Party Decoration keeps a tight trio of foil balloons at its centre, a Bride To Be foil, a champagne foil, and a ring foil, surrounded by fifty balloons on the ceiling, fifty more on the floor, and frill ribbons finishing the room. It's a balanced, mid-range option for a bachelorette party, giving a full room transformation without a backdrop-style setup, and it works nicely in a living room or hotel room. Colours range from red and black to blue and white, brown, gold-silver-black, multicolour, or a soft peach-white-gold blend. Pair it with balloon-topped chairs or a small drinks table for guests. Go with this package for a well-rounded bachelorette look that doesn't lean on a wall.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Bride To Be Foil Balloon",
          "1 Champagne Foil Balloon",
          "1 Ring Foil Balloon",
          "50 Balloons on Ceiling",
          "50 Balloons on Floor",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-bride-to-be-ring-decoration",
      "slug": "bride-to-be-ring-decoration",
      "title": "Bride to be Ring Decoration",
      "categoryId": "bachelorette",
      "subcategoryId": "bachelorette-ring",
      "discountedPrice": 6999,
      "originalPrice": 7499,
      "rating": 4.8,
      "reviewsCount": 84,
      "primaryImage": "https://cdn.balloondekor.com/21/bride-to-be-ring-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/bride-to-be-ring-decoration.webp",
          "https://cdn.balloondekor.com/21/bride-to-be-ring-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Bride to be Ring Decoration centres on a lit, seven-by-seven-foot ring backdrop covered in 150 balloons, joined by a Bride to Be foil and a crown foil balloon that plays up her special status, fifty more balloons on the floor, and two cake tables for dessert. The crown foil is a nice personal touch that sets it apart, and it suits a banquet hall or spacious living room best. Colours include black and gold, black-silver, blue and white, brown, gold, or a soft peach-white-gold blend. Pair it with a tiara or sash to match the crown theme. Pick this decoration when the bride deserves to feel like royalty for the day.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Ring Backdrop (7*7 feet)",
          "Bride to Be Neon",
          "1 Ring Foil",
          "1 Champine Foil",
          "5 Butterfly Stickers",
          "Backdrop Decorated with 150 Balloons",
          "50 Balloons on Floor",
          "1 Cake Table"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-simple-bachelorette-wall-arch",
      "slug": "simple-bachelorette-wall-arch",
      "title": "Simple Bachelorette Wall Arch",
      "categoryId": "bachelorette",
      "subcategoryId": "bride-to-be",
      "discountedPrice": 2299,
      "originalPrice": 2699,
      "rating": 4.9,
      "reviewsCount": 13,
      "primaryImage": "https://cdn.balloondekor.com/21/1734444188363.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/1734444188363.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Bachelorette Wall Arch keeps the balloon count modest at eighty for the wall arch, adds a Bride to be foil balloon and a ring foil balloon, two small balloon stands of ten balloons each flanking the sides, and includes travelling expenses in the price. It's a compact option that still gives you a proper arch to pose in front of, and suits a smaller living room, bedroom, or shared apartment. Colours include red, black, black and gold, brown, gold, multicolour, or a soft peach-white-gold mix. Pair it with a small table of drinks between the two stands. Pick this smaller arch when the guest list, and the space, is on the cosier side.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " Bride to be Foil Balloon ",
          " Balloon Arch of 80 Balloons on Wall ",
          " 2 Balloon Stand of 10 Balloons Each ",
          " 1 Ring Foil Balloon ",
          " Travelling Expenses"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-simple-bachelorette-decoration",
      "slug": "simple-bachelorette-decoration",
      "title": "Simple Bachelorette Decoration",
      "categoryId": "bachelorette",
      "subcategoryId": "bride-to-be",
      "discountedPrice": 1799,
      "originalPrice": 2099,
      "rating": 4.6,
      "reviewsCount": 91,
      "primaryImage": "https://cdn.balloondekor.com/21/simple-bachelorette-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/simple-bachelorette-decoration.webp",
          "https://cdn.balloondekor.com/21/simple-bachelorette-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Simple Bachelorette Decoration keeps the setup light, with a Bride to be foil balloon, fifty balloons on the ceiling, five confetti balloons for sparkle, and frill ribbons rounding things off. It's one of the most affordable options in the range, well suited to a bedroom or living room when you want a quick, cheerful backdrop rather than a full production. Colours span black, black and gold, blue and white, brown, gold, peach, pink, or purple, giving you plenty of room to match the bride's favourite shade even on a smaller budget. Add snacks, drinks, and some music to fill in the rest of the evening. Go with this simple version when the plan is more about the company than decor.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Bride to be Foil Balloon",
          "50 Balloon on Ceiling",
          "5 Confetti Balloons",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-bachelorette-wall-arch-setup",
      "slug": "bachelorette-wall-arch-setup",
      "title": "Bachelorette Wall Arch Setup",
      "categoryId": "bachelorette",
      "subcategoryId": "bachelorette-ring",
      "discountedPrice": 2599,
      "originalPrice": 2899,
      "rating": 4.9,
      "reviewsCount": 81,
      "primaryImage": "https://cdn.balloondekor.com/21/bachelorette-wall-arch-setup-1785246839658-353163.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/bachelorette-wall-arch-setup-1785246839658-353163.webp",
          "https://cdn.balloondekor.com/21/bachelorette-wall-arch-setup-1785246872496-634261.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Bachelorette Wall Arch Setup builds its look around a wall-mounted balloon arch of 150 balloons, a Bride To Be foil balloon, a balloon pillar of twenty balloons, fairy lights strung along the wall, a champagne bottle foil, and thirty extra balloons filling the floor and walls. It's made for bachelorette parties and suits a living room, terrace, or hotel room as the main photo spot. Colour choices range from black and gold to blue-white-silver, purple-pink-white, or a soft white and gold combination. Pair it with a sash, tiara, or a small mocktail bar for the full effect. Book this setup and give the bride an arch worth posing in front of all night.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Bride To Be Foil Balloon",
          "Balloon Arch on the Wall with 150 Balloons",
          "Balloon Pillar with 20 Balloons",
          "Fairy Light on the Wall",
          "Champagne Bottle Foil",
          "30 Extra Balloons for the Floor and the Walls"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Extension Cord"
      ]
  }),
  makeProduct({
      "id": "prod-chic-bride-to-be-celebration",
      "slug": "chic-bride-to-be-celebration",
      "title": "Chic Bride To Be Celebration",
      "categoryId": "bachelorette",
      "subcategoryId": "bride-to-be",
      "discountedPrice": 2499,
      "originalPrice": 2999,
      "rating": 4.9,
      "reviewsCount": 355,
      "primaryImage": "https://cdn.balloondekor.com/21/chic-bride-to-be-celebration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/21/chic-bride-to-be-celebration.webp",
          "https://cdn.balloondekor.com/21/chic-bride-to-be-celebration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "150 Balloons for Arch Decoration",
          "20 Balloons Extra",
          "Frill Curtain",
          "3 Star Foils",
          "Bride to be Foil Set",
          "Champaign Bottel Foil"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-cute-happy-birthday-balloon-bouquet",
      "slug": "cute-happy-birthday-balloon-bouquet",
      "title": "Cute Happy Birthday Balloon Bouquet",
      "categoryId": "balloon-bouquets",
      "subcategoryId": "birthday-bouquet",
      "discountedPrice": 3499,
      "originalPrice": 3899,
      "rating": 4.8,
      "reviewsCount": 150,
      "primaryImage": "https://cdn.balloondekor.com/48/cute-happy-birthday-balloon-bouquet.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/48/cute-happy-birthday-balloon-bouquet.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Cute Happy Birthday Balloon Bouquet packs 15 rose flowers, six Ferrero Rocher chocolates, and a set of Bobo balloons into one neatly presented box, finished off with a customized sticker. It's a compact, ready-to-gift option for a birthday, whether you're celebrating a friend, a partner, or a family member. The combination of roses and chocolates alongside the balloons makes it feel more personal than balloons alone, and it's easy to hand over at a small gathering, a doorstep surprise, or a birthday dinner. The sticker can be customized with the birthday person's name or a short wish. Order this bouquet for a cute, ready-made way to say happy birthday.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "15 Pc Rose Flowers",
          "6 Pc Ferrero Rocher",
          "Bobo Balloons",
          "1 Box",
          "Customized Sticker"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-golden-noir-balloon-bouquet",
      "slug": "golden-noir-balloon-bouquet",
      "title": "Golden Noir Balloon Bouquet",
      "categoryId": "balloon-bouquets",
      "subcategoryId": "birthday-bouquet",
      "discountedPrice": 2999,
      "originalPrice": 3499,
      "rating": 4.9,
      "reviewsCount": 220,
      "primaryImage": "https://cdn.balloondekor.com/48/golden-noir-balloon-bouquet.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/48/golden-noir-balloon-bouquet.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Golden Noir Balloon Bouquet pairs ten red roses with Bobo balloons in a striking black and gold palette, presented in a single box with a customized sticker. The bold, elegant colour combination sets it apart from softer floral bouquets and makes it a strong choice for an anniversary, a birthday, or a special date night gift. It suits a dinner table setting, a bedroom surprise, or simply handing it over in person for a dramatic reveal. The customized sticker can be personalized with a name or short message to match the occasion. Choose this Golden Noir bouquet when you want your gift to feel a little more sophisticated than the usual bunch of flowers.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "10 Pc Red Roses",
          "Bobo Balloons",
          "1 Box",
          "Customized Sticker"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-surprise-balloon-bouquet-for-wife",
      "slug": "surprise-balloon-bouquet-for-wife",
      "title": "Surprise Balloon Bouquet for Wife",
      "categoryId": "balloon-bouquets",
      "subcategoryId": "romantic-bouquet",
      "discountedPrice": 3499,
      "originalPrice": 3849,
      "rating": 4.8,
      "reviewsCount": 216,
      "primaryImage": "https://cdn.balloondekor.com/48/surprise-balloon-bouquet-for-wife.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/48/surprise-balloon-bouquet-for-wife.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Surprise Balloon Bouquet for Wife pairs a set of Bobo balloons with 12 Ferrero Rocher chocolates, a custom sticker, and a neat presentation box, making it a ready-to-gift surprise rather than a full room decoration. It's perfect for an anniversary, a birthday, or simply a just-because gesture to make her day special. The bouquet suits a bedroom reveal, a dining table centrepiece, or a doorstep surprise when she gets home. The custom sticker can carry a short personal message or her name for an extra thoughtful touch. Pair it with a handwritten card or fresh flowers for a fuller gift. Order this bouquet and give your wife a sweet surprise she'll love.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "12 Ferrero Rocher",
          "Bobo Balloons",
          "Custom Sticker",
          "One Box"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-surprise-proposal-balloon-bouquet",
      "slug": "surprise-proposal-balloon-bouquet",
      "title": "Surprise Proposal Balloon Bouquet",
      "categoryId": "balloon-bouquets",
      "subcategoryId": "romantic-bouquet",
      "discountedPrice": 3199,
      "originalPrice": 3500,
      "rating": 4.5,
      "reviewsCount": 215,
      "primaryImage": "https://cdn.balloondekor.com/48/surprise-proposal-balloon-bouquet.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/48/surprise-proposal-balloon-bouquet.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Surprise Proposal Balloon Bouquet brings together six roses, three lily flowers, Bobo balloons, and a customized sticker, all presented in a single gift box designed for a big moment. It's built for a proposal, though it works just as well for an anniversary or a romantic surprise on any ordinary day. The mix of roses and lilies alongside the balloons gives the bouquet a classic, romantic look that suits a candlelit dinner table, a bedroom setup, or an outdoor picnic proposal. The customized sticker can carry a short message to go with the moment. Send this bouquet along and let the flowers and balloons help set the scene for your big question.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "6 Pc Roses",
          "3 Pc Lily Flower",
          "Bobo Balloons",
          "1 Box",
          "Customized Sticker"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-golden-glow-birthday-balloon-bouquet",
      "slug": "golden-glow-birthday-balloon-bouquet",
      "title": "Golden Glow Birthday Balloon Bouquet",
      "categoryId": "balloon-bouquets",
      "subcategoryId": "birthday-bouquet",
      "discountedPrice": 1999,
      "originalPrice": 2499,
      "rating": 4.7,
      "reviewsCount": 107,
      "primaryImage": "https://cdn.balloondekor.com/48/golden-glow-birthday-balloon-bouquet-2.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/48/golden-glow-birthday-balloon-bouquet-2.webp",
          "https://cdn.balloondekor.com/48/golden-glow-birthday-balloon-bouquet.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Golden Glow Birthday Balloon Bouquet is a compact, cheerful gift-style arrangement featuring 20 balloons, two small star foils, and a customized confetti balloon printed with Happy Birthday for a personal touch. It's a lovely surprise to send or bring along to a birthday celebration, small enough to carry easily but full enough to make an impact. Choose from a cool blue-white-silver palette, a soft pink-white-rose gold mix, or a playful purple-pink-white combination to suit the birthday person's taste. This bouquet suits home celebrations, office desks, or as a thoughtful add-on gift alongside a cake. Perfect for birthdays or small surprise get-togethers. Order this bouquet to add instant joy to someone's special day.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "20 Balloons",
          "2 Small Star Foil",
          "1 Customized Happy Birthday Written Confetti Balloon"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-audi-rose-bridal-car-decoration",
      "slug": "audi-rose-bridal-car-decoration",
      "title": "Audi Rose Bridal Car Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 4799,
      "originalPrice": 5499,
      "rating": 4.9,
      "reviewsCount": 44,
      "primaryImage": "https://cdn.balloondekor.com/35/1739435443848.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/35/1739435443848.webp",
          "https://cdn.balloondekor.com/35/1739435444461.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Styled for an Audi, this bridal car decoration pairs classic rose flowers with pink net cloth for a romantic, well-balanced finish that suits the car's sleek lines nicely. It's a simple yet polished choice for the wedding day vehicle, whether used for the bride's arrival or the couple's departure after the ceremony. The car itself is not included in this package, only the rose and net cloth decoration service. Pink and rose tones together give the setup a soft, celebratory feel without being overly bold. Book this Audi rose car decoration for a wedding day ride that looks effortlessly elegant.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Rose Flower Decoration",
          "Pink Net Cloth Decoration"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car"
      ]
  }),
  makeProduct({
      "id": "prod-premium-wedding-car-decoration",
      "slug": "premium-wedding-car-decoration",
      "title": "Premium Wedding Car Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 11999,
      "originalPrice": 13999,
      "rating": 4.7,
      "reviewsCount": 33,
      "primaryImage": "https://cdn.balloondekor.com/35/premium-wedding-car-decoration-1785743735954-302547.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/35/premium-wedding-car-decoration-1785743735954-302547.webp",
          "https://cdn.balloondekor.com/35/premium-wedding-car-decoration-1785743735636-925486.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This top-tier package uses a sequence flower decoration style, arranging blooms in a structured, layered pattern across the car for a polished, distinctly premium finish. It's designed for couples who want their wedding transport to feel as carefully composed as the rest of their big day styling, suited to grand weddings and receptions alike. The vehicle itself is not part of this package, only the sequence floral decoration applied to it. This style creates a fuller, more dramatic visual than a simple bouquet arrangement, standing out well in photographs. Book this premium wedding car decoration for transport that matches the scale of your celebration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Sequence Flower Decoration"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car"
      ]
  }),
  makeProduct({
      "id": "prod-bridal-toyota-car-decoration",
      "slug": "bridal-toyota-car-decoration",
      "title": "Bridal Toyota Car Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 4399,
      "originalPrice": 5499,
      "rating": 4.6,
      "reviewsCount": 32,
      "primaryImage": "https://cdn.balloondekor.com/35/1739363035792.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/35/1739363035792.webp",
          "https://cdn.balloondekor.com/35/1739363036170.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Made to fit a Toyota, this bridal car decoration combines a white and red bouquet with pink ribbon detailing for a bright, festive finish that suits a wedding day departure or arrival beautifully. The mix of colours keeps the look cheerful and celebratory without feeling overdone, making it a popular pick among our simple wedding car packages. This decoration is applied directly to your vehicle as part of the service, adding a lovely finishing touch to the car that carries the newlyweds. It works particularly well for daytime ceremonies where the bright tones stand out clearly. Book this bridal Toyota car decoration and give your wedding ride a cheerful, polished look.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "White & Red Bouquet Decoration",
          "Pink Ribbon Decoration"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-white-car-wedding-decoration",
      "slug": "white-car-wedding-decoration",
      "title": "White Car Wedding Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 9999,
      "originalPrice": 10999,
      "rating": 4.7,
      "reviewsCount": 55,
      "primaryImage": "https://cdn.balloondekor.com/13/1739360251672.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/13/1739360251672.webp",
          "https://cdn.balloondekor.com/35/1739360330472.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This premium decoration uses delicate pink and white roses arranged carefully across the car for a soft, romantic finish that suits a white wedding car particularly well. The gentle colour pairing creates an elegant, photo-ready look for the couple's departure or arrival at the venue. The car itself is not included in this package, only the premium floral decoration service. Pink and white roses together bring a fresh, timeless feel that doesn't compete with the vehicle's own colour, letting the flowers stand out clearly. Book this white car wedding decoration for a refined, romantic touch on your special day.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Delicate pink and white roses"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car"
      ]
  }),
  makeProduct({
      "id": "prod-personalized-wedding-car-floral-decoration",
      "slug": "personalized-wedding-car-floral-decoration",
      "title": "Personalized Wedding Car Floral Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 6499,
      "originalPrice": 6999,
      "rating": 4.6,
      "reviewsCount": 21,
      "primaryImage": "https://cdn.balloondekor.com/35/1739361497095.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/35/1739361497095.webp",
          "https://cdn.balloondekor.com/35/1739361497601.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Kept elegantly simple, this wedding car decoration uses a soft mix of pink and white roses arranged across the bonnet for a gentle, romantic look that suits nearly any wedding theme. It's a lovely option for couples who prefer a softer palette over bold reds or golds for their big day transport. The car itself is not included in this package, only the floral decoration service. Pink and white together give the setup a fresh, delicate feel that photographs beautifully in daylight ceremonies. Book this personalised floral car decoration and let your wedding car reflect the same soft elegance as the rest of your celebration.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Pink & White Rose Decoration"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car"
      ]
  }),
  makeProduct({
      "id": "prod-luxury-rose-wedding-car-decoration",
      "slug": "luxury-rose-wedding-car-decoration",
      "title": "Luxury Rose Wedding Car Decoration",
      "categoryId": "car-decoration",
      "subcategoryId": "wedding-car-decor",
      "discountedPrice": 6999,
      "originalPrice": 8499,
      "rating": 4.6,
      "reviewsCount": 29,
      "primaryImage": "https://cdn.balloondekor.com/35/1739434362964.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/35/1739434362964.webp",
          "https://cdn.balloondekor.com/35/1739434363541.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Centred entirely on roses, this luxury car decoration layers a full rose bouquet with a single rose accent and pink net cloth for a romantic, cohesive finish across the vehicle. It's a strong option for couples who want their wedding car styling to feel deliberately rose-themed rather than a mixed floral arrangement. Please note the car itself is not included, and yellow flowers are specifically excluded from this package to keep the rose theme consistent. The pink net cloth ties the whole look together nicely against the roses. Book this luxury rose car decoration for a wedding ride that stays true to a classic, romantic theme.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Rose Bouquet Decoration",
          "Single Rose Decoration",
          "Pink Net Cloth Decoration"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car",
          "Yellow Flowers"
      ]
  }),
  makeProduct({
      "id": "prod-surprise-birthday-car-decor",
      "slug": "surprise-birthday-car-decor",
      "title": "Surprise Birthday Car Decor",
      "categoryId": "car-decoration",
      "subcategoryId": "car-boot-decor",
      "discountedPrice": 2599,
      "originalPrice": 2999,
      "rating": 4.9,
      "reviewsCount": 148,
      "primaryImage": "https://cdn.balloondekor.com/18/1734427103337.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/18/1734427103337.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Surprise Birthday Car Decor is one of the fuller car boot setups, with a frill curtain, eight photos, a Happy Birthday bunting, an age foil, a battery light, a heart-shaped foil balloon, forty balloons, and frill ribbons finishing the edges. It's built for birthday surprises, combining photos and balloons in one reveal rather than just one or the other. Choose from combinations like black and gold, gold and silver with black, peach-white-gold, or a soft pink-white-rose gold mix. Any parking spot works: a housing complex, office lot, or a roadside stop en route to dinner. Add a cake or bouquet for a bigger reveal. Reserve it ahead so everything is ready before the pickup.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          " 1 Frill Curtain ",
          " 8 Photos ",
          " Happy Birthday Bunting ",
          " Age Foil ",
          " 1 Battery Light ",
          " 1 Heart-Shape Foil Balloon ",
          " 40 Balloons ",
          " Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Cake"
      ]
  }),
  makeProduct({
      "id": "prod-surprise-trunk-party-decor",
      "slug": "surprise-trunk-party-decor",
      "title": "Surprise Trunk Party Decor",
      "categoryId": "car-decoration",
      "subcategoryId": "car-boot-decor",
      "discountedPrice": 2199,
      "originalPrice": 2399,
      "rating": 4.9,
      "reviewsCount": 1118,
      "primaryImage": "https://cdn.balloondekor.com/18/1747734501575.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/18/1747734501575.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Surprise Trunk Party Decor makes the most of a small space, with a Happy Birthday banner, eight hanging photos, a frill curtain backdrop, and 30 balloons packed into the car boot for a full party feel in miniature. It suits both birthday and anniversary surprises, especially when you want the moment of opening the boot to feel like unveiling a proper party. The frill curtain gives the display a finished, backdrop-like look rather than just balloons scattered inside. Colours available include red-green-white, black-white, black-white-silver, blue-white-silver, peach-white-golden, pink-white-rosegold, purple-white, red-gold, red-white, and red-black, so the palette can be matched to the celebration. Note the car itself is not included. Book this trunk party setup and make the surprise moment count.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Happy Birthday Banner",
          "8 Hanging Photos",
          "Frill Curtain",
          "30 Balloon Decoration "
      ],
      "excludedItems": [
          "No Helium Gas",
          "Car"
      ],
      "themeColors": [
          "Black, White",
          "Blue, White",
          "Rose Gold, White",
          "Gold, White"
      ]
  }),
  makeProduct({
      "id": "prod-cafe-opening-entrance-decoration",
      "slug": "cafe-opening-entrance-decoration",
      "title": "Cafe Opening Entrance Decoration",
      "categoryId": "corporate-events",
      "subcategoryId": "shop-opening",
      "discountedPrice": 3199,
      "originalPrice": 4099,
      "rating": 4.4,
      "reviewsCount": 45,
      "primaryImage": "https://cdn.balloondekor.com/38/1746792523008.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/1746792523008.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Cafe Opening Entrance Decoration is built for food and beverage launches, pairing a 250-balloon entrance gate with an extra 50 balloons for styling inside the cafe itself. It gives you a decorated doorway to pull in foot traffic, plus enough balloons left over to brighten counters, seating corners, or a photo wall inside. Choose between a sleek black-white-silver combination or a dark blue, light blue, and white mix, depending on your cafe's branding. This setup suits cafes, small restaurants, and bakery launches where both the entrance and interior need to feel celebratory. It's an easy way to make opening day feel special for walk-in customers too. Book this package ahead of your launch date.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "250 Pc Balloon Gate",
          "50 Balloon For Inside Decoration"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-entrance-balloon-gate-for-shop-opening",
      "slug": "entrance-balloon-gate-for-shop-opening",
      "title": "Entrance Balloon Gate For Shop Opening",
      "categoryId": "corporate-events",
      "subcategoryId": "shop-opening",
      "discountedPrice": 5499,
      "originalPrice": 6999,
      "rating": 4.8,
      "reviewsCount": 78,
      "primaryImage": "https://cdn.balloondekor.com/38/1746779273153.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/1746779273153.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "For a shop opening that really announces itself, this Entrance Balloon Gate For Shop Opening uses a full 350-piece mixed balloon arch to frame your doorway. It's built for launch-day celebrations where you want the entrance to be the first thing people notice from the street. Pick from a bright red-green-white combination for a festive pop of colour, a cleaner blue-white-silver look, or a dark blue and light blue mix with white for a softer finish. This larger gate suits wide shop fronts, mall entrances, and showroom doorways, giving passers-by a clear signal that something new has opened. It also works well alongside a ribbon-cutting ceremony. Book this gate to make your opening day entrance impossible to miss.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "350 Pc Mix Balloon Gate"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-corporate-gala-balloon-decoration",
      "slug": "corporate-gala-balloon-decoration",
      "title": "Corporate Gala Balloon Decoration",
      "categoryId": "corporate-events",
      "subcategoryId": "corporate-gala",
      "discountedPrice": 10999,
      "originalPrice": 12999,
      "rating": 4.2,
      "reviewsCount": 30,
      "primaryImage": "https://cdn.balloondekor.com/38/1746872844239.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/1746872844239.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Corporate Gala Balloon Decoration is built for bigger, more formal business events, pairing a fully customized backdrop with 250 balloons arranged across it for a rich, full look. It suits corporate galas, award nights, and larger office celebrations where the backdrop needs to hold its own in photographs. Choose between a bold red-black combination for a dramatic, formal feel, or white-golden for something more elegant and understated. The backdrop can be customized with your company name, event title, or branding so the space feels designed for your evening. It works well in banquet halls, hotel ballrooms, and larger conference venues. Reach out with your event details so we can plan it together.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Customized Backdrop",
          "250 Pc Balloon On Backdrop"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-shop-opening-decoration",
      "slug": "shop-opening-decoration",
      "title": "Shop Opening Decoration",
      "categoryId": "corporate-events",
      "subcategoryId": "shop-opening",
      "discountedPrice": 2999,
      "originalPrice": 3699,
      "rating": 4.9,
      "reviewsCount": 84,
      "primaryImage": "https://cdn.balloondekor.com/38/shop-opening-decoration-1785758185263-894988.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/shop-opening-decoration-1785758185263-894988.webp",
          "https://cdn.balloondekor.com/38/shop-opening-decoration-1785758184960-855214.webp",
          "https://cdn.balloondekor.com/38/shop-opening-decoration-1785758184503-863166.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Shop Opening Decoration announces your launch in style with a grand balloon gate made of 300 balloons at the entrance and another 100 balloons arranged in bunches inside, finished with frill ribbons throughout. Built for corporate events like store launches and shop openings, it creates an inviting, festive entrance that draws customers in from the street. You can match your brand colors by choosing from options like golden-silver-black, orange-white-green, multicolors, or blue-white-silver, or keep it elegant with silver-white-black. It works well at storefronts, showrooms, or office entrances where first impressions matter most. Pair it with a ribbon-cutting moment for extra ceremony. Book this decoration to give your shop opening the grand welcome it deserves.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Balloon Gate of 300 Balloons",
          "100 Balloons inside ((bunches)",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-balloon-gate-for-shop-opening",
      "slug": "balloon-gate-for-shop-opening",
      "title": "Balloon Gate For Shop Opening",
      "categoryId": "corporate-events",
      "subcategoryId": "shop-opening",
      "discountedPrice": 2499,
      "originalPrice": 3499,
      "rating": 4,
      "reviewsCount": 34,
      "primaryImage": "https://cdn.balloondekor.com/38/balloon-gate-for-shop-opening-2.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/balloon-gate-for-shop-opening-2.webp",
          "https://cdn.balloondekor.com/38/balloon-gate-for-shop-opening.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Announce your shop opening in style with this 250-piece balloon gate designed to frame your entrance and pull in every passer-by. It's an easy, budget-friendly way to mark a launch, re-opening, or any corporate event where you want the doorway to feel like an occasion. You can choose the palette that fits your brand or storefront, with options like black and gold, black and silver, a cool dark blue-light blue-white combination, or an all-gold look for a richer finish. The gate suits shopfronts, showroom entrances, and office doorways equally well, and pairs nicely with a ribbon-cutting moment or a welcome standee. Let us know your preferred colours and we'll set it up before your doors open.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "250 Pc Balloon Gate"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-complete-office-balloon-decoration",
      "slug": "complete-office-balloon-decoration",
      "title": "Complete Office Balloon Decoration",
      "categoryId": "corporate-events",
      "subcategoryId": "corporate-gala",
      "discountedPrice": 4999,
      "originalPrice": 5999,
      "rating": 5,
      "reviewsCount": 262,
      "primaryImage": "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration-5.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration-5.webp",
          "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration.webp",
          "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration-2.webp",
          "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration-3.webp",
          "https://cdn.balloondekor.com/38/luxury-office-balloon-decoration-4.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Complete Office Balloon Decoration is an office setup for an office reception, workstation bay or cafeteria. What you get: 300 balloons and frill ribbons. Book a morning slot so the setup is finished before the team arrives. A verified decorator sets it up in the time window you book, and all materials, delivery and setup are included in the price. Pick your city above to check the price and book a slot.",
      "includedItems": [
          "300 Balloons for Office Decoration",
          "Frill Ribbons"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-balloon-party-setup",
      "slug": "halloween-balloon-party-setup",
      "title": "Halloween Balloon Party Setup",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 2799,
      "originalPrice": 3499,
      "rating": 4.6,
      "reviewsCount": 56,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-balloon-party-setup.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-balloon-party-setup.webp",
          "https://cdn.balloondekor.com/86/halloween-balloon-party-setup-3.webp",
          "https://cdn.balloondekor.com/86/halloween-balloon-party-setup-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "200 Balloons for Arch Decoration",
          "Letter Foil Balloon"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-party-balloon-decor",
      "slug": "halloween-party-balloon-decor",
      "title": "Halloween Party Balloon Decor",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 2799,
      "originalPrice": 3599,
      "rating": 4.8,
      "reviewsCount": 31,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-party-balloon-decor-3.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-party-balloon-decor-3.webp",
          "https://cdn.balloondekor.com/86/halloween-party-balloon-decor-2.webp",
          "https://cdn.balloondekor.com/86/halloween-party-balloon-decor.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "150 Balloons for Arch Decoration",
          "Letter Foil Balloons",
          "Fairy Light"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-party-ring-decoration",
      "slug": "halloween-party-ring-decoration",
      "title": "Halloween Party Ring Decoration",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 5499,
      "originalPrice": 6599,
      "rating": 4.7,
      "reviewsCount": 7,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-party-ring-decoration-4.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-party-ring-decoration-4.webp",
          "https://cdn.balloondekor.com/86/halloween-party-ring-decoration-3.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "Customized Ring Backdrop with Stand",
          "230 Balloons for Backdrop Decoration"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-simple-halloween-ghost-decoration",
      "slug": "simple-halloween-ghost-decoration",
      "title": "Simple Halloween Ghost Decoration",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 2699,
      "originalPrice": 3399,
      "rating": 5,
      "reviewsCount": 92,
      "primaryImage": "https://cdn.balloondekor.com/86/simple-halloween-ghost-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/simple-halloween-ghost-decoration.webp",
          "https://cdn.balloondekor.com/86/simple-halloween-ghost-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "180 Balloons for Arch Decoration",
          "20 Balloons on Floor",
          "Letter Foil Balloons",
          "Ghost Stickers",
          "Frill Curtains"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-trick-or-treat-decoration",
      "slug": "halloween-trick-or-treat-decoration",
      "title": "Halloween Trick or Treat Decoration",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 7499,
      "originalPrice": 8999,
      "rating": 4.9,
      "reviewsCount": 55,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-trick-or-treat-backdrop-decoration-3.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-trick-or-treat-backdrop-decoration-3.webp",
          "https://cdn.balloondekor.com/86/halloween-trick-or-treat-backdrop-decoration.webp",
          "https://cdn.balloondekor.com/86/halloween-trick-or-treat-backdrop-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "Customized Arch Backdrop with Stand",
          "200 Balloons for Backdrop Decoration",
          "5 Bat Stickers",
          "1 Pumpkin Cutouts"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-spooky-halloween-decor-at-home",
      "slug": "spooky-halloween-decor-at-home",
      "title": "Spooky Halloween Decor at Home",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 5499,
      "originalPrice": 6599,
      "rating": 5,
      "reviewsCount": 19,
      "primaryImage": "https://cdn.balloondekor.com/86/spooky-halloween-decor-at-home-3.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/spooky-halloween-decor-at-home-3.webp",
          "https://cdn.balloondekor.com/86/spooky-halloween-decor-at-home-2.webp",
          "https://cdn.balloondekor.com/86/spooky-halloween-decor-at-home.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "Customized Ring Backdrop with Stand",
          "200 Balloons for Backdrop Decoration"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-house-party-decor",
      "slug": "halloween-house-party-decor",
      "title": "Halloween House Party Decor",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 3999,
      "originalPrice": 4599,
      "rating": 4.6,
      "reviewsCount": 43,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-house-party-decor-3.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-house-party-decor-3.webp",
          "https://cdn.balloondekor.com/86/halloween-house-party-decor-2.webp",
          "https://cdn.balloondekor.com/86/halloween-house-party-decor.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "Customized Flex Backdrop",
          "200 Balloons for Backdrop Decoration"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-halloween-ghost-theme-balloon-setup",
      "slug": "halloween-ghost-theme-balloon-setup",
      "title": "Halloween Ghost Theme Balloon Setup",
      "categoryId": "halloween-decor",
      "subcategoryId": "halloween-party",
      "discountedPrice": 3999,
      "originalPrice": 4699,
      "rating": 4.9,
      "reviewsCount": 68,
      "primaryImage": "https://cdn.balloondekor.com/86/halloween-ghost-theme-balloon-setup.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/86/halloween-ghost-theme-balloon-setup.webp",
          "https://cdn.balloondekor.com/86/halloween-ghost-theme-balloon-setup-2.webp",
          "https://cdn.balloondekor.com/86/halloween-ghost-theme-balloon-setup-3.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "Customized Flex Backdrop",
          "200 Balloons for Backdrop Decoration"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-traditional-annaprashan-marigold-floral-decoration",
      "slug": "traditional-annaprashan-marigold-floral-decoration",
      "title": "Traditional Annaprashan Marigold Floral Decoration",
      "categoryId": "festive-special",
      "subcategoryId": "annaprashan-decor",
      "discountedPrice": 4999,
      "originalPrice": 5999,
      "rating": 5,
      "reviewsCount": 211,
      "primaryImage": "https://cdn.balloondekor.com/46/traditional-marigold-floral-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/46/traditional-marigold-floral-decoration.webp",
          "https://cdn.balloondekor.com/46/traditional-marigold-floral-decoration-2.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Traditional Annaprashan Marigold Floral Decoration is an annaprashan setup for the living room or a banquet hall. It comes with an artificial marigold garland for wall support decoration, 10 hanging bells and two fairy lights. The lights keep the setup glowing after sunset and in photos. A verified decorator sets it up in about 1.5 to 2 hours, and all materials, delivery and setup are included in the price. Pick your city above to check the price and book a slot.",
      "includedItems": [
          "Artificial Marigold Garland for Wall Support Decoration",
          "10 Hanging Bells",
          "2 Fairy Lights"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-traditional-diwali-home-decoration",
      "slug": "traditional-diwali-home-decoration",
      "title": "Traditional Diwali Home Decoration",
      "categoryId": "festive-special",
      "subcategoryId": "diwali-decor",
      "discountedPrice": 3999,
      "originalPrice": 4699,
      "rating": 5,
      "reviewsCount": 201,
      "primaryImage": "https://cdn.balloondekor.com/76/traditional-diwali-home-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/76/traditional-diwali-home-decoration.webp",
          "https://cdn.balloondekor.com/76/traditional-diwali-home-decoration-2.webp"
      ],
      "isFeatured": true,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "20 Artificial Hanging Garlands",
          "4 Fairy Lights",
          "9 Cutouts"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-teen-patti-diwali-party-decoration",
      "slug": "teen-patti-diwali-party-decoration",
      "title": "Teen Patti Diwali Party Decoration",
      "categoryId": "festive-special",
      "subcategoryId": "diwali-decor",
      "discountedPrice": 5999,
      "originalPrice": 6599,
      "rating": 5,
      "reviewsCount": 201,
      "primaryImage": "https://cdn.balloondekor.com/76/teen-patti-diwali-party-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/76/teen-patti-diwali-party-decoration.webp",
          "https://cdn.balloondekor.com/76/teen-patti-diwali-party-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "200 Balloons for Arch Decoration",
          "30 Extra Balloons",
          "5 Stickers",
          "One Customizable Flex with ring Stand Support"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-festive-diwali-living-room-decoration",
      "slug": "festive-diwali-living-room-decoration",
      "title": "Festive Diwali Living Room Decoration",
      "categoryId": "festive-special",
      "subcategoryId": "diwali-decor",
      "discountedPrice": 2799,
      "originalPrice": 3499,
      "rating": 5,
      "reviewsCount": 198,
      "primaryImage": "https://cdn.balloondekor.com/76/festive-diwali-living-room-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/76/festive-diwali-living-room-decoration.webp",
          "https://cdn.balloondekor.com/76/festive-diwali-living-room-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "6 Artificial Hanging Garlands",
          "4 Fairy Lights",
          "5 Cutouts"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-diwali-party-decoration-setup",
      "slug": "diwali-party-decoration-setup",
      "title": "Diwali Party Decoration Setup",
      "categoryId": "festive-special",
      "subcategoryId": "bindu-flower-decor",
      "discountedPrice": 5499,
      "originalPrice": 6399,
      "rating": 5,
      "reviewsCount": 177,
      "primaryImage": "https://cdn.balloondekor.com/76/diwali-party-decoration-setup.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/76/diwali-party-decoration-setup.webp",
          "https://cdn.balloondekor.com/76/diwali-party-decoration-setup-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "200 Balloons for Arch Decoration",
          "30 Extra Balloons",
          "6 Stickers",
          "Let's Part Neon",
          "Fairy lights",
          "Ring Stand"
      ],
      "excludedItems": []
  }),
  makeProduct({
      "id": "prod-trendy-canopy-decoration-for-birthday",
      "slug": "trendy-canopy-decoration-for-birthday",
      "title": "Trendy Canopy Decoration for Birthday",
      "categoryId": "romantic-surprises",
      "subcategoryId": "canopy-setup",
      "discountedPrice": 4999,
      "originalPrice": 5499,
      "rating": 4.9,
      "reviewsCount": 288,
      "primaryImage": "https://cdn.balloondekor.com/19/1753684185903.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/19/1753684185903.webp",
          "https://cdn.balloondekor.com/14/trendy-canopy-decoration-for-birthday-2.webp",
          "https://cdn.balloondekor.com/14/trendy-canopy-decoration-for-birthday.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "This trendy canopy decoration sets up a proper cabana on the floor, complete with a sturdy stand, fairy lights strung throughout, and artificial leaves trailing across the top for a natural, boho feel. Balloon pillars made of fifteen balloons each stand at the entrance, topped with heart foils, while an age number foil marks the birthday clearly. Thirty metallic balloons finish the floor with a bit of shine. It's a lovely setup for a bedroom, terrace, or living room corner turned into a private party nook for the day. Add your own cake and a few birthday props once the cabana is in place. Order this canopy decoration for a birthday that feels stylish and intimate.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Lighting on Cabana with Fairy Lights",
          "Cabana on Floor with Stand",
          "Artificial Leaves on the Cabana",
          "Balloon Pillars of 15 Balloons Each with 2 Heart Foils on the Top",
          "Age Number Foil",
          "Floor Decorated with 30 Metallic Balloons"
      ],
      "excludedItems": [
          "No Helium Gas",
          "Cakes",
          "Happ Birthday Box",
          "Flowers"
      ]
  }),
  makeProduct({
      "id": "prod-delightful-balloon-room-decoration",
      "slug": "delightful-balloon-room-decoration",
      "title": "Delightful Balloon Room Decoration",
      "categoryId": "romantic-surprises",
      "subcategoryId": "canopy-setup",
      "discountedPrice": 4599,
      "originalPrice": 4999,
      "rating": 4.9,
      "reviewsCount": 248,
      "primaryImage": "https://cdn.balloondekor.com/23/delightful-balloon-room-decoration-2.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/23/delightful-balloon-room-decoration-2.webp",
          "https://cdn.balloondekor.com/19/1763966425774.webp",
          "https://cdn.balloondekor.com/19/1763966426337.webp",
          "https://cdn.balloondekor.com/19/1763966426564.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Delightful Balloon Room Decoration is built for celebrating love, making it a lovely pick for an anniversary at home. The room comes filled with 150 balloons, a soft net canopy over the bed, an I Love You foil balloon, two heart-shaped foil balloons, and warm fairy lights, all finished with frill ribbons for a romantic glow. It's designed for the bedroom, creating an intimate setting that feels thoughtful rather than over the top. Ideal for wedding anniversaries, dating anniversaries, or simply a surprise to remind your partner how much they mean to you. Add rose petals or candles for extra romance, and let us set the room up in advance so all you need to do is bring them in.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "150 Balloons for Room Decoration",
          "Net Canopy Decoration",
          "I Love You Foil Balloons",
          "2 Heart Shape Foil Balloons",
          "Fairy Light",
          "Frill Ribbons"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-marry-me-car-boot-decoration",
      "slug": "marry-me-car-boot-decoration",
      "title": "Marry Me Car Boot Decoration",
      "categoryId": "romantic-surprises",
      "subcategoryId": "marry-me-proposal",
      "discountedPrice": 1999,
      "originalPrice": 2499,
      "rating": 5,
      "reviewsCount": 188,
      "primaryImage": "https://cdn.balloondekor.com/24/marry-me-car-boot-decoration.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/24/marry-me-car-boot-decoration.webp",
          "https://cdn.balloondekor.com/24/marry-me-car-boot-decoration-2.webp"
      ],
      "isFeatured": false,
      "isBestseller": true,
      "setupDuration": "1 - 1.5 Hours",
      "description": "",
      "includedItems": [
          "30 Balloons for Decoration",
          "I love U Foil Set",
          "Love Foil",
          "Marry Me Banner",
          "2 Battery Lights"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
  makeProduct({
      "id": "prod-heartfelt-proposal-flower-setup",
      "slug": "heartfelt-proposal-flower-setup",
      "title": "Heartfelt Proposal Flower Setup",
      "categoryId": "romantic-surprises",
      "subcategoryId": "marry-me-proposal",
      "discountedPrice": 21999,
      "originalPrice": 23999,
      "rating": 4.8,
      "reviewsCount": 153,
      "primaryImage": "https://cdn.balloondekor.com/images/24/12db3d42-0e76-40bd-b08c-9c0e840261ed.webp",
      "galleryImages": [
          "https://cdn.balloondekor.com/images/24/12db3d42-0e76-40bd-b08c-9c0e840261ed.webp",
          "https://cdn.balloondekor.com/images/24/3ab0a446-03b4-4165-b182-5b9d4c45585f.webp",
          "https://cdn.balloondekor.com/images/24/22825109-bea1-4008-a5e2-7d59c39bd165.webp"
      ],
      "isFeatured": false,
      "isBestseller": false,
      "setupDuration": "1 - 1.5 Hours",
      "description": "Heartfelt Proposal Flower Setup is built for the moment itself, with a heart-shaped backdrop covered in artificial flowers, a glowing Will You Marry Me neon light, and rose petals scattered across the floor to complete the scene. Designed specifically for a proposal, it works beautifully in a living room, a quiet terrace corner, or any space where you want your partner's full attention on the moment rather than a crowd. The heart-shaped backdrop gives the whole setup a clear romantic focal point that photographs beautifully for the memory you'll want to keep. You can add fairy lights or candles to make the space feel even more intimate. Book this premium proposal setup and make the question unforgettable.",
      "includedItems": [
          "All Materials, Setup & Decor Included",
          "Heart Shape Backdrop",
          "Artificial Flowers for Backdrop Decoration",
          "Will You Marry Me Neon Light",
          "Rose Patels For Floor Decoration"
      ],
      "excludedItems": [
          "No Helium Gas"
      ]
  }),
];

// Real Add-Ons from BalloonDekor.com Product Pages (Each with its real CDN photo)
export const SEED_ADDONS: AddOn[] = [
  {
    id: 'addon-age-foil-pillar',
    title: 'Age on Balloon Pillar (per foil)',
    category: 'Balloons & Props',
    price: 199,
    description: 'Large 32-inch metallic number foil balloon mounted on your balloon pillar.',
    image: 'https://cdn.balloondekor.com/15/1734418282607.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-happy-birthday-sash',
    title: 'Happy Birthday Sash',
    category: 'Balloons & Props',
    price: 199,
    description: 'Premium satin celebration sash for the birthday star.',
    image: 'https://cdn.balloondekor.com/15/1734435012322.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-pastel-balloons-25',
    title: 'Pastel Balloons (25 pcs)',
    category: 'Balloons & Props',
    price: 399,
    description: 'Set of 25 extra pastel & metallic ceiling/floor balloons.',
    image: 'https://cdn.balloondekor.com/15/1734435281623.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-hanging-photos-15',
    title: '15 Hanging Photos with Balloons',
    category: 'Photo & Keepsakes',
    price: 599,
    description: '15 custom printed polaroid-style photos clipped to ceiling ribbons with fairy lights.',
    image: 'https://cdn.balloondekor.com/15/1747467504138.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-printed-photos-15',
    title: 'Printed Photos (15 pcs)',
    category: 'Photo & Keepsakes',
    price: 499,
    description: '15 high-gloss printed memory prints for your backdrop or wall collage.',
    image: 'https://cdn.balloondekor.com/15/1734427330582.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-tea-candles-20',
    title: 'Tea Candles (20 pcs)',
    category: 'Lighting & Neon',
    price: 399,
    description: '20 warm flickering LED flameless tea-light candles for table & pathway styling.',
    image: 'https://cdn.balloondekor.com/15/1747467762327.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-butterscotch-cake-500g',
    title: 'Butterscotch Cake (500 gms)',
    category: 'Cakes & Florals',
    price: 799,
    description: 'Freshly baked eggless crunch butterscotch celebration cake (500g).',
    image: 'https://cdn.balloondekor.com/15/1734423544539.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-black-forest-cake-500g',
    title: 'Black Forest Cake (500 gms)',
    category: 'Cakes & Florals',
    price: 799,
    description: 'Classic rich chocolate & cherry eggless Black Forest cake (500g).',
    image: 'https://cdn.balloondekor.com/15/1734423611170.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-welcome-board',
    title: 'Custom Welcome Board',
    category: 'Photo & Keepsakes',
    price: 1699,
    description: 'Personalized easel welcome board with custom name & celebration message.',
    image: 'https://cdn.balloondekor.com/15/1734427490281.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'addon-marry-me-led',
    title: 'Marry Me LED (Rental)',
    category: 'Lighting & Neon',
    price: 2999,
    description: 'Warm white glowing Marry Me / Happy Birthday neon & marquee LED letters.',
    image: 'https://cdn.balloondekor.com/15/1747471156892.webp',
    isMandatory: false,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];

export const SEED_COUPONS: Coupon[] = [
  {
    id: 'UTSAV10',
    code: 'UTSAV10',
    discountType: 'PERCENTAGE',
    discountValue: 10,
    minOrderValue: 1499,
    maxDiscount: 1000,
    expiryDate: '2027-12-31',
    usageLimit: 1000,
    usedCount: 42,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'CELEBRATE500',
    code: 'CELEBRATE500',
    discountType: 'FIXED',
    discountValue: 500,
    minOrderValue: 3499,
    maxDiscount: 500,
    expiryDate: '2027-12-31',
    usageLimit: 1000,
    usedCount: 28,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'WEDDING1500',
    code: 'WEDDING1500',
    discountType: 'FIXED',
    discountValue: 1500,
    minOrderValue: 9999,
    maxDiscount: 1500,
    expiryDate: '2027-12-31',
    usageLimit: 500,
    usedCount: 15,
    isEnabled: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];

export const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-simple-balloon-decor-for-home',
    userId: 'seed-user-1',
    userName: 'Atharv Surana',
    city: 'Bhopal',
    occasion: 'Birthday Decoration',
    rating: 4.9,
    comment:
      'Decoration was awesome and looked exactly like the photo shown on the website. The decorator arrived on time and completed the setup neatly within an hour.',
    createdAt: '2026-11-01T14:30:00.000Z',
  },
  {
    id: 'rev-2',
    productId: 'prod-rose-gold-birthday-home-decor',
    userId: 'seed-user-2',
    userName: 'Priya & Kunal Mehta',
    city: 'Jaipur',
    occasion: 'Birthday Decoration',
    rating: 5.0,
    comment:
      'Booked the Rose Gold Birthday Home Decor for my sister’s birthday. The pastel and chrome balloons looked super rich and they used wall-safe hooks with zero paint marks.',
    createdAt: '2026-10-29T10:15:00.000Z',
  },
  {
    id: 'rev-3',
    productId: 'prod-welcome-baby-princess-decoration',
    userId: 'seed-user-3',
    userName: 'Dr. Sneha Kulkarni',
    city: 'Mumbai',
    occasion: 'Welcome Baby',
    rating: 4.9,
    comment:
      'We booked the Welcome Baby Princess Decoration before bringing our daughter home from the hospital. Everyone in the family loved the pastel pink arch!',
    createdAt: '2026-10-25T16:20:00.000Z',
  },
  {
    id: 'rev-4',
    productId: 'prod-dreamy-baby-shower-balloons',
    userId: 'seed-user-4',
    userName: 'Rohan & Ananya',
    city: 'Udaipur',
    occasion: 'Baby Shower',
    rating: 5.0,
    comment:
      'Booked the Dreamy Baby Shower Balloons setup. Fixed transparent pricing with zero hidden charges and super polite staff.',
    createdAt: '2026-10-20T18:40:00.000Z',
  },
];

export const SEED_DECORATORS: Decorator[] = [
  {
    id: 'dec-jaipur-1',
    name: 'Bindu Flower Rajasthan Team',
    phone: '+91 99835 62406',
    cityId: 'jaipur',
    cityName: 'Jaipur',
    specialty: 'Luxury Sequin, Floral & Organic Arches',
    rating: 4.9,
    isAvailable: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'dec-delhi-1',
    name: 'Karanveer Singh Crew',
    phone: '+91 99835 62406',
    cityId: 'delhi-ncr',
    cityName: 'Delhi NCR',
    specialty: 'Wedding Haldi, Bindu Flower & Canopies',
    rating: 4.9,
    isAvailable: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
  {
    id: 'dec-blr-1',
    name: 'Sanjay & Aarav Studio',
    phone: '+91 99835 62406',
    cityId: 'bengaluru',
    cityName: 'Bengaluru',
    specialty: 'Kids Storybook Themes & Baby Showers',
    rating: 4.8,
    isAvailable: true,
    createdAt: NOW_ISO,
    updatedAt: NOW_ISO,
  },
];
