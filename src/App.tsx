import React, { useState, useEffect } from 'react';
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
import { InnovationItem, ReviewItem } from './types';
import { 
  getStoredInnovations, 
  saveInnovations, 
  getStoredReviews, 
  saveReviews 
} from './utils/storage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dictionary');
  const [innovations, setInnovations] = useState<InnovationItem[]>([]);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [preSelectedReviewInnovation, setPreSelectedReviewInnovation] = useState<InnovationItem | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    const loadedInnovations = getStoredInnovations();
    const loadedReviews = getStoredReviews();
    setInnovations(loadedInnovations);
    setReviews(loadedReviews);
  }, []);

  // Pending innovations for admin verification
  const pendingInnovations = innovations.filter((i) => i.status === 'pending');

  // Handle user submitting new innovation
  const handleInnovationSubmit = (newInv: InnovationItem) => {
    const updated = [newInv, ...innovations];
    setInnovations(updated);
    saveInnovations(updated);
  };

  // Handle admin approving pending innovation
  const handleAdminApprove = (id: string) => {
    const updated = innovations.map((inv) =>
      inv.id === id ? { ...inv, status: 'verified' as const } : inv
    );
    setInnovations(updated);
    saveInnovations(updated);
  };

  // Handle admin rejecting pending innovation
  const handleAdminReject = (id: string) => {
    const updated = innovations.filter((inv) => inv.id !== id);
    setInnovations(updated);
    saveInnovations(updated);
  };

  // Handle adding sample pending innovation for demonstration
  const handleSeedMockPending = () => {
    const samplePending: InnovationItem = {
      id: `inv-mock-${Date.now()}`,
      title: 'Paving Block Campuran Serat Karung Goni & Pasir',
      tagline: 'Inovasi batako ringan dengan perkuatan serat limbah karung goni industri beras',
      wasteSource: 'Serat Karung Goni Pertanian',
      category: 'Material Bangunan Alternatif',
      difficulty: 'Menengah',
      estimatedTime: '3 Hari',
      estimatedCost: 'Rp 18.000 / buah',
      economicValue: 'Dapat menggantikan batako merah dengan bobot lebih ringan 25%',
      rating: 5.0,
      reviewCount: 0,
      successRate: 90,
      materials: [
        { name: 'Serat goni dicacah 2 cm', amount: '500 gram' },
        { name: 'Semen portland', amount: '2 kg' },
        { name: 'Pasir halus terayak', amount: '4 kg' }
      ],
      tools: ['Cetakan batako manual', 'Pengaduk semen', 'Ember takar'],
      steps: [
        { stepNumber: 1, title: 'Pemotongan Serat', description: 'Cacah karung goni menjadi serat 2-3 cm dan rendam air kapur 1 jam.', tip: 'Air kapur meningkatkan daya lekat semen.' },
        { stepNumber: 2, title: 'Pencampuran & Cetak', description: 'Campur semen, pasir, dan serat goni basah lalu cetak padat.', tip: 'Tumbuk hingga rongga udara hilang.' }
      ],
      safetyTips: ['Gunakan sarung tangan tebal dan masker debu.'],
      status: 'pending',
      submittedBy: 'Tim Riset SMK Pertanian Sukabumi',
      submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    handleInnovationSubmit(samplePending);
  };

  // Handle adding new review
  const handleReviewSubmit = (newRev: ReviewItem) => {
    const updated = [newRev, ...reviews];
    setReviews(updated);
    saveReviews(updated);

    // Also update review count on target innovation
    const updatedInnovations = innovations.map((inv) => {
      if (inv.id === newRev.innovationId) {
        const newCount = inv.reviewCount + 1;
        const newRating = Number(((inv.rating * inv.reviewCount + newRev.rating) / newCount).toFixed(1));
        return { ...inv, reviewCount: newCount, rating: newRating };
      }
      return inv;
    });
    setInnovations(updatedInnovations);
    saveInnovations(updatedInnovations);
  };

  // Handle liking review
  const handleLikeReview = (reviewId: string) => {
    const updated = reviews.map((r) =>
      r.id === reviewId ? { ...r, likes: r.likes + 1 } : r
    );
    setReviews(updated);
    saveReviews(updated);
  };

  const handleOpenReviewModalWithProduct = (product?: InnovationItem | null) => {
    setPreSelectedReviewInnovation(product || null);
    setIsReviewModalOpen(true);
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
      />

      {/* Hero Banner with 5M quick selector */}
      <HeroBanner onSelect5M={(tab) => setActiveTab(tab)} />

      {/* Main Content Render by 5M Tab */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dictionary' && (
          <WasteDictionaryView onSelectInnovationTab={() => setActiveTab('innovations')} />
        )}

        {activeTab === 'explore' && (
          <ExploreFacilitiesView />
        )}

        {activeTab === 'innovations' && (
          <InnovationCatalogView
            innovations={innovations}
            onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
            onOpenReviewModal={(inv) => handleOpenReviewModalWithProduct(inv)}
          />
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingMapView />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationReviewView
            reviews={reviews}
            innovations={innovations.filter((i) => i.status === 'verified')}
            onOpenAddReviewModal={(inv) => handleOpenReviewModalWithProduct(inv)}
            onLikeReview={handleLikeReview}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <SubmitInnovationModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitSuccess={handleInnovationSubmit}
      />

      <AdminVerificationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        pendingInnovations={pendingInnovations}
        onApprove={handleAdminApprove}
        onReject={handleAdminReject}
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

    </div>
  );
};

export default App;
