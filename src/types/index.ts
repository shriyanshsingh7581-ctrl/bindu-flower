export type OrderStatus =
  | 'Pending Payment'
  | 'Payment Received'
  | 'Booking Confirmed'
  | 'Decorator Assigned'
  | 'Preparation Started'
  | 'Decorator On The Way'
  | 'Setup In Progress'
  | 'Completed'
  | 'Cancellation Requested'
  | 'Cancelled'
  | 'Refund Processing'
  | 'Refunded';

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  'Pending Payment',
  'Payment Received',
  'Booking Confirmed',
  'Decorator Assigned',
  'Preparation Started',
  'Decorator On The Way',
  'Setup In Progress',
  'Completed',
];

export interface SubcategoryItem {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  bannerImage: string;
  subcategoriesJson: string; // JSON string of SubcategoryItem[]
  isEnabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFAQ {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewsCount: number;
  setupDuration: string;
  primaryImage: string;
  galleryImages?: string; // JSON string of image URLs
  includedItems: string; // JSON string of string[]
  excludedItems?: string; // JSON string of string[]
  instructions?: string; // JSON string of string[]
  themeColors?: string; // JSON string of string[]
  isTrending?: boolean;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AddOn {
  id: string;
  title: string;
  category: 'Cakes & Florals' | 'Lighting & Neon' | 'Balloons & Props' | 'Photo & Keepsakes';
  price: number;
  image: string;
  description?: string;
  isMandatory: boolean;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  priceMultiplier: number;
  dailySlotCapacity: number;
  sameDayCutoffHour: number;
  blockedDatesJson?: string; // JSON string of YYYY-MM-DD[]
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SelectedCartAddOn {
  addOnId: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  slug: string;
  title: string;
  primaryImage: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  cityId: string;
  cityName: string;
  eventDate: string;
  timeSlot: string;
  venueAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  specialInstructions: string;
  selectedThemeColor: string;
  selectedAddOns: SelectedCartAddOn[];
}

export interface Booking {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  cityId: string;
  cityName: string;
  eventDate: string;
  timeSlot: string;
  venueAddress: string;
  specialInstructions?: string;
  selectedThemeColor?: string;
  itemsSummary: string; // JSON string of booked items
  addOnsSummary?: string; // JSON string of booked add-ons
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMode: 'FULL' | 'ADVANCE';
  amountPaid: number;
  balanceDue: number;
  paymentStatus:
    | 'PENDING'
    | 'PARTIAL_VERIFIED'
    | 'PAID_VERIFIED'
    | 'REFUND_PROCESSING'
    | 'REFUNDED'
    | 'FAILED';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  orderStatus: OrderStatus;
  assignedDecoratorId?: string;
  assignedDecoratorName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  city: string;
  occasion?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  orderNumber?: string;
  requestType: 'GENERAL' | 'RESCHEDULE' | 'CANCELLATION' | 'PARTNER';
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
}

export interface Decorator {
  id: string;
  name: string;
  phone: string;
  cityId: string;
  cityName: string;
  specialty: string;
  rating: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  defaultCity?: string;
  savedAddresses?: string; // JSON string of SavedAddress[]
  wishlist?: string; // JSON string of productId[]
  createdAt: string;
  updatedAt: string;
}

export interface SavedAddress {
  id: string;
  label: string;
  fullAddress: string;
  city: string;
  pincode: string;
}

export interface WebsiteSetting {
  id: string;
  brandName: string;
  announcementText: string;
  supportPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  advancePercentage: number;
  allowAdvancePayment: boolean;
  cancellationPolicySummary: string;
  updatedAt: string;
}
