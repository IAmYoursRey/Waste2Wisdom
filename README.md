# Waste2Wisdom — Platform Edukasi, Inovasi & Peta Matchmaking Limbah Industri

Waste2Wisdom adalah platform sirkular terpadu yang mentransformasi limbah industri lokal menjadi sumber daya berdaya guna dan bernilai ekonomi tinggi. Mengusung pendekatan **5M (Mengenali, Mengeksplorasi, Menginovasi, Mengomunikasikan, dan Mengevaluasi)** berstandar nasional dan industri.

---

## 🌟 Fitur Utama & Kerangka 5M

### 1. Kamus & Literasi Limbah (1M: Mengenali & Memahami)
- Klasifikasi limbah terdaftar berstandar **PP No. 22 Tahun 2021** (Lampiran XIV) & **Permen LHK No. 19/2021**:
  - **Aman Diolah Mandiri (Non-B3)**: Ampas tebu, serbuk gergaji kayu sengon/jati, kain perca garmen, ampas kopi industri, kulit singkong tapioka, dll.
  - **Khusus / Berbahaya (Limbah B3)**: Oli bekas mesin (B105d), sludge IPAL tekstil (B337-1), fly ash batubara (FABA terkelola), aki bekas asam timbal (A102d).
- Rincian lembar keselamatan (MSDS ringkas), SOP penanganan, larangan bahaya, APD wajib (*respirator, kacamata goggle, sarung tangan*), dan potensi ekonomi.

### 2. Sentra Tempat PengNIP (2M: Mengeksplorasi)
- Profil fasilitas nyata **Tempat PengNIP (Pengolahan Non-B3 Industri Terpadu)**:
  - Sentra PengNIP Kawasan Industri Cikarang (Bekasi)
  - Sentra Daur Ulang SIER Rungkut (Surabaya)
  - Pusat Biokonversi Hayati Agro Sleman (Yogyakarta)
  - Sentra Perca Ungaran (Semarang)
- Showroom edukasi mesin industri: *Dual-Shaft Shredder, Extrusion Pelletizer, Hydraulic Paving Press, Continuous Anaerobic Digester*.
- Formulir pengajuan jadwal kunjungan / study tour edukasi.

### 3. Marketplace Edukasi & Ide (3M: Menginovasi)
- Katalog panduan langkah-demi-langkah (blueprint) produk daur ulang kreatif:
  - *Panel Akustik Peredam Suara Ruangan dari Serbuk Kayu & Ampas Tebu*
  - *Lilin Aromaterapi Mewah dari Jelantah Terpurifikasi*
  - *Bioplastik Ramah Lingkungan dari Pati Kulit Singkong*
  - *Tote Bag & Aksesori Etnik Upcycled dari Kain Perca*
  - *Bio-Slurry & Pupuk Organik Cair Ampas Kopi*
  - *Paving Block FABA K-300 SNI*
- Simulator video tutorial dan kalkulator modal vs harga jual pasar.
- **Formulir "Ajukan Inovasi ke Katalog"**: Pengguna dapat mengusulkan ide produk baru.
- **Dashboard Simulasi Verifikasi Admin**: Tinjau dan setujui inovasi baru agar langsung tampil di marketplace publik.

### 4. Peta Penghubung (4M: Mengomunikasikan / Matchmaking)
- Peta interaktif Leaflet menghubungkan dua sisi ekosistem sirkular:
  - **Penyedia Bahan Baku (Pabrik Industri)**: Menyediakan limbah non-B3 terpilah berkala.
  - **Pencari Bahan Baku (UMKM & Komunitas Daur Ulang)**: Membutuhkan suplai bahan mentah sekunder.
- Formulir pengajuan kemitraan pasokan bahan baku secara langsung.

### 5. Evaluasi & Ulasan Komunitas (5M: Mengevaluasi)
- Uji keberhasilan produk berbasis pertanyaan kurikulum:
  - *"Apakah produk ini mudah dibuat / digunakan?"*
  - *"Apakah berhasil pembuatannya?"*
- Metrik kepuasan komunitas, persentase tingkat keberhasilan, dan tips troubleshooting kendala pembuatan.

---

## 🚀 Panduan Menjalankan Aplikasi

### A. Menjalankan di Localhost (Development Server)
1. Buka terminal di folder project:
   ```bash
   cd d:\vscode\Waste2Wisdom
   ```
2. Tarik node modules (sudah terpasang):
   ```bash
   npm run dev
   ```
3. Buka browser di alamat:
   ```
   http://localhost:5173/
   ```

### B. Menjalankan Mode Offline (Deploy Offline / Standalone File)
Project telah dikonfigurasi dengan `base: './'` pada `vite.config.ts`. Bundle produksi di folder `dist/` dapat dibuka secara mandiri tanpa ketergantungan server:
1. Jalankan build (sudah siap di folder `dist/`):
   ```bash
   npm run build
   ```
2. Buka folder `dist/` dan klik ganda file:
   ```
   dist/index.html
   ```
   Aplikasi akan terbuka langsung di browser dalam mode **Offline Standalone**.

---

## 🎨 Karakteristik Desain & Visual
- **Nuansa Warna**: Hijau daun & hijau muda segar (`#10B981`, `#059669`, `#34D399`, `#A7F3D0`, aksen lime `#BEF264`).
- **Aksen Visual**: Glassmorphism modern, micro-animations, kartu interaktif, badge regulasi resmi.
- **Multi-Platform**: Responsif sempurna untuk Desktop, Tablet, dan Mobile dengan drawer navigasi.
- **Banner Resmi**: Vektor infinity sirkular terintegrasi dengan ilustrasi 3D material daur ulang.
