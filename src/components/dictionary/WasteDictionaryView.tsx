import React, { useState, useMemo } from 'react';
import { initialWasteData } from '../../data/wasteDictionary';
import { WasteItem } from '../../types';
import { WasteDetailModal } from './WasteDetailModal';
import { Search, Filter, ShieldCheck, AlertOctagon, CheckCircle2, ChevronRight, HardHat, Sparkles } from 'lucide-react';

interface WasteDictionaryViewProps {
  onSelectInnovationTab: () => void;
}

export const WasteDictionaryView: React.FC<WasteDictionaryViewProps> = ({ onSelectInnovationTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'non-b3' | 'b3'>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedWaste, setSelectedWaste] = useState<WasteItem | null>(null);

  // Extract unique industrial sectors
  const sectors = useMemo(() => {
    const s = new Set(initialWasteData.map((item) => item.industrialSector));
    return Array.from(s);
  }, []);

  // Filtered waste list
  const filteredWaste = useMemo(() => {
    return initialWasteData.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.economicPotential.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const matchSector =
        selectedSector === 'all' ? true : item.industrialSector === selectedSector;

      return matchSearch && matchCategory && matchSector;
    });
  }, [searchQuery, selectedCategory, selectedSector]);

  const countNonB3 = initialWasteData.filter((i) => i.category === 'non-b3').length;
  const countB3 = initialWasteData.filter((i) => i.category === 'b3').length;

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge-5m">
              🌿 1M: MENGENALI & MEMAHAMI
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Standard Regulasi PP No. 22 Tahun 2021
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
            Kamus & Literasi Limbah Industri Lokal
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Identifikasi jenis limbah dari industri manufaktur sekitar. Pahami perbedaan mendasar antara limbah <strong>Non-B3 yang aman diolah mandiri</strong> oleh perajin/UMKM vs <strong>Limbah B3 yang berbahaya</strong> dan wajib penanganan khusus berizin resmi.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search Box */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari limbah (contoh: ampas tebu, kain perca, oli, serbuk kayu)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* Sector Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="#059669" />
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Sektor Industri</option>
                {sectors.map((sec, idx) => (
                  <option key={idx} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Tabs (Pills) */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginTop: '1rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'all' ? 700 : 500,
                background: selectedCategory === 'all' ? 'var(--leaf-deep)' : '#F1F5F9',
                color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-main)',
                border: '1px solid transparent',
                transition: 'all var(--transition-fast)'
              }}
            >
              <span>Semua Kategori</span>
              <span style={{
                background: selectedCategory === 'all' ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem'
              }}>
                {initialWasteData.length}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('non-b3')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'non-b3' ? 700 : 500,
                background: selectedCategory === 'non-b3' ? '#ECFDF5' : '#FFFFFF',
                color: '#065F46',
                border: selectedCategory === 'non-b3' ? '1.5px solid #10B981' : '1px solid #D1FAE5',
                transition: 'all var(--transition-fast)'
              }}
            >
              <CheckCircle2 size={15} color="#10B981" />
              <span>Aman Diolah Mandiri (Non-B3)</span>
              <span style={{
                background: '#A7F3D0',
                color: '#065F46',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {countNonB3}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory('b3')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: selectedCategory === 'b3' ? 700 : 500,
                background: selectedCategory === 'b3' ? '#FEF2F2' : '#FFFFFF',
                color: '#991B1B',
                border: selectedCategory === 'b3' ? '1.5px solid #EF4444' : '1px solid #FECACA',
                transition: 'all var(--transition-fast)'
              }}
            >
              <AlertOctagon size={15} color="#EF4444" />
              <span>Khusus / Berbahaya (Limbah B3)</span>
              <span style={{
                background: '#FECACA',
                color: '#991B1B',
                padding: '1px 7px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {countB3}
              </span>
            </button>
          </div>

        </div>

        {/* Waste Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem'
        }}>
          {filteredWaste.map((waste) => {
            const isB3 = waste.category === 'b3';
            return (
              <div
                key={waste.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.4rem',
                  borderTop: isB3 ? '4px solid #EF4444' : '4px solid #10B981',
                  position: 'relative'
                }}
              >
                <div>
                  
                  {/* Card Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <span className={`badge-national ${isB3 ? 'badge-danger' : 'badge-safe'}`}>
                      {isB3 ? '⚠️ B3 BERBAHAYA' : '✅ AMAN MANDIRI'}
                    </span>
                    <span className="badge-sector" style={{ fontSize: '0.7rem' }}>
                      {waste.industrialSector.split('&')[0]}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem', color: isB3 ? '#991B1B' : 'var(--leaf-deep)' }}>
                    {waste.name}
                  </h3>

                  {/* Physical description */}
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: 1.45 }}>
                    {waste.physicalForm}
                  </p>

                  {/* Safety Snippet */}
                  <div style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isB3 ? '#FFF1F2' : '#F0FDF4',
                    border: isB3 ? '1px solid #FDA4AF' : '1px solid #BBF7D0',
                    fontSize: '0.8rem',
                    color: isB3 ? '#881337' : '#166534',
                    marginBottom: '0.85rem'
                  }}>
                    <strong>{isB3 ? 'Aturan Keselamatan:' : 'Status Daur Ulang:'}</strong> {waste.safetyDescription.slice(0, 110)}...
                  </div>

                  {/* PPE Preview Badges */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', marginBottom: '0.35rem' }}>
                      <HardHat size={14} color="#059669" />
                      <span>APD Minimal:</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {waste.requiredPPE.slice(0, 2).map((ppe, pIdx) => (
                        <span key={pIdx} style={{
                          fontSize: '0.72rem',
                          background: '#F1F5F9',
                          color: '#475569',
                          padding: '0.2rem 0.55rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid #E2E8F0'
                        }}>
                          {ppe}
                        </span>
                      ))}
                      {waste.requiredPPE.length > 2 && (
                        <span style={{ fontSize: '0.72rem', color: '#64748B', alignSelf: 'center' }}>
                          +{waste.requiredPPE.length - 2} lagi
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Card Action Footer */}
                <div style={{
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-light)', fontWeight: 600 }}>
                    {waste.legalCode.split('(')[0]}
                  </span>

                  <button
                    onClick={() => setSelectedWaste(waste)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isB3 ? '#DC2626' : '#059669',
                      background: isB3 ? '#FEF2F2' : '#ECFDF5',
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      border: isB3 ? '1px solid #FECACA' : '1px solid #A7F3D0',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <span>Panduan Lengkap</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredWaste.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px dashed var(--border-light)'
          }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Tidak ditemukan data limbah dengan kata kunci "<strong>{searchQuery}</strong>".
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedSector('all'); }}
              className="btn-secondary"
            >
              Reset Filter & Pencarian
            </button>
          </div>
        )}

      </div>

      {/* Waste Detail Modal */}
      {selectedWaste && (
        <WasteDetailModal
          waste={selectedWaste}
          onClose={() => setSelectedWaste(null)}
          onSelectInnovation={() => onSelectInnovationTab()}
        />
      )}
    </section>
  );
};
