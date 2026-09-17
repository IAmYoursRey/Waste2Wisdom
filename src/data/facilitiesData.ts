import { FacilityItem } from '../types';

export const initialFacilitiesData: FacilityItem[] = [
  {
    id: 'fac-cikarang-nip',
    name: 'Pusat Pengolahan Limbah Industri Hijau Cikarang (PengNIP Cikarang)',
    type: 'Tempat PengNIP',
    location: 'Kawasan Industri Greenland Delta Silicon, Cikarang Pusat',
    city: 'Bekasi',
    province: 'Jawa Barat',
    capacity: '120 Ton Limbah Non-B3 Terpilah / Hari',
    description: 'Fasilitas percontohan nasional Tempat Pengolahan Limbah Non-B3 Industri Terpadu (PengNIP) yang mengintegrasikan pemilahan fraksi industri otomotif, garmen, dan pangan menjadi bahan baku sekunder berstandar industri sirkular.',
    technologies: [
      'Optical Sorter Pemilah Polimer Otomatis',
      'Mesin Shredder & Granulator Kecepatan Tinggi',
      'Unit Pelletizing Daur Ulang Plastik HDPE & PP',
      'Sistem Pemantauan Logistik Limbah Berbasis IoT'
    ],
    machines: [
      {
        name: 'Industrial Heavy Duty Dual-Shaft Shredder 1500',
        function: 'Mencacah drum plastik industri, palet kayu, dan limbah kain tebal hingga ukuran serpihan 20 mm.',
        capacity: '3.5 Ton / Jam'
      },
      {
        name: 'EcoPellet Extrusion Line with De-Gassing',
        function: 'Melelehkan serpihan plastik bersih dan mencetaknya menjadi biji plastik daur ulang siap ekspor.',
        capacity: '1.2 Ton / Jam'
      },
      {
        name: 'Hydraulic Baler Press 200T',
        function: 'Memadatkan limbah kardus dan karung goni menjadi bal padat berdensitas tinggi untuk efisiensi angkut.',
        capacity: '5 Ton / Jam'
      }
    ],
    visitSchedule: 'Setiap Selasa & Kamis (Pukul 09.00 - 14.00 WIB) — Terbuka untuk Siswa SMK, Mahasiswa, dan Pelaku UMKM.',
    contactPerson: 'Ir. Hendra Gunawan, M.T. (Kepala Divisi Kemitraan Sirkular)',
    phone: '+62 812-9876-5432',
    coordinates: [-6.3486, 107.1528],
    featuredOutput: 'Biji Plastik Sirkular Mutu A & Bal Serat Kapas Upcycled'
  },
  {
    id: 'fac-rungkut-surabaya',
    name: 'Sentra Daur Ulang & Material Sirkular SIER Rungkut',
    type: 'TPST 3R Industri',
    location: 'Kawasan Industri SIER Blok D-14, Rungkut',
    city: 'Surabaya',
    province: 'Jawa Timur',
    capacity: '85 Ton / Hari',
    description: 'Pusat daur ulang terpadu yang melayani 140+ tenant pabrik di Jawa Timur. Menjadi laboratorium terbuka untuk riset komposit serat alami dan pemanfaatan fly ash batubara.',
    technologies: [
      'Mesin Pencuci Sentrifugal Residu Kimia Minyak',
      'Peralatan Press Hidrolik Paving Block K-350',
      'Laboratorium Uji Kuat Tekan & Toksisitas Material'
    ],
    machines: [
      {
        name: 'Automated Concrete Paving Block Press Machine',
        function: 'Mencetak paving block dan kanstin jalan berbasis campuran 40% FABA teruji.',
        capacity: '12.000 Buah Paving / Hari'
      },
      {
        name: 'Hammer Mill & Biomass Briquetter',
        function: 'Menghaluskan serbuk gergaji dan ampas tebu menjadi briket bahan bakar alternatif industri keramik.',
        capacity: '2 Ton / Jam'
      }
    ],
    visitSchedule: 'Setiap Rabu (Pukul 10.00 - 15.00 WIB) — Registrasi minimal 3 hari sebelum kunjungan.',
    contactPerson: 'Budi Santoso, S.T. (Manajer Operasional & Edukasi)',
    phone: '+62 813-4567-8901',
    coordinates: [-7.3245, 112.7601],
    featuredOutput: 'Paving Block FABA K-300 SNI & Briket Biomassa Tanpa Asap'
  },
  {
    id: 'fac-sleman-tpst',
    name: 'Pusat Biokonversi & Pengolahan Organik Agro Sleman',
    type: 'Pusat Biokonversi',
    location: 'Kawasan Agroeduwisata Kaliurang KM 14.5',
    city: 'Sleman',
    province: 'D.I. Yogyakarta',
    capacity: '40 Ton Limbah Agro-Pangan / Hari',
    description: 'Fasilitas ramah lingkungan yang mengkhususkan diri pada biokonversi ampas kopi, ampas tebu, dan limbah kulit singkong menggunakan larva Black Soldier Fly (BSF) dan bioreaktor anaerob.',
    technologies: [
      'Bioreaktor Fermentasi Anaerob Skala 50 m3',
      'Kandang Biokonversi BSF Otomatis Terkontrol Suhu & Kelembapan',
      'Pengering Magnetik Gelombang Mikro untuk Maggot Protein'
    ],
    machines: [
      {
        name: 'Continuous Anaerobic Digester Biogas Unit',
        function: 'Mengubah air limbah organik cair dan bubur tapioka menjadi gas metana untuk pembangkit listrik mandiri 30 kW.',
        capacity: '15 m3 Gas Metana / Jam'
      },
      {
        name: 'Rotary Drum Organic Granulator',
        function: 'Membentuk pupuk organik kasgot (bekas maggot) menjadi granul butiran siap sebar.',
        capacity: '1.5 Ton / Jam'
      }
    ],
    visitSchedule: 'Senin s.d. Sabtu (Pukul 08.30 - 16.00 WIB) — Paket Workshop Langsung Tersedia.',
    contactPerson: 'Dr. Retno Wulandari (Direktur Edukasi Hayati)',
    phone: '+62 821-3456-7890',
    coordinates: [-7.6892, 110.4124],
    featuredOutput: 'Pupuk Kasgot Organik Premium & Pakan Unggas Protein Tinggi'
  },
  {
    id: 'fac-semarang-tekstil',
    name: 'Sentra Pemilahan & Daur Ulang Perca Terpadu Ungaran',
    type: 'Bank Sampah Induk',
    location: 'Sentra Industri Tekstil Karangjati, Ungaran',
    city: 'Semarang',
    province: 'Jawa Tengah',
    capacity: '60 Ton Sisa Kain & Benang / Hari',
    description: 'Sentra penghubung antara 20 pabrik garmen ekspor Jawa Tengah dengan 180+ kelompok pengrajin batik, boneka, dan fashion upcycling se-Jawa.',
    technologies: [
      'Sistem Barcode Pemilahan Warna dan Komposisi Serat Kain',
      'Mesin Garnetting Pembuka Serat Kain Perca (Rag Tearing)',
      'Rotary Cutting Table dengan Pengamanan Sensor Laser'
    ],
    machines: [
      {
        name: '4-Cylinder Garnett Fibre Opening Machine',
        function: 'Mengurai potongan kain perca menjadi serat wol/kapas halus kembali untuk isian jok dan peredam otomotif.',
        capacity: '800 kg / Jam'
      },
      {
        name: 'High Precision Fabric Strip Cutter',
        function: 'Memotong limbah kain menjadi pita tali anyam untuk kerajinan keset dan tas.',
        capacity: '500 Meter Tali / Jam'
      }
    ],
    visitSchedule: 'Jumat & Sabtu (Pukul 09.00 - 12.00 WIB).',
    contactPerson: 'Siti Aminah, S.E. (Ketua Jejaring UMKM Tekstil)',
    phone: '+62 857-2345-6789',
    coordinates: [-7.1428, 110.4075],
    featuredOutput: 'Serat Kapas Regenerasi & Bahan Baku Anyam Siap Jahit'
  }
];
