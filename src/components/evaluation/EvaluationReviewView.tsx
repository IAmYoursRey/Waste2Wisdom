import React, { useState, useMemo } from 'react';
import { ReviewItem, InnovationItem } from '../../types';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  Lightbulb, 
  PlusCircle, 
  Filter, 
  Search, 
  TrendingUp, 
  Award,
  Sparkles,
  Smile
} from 'lucide-react';

interface EvaluationReviewViewProps {
  reviews: ReviewItem[];
  innovations: InnovationItem[];
  onOpenAddReviewModal: (preSelect?: InnovationItem | null) => void;
  onLikeReview: (reviewId: string) => void;
}

export const EvaluationReviewView: React.FC<EvaluationReviewViewProps> = ({
  reviews,
  innovations,
  onOpenAddReviewModal,
  onLikeReview
}) => {
  const [selectedInnovationFilter, setSelectedInnovationFilter] = useState('all');
  const [selectedSuccessFilter, setSelectedSuccessFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics
  const stats = useMemo(() => {
    if (reviews.length === 0) return { avgRating: 0, successPercent: 0, easyPercent: 0 };

    const totalStars = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avgRating = (totalStars / reviews.length).toFixed(1);

    const successfulCount = reviews.filter(
      (r) => r.isSuccessful === 'Berhasil 100%' || r.isSuccessful === 'Berhasil dengan Modifikasi'
    ).length;
    const successPercent = Math.round((successfulCount / reviews.length) * 100);

    const easyCount = reviews.filter(
      (r) => r.isEasyToMake === 'Sangat Mudah' || r.isEasyToMake === 'Cukup Mudah'
    ).length;
    const easyPercent = Math.round((easyCount / reviews.length) * 100);

    return { avgRating, successPercent, easyPercent };
  }, [reviews]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const matchInnovation =
        selectedInnovationFilter === 'all' ? true : r.innovationId === selectedInnovationFilter;

      const matchSuccess =
        selectedSuccessFilter === 'all' ? true : r.isSuccessful === selectedSuccessFilter;

      const matchSearch =
        r.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.innovationTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.troubleshootingTip && r.troubleshootingTip.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchInnovation && matchSuccess && matchSearch;
    });
  }, [reviews, selectedInnovationFilter, selectedSuccessFilter, searchQuery]);

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span className="badge-5m">
                  ⭐ 5M: MENGEVALUASI
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Uji Kemudahan & Keberhasilan Produk Komunitas
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)' }}>
                Evaluasi & Ulasan Produk Inovasi
              </h2>
            </div>

            <button
              onClick={() => onOpenAddReviewModal(null)}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.3rem' }}
            >
              <PlusCircle size={18} />
              <span>Tulis Ulasan Evaluasi</span>
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Pilar penutup dari kerangka <strong>5M (Mengevaluasi)</strong>: Berbagi feedback jujur mengenai apakah resep produk di katalog <strong>mudah dibuat</strong> dan <strong>berhasil pembuatannya</strong>, serta tips troubleshooting untuk saling menyempurnakan karya.
          </p>
        </div>

        {/* 3 Analytics Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #F59E0B' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>KEPUASAN HASIL</span>
              <Star size={18} color="#F59E0B" fill="#F59E0B" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-display)' }}>
              {stats.avgRating} <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-light)' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Berdasarkan {reviews.length} ulasan praktisi
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #10B981' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>TINGKAT KEBERHASILAN</span>
              <CheckCircle2 size={18} color="#10B981" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--font-display)' }}>
              {stats.successPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Pembuat berhasil memproduksi produk
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1.25rem', borderLeft: '5px solid #3B82F6' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>KEMUDAHAN PENGERJAAN</span>
              <Smile size={18} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#2563EB', fontFamily: 'var(--font-display)' }}>
              {stats.easyPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              Menilai sangat / cukup mudah diikuti
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari komentar atau tips troubleshooting..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Innovation Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#059669" />
              <select
                value={selectedInnovationFilter}
                onChange={(e) => setSelectedInnovationFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Produk Inovasi</option>
                {innovations.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Success Status Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select
                value={selectedSuccessFilter}
                onChange={(e) => setSelectedSuccessFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Status Keberhasilan</option>
                <option value="Berhasil 100%">Berhasil 100%</option>
                <option value="Berhasil dengan Modifikasi">Berhasil dengan Modifikasi</option>
                <option value="Gagal / Perlu Coba Lagi">Gagal / Perlu Coba Lagi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.4rem'
              }}
            >
              <div>
                
                {/* Header info */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.02rem', color: 'var(--leaf-deep)' }}>
                      {rev.userName}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                      <span style={{ fontSize: '0.74rem', background: '#F1F5F9', color: '#475569', padding: '1px 7px', borderRadius: '4px', fontWeight: 600 }}>
                        {rev.userRole}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-light)' }}>
                        • {rev.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Rating Stars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#F59E0B' }}>
                    {Array.from({ length: 5 }).map((_, sIdx) => (
                      <Star
                        key={sIdx}
                        size={15}
                        fill={sIdx < rev.rating ? '#F59E0B' : 'transparent'}
                        color={sIdx < rev.rating ? '#F59E0B' : '#CBD5E1'}
                      />
                    ))}
                  </div>
                </div>

                {/* Target Product Tag */}
                <div style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#065F46',
                  background: '#ECFDF5',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '0.85rem',
                  border: '1px solid #A7F3D0'
                }}>
                  🛠️ Produk: {rev.innovationTitle}
                </div>

                {/* 5M Evaluation Answers Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: rev.isSuccessful.includes('100%') ? '#DCFCE7' : '#FEF3C7',
                    color: rev.isSuccessful.includes('100%') ? '#166534' : '#92400E',
                    border: '1px solid currentColor'
                  }}>
                    🎯 {rev.isSuccessful}
                  </span>

                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: '#F1F5F9',
                    color: '#334155',
                    border: '1px solid #CBD5E1'
                  }}>
                    👌 {rev.isEasyToMake}
                  </span>
                </div>

                {/* Comment */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.55, marginBottom: '0.9rem' }}>
                  "{rev.comment}"
                </p>

                {/* Troubleshooting Pro Tip */}
                {rev.troubleshootingTip && (
                  <div style={{
                    padding: '0.65rem 0.85rem',
                    background: '#FFFBEB',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid #FDE68A',
                    fontSize: '0.8rem',
                    color: '#92400E',
                    lineHeight: 1.45,
                    marginBottom: '0.75rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                      <Lightbulb size={14} color="#D97706" />
                      <span>Tips Kendala & Solusi:</span>
                    </div>
                    <div>{rev.troubleshootingTip}</div>
                  </div>
                )}

              </div>

              {/* Review Footer */}
              <div style={{
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={() => onLikeReview(rev.id)}
                  className="btn-outline"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.75rem',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <ThumbsUp size={13} color="#059669" />
                  <span>Membantu ({rev.likes})</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px dashed var(--border-light)'
          }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Belum ada ulasan untuk kriteria pencarian ini.
            </p>
            <button
              onClick={() => onOpenAddReviewModal(null)}
              className="btn-primary"
            >
              Jadilah yang Pertama Menulis Ulasan
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
