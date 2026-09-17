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
import { InnovationItem } from './types';
import { useInnovations } from './hooks/useInnovations';
import { useReviews } from './hooks/useReviews';

const Waste2WisdomMain: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<string>('dictionary');
  // Deep linked waste filter (from Kamus -> Marketplace)
  const [activeWasteFilter, setActiveWasteFilter] = useState<string | undefined>(undefined);

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preSelectedReviewInnovation, setPreSelectedReviewInnovation] = useState<InnovationItem | null>(null);

  const {
    innovations,
    isLoadingInnovations,
    loadInnovations,
    handleInnovationSubmit,
    handleAdminApprove,
    handleAdminReject,
    handleSeedMockPending
  } = useInnovations();

  const {
    reviews,
    handleReviewSubmit,
    handleLikeReview,
    handleReportReview,
    handleDeleteReportedReview
  } = useReviews(loadInnovations);

  // Pending innovations count for admin badge
  const pendingInnovations = innovations.filter((i) => i.status === 'pending');
  const reportedReviews = reviews.filter((r) => r.isReported);

  // Handle deep link from Kamus (1M) -> Marketplace (3M)
  const handleSelectWasteForInnovation = (wasteName: string) => {
    setActiveWasteFilter(wasteName);
    setActiveTab('innovations');
    addToast(`Menampilkan tutorial inovasi berbahan: ${wasteName}`, 'info');
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
