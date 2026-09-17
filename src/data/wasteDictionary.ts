import { WasteItem } from '../types';

export const initialWasteData: WasteItem[] = [
  {
    id: 'w-ampas-tebu',
    name: 'Bagasse / Ampas Tebu',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Non-B3)',
    industrialSector: 'Industri Agro & Pabrik Gula',
    source: 'Sisa pemerasan batang tebu pada pabrik gula / industri sari tebu.',
    physicalForm: 'Serat padat berpori tinggi, warna kuning kecokelatan',
    safetyRating: 'safe',
    safetyDescription: 'Sangat aman untuk diolah mandiri. Tidak mengandung racun reaktif, namun disarankan mengenakan masker debu saat penghancuran kering.',
    requiredPPE: ['Masker Debu / Kain', 'Sarung Tangan Kerja'],
    legalCode: 'Limbah Non-B3 Terdaftar (Lampiran XIV PP No. 22/2021)',
    economicPotential: 'Tinggi — Dapat diolah menjadi wadah ramah lingkungan (pulp packaging), briket arang bio-energi, kertas seni, dan pakan ternak fermentasi.',
    handlingGuidelines: [
      'Jemur di bawah sinar matahari hingga kadar air di bawah 15% untuk mencegah jamur.',
      'Simpan di tempat kering dan berventilasi baik.',
      'Dapat digiling dengan mesin hammer mill untuk serat homogen.'
    ],
    prohibitedActions: [
      'Dilarang dibakar di tempat terbuka karena menimbulkan asap partikulat PM2.5.',
      'Jangan biarkan menumpuk basah di area tertutup karena dapat mengalami fermentasi liar dan bau asam.'
    ],
    recommendedInnovations: [
      'Briket Arang Bio-Energi Padat',
      'Kertas Seni Daur Ulang Tekstur Alami',
      'Papan Partikel Insulator Panas'
    ],
    characteristics: ['Kaya Selulosa (45-55%)', 'Biodegradable Cepat', 'Kadar Air Awal 40-50%']
  },
  {
    id: 'w-serbuk-kayu',
    name: 'Serbuk Gergaji Kayu Sengon & Jati',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Non-B3)',
    industrialSector: 'Industri Kayu & Furniture Mebel',
    source: 'Proses penggergajian, pemotongan, dan pengamplasan kayu mebel.',
    physicalForm: 'Serbuk halus hingga serpihan partikel butir kayu',
    safetyRating: 'safe',
    safetyDescription: 'Aman untuk masyarakat & UMKM. Bahaya utama hanyalah inhalasi partikel serbuk halus saat pengayakan, sehingga masker N95 sangat dianjurkan.',
    requiredPPE: ['Masker N95 / Partikulat', 'Kacamata Pelindung (Goggles)', 'Sarung Tangan Katun'],
    legalCode: 'Limbah Non-B3 Terdaftar (PP No. 22/2021)',
    economicPotential: 'Sangat Tinggi — Bahan baku panel akustik peredam suara, media jamur tiram (baglog), briket serbuk kayu, dan pelet kayu ekspor.',
    handlingGuidelines: [
      'Ayak serbuk kayu untuk memisahkan butiran halus dari serpihan kasar atau paku sisa.',
      'Hindarkan dari sumber percikan api atau rokok (mudah tersulut).',
      'Keringkan sebelum dicampur dengan perekat resin alami atau tepung tapioka.'
    ],
    prohibitedActions: [
      'Jangan simpan di dekat instalasi listrik terbuka.',
      'Jangan gunakan serbuk kayu yang telah tercampur zat pengawet tembaga arsenik untuk media jamur pangan.'
    ],
    recommendedInnovations: [
      'Panel Akustik Peredam Suara Ruangan',
      'Briket Kayu Biomassa Tanpa Asap',
      'Media Tanam Jamur Tiram Organik'
    ],
    characteristics: ['Kandungan Lignin Tinggi', 'Daya Serap Air Baik', 'Isolator Akustik Alami']
  },
  {
    id: 'w-kain-perca',
    name: 'Kain Perca & Sisa Garmen Katun/Polyester',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Non-B3)',
    industrialSector: 'Industri Tekstil & Konveksi Pakaian',
    source: 'Potongan pola kain dari pabrik garmen, industri jahit konveksi, dan butik.',
    physicalForm: 'Lembaran kain berukuran beragam (katun, denim, rayon, polyester)',
    safetyRating: 'safe',
    safetyDescription: 'Sangat aman dan higienis. Dapat langsung dijahit kembali atau dicacah menjadi serat isian tanpa proses kimia berisiko tinggi.',
    requiredPPE: ['Sarung Tangan Kain', 'Gunting Khusus Tekstil'],
    legalCode: 'Limbah Non-B3 (Bahan Baku Daur Ulang Terbuka)',
    economicPotential: 'Tinggi — Bernilai jual tinggi untuk produk fashion upcycling, tote bag kekinian, selimut quilt, sandal perca, hingga peredam getaran karpet mobil.',
    handlingGuidelines: [
      'Sortir berdasarkan jenis serat (katun murni, polyester sintetis, denim tebal).',
      'Cuci atau sterilkan dengan uap jika kain terkena debu gudang.',
      'Potong dengan pola geometri teratur untuk memudahkan penyatuan jahit.'
    ],
    prohibitedActions: [
      'Jangan dibakar (pembakaran kain sintetis polyester/nylon melepaskan gas dioksin beracun).',
      'Jangan dibuang ke selokan/drainase karena dapat menyumbat aliran air.'
    ],
    recommendedInnovations: [
      'Tote Bag & Pouch Etnik Upcycled',
      'Karpet Anyam Perca Cantik',
      'Isian Bantal & Sofa Ramah Lingkungan'
    ],
    characteristics: ['Tersedia Berlimpah', 'Kuat & Fleksibel', 'Kaya Variasi Warna']
  },
  {
    id: 'w-ampas-kopi',
    name: 'Spent Coffee Grounds / Ampas Kopi Industri',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Non-B3)',
    industrialSector: 'Industri Minuman & Kafe Komersial',
    source: 'Ekstraksi seduhan kopi dari pabrik kopi instan dan jaringan kedai kopi.',
    physicalForm: 'Butiran serbuk basah warna cokelat pekat dengan aroma khas sangrai',
    safetyRating: 'safe',
    safetyDescription: 'Sangat aman untuk pengolahan mandiri. Kaya nitrogen, fosfor, dan antioksidan alami.',
    requiredPPE: ['Sarung Tangan Karet Ringan', 'Wadah Pengeringan'],
    legalCode: 'Limbah Organik Non-B3 (Permen LHK No. 19/2021)',
    economicPotential: 'Tinggi — Sangat dicari untuk lulur/scrub eksfoliasi organik, pupuk nitrogen tanaman hias, penetral bau ruangan, dan campuran komposit bio-plastik.',
    handlingGuidelines: [
      'Langsung angin-anginkan atau sangrai suhu rendah dalam 24 jam agar tidak berjamur.',
      'Simpan dalam wadah kedap udara jika telah kering sempurna.',
      'Campurkan dengan perbandingan 1:4 pada tanah agar tidak terlalu asam.'
    ],
    prohibitedActions: [
      'Jangan siramkan ampas basah murni langsung dalam jumlah masif ke akar tanaman kecil karena keasamannya dapat membakar akar muda.'
    ],
    recommendedInnovations: [
      'Pupuk Cair & Kompos Bio-Organik',
      'Sabun & Scrub Alami Peremaja Kulit',
      'Penetral Bau & Pengusir Hama Organik'
    ],
    characteristics: ['Kaya Nitrogen (2%)', 'Antioksidan Alami', 'Tekstur Eksfoliator Halus']
  },
  {
    id: 'w-jelantah',
    name: 'Minyak Jelantah (Used Cooking Oil)',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Dengan SOP)',
    industrialSector: 'Industri Makanan Olahan & Restoran Cepat Saji',
    source: 'Minyak goreng bekas penggorengan skala pabrik makanan ringan dan kuliner.',
    physicalForm: 'Cairan kental kekuningan hingga cokelat gelap dengan endapan sisa makanan',
    safetyRating: 'caution',
    safetyDescription: 'Aman diolah mandiri menjadi sabun cuci atau lilin jika mengikuti SOP keselamatan (tidak tertelan, hati-hati saat mencampur dengan soda api NaOH).',
    requiredPPE: ['Kacamata Pelindung (Goggles)', 'Sarung Tangan Karet Panjang', 'Masker'],
    legalCode: 'Limbah Minyak Nabati Non-B3 (SNI Pengolahan Biodiesel / Lilin)',
    economicPotential: 'Sangat Tinggi — Lilin aromaterapi mewah, sabun pembersih perkakas, dan bahan baku ekspor biodiesel B35.',
    handlingGuidelines: [
      'Saring endapan remah makanan menggunakan kain kasa atau filter kopi.',
      'Purifikasi awal dengan arang aktif atau kulit pisang kering untuk menyerap bau dan warna gelap.',
      'Gunakan stearin atau beeswax untuk memadatkan menjadi lilin hias.'
    ],
    prohibitedActions: [
      'Dilarang keras membuang minyak jelantah ke saluran wastafel (menyebabkan fatberg dan mencemari air tanah).',
      'Dilarang mengonsumsi kembali untuk makanan!'
    ],
    recommendedInnovations: [
      'Lilin Aromaterapi Essential Oil',
      'Sabun Batang Pembersih Lemak & Noda',
      'Bahan Bakar Alternatif Kompor Minyak'
    ],
    characteristics: ['Mengandung Asam Lemak Bebas (FFA)', 'Mudah Dipadatkan', 'Nilai Kalor Tinggi']
  },
  {
    id: 'w-kulit-singkong',
    name: 'Kulit Singkong Industri Tapioka',
    category: 'non-b3',
    categoryLabel: 'Aman Diolah Mandiri (Non-B3)',
    industrialSector: 'Industri Pangan & Pabrik Tepung Tapioka',
    source: 'Pengupasan ubi kayu sebelum ekstraksi pati di pabrik tapioka.',
    physicalForm: 'Lapisan kulit umbi kecokelatan tebal bertekstur kasar',
    safetyRating: 'safe',
    safetyDescription: 'Aman diolah mandiri setelah perendaman air mengalir untuk melarutkan senyawa asam sianida (HCN) alami pada kulit luar.',
    requiredPPE: ['Sarung Tangan Tahan Air', 'Pisau Bersih'],
    legalCode: 'Limbah Padat Pertanian Non-B3 (Permen LHK)',
    economicPotential: 'Tinggi — Bahan utama pembuatan bioplastik mudah terurai (biodegradable plastic), pakan kambing/sapi berprotein, dan pupuk kalium cair.',
    handlingGuidelines: [
      'Rendam kulit singkong dalam air selama 24 jam untuk menghilangkan residu HCN.',
      'Keringkan dan blender menjadi serbuk halus untuk ekstraksi pati sekunder.'
    ],
    prohibitedActions: [
      'Jangan berikan mentah segar kepada ternak ruminansia tanpa perendaman karena berisiko keracunan HCN.'
    ],
    recommendedInnovations: [
      'Kantong & Plastik Ramah Lingkungan (Bioplastik)',
      'Pupuk Kalium Cair Fermentasi',
      'Keripik Kulit Singkong Gurih (Bagian Dalam)'
    ],
    characteristics: ['Kaya Pati Ekstraktif', 'Serat Pektin Tinggi', 'Dapat Terurai dalam 90 Hari']
  },
  {
    id: 'w-oli-bekas',
    name: 'Oli & Pelumas Mesin Bekas (Used Engine Oil)',
    category: 'b3',
    categoryLabel: 'Wajib Penanganan Khusus (Limbah B3)',
    industrialSector: 'Bengkel Industri, Manufaktur Otomotif & Pabrik Mesin',
    source: 'Penggantian oli pelumas mesin kompresor, generator pabrik, dan armada angkut.',
    physicalForm: 'Cairan kental hitam pekat berbau hidrokarbon tajam',
    safetyRating: 'danger',
    safetyDescription: 'BERBAHAYA! Mengandung logam berat (Timbal Pb, Kadmium Cd), senyawa karsinogenik PAH (Polycyclic Aromatic Hydrocarbons). DILARANG DIOLAH MANDIRI TANPA IZIN KLHK.',
    requiredPPE: ['Sarung Tangan Nitril Tahan Kimia', 'Kacamata Google Kimia', 'Celemek Tahan Cairan Kimia'],
    legalCode: 'Limbah B3 Terdaftar Kode B105d (PP No. 22/2021)',
    economicPotential: 'Khusus Pengolah Berizin — Refined Base Oil (daur ulang pelumas dasar) dan bahan bakar industri semen (Co-processing).',
    handlingGuidelines: [
      'Simpan dalam drum baja atau HDPE khusus berlabel B3 (tengkorak/cairan korosif).',
      'Area penyimpanan harus memiliki bak penampung tumpahan (bund wall).',
      'Hanya boleh diserahkan ke transporter dan pemanfaat B3 resmi berizin KLHK dengan manifest elektronik (FESTRONIK).'
    ],
    prohibitedActions: [
      'DILARANG KERAS dibuang ke tanah, sungai, atau saluran pembuangan air kota.',
      'DILARANG diolah menjadi minyak goreng tiruan atau dibakar sembarangan.',
      'DILARANG dicampur dengan limbah domestik umum.'
    ],
    recommendedInnovations: [
      'Hanya untuk Penyaluran ke PT Pengolah Berizin (Co-processing)',
      'Konsinyasi ke Fasilitas Daur Ulang Pelumas Resmi Nasional'
    ],
    characteristics: ['Karsinogenik & Toksik', 'Mengandung Logam Berat', 'Non-Biodegradable']
  },
  {
    id: 'w-sludge-ipal',
    name: 'Sludge IPAL Tekstil (Lumpur Pengolahan Air Limbah)',
    category: 'b3',
    categoryLabel: 'Wajib Penanganan Khusus (Limbah B3)',
    industrialSector: 'Industri Pencelupan & Finishing Tekstil',
    source: 'Endapan lumpur kimia dari unit sedimentasi dan clarifier IPAL pabrik tekstil.',
    physicalForm: 'Lumpur basah kehitaman atau cake padat dengan bau kimia zat warna',
    safetyRating: 'danger',
    safetyDescription: 'BERBAHAYA! Mengandung residu pewarna azo, kromium (Cr), tembaga (Cu), dan koagulan logam. Berpotensi meracuni tanah dan air sumur.',
    requiredPPE: ['Respirator Kimia Cartridge Uap Organik', 'Boots Karet Tebal', 'Coverall Tyvek'],
    legalCode: 'Limbah B3 Terdaftar Kode B337-1 (PP No. 22/2021)',
    economicPotential: 'Khusus Fasilitas Berizin — Substitusi bahan baku pembuatan bata tahan api (refractory) atau bahan baku klinker semen di insinerator suhu tinggi (>1200°C).',
    handlingGuidelines: [
      'Wajib dikeringkan dalam sludge drying bed tertutup beratap.',
      'Pengujian TCLP (Toxicity Characteristic Leaching Procedure) secara berkala sebelum pemanfaatan.',
      'Pengangkutan hanya dengan truk tertutup berizin B3.'
    ],
    prohibitedActions: [
      'DILARANG dijadikan pupuk tanaman pangan apa pun!',
      'DILARANG ditimbun di pekarangan warga (open dumping).'
    ],
    recommendedInnovations: [
      'Pemanfaatan Batako Teruji Sesuai Baku Mutu TCLP (Hanya skala pabrik berizin)',
      'Thermal Destruction Insinerator Industri'
    ],
    characteristics: ['Toksik terhadap Biota Air', 'Tinggi Residu Pewarna Kimia', 'Mengandung Senyawa Logam']
  },
  {
    id: 'w-flyash',
    name: 'Fly Ash & Bottom Ash (FABA)',
    category: 'non-b3',
    categoryLabel: 'Non-B3 Terdaftar dengan Regulasi Khusus',
    industrialSector: 'Pembangkit Listrik PLTU & Boiler Pabrik Tekstil/Kertas',
    source: 'Abu terbang hasil pembakaran batu bara pada sistem boiler industri.',
    physicalForm: 'Serbuk abu-abu sangat halus menyerupai semen abu',
    safetyRating: 'caution',
    safetyDescription: 'Berdasarkan PP 22/2021, FABA dari PLTU non-stoker masuk kategori Non-B3 Terdaftar, namun WAJIB masker respirator karena partikel silika halus dapat memicu silikosis jika terhirup.',
    requiredPPE: ['Respirator Debu FFP2/N95', 'Goggles Rapat', 'Sarung Tangan Karet Tebal'],
    legalCode: 'Non-B3 Terdaftar (PP No. 22/2021 - Regulasi Pemanfaatan Terpantau)',
    economicPotential: 'Sangat Tinggi — Paving block standar K-300, substitusi semen beton ramah lingkungan, stabilisasi tanah pondasi jalan tol.',
    handlingGuidelines: [
      'Simpan dalam silo tertutup atau gudang kering agar abu tidak beterbangan terbawa angin.',
      'Campur dengan agregat pasir dan semen dengan takaran teruji laboratorium teknik sipil.'
    ],
    prohibitedActions: [
      'Jangan biarkan terbuka di dekat pemukiman saat angin kencang.',
      'Jangan biarkan air lindi mengalir bebas ke persawahan tanpa uji pH.'
    ],
    recommendedInnovations: [
      'Paving Block Kuat Tekan Tinggi K-300',
      'Batako Ringan Pengganti Bata Merah',
      'Geopolimer Semen Ramah Lingkungan'
    ],
    characteristics: ['Kaya Silika Reaktif & Alumina', 'Sifat Pozolanik Tinggi', 'Partikel Sangat Halus (<45 mikron)']
  },
  {
    id: 'w-aki-bekas',
    name: 'Aki & Baterai Asam Timbal Bekas',
    category: 'b3',
    categoryLabel: 'Wajib Penanganan Khusus (Limbah B3 Akut)',
    industrialSector: 'Transportasi, Pergudangan Forklift & Logistik',
    source: 'Aki kendaraan operasional logistik, UPS data center industri, dan forklift pabrik.',
    physicalForm: 'Kotak plastik berisi cairan asam sulfat pekat dan pelat timbal (Pb)',
    safetyRating: 'danger',
    safetyDescription: 'SANGAT BERBAHAYA! Asam sulfat sangat korosif (dapat membakar kulit seketika) dan timbal merupakan racun neurotoksik permanen. DILARANG DIBONGKAR MANUAL OLEH WARGA!',
    requiredPPE: ['Pelindung Wajah Penuh (Face Shield)', 'Celemek Asam PVC', 'Sarung Tangan Butyl'],
    legalCode: 'Limbah B3 Kode A102d (Limbah B3 Sumber Spesifik)',
    economicPotential: 'Khusus Smelter Peleburan Timbal Sekunder Berizin Resmi KLHK.',
    handlingGuidelines: [
      'Simpan dalam posisi tegak agar cairan asam tidak tumpah.',
      'Wadah penyimpanan harus berbahan anti-asam (polypropylene).',
      'Segera hubungi smelter berizin untuk proses daur ulang tertutup.'
    ],
    prohibitedActions: [
      'DILARANG KERAS membuang air aki ke selokan atau tanah.',
      'DILARANG membongkar aki dengan kapak/palu tanpa sistem vakum gas asam timbal!'
    ],
    recommendedInnovations: [
      'Kemitraan Penyaluran Tertutup ke Smelter Timbal Berizin Resmi'
    ],
    characteristics: ['Korosif Tinggi (pH < 1)', 'Neurotoksik Akut', 'Kadar Timbal 60-70%']
  }
];
