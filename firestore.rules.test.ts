/**
 * Security Rules Verification Suite (Dirty Dozen Payloads)
 * Verifies all 12 adversarial payloads against firestore.rules
 */
export interface DirtyDozenScenario {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedOutcome: 'PERMISSION_DENIED';
  payload?: Record<string, unknown>;
}

export const DIRTY_DOZEN_SCENARIOS: DirtyDozenScenario[] = [
  {
    id: 1,
    name: 'Shadow Field Injection on User Profile',
    collection: '/users/user_1',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      uid: 'user_1',
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      isAdmin: true, // Shadow field blocked by hasOnly
      createdAt: '2026-11-05T07:30:00Z',
      updatedAt: '2026-11-05T07:30:00Z',
    },
  },
  {
    id: 2,
    name: 'Unverified Admin Email Spoof',
    collection: '/products/prod_1',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      discountedPrice: 1,
    },
  },
  {
    id: 3,
    name: 'Cross-User PII Read',
    collection: '/users/user_victim',
    operation: 'get',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 4,
    name: 'Unfiltered Bookings List Scrape',
    collection: '/bookings',
    operation: 'list',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 5,
    name: 'Identity Spoofing on Booking Create',
    collection: '/bookings/bk_101',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      id: 'bk_101',
      userId: 'other_user_uid',
    },
  },
  {
    id: 6,
    name: 'Negative Price Injection on Booking',
    collection: '/bookings/bk_102',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      totalAmount: -2500,
    },
  },
  {
    id: 7,
    name: 'Terminal Booking Mutation After Completion',
    collection: '/bookings/bk_completed',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      orderStatus: 'Cancellation Requested',
    },
  },
  {
    id: 8,
    name: 'Customer Arbitrary Booking Price Edit',
    collection: '/bookings/bk_active',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      totalAmount: 100,
    },
  },
  {
    id: 9,
    name: 'ID Poisoning Attack with Special Characters',
    collection: '/reviews/bad$id!@#',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
  },
  {
    id: 10,
    name: 'Denial-of-Wallet Oversized String in Review',
    collection: '/reviews/rev_1',
    operation: 'create',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      comment: 'A'.repeat(2500),
    },
  },
  {
    id: 11,
    name: 'Immutable CreatedAt Mutation on User Profile',
    collection: '/users/user_1',
    operation: 'update',
    expectedOutcome: 'PERMISSION_DENIED',
    payload: {
      createdAt: '2099-01-01T00:00:00Z',
    },
  },
  {
    id: 12,
    name: 'Unauthorized Product Price Tampering by Customer',
    collection: '/products/prod_rosegold',
    operation: 'delete',
    expectedOutcome: 'PERMISSION_DENIED',
  },
];
