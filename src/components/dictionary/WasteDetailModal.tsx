import React from 'react';
import { WasteItem } from '../../types';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, FileText, HardHat, Sparkles, Scale, AlertCircle } from 'lucide-react';

interface WasteDetailModalProps {
  waste: WasteItem | null;
  onClose: () => void;
  onSelectInnovation?: (wasteId: string, wasteName: string) => void;
  onSelectSpecificInnovation?: (innovationId: string, innovationTitle: string) => void;
}

export const WasteDetailModal: React.FC<WasteDetailModalProps> = ({
  waste,
  onClose,
  onSelectInnovation,
  onSelectSpecificInnovation
}) => {
  if (!waste) return null;

  const isB3 = waste.category === 'b3';
  const isCaution = waste.safetyRating === 'caution';

  const headerBg = isB3 ? '#FEF2F2' : isCaution ? '#FFFBEB' : '#F0FDF4';
  const headerBorder = isB3 ? '2px solid #FECACA' : isCaution ? '2px solid #FDE68A' : '2px solid #A7F3D0';
  const headerTextColor = isB3 ? '#991B1B' : isCaution ? '#92400E' : '#065F46';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{
          borderBottom: headerBorder,
          background: headerBg
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
              <span className={`badge-national ${isB3 ? 'badge-danger' : isCaution ? 'badge-caution' : 'badge-safe'}`} style={{
                background: isB3 ? '#FEE2E2' : isCaution ? '#FEF3C7' : '#DCFCE7',
                color: isB3 ? '#991B1B' : isCaution ? '#92400E' : '#166534',
                padding: '2px 8px',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.75rem'
              }}>
                {waste.categoryLabel}
              </span>
              <span className="badge-sector">{waste.industrialSector}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: headerTextColor }}>
              {waste.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            aria-label="Tutup modal detail limbah"
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Safety Alert Box */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: isB3 ? '#FFF1F2' : isCaution ? '#FFFBEB' : '#F0FDF4',
            border: isB3 ? '1.5px solid #FDA4AF' : isCaution ? '1.5px solid #FCD34D' : '1.5px solid #86EFAC',
            display: 'flex',
            gap: '0.85rem'
          }}>
            {isB3 ? (
              <ShieldAlert size={26} color="#E11D48" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : isCaution ? (
              <AlertCircle size={26} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <CheckCircle2 size={26} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <div style={{
                fontWeight: 700,
                fontSize: '0.95rem',
                color: isB3 ? '#9F1239' : isCaution ? '#B45309' : '#065F46'
              }}>
                {isB3
                  ? 'Peringatan Regulasi: Kategori Limbah B3 Berbahaya'
                  : isCaution
                  ? 'Perhatian & Kehati-hatian: Non-B3 dengan Kondisi & SOP Khusus'
                  : 'Kategori Non-B3: Dapat Dimanfaatkan Mandiri / Komunitas'}
              </div>
              <div style={{
                fontSize: '0.85rem',
                color: isB3 ? '#881337' : isCaution ? '#78350F' : '#047857',
                marginTop: '0.2rem',
                lineHeight: 1.5
              }}>
                {waste.safetyDescription}
              </div>
            </div>
          </div>

          {/* Legal Reference & Source */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0.85rem'
          }}>
            <div style={{
              padding: '0.85rem 1rem',
              background: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <Scale size={15} color="#059669" />
                <span>DASAR HUKUM & STATUS REGULASI</span>
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
                {waste.legalCode}
              </div>
            </div>

            <div style={{
              padding: '0.85rem 1rem',
              background: '#F8FAFC',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                <FileText size={15} color="#059669" />
                <span>SUMBER ALIRAN PROSES INDUSTRI</span>
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-main)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                {waste.source}
              </div>
            </div>
          </div>

          {/* Physical Form & Characteristics */}
          <div style={{
            padding: '1rem',
            background: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              Bentuk Fisik & Karakteristik Bahan:
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
              {waste.physicalForm}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {waste.characteristics.map((char, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  background: '#FFFFFF',
                  color: 'var(--text-main)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid #CBD5E1',
                  fontWeight: 500
                }}>
                  • {char}
                </span>
              ))}
            </div>
          </div>

          {/* Required PPE (APD) */}
          <div style={{
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: '#F1F5F9',
            border: '1px solid #CBD5E1'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              <HardHat size={16} color="#059669" />
              <span>Alat Pelindung Diri (APD) Minimal Wajib:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {waste.requiredPPE.map((ppe, idx) => (
                <span key={idx} style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  background: '#FFFFFF',
                  color: 'var(--leaf-deep)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #A7F3D0'
                }}>
                  🛡️ {ppe}
                </span>
              ))}
            </div>
          </div>

          {/* Guidelines vs Prohibitions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {/* Guidelines */}
            <div style={{
              background: '#F0FDF4',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #BBF7D0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#166534', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={16} color="#16A34A" />
                <span>Panduan Penanganan yang Dianjurkan (SOP):</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#14532D', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {waste.handlingGuidelines.map((guide, idx) => (
                  <li key={idx}>{guide}</li>
                ))}
              </ul>
            </div>

            {/* Prohibited */}
            <div style={{
              background: '#FFF1F2',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #FECDD3'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#9F1239', marginBottom: '0.5rem' }}>
                <AlertTriangle size={16} color="#E11D48" />
                <span>Tindakan Terlarang / Berbahaya:</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#881337', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {waste.prohibitedActions.map((prohib, idx) => (
                  <li key={idx}>{prohib}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Economic Potential & Innovations */}
          <div style={{
            background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid #A7F3D0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: '#065F46', marginBottom: '0.35rem' }}>
              <Sparkles size={17} color="#10B981" />
              <span>Potensi Ekonomi & Inovasi Bernilai Tambah:</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#047857', marginBottom: '0.75rem', lineHeight: 1.5 }}>
              {waste.economicPotential}
            </p>

            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065F46', marginBottom: '0.4rem' }}>
              Rekomendasi Kreasi Inovasi di Marketplace / Katalog:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {waste.recommendedInnovations.map((item, idx) => {
                const matchedId = waste.recommendedInnovationIds?.[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (matchedId && onSelectSpecificInnovation) {
                        onSelectSpecificInnovation(matchedId, item);
                      } else if (onSelectInnovation) {
                        onSelectInnovation(waste.id, waste.name);
                      }
                      onClose();
                    }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.85rem',
                    background: '#FFFFFF',
                    border: '1.5px solid #34D399',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#047857',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#10B981';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#047857';
                  }}
                >
                  💡 {item}
                </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
