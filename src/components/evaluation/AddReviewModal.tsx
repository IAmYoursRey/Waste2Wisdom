import React, { useState } from 'react';
import { InnovationItem, ReviewItem } from '../../types';
import { X, Star, CheckCircle2, AlertTriangle, Lightbulb, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  innovations: InnovationItem[];
  preSelectedInnovation?: InnovationItem | null;
  onSubmitSuccess: (newReview: ReviewItem) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  innovations,
  preSelectedInnovation,
  onSubmitSuccess
}) => {
  const [selectedInnovationId, setSelectedInnovationId] = useState(
    preSelectedInnovation ? preSelectedInnovation.id : (innovations[0]?.id || '')
  );
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<'Siswa / Mahasiswa' | 'Pengrajin UMKM' | 'Warga Komunitas' | 'Praktisi Daur Ulang'>('Siswa / Mahasiswa');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isEasyToMake, setIsEasyToMake] = useState<'Sangat Mudah' | 'Cukup Mudah' | 'Butuh Keterampilan Khusus' | 'Sulit'>('Cukup Mudah');
  const [isSuccessful, setIsSuccessful] = useState<'Berhasil 100%' | 'Berhasil dengan Modifikasi' | 'Gagal / Perlu Coba Lagi'>('Berhasil 100%');
  const [comment, setComment] = useState('');
  const [troubleshootingTip, setTroubleshootingTip] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetInnovation = innovations.find((i) => i.id === selectedInnovationId);
    const innovationTitle = targetInnovation ? targetInnovation.title : 'Inovasi Daur Ulang';

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      innovationId: selectedInnovationId,
      innovationTitle,
      userName: userName || 'Pengulas Anonim',
      userRole,
      rating,
      isEasyToMake,
      isSuccessful,
      comment,
      troubleshootingTip: troubleshootingTip.trim() || undefined,
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      likes: 1
    };

    confetti({
      particleCount: 85,
      spread: 65,
      origin: { y: 0.6 }
    });

    setIsSuccess(true);
    onSubmitSuccess(newReview);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#F0FDF4', borderBottom: '2px solid #A7F3D0' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge-5m">5M: MENGEVALUASI</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ulasan & Uji Keberhasilan Produk</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', color: 'var(--leaf-deep)' }}>
              Evaluasi Hasil Pembuatan Produk Inovasi
            </h2>
          </div>
          <button onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <CheckCircle2 size={60} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
              Ulasan Evaluasi Berhasil Dikirim!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '460px', margin: '0 auto' }}>
              Terima kasih telah berbagi pengalaman uji coba! Ulasan Anda menjadi bahan evaluasi penting bagi komunitas perajin dan pelajar lain.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              
              {/* Target Innovation */}
              <div className="form-group">
                <label className="form-label">Pilih Produk Inovasi yang Anda Buat / Uji *</label>
                <select
                  value={selectedInnovationId}
                  onChange={(e) => setSelectedInnovationId(e.target.value)}
                  className="form-select"
                  required
                >
                  {innovations.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.title} ({inv.wasteSource})
                    </option>
                  ))}
                </select>
              </div>

              {/* User Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="form-group">
                  <label className="form-label">Nama Anda / Kelompok *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Raihan / Kelompok 4 KKN"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Peran Anda</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="Siswa / Mahasiswa">Siswa / Mahasiswa</option>
                    <option value="Pengrajin UMKM">Pengrajin UMKM</option>
                    <option value="Warga Komunitas">Warga Komunitas</option>
                    <option value="Praktisi Daur Ulang">Praktisi Daur Ulang</option>
                  </select>
                </div>
              </div>

              {/* Star Rating */}
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label">Rating Kepuasan Hasil:</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{ padding: '0.2rem', color: (hoverRating || rating) >= star ? '#F59E0B' : '#CBD5E1' }}
                    >
                      <Star size={28} fill={(hoverRating || rating) >= star ? '#F59E0B' : 'transparent'} />
                    </button>
                  ))}
                  <span style={{ marginLeft: '0.5rem', fontWeight: 700, fontSize: '0.95rem', color: '#B45309' }}>
                    {rating} dari 5 Bintang
                  </span>
                </div>
              </div>

              {/* Core 5M Question 1: Apakah mudah digunakan / dibuat? */}
              <div style={{
                background: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ❓ Pertanyaan 1: Apakah produk ini mudah dibuat / digunakan?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
                  {(['Sangat Mudah', 'Cukup Mudah', 'Butuh Keterampilan Khusus', 'Sulit'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsEasyToMake(opt)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: isEasyToMake === opt ? 700 : 500,
                        background: isEasyToMake === opt ? '#10B981' : '#FFFFFF',
                        color: isEasyToMake === opt ? '#FFFFFF' : 'var(--text-main)',
                        border: isEasyToMake === opt ? '1px solid #10B981' : '1px solid #CBD5E1',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Core 5M Question 2: Apakah berhasil pembuatannya? */}
              <div style={{
                background: '#F8FAFC',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--border-light)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ❓ Pertanyaan 2: Apakah berhasil pembuatannya?
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.5rem' }}>
                  {(['Berhasil 100%', 'Berhasil dengan Modifikasi', 'Gagal / Perlu Coba Lagi'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setIsSuccessful(opt)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.78rem',
                        fontWeight: isSuccessful === opt ? 700 : 500,
                        background: isSuccessful === opt ? (opt === 'Gagal / Perlu Coba Lagi' ? '#EF4444' : '#059669') : '#FFFFFF',
                        color: isSuccessful === opt ? '#FFFFFF' : 'var(--text-main)',
                        border: isSuccessful === opt ? '1px solid transparent' : '1px solid #CBD5E1',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {opt === 'Berhasil 100%' && '✅ '}
                      {opt === 'Berhasil dengan Modifikasi' && '🛠️ '}
                      {opt === 'Gagal / Perlu Coba Lagi' && '❌ '}
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Commentary */}
              <div className="form-group">
                <label className="form-label">Ulasan & Cerita Pembuatan Anda *</label>
                <textarea
                  required
                  placeholder="Ceritakan pengalaman Anda: Berapa lama waktu yang dibutuhkan? Bagaimana kualitas produk jadinya? Apakah ada hal yang perlu diperhatikan?..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* Troubleshooting Tips */}
              <div className="form-group">
                <label className="form-label">Tips Pemecahan Masalah (Troubleshooting) bagi Pengguna Lain</label>
                <input
                  type="text"
                  placeholder="Contoh: Saat pengeringan, jangan jemur langsung di terik siang agar papan tidak melengkung"
                  value={troubleshootingTip}
                  onChange={(e) => setTroubleshootingTip(e.target.value)}
                  className="form-input"
                  style={{ background: '#FFFBEB' }}
                />
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary">
                <Send size={16} />
                <span>Publikasikan Evaluasi</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
