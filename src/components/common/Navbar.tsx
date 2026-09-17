import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Compass, 
  Lightbulb, 
  MapPin, 
  Star, 
  PlusCircle, 
  ShieldCheck, 
  Menu, 
  X, 
  Wifi, 
  HardDrive
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
  onOpenSubmitModal: () => void;
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  onOpenSubmitModal,
  onOpenAdminModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'dictionary', label: 'Kamus & Literasi', mLabel: '1M: Mengenali', icon: BookOpen },
    { id: 'explore', label: 'Tempat PengNIP', mLabel: '2M: Mengeksplorasi', icon: Compass },
    { id: 'innovations', label: 'Marketplace Inovasi', mLabel: '3M: Menginovasi', icon: Lightbulb },
    { id: 'matchmaking', label: 'Peta Penghubung', mLabel: '4M: Matchmaking', icon: MapPin },
    { id: 'evaluation', label: 'Evaluasi & Ulasan', mLabel: '5M: Mengevaluasi', icon: Star },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.94)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-leaf)',
      boxShadow: '0 4px 20px -2px rgba(16, 185, 129, 0.08)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('dictionary')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <img 
            src="./logo-waste2wisdom.svg" 
            alt="Waste2Wisdom Logo" 
            style={{ height: '44px', width: 'auto' }}
          />
        </div>

        {/* Desktop Nav Items (5M Navigation) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.4rem' }} className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--leaf-deep)' : 'var(--text-muted)',
                  backgroundColor: isActive ? 'var(--leaf-subtle)' : 'transparent',
                  border: isActive ? '1.5px solid var(--leaf-mint)' : '1.5px solid transparent',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <Icon size={16} color={isActive ? '#10B981' : '#64748B'} />
                <span>{item.label}</span>
                {isActive && (
                  <span style={{
                    fontSize: '0.65rem',
                    background: '#10B981',
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {item.mLabel.split(':')[0]}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          {/* Offline / Localhost Badge */}
          <div 
            title={isOnline ? "Tersambung ke Jaringan Lokal/Cloud" : "Mode Offline Mandiri (Tanpa Internet)"}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.3rem 0.65rem',
              background: '#F1F5F9',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#475569'
            }}
          >
            {isOnline ? (
              <>
                <Wifi size={13} color="#10B981" />
                <span style={{ display: 'none' }} className="status-label">Online</span>
              </>
            ) : (
              <>
                <HardDrive size={13} color="#F59E0B" />
                <span>Offline</span>
              </>
            )}
          </div>

          {/* Admin Verification Modal Trigger */}
          <button
            onClick={onOpenAdminModal}
            className="btn-outline"
            style={{
              position: 'relative',
              padding: '0.45rem 0.85rem',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-full)'
            }}
            title="Dashboard Verifikasi Inovasi Admin"
          >
            <ShieldCheck size={16} color="#059669" />
            <span style={{ display: 'none' }} className="admin-btn-text">Verifikasi</span>
            {pendingCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#EF4444',
                color: '#fff',
                fontSize: '0.68rem',
                fontWeight: 800,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)'
              }}>
                {pendingCount}
              </span>
            )}
          </button>

          {/* Submit Innovation Button */}
          <button
            onClick={onOpenSubmitModal}
            className="btn-primary"
            style={{
              padding: '0.5rem 1.1rem',
              fontSize: '0.85rem'
            }}
          >
            <PlusCircle size={16} />
            <span>Ajukan Inovasi</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)'
            }}
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '2px solid var(--border-leaf)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--leaf-subtle)' : 'transparent',
                  color: isActive ? 'var(--leaf-deep)' : 'var(--text-main)',
                  fontWeight: isActive ? 700 : 500,
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#10B981' : '#64748B'} />
                  <span>{item.label}</span>
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#059669',
                  background: 'var(--leaf-surface-soft)',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {item.mLabel}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Responsive media query inject for navbar */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .admin-btn-text, .status-label {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
