import React, { useState } from 'react';
import { InnovationItem, InnovationStep } from '../../types';
import { X, Plus, Trash2, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SubmitInnovationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newInnovation: InnovationItem) => void;
}

export const SubmitInnovationModal: React.FC<SubmitInnovationModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [wasteSource, setWasteSource] = useState('Ampas Tebu');
  const [category, setCategory] = useState('Kerajinan Kreatif');
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Menengah' | 'Tinggi'>('Mudah');
  const [estimatedTime, setEstimatedTime] = useState('1 - 2 Hari');
  const [estimatedCost, setEstimatedCost] = useState('Rp 20.000 / produk');
  const [economicValue, setEconomicValue] = useState('Dapat dijual Rp 50.000 ke pasar cinderamata');
  const [submittedBy, setSubmittedBy] = useState('');

  // Materials
  const [materialsText, setMaterialsText] = useState('Bahan limbah (1 kg), Lem perekat (200 gr), Air (500 ml)');
  // Tools
  const [toolsText, setToolsText] = useState('Gunting, Wadah pencampur, Cetakan kayu');
  
  // Steps
  const [steps, setSteps] = useState<InnovationStep[]>([
    { stepNumber: 1, title: 'Persiapan Bahan & Pembersihan', description: 'Bersihkan dan keringkan limbah dari kotoran asing.', tip: 'Jemur hingga kering sempurna.' },
    { stepNumber: 2, title: 'Pencampuran & Pembentukan', description: 'Campurkan bahan limbah dengan perekat hingga homogen, lalu cetak.', tip: 'Beri tekanan merata.' },
    { stepNumber: 3, title: 'Pengeringan & Finishing', description: 'Biarkan mengering dan berikan lapisan akhir ramah lingkungan.', tip: 'Gunakan pernis waterbased.' }
  ]);

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        title: `Langkah ${steps.length + 1}`,
        description: '',
        tip: ''
      }
    ]);
  };

  const handleRemoveStep = (index: number) => {
    if (steps.length <= 1) return;
    const updated = steps.filter((_, i) => i !== index).map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSteps(updated);
  };

  const handleStepChange = (index: number, field: keyof InnovationStep, value: string) => {
    const updated = [...steps];
    updated[index] = { ...updated[index], [field]: value };
    setSteps(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const parsedMaterials = materialsText.split(',').map((m) => {
      const parts = m.trim().split('(');
      return {
        name: parts[0]?.trim() || m.trim(),
        amount: parts[1]?.replace(')', '').trim() || 'Secukupnya'
      };
    });

    const parsedTools = toolsText.split(',').map((t) => t.trim()).filter(Boolean);

    const newInnovation: InnovationItem = {
      id: `inv-${Date.now()}`,
      title,
      tagline,
      wasteSource,
      category,
      difficulty,
      estimatedTime,
      estimatedCost,
      economicValue,
      rating: 5.0,
      reviewCount: 0,
      successRate: 95,
      materials: parsedMaterials,
      tools: parsedTools,
      steps,
      safetyTips: ['Gunakan masker dan sarung tangan kerja saat pengolahan bahan.'],
      status: 'pending', // Marked as pending for Admin verification!
      submittedBy: submittedBy || 'Inovator Komunitas',
      submissionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsSuccess(true);
    onSubmitSuccess(newInnovation);

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
              <span className="badge-5m">3M: MENGINOVASI</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Kurikulum Merdeka 5M</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: 'var(--leaf-deep)' }}>
              Ajukan Ide Inovasi Produk ke Katalog Web
            </h2>
          </div>
          <button onClick={onClose} style={{ padding: '0.4rem' }}>
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
            <CheckCircle2 size={60} color="#10B981" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.4rem', color: 'var(--leaf-deep)', marginBottom: '0.6rem' }}>
              Inovasi Anda Berhasil Diajukan!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Inovasi baru Anda telah masuk ke <strong>Antrean Verifikasi Admin</strong>. Anda dapat mengklik tombol <strong>"Verifikasi"</strong> di navigasi atas untuk menyetujuinya agar langsung tayang di marketplace.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '68vh', overflowY: 'auto' }}>
              
              {/* Notice */}
              <div style={{
                background: '#ECFDF5',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid #A7F3D0',
                marginBottom: '1.25rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem'
              }}>
                <Sparkles size={18} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.82rem', color: '#065F46', lineHeight: 1.45 }}>
                  <strong>Prinsip 5M (Menginovasi):</strong> Jika produk yang ingin Anda buat belum ada di contoh web, ajukan rancangan inovasi Anda di sini. Ide akan ditinjau oleh kurator/admin sebelum tampil untuk seluruh pengguna.
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="form-group">
                <label className="form-label">Nama Inovasi Produk *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tempat Pensil Estetik dari Limbah Perca Batik & Karton"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deskripsi Singkat / Tagline Inovasi *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pemanfaatan sisa perca garmen menjadi merchandise ramah lingkungan bernilai seni"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Waste Source & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Sumber Limbah Industri *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kain Perca / Serbuk Kayu / Kulit Singkong"
                    value={wasteSource}
                    onChange={(e) => setWasteSource(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Kategori Inovasi</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Kerajinan Kreatif">Kerajinan Kreatif & Home Decor</option>
                    <option value="Material Bangunan Alternatif">Material Bangunan Alternatif</option>
                    <option value="Bio-Plastik & Kemasan Hijau">Bio-Plastik & Kemasan Hijau</option>
                    <option value="Agro & Pupuk Organik Hayati">Agro & Pupuk Organik Hayati</option>
                    <option value="Fashion Sirkular">Fashion Sirkular</option>
                  </select>
                </div>
              </div>

              {/* Difficulty & Cost */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.85rem' }}>
                <div className="form-group">
                  <label className="form-label">Tingkat Kesulitan</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="form-select"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Menengah">Menengah</option>
                    <option value="Tinggi">Tinggi</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimasi Waktu</label>
                  <input
                    type="text"
                    placeholder="Contoh: 3 Jam"
                    value={estimatedTime}
                    onChange={(e) => setEstimatedTime(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Estimasi Modal</label>
                  <input
                    type="text"
                    placeholder="Contoh: Rp 15.000"
                    value={estimatedCost}
                    onChange={(e) => setEstimatedCost(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              {/* Economic Value */}
              <div className="form-group">
                <label className="form-label">Potensi Nilai Jual / Manfaat Ekonomi</label>
                <input
                  type="text"
                  placeholder="Contoh: Laku dijual Rp 45.000 / pcs di marketplace & pameran kriya"
                  value={economicValue}
                  onChange={(e) => setEconomicValue(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Materials & Tools */}
              <div className="form-group">
                <label className="form-label">Daftar Bahan (pisahkan dengan koma dan jumlah dalam kurung)</label>
                <input
                  type="text"
                  placeholder="Contoh: Serbuk gergaji (1 kg), Lem kayu (250 gr), Air (500 ml)"
                  value={materialsText}
                  onChange={(e) => setMaterialsText(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Peralatan yang Digunakan (pisahkan dengan koma)</label>
                <input
                  type="text"
                  placeholder="Contoh: Wadah baskom, Sendok pengaduk, Cetakan kayu, Kuas"
                  value={toolsText}
                  onChange={(e) => setToolsText(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Steps builder */}
              <div style={{ marginTop: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <label className="form-label" style={{ margin: 0 }}>
                    Langkah-demi-Langkah Pembuatan ({steps.length} Langkah):
                  </label>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="btn-outline"
                    style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
                  >
                    <Plus size={14} />
                    <span>Tambah Langkah</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {steps.map((step, idx) => (
                    <div key={idx} style={{
                      padding: '0.85rem',
                      background: '#F8FAFC',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-light)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--leaf-deep)' }}>
                          Langkah {step.stepNumber}:
                        </span>
                        {steps.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(idx)}
                            style={{ color: '#EF4444', padding: '2px' }}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Judul langkah (contoh: Pengeringan bahan)"
                        value={step.title}
                        onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                        className="form-input"
                        style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}
                        required
                      />

                      <textarea
                        placeholder="Uraian instruksi detail langkah ini..."
                        value={step.description}
                        onChange={(e) => handleStepChange(idx, 'description', e.target.value)}
                        className="form-textarea"
                        style={{ minHeight: '60px', marginBottom: '0.4rem', fontSize: '0.82rem' }}
                        required
                      />

                      <input
                        type="text"
                        placeholder="Tips sukses opsional (contoh: Jangan dijemur saat terik)"
                        value={step.tip || ''}
                        onChange={(e) => handleStepChange(idx, 'tip', e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.8rem', background: '#FFFBEB' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submitter Info */}
              <div className="form-group">
                <label className="form-label">Nama Pengusul / Sekolah / Komunitas *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tim Inovator SMKN 2 / Koperasi Kreatif Ibu Mandiri"
                  value={submittedBy}
                  onChange={(e) => setSubmittedBy(e.target.value)}
                  className="form-input"
                />
              </div>

            </div>

            <div className="modal-footer">
              <button type="button" onClick={onClose} className="btn-secondary">
                Batal
              </button>
              <button type="submit" className="btn-primary">
                Ajukan ke Katalog Web
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
