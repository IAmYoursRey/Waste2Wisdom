import React, { useState } from 'react';
import { InnovationItem } from '../../types';
import { 
  X, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Play, 
  Pause, 
  ShieldAlert, 
  Star,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface InnovationDetailModalProps {
  innovation: InnovationItem | null;
  onClose: () => void;
  onOpenReviewModal: (innovation: InnovationItem) => void;
}

export const InnovationDetailModal: React.FC<InnovationDetailModalProps> = ({
  innovation,
  onClose,
  onOpenReviewModal
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  if (!innovation) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '820px' }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header" style={{ background: '#F0FDF4', borderBottom: '2px solid #A7F3D0' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
              <span className="badge-sector">{innovation.category}</span>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.2rem 0.6rem',
                borderRadius: 'var(--radius-full)',
                background: innovation.difficulty === 'Mudah' ? '#DCFCE7' : innovation.difficulty === 'Menengah' ? '#FEF3C7' : '#FEE2E2',
                color: innovation.difficulty === 'Mudah' ? '#166534' : innovation.difficulty === 'Menengah' ? '#92400E' : '#991B1B',
              }}>
                Kesulitan: {innovation.difficulty}
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: 'var(--leaf-deep)' }}>
              {innovation.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            style={{
              padding: '0.4rem',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '1px solid var(--border-light)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          
          {/* Subtitle & Waste source */}
          <div style={{
            background: '#F8FAFC',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-light)'
          }}>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-main)', fontWeight: 600, marginBottom: '0.4rem' }}>
              {innovation.tagline}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <strong>Bahan Limbah Utama:</strong> <span style={{ color: '#059669', fontWeight: 700 }}>{innovation.wasteSource}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem'
          }}>
            <div style={{ background: '#ECFDF5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>
                <Clock size={15} color="#059669" />
                <span>ESTIMASI WAKTU</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--leaf-deep)', marginTop: '0.2rem' }}>
                {innovation.estimatedTime}
              </div>
            </div>

            <div style={{ background: '#ECFDF5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>
                <DollarSign size={15} color="#059669" />
                <span>ESTIMASI MODAL</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--leaf-deep)', marginTop: '0.2rem' }}>
                {innovation.estimatedCost}
              </div>
            </div>

            <div style={{ background: '#ECFDF5', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid #A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: '#065F46', fontWeight: 600 }}>
                <TrendingUp size={15} color="#059669" />
                <span>TINGKAT KEBERHASILAN</span>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#059669', marginTop: '0.2rem' }}>
                {innovation.successRate}% Sukses Komunitas
              </div>
            </div>
          </div>

          {/* Economic Value */}
          <div style={{
            background: 'linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid #6EE7B7'
          }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065F46', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
              Nilai Ekonomi & Potensi Pasar:
            </div>
            <div style={{ fontSize: '0.86rem', color: '#047857', fontWeight: 600 }}>
              {innovation.economicValue}
            </div>
          </div>

          {/* Video / Infographic Interactive Player Simulation */}
          <div style={{
            position: 'relative',
            background: '#0F172A',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '2px solid #1E293B',
            aspectRatio: '16/9',
            maxHeight: '320px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            {/* Ambient Leaf Glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.25) 0%, rgba(15, 23, 42, 0.95) 80%)'
            }} />

            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '1.5rem' }}>
              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  color: '#FFFFFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                  marginBottom: '1rem',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                {isPlayingVideo ? <Pause size={28} /> : <Play size={28} style={{ marginLeft: '3px' }} />}
              </button>

              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                {isPlayingVideo ? `Memutar Simulasi Video Panduan: ${innovation.title}` : `Video Panduan & Infografis Langkah`}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#A7F3D0' }}>
                {isPlayingVideo ? "Durasi: 04:30 Menit • Format Visual Berstandar Kemendikbud" : "Klik untuk memutar video demonstrasi pembuatan"}
              </div>

              {/* Step indicator inside video */}
              <div style={{
                marginTop: '1rem',
                display: 'inline-flex',
                gap: '0.4rem',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.72rem'
              }}>
                Langkah {activeStep + 1} dari {innovation.steps.length}: {innovation.steps[activeStep].title}
              </div>
            </div>
          </div>

          {/* Materials & Tools Split */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            
            {/* Materials */}
            <div style={{
              background: '#F8FAFC',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                📦 Bahan-Bahan yang Dibutuhkan:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {innovation.materials.map((mat, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.82rem',
                    padding: '0.3rem 0',
                    borderBottom: '1px dashed #E2E8F0'
                  }}>
                    <span style={{ color: 'var(--text-main)' }}>• {mat.name}</span>
                    <span style={{ fontWeight: 700, color: '#059669', background: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                      {mat.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div style={{
              background: '#F8FAFC',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                🛠️ Peralatan yang Diperlukan:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {innovation.tools.map((tool, idx) => (
                  <div key={idx} style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-main)',
                    padding: '0.3rem 0',
                    borderBottom: '1px dashed #E2E8F0'
                  }}>
                    🔧 {tool}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Step-by-Step Guide */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--leaf-deep)' }}>
                Panduan Langkah-demi-Langkah Pembuatan:
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {innovation.steps.length} Langkah Terstruktur
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {innovation.steps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: activeStep === idx ? '2px solid #10B981' : '1px solid var(--border-light)',
                    background: activeStep === idx ? '#F0FDF4' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: activeStep === idx ? '#10B981' : '#E2E8F0',
                      color: activeStep === idx ? '#FFFFFF' : '#475569',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      flexShrink: 0
                    }}>
                      {step.stepNumber}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                        {step.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {step.description}
                      </div>

                      {step.tip && (
                        <div style={{
                          marginTop: '0.5rem',
                          padding: '0.45rem 0.75rem',
                          background: '#FEF3C7',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.78rem',
                          color: '#92400E',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem'
                        }}>
                          <Lightbulb size={14} color="#D97706" style={{ flexShrink: 0 }} />
                          <span><strong>Tips Sukses:</strong> {step.tip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Warning Tips */}
          <div style={{
            background: '#FEF2F2',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #FECACA'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.85rem', color: '#991B1B', marginBottom: '0.4rem' }}>
              <ShieldAlert size={16} color="#DC2626" />
              <span>Standar Keselamatan Kerja (K3) Selama Pembuatan:</span>
            </div>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#7F1D1D', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {innovation.safetyTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-secondary">
            Tutup
          </button>
          
          <button
            onClick={() => {
              onClose();
              onOpenReviewModal(innovation);
            }}
            className="btn-primary"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
          >
            <Star size={16} />
            <span>Beri Ulasan Evaluasi (5M)</span>
          </button>
        </div>

      </div>
    </div>
  );
};
