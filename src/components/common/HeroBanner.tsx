import React from 'react';
import { Sparkles, Shield, ArrowRight, BookOpen, Compass, Lightbulb, MapPin, Star } from 'lucide-react';

interface HeroBannerProps {
  onSelect5M: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelect5M }) => {
  const metrics = [
    { label: 'Limbah Terklasifikasi', value: '10+', sub: 'Non-B3 & B3 SNI' },
    { label: 'Blueprint Inovasi', value: '6+', sub: 'Panduan Praktis' },
    { label: 'Jejaring Sirkular', value: '7+', sub: 'Industri & UMKM' },
    { label: 'Rasio Keberhasilan', value: '94%', sub: 'Evaluasi Komunitas' },
  ];

  const steps5M = [
    { id: 'dictionary', title: '1. Mengenali & Memahami', desc: 'Kamus limbah B3 vs non-B3 aman', icon: BookOpen },
    { id: 'explore', title: '2. Mengeksplorasi', desc: 'Tur tempat PengNIP & mesin industri', icon: Compass },
    { id: 'innovations', title: '3. Menginovasi', desc: 'Katalog kreasi & ajukan ide baru', icon: Lightbulb },
    { id: 'matchmaking', title: '4. Mengomunikasikan', desc: 'Peta penghubung pasokan industri', icon: MapPin },
    { id: 'evaluation', title: '5. Mengevaluasi', desc: 'Uji keberhasilan & kemudahan produk', icon: Star },
  ];

  return (
    <div style={{
      position: 'relative',
      background: 'linear-gradient(135deg, #064E3B 0%, #065F46 40%, #047857 75%, #059669 100%)',
      color: '#FFFFFF',
      padding: '3.5rem 0 3rem 0',
      overflow: 'hidden',
      borderBottom: '4px solid var(--leaf-lime)'
    }}>
      {/* Dynamic Background Glows */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        right: '-5%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(132, 204, 22, 0.2) 0%, transparent 70%)',
        filter: 'blur(40px)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(167, 243, 208, 0.3)',
            fontSize: '0.78rem',
            fontWeight: 700,
            color: '#A7F3D0',
            letterSpacing: '0.4px'
          }}>
            <Sparkles size={14} color="#34D399" />
            <span>METODE 5M SIRKULAR</span>
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#E2E8F0'
          }}>
            <Shield size={14} color="#BEF264" />
            <span>Sesuai PP No. 22/2021 & Permen LHK</span>
          </div>
        </div>

        {/* Top Two-Column Grid: Text & Metrics on Left, Brand Visual on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1.2fr) minmax(280px, 0.9fr)',
          gap: '2.5rem',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }} className="hero-grid">
          
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
              color: '#FFFFFF',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '1rem',
              letterSpacing: '-0.5px'
            }}>
              Transformasi Limbah Industri Menjadi <span style={{
                background: 'linear-gradient(90deg, #A7F3D0 0%, #BEF264 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Karya Berdaya Guna</span>
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
              color: '#D1FAE5',
              lineHeight: 1.6,
              marginBottom: '1.75rem',
              maxWidth: '650px'
            }}>
              Platform kolaborasi edukasi sirkular nasional yang menghubungkan industri penghasil limbah non-B3 terpilah dengan UMKM, komunitas perajin, dan pelajar. Kenali bahan aman, pelajari cara pengolahannya, dan ciptakan produk alternatif bernilai ekonomi.
            </p>

            {/* 4 Impact Stat Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '0.85rem'
            }}>
              {metrics.map((m, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    border: '1px solid rgba(255, 255, 255, 0.18)'
                  }}
                >
                  <div style={{
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: '#BEF264',
                    lineHeight: 1.1,
                    fontFamily: 'var(--font-display)'
                  }}>
                    {m.value}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#FFFFFF', marginTop: '0.2rem' }}>
                    {m.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#A7F3D0', marginTop: '0.1rem' }}>
                    {m.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div 
              className="animate-float"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
                border: '3px solid rgba(167, 243, 208, 0.35)',
                background: 'rgba(255, 255, 255, 0.05)',
                maxWidth: '480px',
                width: '100%'
              }}
            >
              <img 
                src="./waste2wisdom-hero-banner.jpg" 
                alt="Waste2Wisdom Circular Economy Visual"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.75rem 1rem',
                background: 'linear-gradient(to top, rgba(6, 78, 59, 0.95) 0%, transparent 100%)',
                fontSize: '0.76rem',
                color: '#D1FAE5',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span>Siklus Sirkular Industri Hijau</span>
                <span style={{ color: '#BEF264' }}>100% Berdaya Guna</span>
              </div>
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>

        {/* 5M Interactive Flow Navigation Bar */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div style={{
            fontSize: '0.82rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            color: '#BEF264',
            marginBottom: '0.85rem'
          }}>
            Eksplorasi Pembelajaran 5M:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '0.75rem'
          }}>
            {steps5M.map((step) => {
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  onClick={() => onSelect5M(step.id)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(167, 243, 208, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem 0.9rem',
                    textAlign: 'left',
                    color: '#FFFFFF',
                    transition: 'all var(--transition-fast)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.borderColor = '#BEF264';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(167, 243, 208, 0.2)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Icon size={18} color="#34D399" />
                    <ArrowRight size={13} color="#A7F3D0" />
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#D1FAE5', lineHeight: 1.3 }}>
                    {step.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
