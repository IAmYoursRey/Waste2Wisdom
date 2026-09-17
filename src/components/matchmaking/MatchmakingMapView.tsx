import React, { useState, useEffect, useRef, useMemo } from 'react';
import { initialMatchmakingData } from '../../data/matchmakingData';
import { MatchmakingItem } from '../../types';
import { SupplyRequestModal } from './SupplyRequestModal';
import { 
  MapPin, 
  Building2, 
  Users, 
  Filter, 
  Search, 
  Package, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ArrowRight,
  List,
  Map as MapIcon
} from 'lucide-react';
import L from 'leaflet';

export const MatchmakingMapView: React.FC = () => {
  const [partners, setPartners] = useState<MatchmakingItem[]>(initialMatchmakingData);
  const [selectedType, setSelectedType] = useState<'all' | 'industry_supplier' | 'community_buyer'>('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePartner, setActivePartner] = useState<MatchmakingItem | null>(null);
  const [requestModalPartner, setRequestModalPartner] = useState<MatchmakingItem | null>(null);
  const [viewMode, setViewMode] = useState<'both' | 'map' | 'list'>('both');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Unique cities
  const cities = useMemo(() => {
    const set = new Set(initialMatchmakingData.map((i) => i.city));
    return Array.from(set);
  }, []);

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchType = selectedType === 'all' ? true : p.type === selectedType;
      const matchCity = selectedCity === 'all' ? true : p.city === selectedCity;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.wasteType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchCity && matchSearch;
    });
  }, [partners, selectedType, selectedCity, searchQuery]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Java island where majority of partners are located
      const map = L.map(mapContainerRef.current, {
        center: [-7.0, 110.5],
        zoom: 7,
        scrollWheelZoom: false,
      });

      // OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add new markers
    filteredPartners.forEach((partner) => {
      const isSupplier = partner.type === 'industry_supplier';
      
      // Custom SVG icon
      const customIcon = L.divIcon({
        className: 'custom-map-pin',
        html: `
          <div style="
            width: 34px; 
            height: 34px; 
            border-radius: 50%; 
            background: ${isSupplier ? '#10B981' : '#0284C7'}; 
            color: #FFFFFF; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            font-size: 16px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            border: 2px solid #FFFFFF;
            cursor: pointer;
          ">
            ${isSupplier ? '🏭' : '👥'}
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      const marker = L.marker(partner.coordinates, { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px; max-width: 220px;">
          <div style="font-size: 11px; font-weight: 700; color: ${isSupplier ? '#059669' : '#0284C7'}; text-transform: uppercase;">
            ${isSupplier ? 'Pabrik Industri (Penyedia)' : 'UMKM (Pencari Bahan)'}
          </div>
          <div style="font-size: 13px; font-weight: 700; color: #0F172A; margin: 3px 0;">
            ${partner.name}
          </div>
          <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
            ${partner.wasteType}
          </div>
          <div style="font-size: 11px; font-weight: 600; color: #10B981;">
            Volume: ${partner.volumeMonthly}
          </div>
        </div>
      `);

      marker.on('click', () => {
        setActivePartner(partner);
      });

      markersRef.current.push(marker);
    });

    return () => {
      // Don't destroy on every re-render, keep instance intact
    };
  }, [filteredPartners]);

  return (
    <section style={{ padding: '2.5rem 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="badge-5m">
              🗺️ 4M: MENGOMUNIKASIKAN & MATCHMAKING
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Sirkulasi Limbah Non-B3 Terpilah Industri-UMKM
            </span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.3rem)', color: 'var(--leaf-deep)', marginBottom: '0.5rem' }}>
            Peta Penghubung (Matchmaking) Pasokan Limbah
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '820px', fontSize: '0.98rem' }}>
            Hubungkan pabrik industri yang memiliki <strong>limbah non-B3 terpilah</strong> (kain perca garmen, serbuk kayu, ampas tebu, spent coffee) dengan <strong>UMKM atau komunitas perajin lokal</strong> yang membutuhkan bahan baku daur ulang berkualitas secara berkelanjutan.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari pabrik, UMKM, atau jenis limbah..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: '2.4rem' }}
              />
            </div>

            {/* City Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} color="#059669" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="form-select"
              >
                <option value="all">Semua Kota & Wilayah</option>
                {cities.map((city, idx) => (
                  <option key={idx} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Entity Type Filter Tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedType('all')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: selectedType === 'all' ? 700 : 500,
                  background: selectedType === 'all' ? 'var(--leaf-deep)' : '#F1F5F9',
                  color: selectedType === 'all' ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all var(--transition-fast)'
                }}
              >
                Semua ({initialMatchmakingData.length})
              </button>

              <button
                onClick={() => setSelectedType('industry_supplier')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: selectedType === 'industry_supplier' ? 700 : 500,
                  background: selectedType === 'industry_supplier' ? '#ECFDF5' : '#FFFFFF',
                  color: '#065F46',
                  border: selectedType === 'industry_supplier' ? '1.5px solid #10B981' : '1px solid #CBD5E1',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>🏭 Pabrik (Penyedia)</span>
              </button>

              <button
                onClick={() => setSelectedType('community_buyer')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: selectedType === 'community_buyer' ? 700 : 500,
                  background: selectedType === 'community_buyer' ? '#F0F9FF' : '#FFFFFF',
                  color: '#0369A1',
                  border: selectedType === 'community_buyer' ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <span>👥 UMKM (Pencari)</span>
              </button>
            </div>

          </div>
        </div>

        {/* Map & List Container Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) 1.2fr',
          gap: '1.5rem',
          alignItems: 'start'
        }} className="matchmaking-layout">
          
          {/* Left Column: Interactive Directory List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '520px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredPartners.map((partner) => {
              const isSupplier = partner.type === 'industry_supplier';
              const isSelected = activePartner?.id === partner.id;

              return (
                <div
                  key={partner.id}
                  onClick={() => {
                    setActivePartner(partner);
                    if (mapInstanceRef.current) {
                      mapInstanceRef.current.flyTo(partner.coordinates, 10, { duration: 1 });
                    }
                  }}
                  className="glass-card"
                  style={{
                    padding: '1.2rem',
                    cursor: 'pointer',
                    borderLeft: isSupplier ? '5px solid #10B981' : '5px solid #0284C7',
                    background: isSelected ? '#F0FDF4' : '#FFFFFF',
                    borderColor: isSelected ? '#10B981' : 'var(--border-leaf)',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: isSupplier ? '#DCFCE7' : '#E0F2FE',
                      color: isSupplier ? '#166534' : '#0369A1',
                    }}>
                      {partner.entityType}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontWeight: 600 }}>
                      📍 {partner.city}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.08rem', color: 'var(--leaf-deep)', marginBottom: '0.35rem' }}>
                    {partner.name}
                  </h3>

                  <div style={{
                    fontSize: '0.82rem',
                    color: isSupplier ? '#065F46' : '#0369A1',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}>
                    <Package size={14} />
                    <span>{partner.wasteType}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.65rem' }}>
                    <strong>Volume:</strong> {partner.volumeMonthly} • <strong>Skema:</strong> {partner.priceExpectation}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '0.65rem',
                    borderTop: '1px dashed #E2E8F0',
                    fontSize: '0.76rem'
                  }}>
                    <span style={{ color: 'var(--text-light)' }}>Narahubung: {partner.contactName}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRequestModalPartner(partner);
                      }}
                      className="btn-primary"
                      style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
                    >
                      <span>Ajukan Pasokan</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredPartners.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', background: '#FFFFFF', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Tidak ada data mitra industri/UMKM pada filter ini.
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Leaflet Map Container */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ padding: '0.75rem', overflow: 'hidden' }}>
              
              {/* Map Legend */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.75rem',
                marginBottom: '0.5rem',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                background: '#F8FAFC',
                borderRadius: 'var(--radius-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    <span>Pabrik Industri (Penyedia)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#0284C7', display: 'inline-block' }} />
                    <span>UMKM / Komunitas (Pencari)</span>
                  </div>
                </div>
                <span>Peta Interaktif Jawa & Sekitarnya</span>
              </div>

              {/* Map Canvas */}
              <div ref={mapContainerRef} style={{ height: '460px', width: '100%', borderRadius: 'var(--radius-md)' }} />
            </div>
          </div>

        </div>

      </div>

      {/* Responsive styling inject for Matchmaking layout */}
      <style>{`
        @media (max-width: 880px) {
          .matchmaking-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Supply Request Modal */}
      {requestModalPartner && (
        <SupplyRequestModal
          partner={requestModalPartner}
          onClose={() => setRequestModalPartner(null)}
        />
      )}

    </section>
  );
};
