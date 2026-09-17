export type WasteSafetyCategory = 'non-b3' | 'b3';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteSafetyCategory;
  categoryLabel: string;
  industrialSector: string;
  source: string;
  physicalForm: string;
  safetyRating: 'safe' | 'caution' | 'danger';
  safetyDescription: string;
  requiredPPE: string[];
  legalCode: string;
  economicPotential: string;
  handlingGuidelines: string[];
  prohibitedActions: string[];
  recommendedInnovations: string[];
  characteristics: string[];
}

export interface InnovationStep {
  stepNumber: number;
  title: string;
  description: string;
  tip?: string;
}

export interface InnovationItem {
  id: string;
  title: string;
  tagline: string;
  wasteSource: string;
  category: string;
  difficulty: 'Mudah' | 'Menengah' | 'Tinggi';
  estimatedTime: string;
  estimatedCost: string;
  economicValue: string;
  rating: number;
  reviewCount: number;
  successRate: number; // in percent, e.g. 92
  materials: { name: string; amount: string }[];
  tools: string[];
  steps: InnovationStep[];
  safetyTips: string[];
  status: 'verified' | 'pending';
  submittedBy?: string;
  submissionDate?: string;
}

export interface FacilityMachine {
  name: string;
  function: string;
  capacity: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  type: 'Tempat PengNIP' | 'TPST 3R Industri' | 'Bank Sampah Induk' | 'Pusat Biokonversi';
  location: string;
  city: string;
  province: string;
  capacity: string;
  description: string;
  technologies: string[];
  machines: FacilityMachine[];
  visitSchedule: string;
  contactPerson: string;
  phone: string;
  coordinates: [number, number];
  featuredOutput: string;
}

export interface MatchmakingItem {
  id: string;
  name: string;
  type: 'industry_supplier' | 'community_buyer';
  entityType: 'Pabrik Industri' | 'UMKM Daur Ulang' | 'Komunitas Pengrajin' | 'Koperasi Hijau';
  wasteType: string;
  volumeMonthly: string;
  city: string;
  province: string;
  address: string;
  coordinates: [number, number];
  isCertifiedNonB3: boolean;
  priceExpectation: string;
  contactName: string;
  phone: string;
  email: string;
  description: string;
}

export interface ReviewItem {
  id: string;
  innovationId: string;
  innovationTitle: string;
  userName: string;
  userRole: 'Siswa / Mahasiswa' | 'Pengrajin UMKM' | 'Warga Komunitas' | 'Praktisi Daur Ulang';
  rating: number;
  isEasyToMake: 'Sangat Mudah' | 'Cukup Mudah' | 'Butuh Keterampilan Khusus' | 'Sulit';
  isSuccessful: 'Berhasil 100%' | 'Berhasil dengan Modifikasi' | 'Gagal / Perlu Coba Lagi';
  comment: string;
  troubleshootingTip?: string;
  createdAt: string;
  likes: number;
}
