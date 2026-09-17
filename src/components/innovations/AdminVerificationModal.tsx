import React, { useState } from 'react';
import { InnovationItem, ReviewItem } from '../../types';
import { useToast } from '../../context/ToastContext';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  AlertTriangle, 
  Sparkles, 
  MessageSquare, 
  ThumbsDown,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AdminVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pendingInnovations: InnovationItem[];
  reportedReviews?: ReviewItem[];
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
  onDeleteReportedReview?: (id: string) => void;
  onSeedMockPending?: () => void;
}

export const AdminVerificationModal: React.FC<AdminVerificationModalProps> = ({
  isOpen,
  onClose,
  pendingInnovations,
  reportedReviews = [],
  onApprove,
  onReject,
  onDeleteReportedReview,
  onSeedMockPending
}) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'innovations' | 'reviews'>('innovations');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  if (!isOpen) return null;

  const handleApproveClick = (id: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    onApprove(id);
    addToast('Inovasi berhasil disetujui & diterbitkan ke marketplace!', 'success');
  };

  const handleConfirmReject = (id: string) => {
    if (!rejectionReason.trim()) {
      addToast('Harap tuliskan alasan penolakan/revisi agar pemohon dapat memperbaiki inovasinya.', 'warning');
      return;
    }
    onReject(id, rejectionReason);
    setRejectingId(null);
    setRejectionReason('');
    addToast('Status inovasi diubah menjadi Perlu Revisi / Ditolak.', 'info');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" role="dialog" aria-modal="true" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#F0FDF4', borderBottom: '2px solid #A7F3D0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#064E3B',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--leaf-deep)' }}>
                Dashboard Moderasi Admin & Kurator
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Tinjau pengajuan ide inovasi baru dan moderasi konten komunitas
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{ padding: '0.35rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.75rem 1.25rem',
          background: '#F8FAFC',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <button
            onClick={() => setActiveTab('innovations')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'innovations' ? 700 : 500,
              background: activeTab === 'innovations' ? '#10B981' : 'transparent',
              color: activeTab === 'innovations' ? '#FFFFFF' : 'var(--text-muted)'
            }}
          >
            Antrean Inovasi ({pendingInnovations.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: activeTab === 'reviews' ? 700 : 500,
              background: activeTab === 'reviews' ? '#10B981' : 'transparent',
              color: activeTab === 'reviews' ? '#FFFFFF' : 'var(--text-muted)'
            }}
          >
            Laporan Ulasan ({reportedReviews.length})
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
          
          {/* TAB 1: INNOVATIONS */}
          {activeTab === 'innovations' && (
            <div>
              {pendingInnovations.length === 0 ? (
                <div className="empty-state">
                  <div style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: '#ECFDF5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto'
                  }}>
                    <Check size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                    Semua Inovasi Telah Diverifikasi!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', maxWidth: '440px' }}>
                    Tidak ada ide inovasi yang menunggu persetujuan saat ini. Anda dapat membuat contoh pengajuan uji coba untuk menguji workflow.
                  </p>
                  
                  {onSeedMockPending && (
                    <button
                      type="button"
                      onClick={onSeedMockPending}
                      className="btn-secondary btn-sm"
                    >
                      <Sparkles size={14} color="#059669" />
                      <span>Buat Contoh Pengajuan Uji Coba</span>
                    </button>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
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
                            onClick={() => setRejectingId(rejectingId === item.id ? null : item.id)}
                            className="btn-outline btn-sm"
                            style={{ color: '#EF4444', borderColor: '#FECACA' }}
                          >
                            <Trash2 size={14} />
                            <span>Tolak / Revisi</span>
                          </button>

                          <button
                            onClick={() => handleApproveClick(item.id)}
                            className="btn-primary btn-sm"
                          >
                            <Check size={15} />
                            <span>Setujui</span>
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
                        fontSize: '0.78rem',
                        marginBottom: '0.75rem'
                      }}>
                        <div><strong>Bahan Limbah:</strong> {item.wasteSource}</div>
                        <div><strong>Tingkat Kesulitan:</strong> {item.difficulty}</div>
                        <div><strong>Estimasi Modal:</strong> {item.estimatedCost}</div>
                        <div><strong>Diajukan Oleh:</strong> {item.submittedBy} ({item.submissionDate})</div>
                      </div>

                      {/* Rejection input box */}
                      {rejectingId === item.id && (
                        <div style={{
                          marginTop: '0.75rem',
                          background: '#FFF1F2',
                          padding: '0.85rem',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid #FECDD3'
                        }}>
                          <label className="form-label" style={{ color: '#991B1B' }}>
                            Alasan Penolakan / Catatan Perbaikan untuk Pemohon *
                          </label>
                          <textarea
                            placeholder="Contoh: Takaran perekat pada langkah 2 belum spesifik; harap lengkapi rasio berat/volume agar pembaca dapat mereplikasi dengan aman."
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            className="form-textarea"
                            style={{ minHeight: '60px', marginBottom: '0.5rem' }}
                          />
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                            <button
                              type="button"
                              onClick={() => setRejectingId(null)}
                              className="btn-outline btn-sm"
                            >
                              Batal
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConfirmReject(item.id)}
                              className="btn-danger btn-sm"
                            >
                              Kirim Penolakan
                            </button>
                          </div>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: REPORTED REVIEWS */}
          {activeTab === 'reviews' && (
            <div>
              {reportedReviews.length === 0 ? (
                <div className="empty-state">
                  <Check size={28} color="#10B981" />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Tidak ada ulasan komunitas yang dilaporkan bermasalah.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {reportedReviews.map((rev) => (
                    <div key={rev.id} style={{
                      padding: '1rem',
                      background: '#FFF1F2',
                      border: '1px solid #FECACA',
                      borderRadius: 'var(--radius-md)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#991B1B' }}>
                          Laporan Masalah pada Ulasan: {rev.innovationTitle}
                        </span>
                        {onDeleteReportedReview && (
                          <button
                            onClick={() => onDeleteReportedReview(rev.id)}
                            className="btn-danger btn-sm"
                          >
                            Hapus Ulasan
                          </button>
                        )}
                      </div>
                      <p style={{ fontSize: '0.84rem', color: '#7F1D1D' }}>
                        <strong>Komentar:</strong> "{rev.comment}"
                      </p>
                      <div style={{ fontSize: '0.76rem', color: '#B91C1C', marginTop: '0.2rem' }}>
                        <strong>Alasan Pelapor:</strong> {rev.reportReason || 'Konten tidak pantas atau tidak relevan'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
