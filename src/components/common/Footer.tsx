import React from 'react';
import { Shield, Sparkles, Heart, FileCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      background: '#064E3B',
      color: '#E2E8F0',
      padding: '3.5rem 0 2rem 0',
      borderTop: '4px solid var(--leaf-lime)',
      marginTop: 'auto'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          
          {/* Brand & Mission */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <img 
                src="./favicon.svg" 
                alt="Logo Waste2Wisdom" 
                style={{ width: '32px', height: '32px' }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
                Waste<span style={{ color: '#34D399' }}>2</span>Wisdom
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: '#A7F3D0', lineHeight: 1.6, marginBottom: '1rem' }}>
              Platform ekosistem sirkular nasional yang mengintegrasikan edukasi 5M, kamus literasi limbah B3/non-B3, panduan inovasi terverifikasi, dan peta penghubung pasokan industri-UMKM.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              fontSize: '0.75rem',
              color: '#BEF264',
              fontWeight: 600
            }}>
              <Sparkles size={14} />
              <span>Dapat Dijalankan Offline & Localhost</span>
            </div>
          </div>

          {/* Legal & National Standards */}
          <div>
            <h4 style={{ fontSize: '0.98rem', color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Standar Regulasi Nasional
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.84rem', color: '#CBD5E1' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FileCheck size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>PP No. 22 Tahun 2021:</strong> Lampiran XIV Pengelolaan Limbah Non-B3 Terdaftar.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FileCheck size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>Permen LHK No. 19/2021:</strong> Tata Kelola dan Pemanfaatan Limbah Non-B3 Industri.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FileCheck size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>SNI 03-0691-1996:</strong> Standar Uji Kuat Tekan Bata Beton & Paving Block.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <FileCheck size={16} color="#34D399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span><strong>SNI 19-7030-2004:</strong> Standar Spesifikasi Kompos Alami Organik.</span>
              </li>
            </ul>
          </div>

          {/* 5M Pillars */}
          <div>
            <h4 style={{ fontSize: '0.98rem', color: '#FFFFFF', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Kerangka Kurikulum 5M
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#D1FAE5' }}>
              <li><strong>1M. Mengenali & Memahami:</strong> Kamus literasi limbah B3 vs Non-B3.</li>
              <li><strong>2M. Mengeksplorasi:</strong> Tur sentra Tempat PengNIP & mesin industri.</li>
              <li><strong>3M. Menginovasi:</strong> Katalog blueprint karya & ajukan ide baru.</li>
              <li><strong>4M. Mengomunikasikan:</strong> Peta penghubung pasokan industri-UMKM.</li>
              <li><strong>5M. Mengevaluasi:</strong> Uji kemudahan & tingkat keberhasilan produk.</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          fontSize: '0.78rem',
          color: '#94A3B8'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>Waste2Wisdom Platform</strong>. Inisiatif Pengelolaan Limbah Industri Menjadi Sumber Daya Sirkular.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>Berbasis Standar Industri & Nasional RI</span>
            <span>•</span>
            <span>Multi-Platform Offline Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
