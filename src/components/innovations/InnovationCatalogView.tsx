import React, { useState, useMemo } from 'react';
import { InnovationItem } from '../../types';
import { InnovationDetailModal } from './InnovationDetailModal';
import { 
  Search, 
  Filter, 
  Lightbulb, 
  PlusCircle, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Star, 
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface InnovationCatalogViewProps {
  innovations: InnovationItem[];
  onOpenSubmitModal: () => void;
  onOpenReviewModal: (innovation: InnovationItem) => void;
}

export const InnovationCatalogView: React.FC<InnovationCatalogViewProps> = ({
  innovations,
  onOpenSubmitModal,
  onOpenReviewModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedInnovation, setSelectedInnovation] = useState<InnovationItem | null>(null);

  // Filter only verified innovations for public marketplace
  const verifiedInnovations = useMemo(() => {
    return innovations.filter((item) => item.status === 'verified');
  }, [innovations]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set(verifiedInnovations.map((i) => i.category));
    return Array.from(set);
  }, [verifiedInnovations]);

  // Filter logic
  const filteredInnovations = useMemo(() => {
    return verifiedInnovations.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.wasteSource.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const matchDifficulty =
        selectedDifficulty === 'all' ? true : item.difficulty === selectedDifficulty;

      return matchSearch && matchCategory && matchDifficulty;
    });
  }, [verifiedInnovations, searchQuery, selectedCategory, selectedDifficulty]);

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
                  💡 3M: MENGINOVASI
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Marketplace Ide, Infografis & Blueprint Daur Ulang
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)' }}>
                Marketplace Inovasi Produk Sirkular
              </h2>
            </div>

            <button
              onClick={onOpenSubmitModal}
              className="btn-primary"
              style={{ fontSize: '0.9rem', padding: '0.65rem 1.3rem' }}
            >
              <PlusCircle size={18} />
              <span>Ajukan Ide Inovasi Baru</span>
            </button>
          </div>

          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Katalog panduan langkah-demi-langkah pengolahan limbah industri menjadi kerajinan bernilai tinggi, material bangunan alternatif, bioplastik, dan pupuk organik. Dilengkapi simulasi video, kalkulator modal, dan SOP keselamatan kerja.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari ide (contoh: panel akustik, lilin, bioplastik)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Category Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#059669" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Kategori Produk</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Kesulitan:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Tingkat</option>
                <option value="Mudah">Mudah</option>
                <option value="Menengah">Menengah</option>
                <option value="Tinggi">Tinggi</option>
              </select>
            </div>
          </div>
        </div>

        {/* Innovation Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredInnovations.map((inv) => (
            <div
              key={inv.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem',
                borderTop: '4px solid #10B981'
              }}
            >
              <div>
                
                {/* Category & Difficulty */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span className="badge-sector">{inv.category}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    background: inv.difficulty === 'Mudah' ? '#DCFCE7' : inv.difficulty === 'Menengah' ? '#FEF3C7' : '#FEE2E2',
                    color: inv.difficulty === 'Mudah' ? '#166534' : inv.difficulty === 'Menengah' ? '#92400E' : '#991B1B',
                  }}>
                    {inv.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)', marginBottom: '0.4rem', lineHeight: 1.3 }}>
                  {inv.title}
                </h3>

                {/* Tagline */}
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.45, marginBottom: '0.9rem' }}>
                  {inv.tagline}
                </p>

                {/* Waste source badge */}
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  background: '#F0FDF4',
                  padding: '0.3rem 0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #BBF7D0',
                  fontSize: '0.78rem',
                  color: '#166534',
                  fontWeight: 600,
                  marginBottom: '1rem'
                }}>
                  <span>♻️ Bahan Limbah:</span>
                  <strong>{inv.wasteSource}</strong>
                </div>

                {/* Key metrics row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  background: '#F8FAFC',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '1rem',
                  fontSize: '0.78rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                    <Clock size={14} color="#059669" />
                    <span>{inv.estimatedTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)' }}>
                    <DollarSign size={14} color="#059669" />
                    <span>{inv.estimatedCost}</span>
                  </div>
                </div>

                {/* Community rating & success rate */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#D97706', fontWeight: 700 }}>
                    <Star size={15} fill="#F59E0B" color="#F59E0B" />
                    <span>{inv.rating} ({inv.reviewCount} ulasan)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#059669', fontWeight: 700 }}>
                    <TrendingUp size={15} />
                    <span>{inv.successRate}% Berhasil</span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div style={{
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={() => onOpenReviewModal(inv)}
                  className="btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                >
                  <Star size={14} color="#F59E0B" />
                  <span>Ulas Produk</span>
                </button>

                <button
                  onClick={() => setSelectedInnovation(inv)}
                  className="btn-primary"
                  style={{ fontSize: '0.82rem', padding: '0.45rem 0.95rem' }}
                >
                  <span>Buka Panduan</span>
                  <ChevronRight size={15} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredInnovations.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px dashed var(--border-light)'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              Belum ada inovasi yang sesuai dengan kriteria pencarian Anda.
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="btn-primary"
            >
              <PlusCircle size={18} />
              <span>Ajukan Inovasi Baru untuk Produk Ini</span>
            </button>
          </div>
        )}

        {/* Propose new innovation bottom callout */}
        <div style={{
          marginTop: '3.5rem',
          background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          border: '2px dashed #6EE7B7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#065F46', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
              <Sparkles size={16} color="#10B981" />
              <span>Punya Ide Inovasi Daur Ulang yang Belum Ada di Web?</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)', marginBottom: '0.4rem' }}>
              Ajukan Rancangan Inovasi Anda ke Katalog Nasional Waste2Wisdom
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#047857', lineHeight: 1.5 }}>
              Sesuai pilar <strong>3M (Menginovasi)</strong>: Pelajar, kelompok tani, atau pengrajin dapat mendaftarkan resep kreasi daur ulang. Ide Anda akan diverifikasi dan disebarluaskan untuk menginspirasi masyarakat luas.
            </p>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.92rem' }}
          >
            <PlusCircle size={18} />
            <span>Ajukan Sekarang</span>
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      {selectedInnovation && (
        <InnovationDetailModal
          innovation={selectedInnovation}
          onClose={() => setSelectedInnovation(null)}
          onOpenReviewModal={(inv) => onOpenReviewModal(inv)}
        />
      )}

    </section>
  );
};
