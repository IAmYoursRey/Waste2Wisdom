import React from 'react';
import { InnovationItem } from '../../types';
import { X, ShieldCheck, Check, Trash2, Clock, DollarSign, User, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingInnovations: InnovationItem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onSeedMockPending?: () => void;
}

export const AdminVerificationModal: React.FC<AdminVerificationModalProps> = ({
  isOpen,
  onClose,
  pendingInnovations,
  onApprove,
  onReject,
  onSeedMockPending
}) => {
  if (!isOpen) return null;

  const handleApproveClick = (id: string) => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.5 }
    });
    onApprove(id);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#F0FDF4', borderBottom: '2px solid #A7F3D0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#10B981',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)' }}>
                Dashboard Verifikasi Admin (5M: Menginovasi)
              </h2>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Tinjau dan verifikasi ide inovasi yang diajukan masyarakat sebelum tayang di katalog publik
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
          
          {pendingInnovations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: '#ECFDF5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto'
              }}>
                <Check size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)', marginBottom: '0.4rem' }}>
                Semua Inovasi Telah Diverifikasi!
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 1.5rem auto' }}>
                Tidak ada pengajuan inovasi yang menunggu persetujuan saat ini. Jika pengguna mengajukan ide baru melalui tombol "Ajukan Inovasi", ide tersebut akan muncul di sini.
              </p>
              
              {onSeedMockPending && (
                <button
                  type="button"
                  onClick={onSeedMockPending}
                  className="btn-secondary"
                  style={{ fontSize: '0.84rem' }}
                >
                  <Sparkles size={15} color="#059669" />
                  <span>Buat Contoh Pengajuan Uji Coba</span>
                </button>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                fontSize: '0.84rem',
                color: '#065F46',
                background: '#ECFDF5',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #A7F3D0'
              }}>
                Terdapat <strong>{pendingInnovations.length} ide inovasi</strong> dalam antrean verifikasi:
              </div>

              {pendingInnovations.map((item) => (
                <div
                  key={item.id}
                  style={{
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid #CBD5E1',
                    background: '#FFFFFF',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                        <span className="badge-sector">{item.category}</span>
                        <span style={{ fontSize: '0.72rem', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                          Menunggu Verifikasi
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                        {item.title}
                      </h3>
                    </div>

                    <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                      <button
                        onClick={() => onReject(item.id)}
                        className="btn-outline"
                        style={{ color: '#EF4444', borderColor: '#FECACA', padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
                        title="Tolak Pengajuan"
                      >
                        <Trash2 size={15} />
                        <span>Tolak</span>
                      </button>

                      <button
                        onClick={() => handleApproveClick(item.id)}
                        className="btn-primary"
                        style={{ padding: '0.4rem 0.95rem', fontSize: '0.8rem' }}
                        title="Setujui & Terbitkan ke Marketplace"
                      >
                        <Check size={16} />
                        <span>Setujui & Publikasikan</span>
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    {item.tagline}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '0.5rem',
                    background: '#F8FAFC',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div><strong>Bahan Limbah:</strong> {item.wasteSource}</div>
                    <div><strong>Tingkat Kesulitan:</strong> {item.difficulty}</div>
                    <div><strong>Estimasi Modal:</strong> {item.estimatedCost}</div>
                    <div><strong>Diajukan Oleh:</strong> {item.submittedBy} ({item.submissionDate})</div>
                  </div>

                  {/* Steps preview */}
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.3rem' }}>
                      Ringkasan Langkah ({item.steps.length} langkah):
                    </div>
                    <ol style={{ paddingLeft: '1.2rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.steps.map((s, sIdx) => (
                        <li key={sIdx}>
                          <strong>{s.title}:</strong> {s.description.slice(0, 80)}...
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>
              ))}
            </div>
          )}

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
