import { 
  UserProfile, 
  UserRole, 
  WasteItem, 
  InnovationItem, 
  MatchmakingItem, 
  SupplyRequestRecord, 
  ReviewItem, 
  TutorialProgress,
  FacilityItem 
} from '../types';
import { initialWasteData } from '../data/wasteDictionary';
import { initialInnovationData } from '../data/innovationCatalog';
import { initialMatchmakingData } from '../data/matchmakingData';
import { initialReviewsData } from '../data/reviewsData';
import { initialFacilitiesData } from '../data/facilitiesData';

// Storage Keys
const KEYS = {
  USERS: 'w2w_users_v2',
  CURRENT_USER: 'w2w_current_user_v2',
  WASTE: 'w2w_waste_v2',
  INNOVATIONS: 'w2w_innovations_v2',
  MATCHMAKING: 'w2w_matchmaking_v2',
  SUPPLY_REQUESTS: 'w2w_supply_requests_v2',
  REVIEWS: 'w2w_reviews_v2',
  TUTORIAL_PROGRESS: 'w2w_tutorial_progress_v2',
  FACILITIES: 'w2w_facilities_v2',
};

export const guestUser: UserProfile = {
  id: 'guest',
  name: 'Pengunjung (Tamu)',
  email: '-',
  role: 'user',
  roleLabel: 'Guest / Belum Login',
  organization: '-',
  phone: '-'
};

// Initial default user profiles for quick testing
const defaultUsers: UserProfile[] = [
  {
    id: 'user-pelajar-1',
    name: 'Muhammad Raihan',
    email: 'raihan@pelajar.id',
    role: 'user',
    roleLabel: 'Siswa / Mahasiswa',
    organization: 'SMKN 1 Cikarang - Jurusan Kimia Industri',
    phone: '0812-3456-7890',
  },
  {
    id: 'user-industry-1',
    name: 'Dian Prasetyo, S.T.',
    email: 'csr@sinarnusantara-apparel.co.id',
    role: 'industry',
    roleLabel: 'Pabrik Industri (Penyedia)',
    organization: 'PT Sinar Nusantara Garmen Ltd.',
    phone: '0811-2345-6789',
  },
  {
    id: 'user-umkm-1',
    name: 'Ibu Ratna Dewi',
    email: 'koperasi.perca.kartini@gmail.com',
    role: 'umkm',
    roleLabel: 'Pengrajin UMKM',
    organization: 'Koperasi Pengrajin Perca Mandiri Kartini Solo',
    phone: '0822-1122-3344',
  },
  {
    id: 'user-admin-1',
    name: 'Admin Kurator Nasional',
    email: 'admin@waste2wisdom.id',
    role: 'admin',
    roleLabel: 'Admin / Kurator Nasional',
    organization: 'Kementerian Lingkungan Hidup & Kehutanan / Waste2Wisdom',
    phone: '0812-0000-9999',
  }
];

// Initial default supply requests
const defaultSupplyRequests: SupplyRequestRecord[] = [
  {
    id: 'req-101',
    partnerId: 'match-ind-1',
    partnerName: 'PT Sinar Nusantara Garmen Ltd.',
    targetType: 'industry_supplier',
    requesterId: 'user-umkm-1',
    requesterName: 'Ibu Ratna Dewi',
    organizationName: 'Koperasi Pengrajin Perca Mandiri Kartini',
    phone: '0822-1122-3344',
    email: 'koperasi.perca.kartini@gmail.com',
    wasteType: 'Kain Perca Katun & Denim Grade A',
    requestedVolume: '350 kg / Bulan',
    pickupMethod: 'Ambil Langsung dengan Armada Sendiri',
    intendedProduct: 'Produksi Tote Bag dan Pouch Etnik untuk Ekspor',
    status: 'accepted',
    statusNote: 'Disetujui. Tim logistik siap menerima kedatangan armada setiap hari Selasa pukul 10.00 WIB.',
    createdAt: '10 Februari 2026',
    updatedAt: '12 Februari 2026'
  },
  {
    id: 'req-102',
    partnerId: 'match-ind-2',
    partnerName: 'PT Mahoni Indah Woodcraft',
    targetType: 'industry_supplier',
    requesterId: 'user-pelajar-1',
    requesterName: 'Muhammad Raihan',
    organizationName: 'SMKN 1 Cikarang',
    phone: '0812-3456-7890',
    email: 'raihan@pelajar.id',
    wasteType: 'Serbuk Gergaji Kayu Sengon & Jati',
    requestedVolume: '100 kg / Bulan',
    pickupMethod: 'Kirim via Ekspedisi Kargo',
    intendedProduct: 'Praktikum Pembuatan Panel Akustik Ramah Lingkungan di Lab Sekolah',
    status: 'pending',
    statusNote: 'Menunggu konfirmasi ketersediaan armada jemput pabrik.',
    createdAt: '15 Maret 2026'
  }
];

// Helper to delay execution (simulates network latency)
const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper for localStorage get & set with defaults
function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving to localStorage key: ${key}`, err);
  }
}

// -------------------------------------------------------------
// CENTRAL SERVICE & API MODULE
// -------------------------------------------------------------
export const api = {
  
  // AUTH SERVICE
  auth: {
    async getCurrentUser(): Promise<UserProfile> {
      await delay(100);
      const user = getStorage<UserProfile>(KEYS.CURRENT_USER, guestUser);
      return user;
    },

    async setCurrentUser(user: UserProfile): Promise<UserProfile> {
      await delay(120);
      setStorage(KEYS.CURRENT_USER, user);
      return user;
    },

    async getDemoUsers(): Promise<UserProfile[]> {
      await delay(80);
      return getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
    },

    async login(email: string, role?: UserRole): Promise<UserProfile> {
      await delay(200);
      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      let matched = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

      if (!matched) {
        // Auto-create for demo convenience if email is new
        const roleLabel = role === 'industry' ? 'Pabrik Industri' : role === 'umkm' ? 'Pengrajin UMKM' : role === 'admin' ? 'Admin Kurator' : 'Siswa / Mahasiswa';
        matched = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0],
          email,
          role: role || 'user',
          roleLabel,
          organization: 'Komunitas Penggiat Daur Ulang Mandiri',
        };
        const updatedUsers = [...users, matched];
        setStorage(KEYS.USERS, updatedUsers);
      }

      setStorage(KEYS.CURRENT_USER, matched);
      return matched;
    },

    async register(name: string, email: string, role: UserRole, organization: string, phone: string): Promise<UserProfile> {
      await delay(250);
      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      
      const roleLabel = role === 'industry' ? 'Pabrik Industri' : role === 'umkm' ? 'Pengrajin UMKM' : role === 'admin' ? 'Admin' : 'Siswa / Mahasiswa';

      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        roleLabel,
        organization,
        phone
      };

      const updated = [...users, newUser];
      setStorage(KEYS.USERS, updated);
      setStorage(KEYS.CURRENT_USER, newUser);
      return newUser;
    },

    async updateProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
      await delay(180);
      const current = getStorage<UserProfile>(KEYS.CURRENT_USER, defaultUsers[0]);
      const updated = { ...current, ...profile };
      setStorage(KEYS.CURRENT_USER, updated);

      const users = getStorage<UserProfile[]>(KEYS.USERS, defaultUsers);
      const updatedUsers = users.map((u) => (u.id === current.id ? updated : u));
      setStorage(KEYS.USERS, updatedUsers);

      return updated;
    },

    async logout(): Promise<void> {
      await delay(100);
      // Reset to default guest user
      setStorage(KEYS.CURRENT_USER, guestUser);
    }
  },

  // WASTE DICTIONARY SERVICE
  waste: {
    async getAll(): Promise<WasteItem[]> {
      await delay(150);
      return getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
    },

    async getById(id: string): Promise<WasteItem | null> {
      await delay(100);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      return list.find((w) => w.id === id) || null;
    },

    async create(item: Omit<WasteItem, 'id'>): Promise<WasteItem> {
      await delay(200);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      const newItem: WasteItem = {
        ...item,
        id: `w-${Date.now()}`
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.WASTE, updated);
      return newItem;
    },

    async delete(id: string): Promise<void> {
      await delay(150);
      const list = getStorage<WasteItem[]>(KEYS.WASTE, initialWasteData);
      const updated = list.filter((w) => w.id !== id);
      setStorage(KEYS.WASTE, updated);
    }
  },

  // INNOVATION MARKETPLACE SERVICE
  innovations: {
    async getAll(): Promise<InnovationItem[]> {
      await delay(150);
      const innovations = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const reviews = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      
      return innovations.map(inv => {
        const invReviews = reviews.filter(r => r.innovationId === inv.id);
        const reviewCount = invReviews.length;
        const rating = reviewCount > 0 
          ? Number((invReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)) 
          : 0;
        return { ...inv, rating, reviewCount };
      });
    },

    async getById(id: string): Promise<InnovationItem | null> {
      await delay(100);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const reviews = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      const inv = list.find((i) => i.id === id);
      if (!inv) return null;

      const invReviews = reviews.filter(r => r.innovationId === inv.id);
      const reviewCount = invReviews.length;
      const rating = reviewCount > 0 
        ? Number((invReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)) 
        : 0;
      return { ...inv, rating, reviewCount };
    },

    async create(item: Omit<InnovationItem, 'id' | 'status' | 'rating' | 'reviewCount' | 'successRate'>): Promise<InnovationItem> {
      await delay(220);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const newItem: InnovationItem = {
        ...item,
        id: `inv-${Date.now()}`,
        status: 'pending',
        rating: 0,
        reviewCount: 0,
        successRate: null,
        submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.INNOVATIONS, updated);
      return newItem;
    },

    async approve(id: string): Promise<InnovationItem> {
      await delay(180);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      let target: InnovationItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            status: 'verified' as const, 
            moderationDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Innovation not found');
      setStorage(KEYS.INNOVATIONS, updated);
      return target;
    },

    async reject(id: string, reason: string): Promise<InnovationItem> {
      await delay(180);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      let target: InnovationItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            status: 'rejected' as const, 
            rejectionReason: reason,
            moderationDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Innovation not found');
      setStorage(KEYS.INNOVATIONS, updated);
      return target;
    },

    async delete(id: string): Promise<void> {
      await delay(150);
      const list = getStorage<InnovationItem[]>(KEYS.INNOVATIONS, initialInnovationData);
      const updated = list.filter((item) => item.id !== id);
      setStorage(KEYS.INNOVATIONS, updated);
    },

    // TUTORIAL STEP PROGRESS TRACKING
    async getProgress(userId: string, innovationId: string): Promise<number[]> {
      const all = getStorage<Record<string, number[]>>(KEYS.TUTORIAL_PROGRESS, {});
      const key = `${userId}_${innovationId}`;
      return all[key] || [];
    },

    async toggleStep(userId: string, innovationId: string, stepNumber: number): Promise<number[]> {
      const all = getStorage<Record<string, number[]>>(KEYS.TUTORIAL_PROGRESS, {});
      const key = `${userId}_${innovationId}`;
      const current = all[key] || [];
      const updated = current.includes(stepNumber)
        ? current.filter((s) => s !== stepNumber)
        : [...current, stepNumber].sort((a, b) => a - b);
      
      all[key] = updated;
      setStorage(KEYS.TUTORIAL_PROGRESS, all);
      return updated;
    }
  },

  // MATCHMAKING & SUPPLY REQUEST SERVICE
  matchmaking: {
    async getPartners(): Promise<MatchmakingItem[]> {
      await delay(150);
      return getStorage<MatchmakingItem[]>(KEYS.MATCHMAKING, initialMatchmakingData);
    },

    async createListing(item: Omit<MatchmakingItem, 'id'>): Promise<MatchmakingItem> {
      await delay(200);
      const list = getStorage<MatchmakingItem[]>(KEYS.MATCHMAKING, initialMatchmakingData);
      const newItem: MatchmakingItem = {
        ...item,
        id: `match-${Date.now()}`
      };
      const updated = [newItem, ...list];
      setStorage(KEYS.MATCHMAKING, updated);
      return newItem;
    },

    async getSupplyRequests(): Promise<SupplyRequestRecord[]> {
      await delay(150);
      return getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
    },

    async sendSupplyRequest(req: Omit<SupplyRequestRecord, 'id' | 'status' | 'createdAt'>): Promise<SupplyRequestRecord> {
      await delay(220);
      const list = getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
      const newRecord: SupplyRequestRecord = {
        ...req,
        id: `req-${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
      };
      const updated = [newRecord, ...list];
      setStorage(KEYS.SUPPLY_REQUESTS, updated);
      return newRecord;
    },

    async updateRequestStatus(id: string, status: SupplyRequestRecord['status'], note?: string): Promise<SupplyRequestRecord> {
      await delay(180);
      const list = getStorage<SupplyRequestRecord[]>(KEYS.SUPPLY_REQUESTS, defaultSupplyRequests);
      let target: SupplyRequestRecord | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { 
            ...item, 
            status, 
            statusNote: note || item.statusNote,
            updatedAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
          };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Request not found');
      setStorage(KEYS.SUPPLY_REQUESTS, updated);
      return target;
    }
  },

  // EVALUATION & REVIEWS SERVICE
  reviews: {
    async getAll(): Promise<ReviewItem[]> {
      await delay(150);
      return getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
    },

    async create(review: Omit<ReviewItem, 'id' | 'createdAt' | 'likes'>): Promise<ReviewItem> {
      await delay(200);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);

      // Check if user already reviewed this product (prevent duplicate spam)
      const existing = list.find((r) => r.userId === review.userId && r.innovationId === review.innovationId);
      if (existing) {
        throw new Error('Anda sudah memberikan evaluasi untuk produk inovasi ini. Anda dapat menyunting atau memperbarui ulasan Anda.');
      }

      const newReview: ReviewItem = {
        ...review,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        likes: 1
      };

      const updated = [newReview, ...list];
      setStorage(KEYS.REVIEWS, updated);
      return newReview;
    },

    async like(id: string): Promise<ReviewItem> {
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      let target: ReviewItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { ...item, likes: item.likes + 1 };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Review not found');
      setStorage(KEYS.REVIEWS, updated);
      return target;
    },

    async report(id: string, reason: string): Promise<ReviewItem> {
      await delay(150);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      let target: ReviewItem | null = null;

      const updated = list.map((item) => {
        if (item.id === id) {
          target = { ...item, isReported: true, reportReason: reason };
          return target;
        }
        return item;
      });

      if (!target) throw new Error('Review not found');
      setStorage(KEYS.REVIEWS, updated);
      return target;
    },

    async delete(id: string): Promise<void> {
      await delay(150);
      const list = getStorage<ReviewItem[]>(KEYS.REVIEWS, initialReviewsData);
      const updated = list.filter((r) => r.id !== id);
      setStorage(KEYS.REVIEWS, updated);
    }
  },

  // FACILITIES SERVICE
  facilities: {
    async getAll(): Promise<FacilityItem[]> {
      await delay(120);
      return getStorage<FacilityItem[]>(KEYS.FACILITIES, initialFacilitiesData);
    }
  }
};
