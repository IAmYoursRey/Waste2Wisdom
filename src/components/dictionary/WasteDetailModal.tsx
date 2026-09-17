import React from 'react';
import { WasteItem } from '../../types';
import { X, ShieldAlert, CheckCircle2, AlertTriangle, FileText, HardHat, Sparkles, Scale } from 'lucide-react';

interface WasteDetailModalProps {
  waste: WasteItem | null;
  onClose: () => void;
  onSelectInnovation?: (innovationTitle: string) => void;
}

export const WasteDetailModal: React.FC<WasteDetailModalProps> = ({
  waste,
  onClose,
  onSelectInnovation
}) => {
  if (!waste) return null;

  const isB3 = waste.category === 'b3';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{
          borderBottom: isB3 ? '2px solid #FECACA' : '2px solid #A7F3D0',
          background: isB3 ? '#FEF2F2' : '#F0FDF4'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className={`badge-national ${isB3 ? 'badge-danger' : 'badge-safe'}`}>
                {waste.categoryLabel}
              </span>
              <span className="badge-sector">{waste.industrialSector}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: isB3 ? '#991B1B' : '#065F46' }}>
              {waste.name}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)'
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
            background: isB3 ? '#FFF1F2' : '#F0FDF4',
            border: isB3 ? '1.5px solid #FDA4AF' : '1.5px solid #86EFAC',
            display: 'flex',
            gap: '0.85rem'
          }}>
            {isB3 ? (
              <ShieldAlert size={26} color="#E11D48" style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <CheckCircle2 size={26} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isB3 ? '#9F1239' : '#065F46' }}>
                {isB3 ? 'Peringatan Keselamatan: Kategori Limbah B3' : 'Kategori Aman: Dapat Diolah Mandiri / Komunitas'}
              </div>
              <div style={{ fontSize: '0.85rem', color: isB3 ? '#881337' : '#047857', marginTop: '0.2rem', lineHeight: 1.5 }}>
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
                <span>DASAR HUKUM NASIONAL</span>
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
                <span>SUMBER PROSES INDUSTRI</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginTop: '0.25rem' }}>
                {waste.source}
              </div>
            </div>
          </div>

          {/* Characteristics & Physical Form */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Wujud Fisik & Karakteristik:
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              {waste.physicalForm}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {waste.characteristics.map((char, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.2rem 0.6rem',
                  background: '#ECFDF5',
                  color: '#065F46',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid #A7F3D0'
                }}>
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Required PPE (APD) */}
          <div style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
              <HardHat size={17} color="#059669" />
              <span>Standar Alat Pelindung Diri (APD) Wajib:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {waste.requiredPPE.map((ppe, idx) => (
                <span key={idx} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.75rem',
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--border-light)',
                  color: 'var(--text-main)'
                }}>
                  🛡️ {ppe}
                </span>
              ))}
            </div>
          </div>

          {/* Handling Guidelines & Prohibitions */}
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
                <span>SOP Penanganan yang Dianjurkan:</span>
              </div>
              <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#14532D', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {waste.handlingGuidelines.map((guide, idx) => (
                  <li key={idx}>{guide}</li>
                ))}
              </ul>
            </div>

            {/* Prohibitions */}
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
              Rekomendasi Kreasi Inovasi di Katalog:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {waste.recommendedInnovations.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (onSelectInnovation) onSelectInnovation(item);
                    onClose();
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.3rem 0.75rem',
                    background: '#FFFFFF',
                    border: '1.5px solid #34D399',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#047857',
                    boxShadow: 'var(--shadow-sm)',
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
              ))}
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
