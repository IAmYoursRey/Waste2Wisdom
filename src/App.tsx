import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { HeroBanner } from './components/common/HeroBanner';
import { Footer } from './components/common/Footer';
import { WasteDictionaryView } from './components/dictionary/WasteDictionaryView';
import { ExploreFacilitiesView } from './components/explore/ExploreFacilitiesView';
import { InnovationCatalogView } from './components/innovations/InnovationCatalogView';
import { MatchmakingMapView } from './components/matchmaking/MatchmakingMapView';
import { EvaluationReviewView } from './components/evaluation/EvaluationReviewView';
import { SubmitInnovationModal } from './components/innovations/SubmitInnovationModal';
import { AdminVerificationModal } from './components/innovations/AdminVerificationModal';
import { AddReviewModal } from './components/evaluation/AddReviewModal';
import { AuthModal } from './components/common/AuthModal';
import { InnovationItem, ReviewItem } from './types';
import { api } from './services/api';

const Waste2WisdomMain: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('dictionary');
  const [innovations, setInnovations] = useState<InnovationItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [isLoadingInnovations, setIsLoadingInnovations] = useState(true);

  // Deep linked waste filter (from Kamus -> Marketplace)
  const [activeWasteFilter, setActiveWasteFilter] = useState<string | undefined>(undefined);

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preSelectedReviewInnovation, setPreSelectedReviewInnovation] = useState<InnovationItem | null>(null);

  // Fetch innovations & reviews via API
  const loadInnovations = async () => {
    setIsLoadingInnovations(true);
    try {
      const data = await api.innovations.getAll();
      setInnovations(data);
    } catch {
      addToast('Gagal memuat katalog inovasi', 'error');
    } finally {
      setIsLoadingInnovations(false);
    }
  };

  const loadReviews = async () => {
    try {
      const data = await api.reviews.getAll();
      setReviews(data);
    } catch {
      addToast('Gagal memuat ulasan', 'error');
    }
  };

  useEffect(() => {
    loadInnovations();
    loadReviews();
  }, []);

  // Pending innovations count for admin badge
  const pendingInnovations = innovations.filter((i) => i.status === 'pending');
  const reportedReviews = reviews.filter((r) => r.isReported);

  // Handle deep link from Kamus (1M) -> Marketplace (3M)
  const handleSelectWasteForInnovation = (wasteName: string) => {
    setActiveWasteFilter(wasteName);
    setActiveTab('innovations');
    addToast(`Menampilkan tutorial inovasi berbahan: ${wasteName}`, 'info');
  };

  // Handle user submitting innovation
  const handleInnovationSubmit = async (newInv: InnovationItem) => {
    try {
      const created = await api.innovations.create({
        ...newInv,
        authorId: user.id
      });
      setInnovations((prev) => [created, ...prev]);
      addToast('Inovasi Anda berhasil diajukan! Menunggu tinjauan admin/kurator.', 'success');
    } catch {
      addToast('Gagal mengajukan inovasi', 'error');
    }
  };

  // Handle admin approve
  const handleAdminApprove = async (id: string) => {
    try {
      const approved = await api.innovations.approve(id);
      setInnovations((prev) => prev.map((item) => (item.id === id ? approved : item)));
    } catch {
      addToast('Gagal menyetujui inovasi', 'error');
    }
  };

  // Handle admin reject with reason
  const handleAdminReject = async (id: string, reason: string) => {
    try {
      const rejected = await api.innovations.reject(id, reason);
      setInnovations((prev) => prev.map((item) => (item.id === id ? rejected : item)));
    } catch {
      addToast('Gagal menolak inovasi', 'error');
    }
  };

  // Handle review submit
  const handleReviewSubmit = async (newRev: ReviewItem) => {
    try {
      const saved = await api.reviews.create(newRev);
      setReviews((prev) => [saved, ...prev]);
      // Reload innovations to get updated review counts
      loadInnovations();
    } catch (err: any) {
      addToast(err.message || 'Gagal menyimpan ulasan', 'error');
    }
  };

  // Handle like review
  const handleLikeReview = async (reviewId: string) => {
    try {
      const updated = await api.reviews.like(reviewId);
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
    } catch {
      addToast('Gagal menyukai ulasan', 'error');
    }
  };

  // Handle report review
  const handleReportReview = async (reviewId: string, reason: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, isReported: true, reportReason: reason } : r))
    );
  };

  // Handle delete reported review
  const handleDeleteReportedReview = async (reviewId: string) => {
    try {
      await api.reviews.delete(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      addToast('Ulasan bermasalah berhasil dihapus.', 'info');
    } catch {
      addToast('Gagal menghapus ulasan', 'error');
    }
  };

  // Seed mock pending for demo
  const handleSeedMockPending = async () => {
    const sample = await api.innovations.create({
      title: 'Paving Block Ramah Lingkungan Campuran Serat Karung Goni',
      tagline: 'Inovasi batako ringan dengan perkuatan serat limbah karung goni industri beras',
      wasteSource: 'Serat Karung Goni',
      category: 'Material Bangunan Alternatif',
      difficulty: 'Menengah',
      estimatedTime: '3 Hari',
      estimatedCost: 'Rp 18.000 / buah',
      economicValue: 'Dapat menggantikan batako konvensional dengan bobot lebih ringan 25%',
      materials: [
        { name: 'Serat goni dicacah 2 cm', amount: '500 gram' },
        { name: 'Semen portland komposit', amount: '2 kg' },
        { name: 'Pasir halus terayak', amount: '4 kg' }
      ],
      tools: ['Cetakan batako manual', 'Pengaduk semen', 'Ember takar'],
      steps: [
        { stepNumber: 1, title: 'Pemotongan Serat', description: 'Cacah karung goni menjadi serat 2-3 cm dan rendam air kapur 1 jam.', tip: 'Air kapur meningkatkan daya lekat semen.' },
        { stepNumber: 2, title: 'Pencampuran & Cetak', description: 'Campur semen, pasir, dan serat goni basah lalu cetak padat.', tip: 'Tumbuk hingga rongga udara hilang.' }
      ],
      safetyTips: ['Gunakan sarung tangan tebal dan masker debu.'],
      submittedBy: 'Tim Riset SMKN 2 Pertanian',
      authorId: 'user-pelajar-1'
    });

    setInnovations((prev) => [sample, ...prev]);
    addToast('Contoh pengajuan baru telah ditambahkan ke antrean verifikasi admin!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingInnovations.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Hero Banner */}
      <HeroBanner onSelect5M={(tab) => {
        setActiveWasteFilter(undefined);
        setActiveTab(tab);
      }} />

      {/* Main 5M Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dictionary' && (
          <WasteDictionaryView onSelectWasteForInnovation={handleSelectWasteForInnovation} />
        )}

        {activeTab === 'explore' && (
          <ExploreFacilitiesView />
        )}

        {activeTab === 'innovations' && (
          <InnovationCatalogView
            innovations={innovations}
            isLoading={isLoadingInnovations}
            activeWasteFilter={activeWasteFilter}
            onClearWasteFilter={() => setActiveWasteFilter(undefined)}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            onOpenReviewModal={(inv) => {
              setPreSelectedReviewInnovation(inv);
              setIsReviewModalOpen(true);
            }}
          />
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingMapView />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationReviewView
            reviews={reviews}
            innovations={innovations.filter((i) => i.status === 'verified')}
            onOpenAddReviewModal={(inv) => {
              setPreSelectedReviewInnovation(inv || null);
              setIsReviewModalOpen(true);
            }}
            onLikeReview={handleLikeReview}
            onReportReview={handleReportReview}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SubmitInnovationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleInnovationSubmit}
      />

      <AdminVerificationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        pendingInnovations={pendingInnovations}
        reportedReviews={reportedReviews}
        onApprove={handleAdminApprove}
        onReject={handleAdminReject}
        onDeleteReportedReview={handleDeleteReportedReview}
        onSeedMockPending={handleSeedMockPending}
      />

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setPreSelectedReviewInnovation(null);
        }}
        innovations={innovations.filter((i) => i.status === 'verified')}
        preSelectedInnovation={preSelectedReviewInnovation}
        onSubmitSuccess={handleReviewSubmit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Waste2WisdomMain />
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
