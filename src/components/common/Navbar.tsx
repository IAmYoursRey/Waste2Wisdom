import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
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
  User,
  Bell
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
  pendingRequestsCount?: number;
  onOpenSubmitModal: () => void;
  onOpenAdminModal: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  pendingRequestsCount = 0,
  onOpenSubmitModal,
  onOpenAdminModal,
  onOpenAuthModal
}) => {
  const { user, isAdmin, isGuest } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dictionary', label: 'Kamus & Literasi', mLabel: '1M', icon: BookOpen },
    { id: 'explore', label: 'Tempat PengNIP', mLabel: '2M', icon: Compass },
    { id: 'innovations', label: 'Marketplace Inovasi', mLabel: '3M', icon: Lightbulb },
    { id: 'matchmaking', label: 'Peta Penghubung', mLabel: '4M', icon: MapPin, badge: pendingRequestsCount },
    { id: 'evaluation', label: 'Evaluasi & Ulasan', mLabel: '5M', icon: Star },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1.5px solid var(--border-leaf)',
      boxShadow: '0 4px 20px -2px rgba(46, 125, 50, 0.08)'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        
        {/* Brand Logo & Motto */}
        <button 
          onClick={() => setActiveTab('dictionary')}
          aria-label="Beranda Waste2Wisdom"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        >
          <img 
            src="./logo-waste2wisdom.svg" 
            alt="Waste2Wisdom Logo" 
            style={{ height: '42px', width: 'auto' }}
          />
        </button>

        {/* Desktop Nav Items (5M Navigation) */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.35rem' }} className="desktop-nav">
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
                  padding: '0.55rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.86rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#1B5E20' : 'var(--text-muted)',
                  backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                  border: isActive ? '1.5px solid #A5D6A7' : '1.5px solid transparent',
                  transition: 'all var(--transition-fast)',
                  position: 'relative'
                }}
              >
                <Icon size={16} color={isActive ? '#2E7D32' : '#64748B'} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 ? (
                  <span style={{
                    fontSize: '0.65rem',
                    background: '#0284C7',
                    color: '#fff',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    fontWeight: 700
                  }}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          
          {/* Admin Verification Button (Only prominent for Admin) */}
          {isAdmin && (
            <button
              onClick={onOpenAdminModal}
              className="btn-outline btn-sm"
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-full)',
                borderColor: '#A5D6A7',
                color: '#1B5E20',
                background: '#E8F5E9'
              }}
              title="Dashboard Moderasi Admin"
            >
              <ShieldCheck size={15} color="#2E7D32" />
              <span className="admin-btn-text">Admin ({pendingCount})</span>
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
                  justifyContent: 'center'
                }}>
                  {pendingCount}
                </span>
              )}
            </button>
          )}

          {/* Quick Submit Innovation CTA */}
          <button
            onClick={onOpenSubmitModal}
            className="btn-primary"
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.84rem'
            }}
          >
            <PlusCircle size={15} />
            <span className="cta-text">Ajukan Inovasi</span>
          </button>

          {/* User Account & Role Indicator */}
          <button
            onClick={onOpenAuthModal}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: '#F1F5F9',
              border: '1.5px solid var(--border-light)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            title="Klik untuk ganti peran atau edit profil"
          >
            <div style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: isGuest ? '#94A3B8' : user.role === 'admin' ? '#1B5E20' : user.role === 'industry' ? '#0284C7' : '#2E7D32',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.75rem'
            }}>
              {isGuest ? <User size={14} /> : user.name.charAt(0)}
            </div>
            <div style={{ textAlign: 'left', display: 'none' }} className="user-text-info">
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.1 }}>
                {isGuest ? 'Mode Tamu' : user.name.split(' ')[0]}
              </div>
              <div style={{ fontSize: '0.68rem', color: isGuest ? 'var(--text-muted)' : '#2E7D32', fontWeight: 600 }}>
                {isGuest ? 'Masuk / Demo' : user.roleLabel.split(' ')[0]}
              </div>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              padding: '0.4rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-main)'
            }}
            className="mobile-menu-toggle"
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  backgroundColor: isActive ? '#E8F5E9' : 'transparent',
                  color: isActive ? '#1B5E20' : 'var(--text-main)',
                  border: isActive ? '1.5px solid #A5D6A7' : '1.5px solid transparent',
                  fontWeight: isActive ? 700 : 500
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? '#2E7D32' : '#64748B'} />
                  <span>{item.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  {item.badge && item.badge > 0 ? (
                    <span style={{
                      fontSize: '0.65rem',
                      background: '#0284C7',
                      color: '#fff',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 700
                    }}>
                      {item.badge}
                    </span>
                  ) : null}
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2E7D32' }}>
                    {item.mLabel}
                  </span>
                </div>
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => {
                onOpenAdminModal();
                setMobileMenuOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#E8F5E9',
                color: '#1B5E20',
                fontWeight: 700,
                border: '1.5px solid #A5D6A7'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <ShieldCheck size={18} color="#2E7D32" />
                <span>Moderasi Admin ({pendingCount})</span>
              </div>
              {pendingCount > 0 && (
                <span style={{
                  fontSize: '0.65rem',
                  background: '#EF4444',
                  color: '#fff',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontWeight: 800
                }}>
                  {pendingCount} Pending
                </span>
              )}
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
          .admin-btn-text, .user-text-info {
            display: block !important;
          }
        }
        @media (max-width: 600px) {
          .cta-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
