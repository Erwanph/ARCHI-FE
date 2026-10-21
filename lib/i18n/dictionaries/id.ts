import type { Dictionary } from './en';

const id: Dictionary = {
  meta: {
    siteTitle: 'ARCHI — Asal Indonesia, Koneksi Global',
    siteDescription:
      'ARCHI menghubungkan asal-usul Indonesia dengan peluang pasar global melalui sourcing yang jelas, representasi yang cermat, dan koordinasi yang dapat diandalkan.',
    pages: {
      origins: {
        title: 'Asal Kami',
        description:
          'Gagasan di balik ARCHI: brand berakar di Indonesia yang dibentuk oleh kepulauan, representasi yang menghormati asal, dan koneksi global yang jelas.',
      },
      products: {
        title: 'Produk',
        description:
          'Jelajahi kategori sourcing ARCHI dari Indonesia. Detail produk, spesifikasi, dokumen, dan ketersediaan dikonfirmasi per peluang.',
      },
      sourcing: {
        title: 'Sourcing',
        description: 'Bagaimana ARCHI menemukan, menyusun, menghubungkan, dan mengoordinasikan peluang sourcing dari Indonesia.',
      },
      about: {
        title: 'Profil Perusahaan',
        description:
          'Kenali ARCHI, brand sourcing dan perdagangan berakar di Indonesia yang menghubungkan asal-usul Indonesia dengan peluang pasar global.',
      },
      contact: {
        title: 'Kontak',
        description: 'Kirim inquiry sourcing produk, kemitraan pasokan, atau kemitraan strategis kepada ARCHI.',
      },
      privacy: {
        title: 'Privasi',
        description: 'Bagaimana ARCHI menangani informasi yang dikirim melalui situs ini.',
      },
      notFound: { title: 'Halaman tidak ditemukan' },
    },
  },

  common: {
    skipToContent: 'Lewati ke konten',
    sendInquiry: 'Kirim inquiry',
    startInquiry: 'Mulai inquiry',
    openNavigation: 'Buka navigasi',
    closeNavigation: 'Tutup navigasi',
    primaryNavigation: 'Navigasi utama',
    mobileNavigation: 'Navigasi seluler',
    homeLabel: 'Beranda ARCHI',
    tagline: 'Asal Indonesia, koneksi global.',
    viewDataSheet: 'Lihat lembar data',
    inquire: 'Tanyakan',
    allProducts: 'Semua produk',
    exploreProducts: 'Jelajahi produk',
    readMore: 'Baca selengkapnya',
    back: 'Kembali',
  },

  nav: {
    home: 'Beranda',
    origins: 'Asal',
    products: 'Produk',
    sourcing: 'Sourcing',
    company: 'Perusahaan',
    contact: 'Kontak',
  },

  language: {
    label: 'Bahasa',
    choose: 'Pilih bahasa',
    current: 'Bahasa saat ini',
  },

  status: {
    verified: { label: 'Terverifikasi', description: 'Dikonfirmasi berdasarkan bukti terkini.' },
    onRequest: { label: 'Tersedia atas permintaan', description: 'Dibagikan untuk kebutuhan spesifik yang telah dikualifikasi.' },
    pending: { label: 'Menunggu konfirmasi pemasok', description: 'Sedang dikonfirmasi dengan pemasok terkait.' },
    unpublished: { label: 'Belum dipublikasikan', description: 'Sengaja ditahan sampai dapat diverifikasi.' },
  },

  categories: {
    all: 'Semua kategori',
    essentialOils: 'Minyak atsiri',
    botanicals: 'Bahan botani',
  },

  productsData: {
    'indonesian-patchouli-oil': {
      name: 'Minyak Nilam Indonesia',
      shortName: 'Minyak Nilam',
      origin: 'Indonesia — asal daerah dikonfirmasi per penawaran',
      description:
        'Kategori sourcing bagi pembeli yang mencari minyak nilam Indonesia dengan asal, spesifikasi, dan syarat komersial yang disajikan secara jelas.',
      imageAlt: 'Dedaunan hijau difoto dalam cahaya alami',
      imageCredit: 'Gambar kategori editorial · Lallaoke / Unsplash',
      verificationSummary:
        'Informasi yang dipublikasikan hanya di tingkat kategori. Pemasok, lot, spesifikasi, dan bukti dikualifikasi untuk setiap peluang.',
      information: [
        { label: 'Asal daerah', note: 'Dikonfirmasi dengan pemasok dan penawaran terkait sebelum disajikan.' },
        { label: 'Spesifikasi dan grade', note: 'Disesuaikan dengan kebutuhan pembeli dan hanya disajikan bila masih berlaku.' },
        { label: 'Kemasan, MOQ, dan waktu tunggu', note: 'Parameter komersial ditinjau untuk penawaran terkait.' },
      ],
      documentation: [
        { label: 'Dokumen produk dan mutu', note: 'Dokumen yang tersedia dicantumkan setelah verifikasi pemasok dan lot.' },
      ],
    },
    'indonesian-kratom': {
      name: 'Kratom Indonesia',
      shortName: 'Kratom',
      origin: 'Indonesia — asal daerah dikonfirmasi per penawaran',
      description:
        'Kategori sourcing untuk peluang kratom Indonesia, dengan asal, format, informasi mutu, dan persyaratan negara tujuan ditinjau sebelum disajikan.',
      imageAlt: 'Ilustrasi daun tanaman hijau tertata di atas nampan anyaman',
      imageCredit: 'Gambar kategori buatan AI · hanya referensi visual',
      verificationSummary:
        'Asal daerah, pemasok, format, lot, bukti mutu, dan kelayakan negara tujuan memerlukan verifikasi terkini untuk setiap peluang.',
      information: [
        { label: 'Asal daerah dan konteks pemasok', note: 'Dikonfirmasi dengan pemasok dan penawaran terkait sebelum disajikan.' },
        { label: 'Format dan parameter mutu', note: 'Ditinjau berdasarkan brief pembeli dan bukti terkini dari pemasok.' },
        { label: 'Kelayakan negara tujuan dan syarat komersial', note: 'Ditinjau untuk pasar tujuan dan penawaran yang telah dikonfirmasi sebelum dibahas.' },
      ],
      documentation: [
        { label: 'Dokumen produk, mutu, dan negara tujuan', note: 'Kebutuhan dan ketersediaan dokumen ditinjau per penawaran dan negara tujuan.' },
      ],
    },
  },

  header: {
    readingProgress: 'Progres membaca',
  },

  footer: {
    blurb:
      'Brand sourcing dan perdagangan berakar di Indonesia yang menghubungkan asal, produk, dan peluang melalui komunikasi bisnis yang jelas.',
    portfolio: 'Portofolio',
    company: 'Perusahaan',
    beginConversation: 'Mulai percakapan',
    allCategories: 'Semua kategori',
    originsLink: 'Asal Kami',
    sourcingLink: 'Proses sourcing',
    profileLink: 'Profil perusahaan',
    privacyLink: 'Privasi',
    buyerInquiry: 'Inquiry pembeli',
    supplierIntroduction: 'Perkenalan pemasok',
    strategicPartnership: 'Kemitraan strategis',
    taglineLong: 'Connecting Indonesian Origins to Global Market',
    location: 'Indonesia — Global',
  },

  intro: {
    loading: 'Memuat ARCHI',
  },

  whatsapp: {
    label: 'WhatsApp',
    ariaLabel: 'Chat dengan ARCHI di WhatsApp',
    prefill: 'Halo ARCHI, saya ingin bertanya tentang sourcing dari Indonesia.',
  },

  nusa: {
    name: 'Nusa',
    role: 'Concierge ARCHI',
    open: 'Chat dengan Nusa',
    close: 'Tutup chat',
    minimize: 'Perkecil',
    teaser: 'Halo, saya Nusa. Tanyakan apa saja tentang sourcing bersama ARCHI.',
    dismissTeaser: 'Tutup',
    greeting:
      'Halo, saya Nusa — concierge ARCHI. Saya bisa menjelaskan produk kami, cara kerja sourcing, dan arti setiap status informasi. Apa yang sedang Anda cari?',
    placeholder: 'Tanyakan produk, sourcing, atau langkah selanjutnya…',
    send: 'Kirim',
    thinking: 'Nusa sedang menulis…',
    suggestionsLabel: 'Pertanyaan yang disarankan',
    suggestions: [
      'Apa saja yang Anda sourcing dari Indonesia?',
      'Bagaimana proses sourcing berjalan?',
      'Apa arti “menunggu konfirmasi pemasok”?',
      'Bagaimana cara memulai inquiry?',
    ],
    disclaimer: 'Nusa adalah asisten AI dan bisa keliru. Syarat dan ketersediaan dikonfirmasi oleh tim ARCHI.',
    handoffTitle: 'Lebih suka bicara dengan orang?',
    handoffInquiry: 'Kirim inquiry',
    handoffWhatsapp: 'WhatsApp',
    error: 'Saya belum bisa menjawab saat ini. Silakan coba lagi, atau kirim inquiry dan tim kami akan membalas.',
    rateLimited: 'Anda mengirim pesan terlalu cepat. Mohon tunggu sebentar lalu coba lagi.',
    offlineNotice: 'Mode jawaban cepat',
    fallback: {
      products:
        'Saat ini ARCHI menyajikan dua kategori sourcing dari Indonesia: minyak nilam (minyak atsiri) dan kratom (bahan botani). Detail seperti spesifikasi, kemasan, MOQ, dan dokumen dikonfirmasi per peluang — status setiap item dapat dilihat di halaman produk.',
      process:
        'Sourcing berjalan dalam empat fase — Discover, Structure, Connect, dan Coordinate — melalui sebelas tahap, dari peninjauan kebutuhan hingga komunikasi berkelanjutan. Halaman Sourcing menjelaskan setiap tahap beserta hasilnya.',
      status:
        'Setiap detail produk memiliki status: Terverifikasi (dikonfirmasi berdasarkan bukti terkini), Tersedia atas permintaan, Menunggu konfirmasi pemasok, atau Belum dipublikasikan. Tidak ada yang disajikan sebagai terkonfirmasi sebelum diperiksa.',
      inquiry:
        'Cara tercepat adalah formulir inquiry di halaman Kontak. Sampaikan produk, pasar tujuan, perkiraan volume, waktu, dan dokumen yang dibutuhkan pasar Anda — ARCHI akan meninjaunya dan membalas dengan apa yang dapat dikonfirmasi.',
      pricing:
        'Harga, MOQ, kapasitas, dan waktu tunggu tidak dipublikasikan. Semuanya dikonfirmasi untuk kebutuhan spesifik setelah ditinjau — kirim inquiry beserta volume dan tujuan Anda.',
      default:
        'Saya bisa membantu soal kategori produk ARCHI, proses sourcing, dan arti setiap status informasi. Untuk hal yang spesifik terkait kebutuhan Anda, tim kami akan membalas inquiry Anda.',
    },
  },

  home: {
    hero: {
      eyebrow: 'Asal Indonesia, koneksi global',
      titleLead: 'Dari asal Indonesia',
      titleAccent: 'menuju peluang global.',
      lede: 'Brand sourcing dan perdagangan berakar di Indonesia yang menyatukan asal, produk, dan peluang dalam satu percakapan yang jelas.',
      primaryCta: 'Jelajahi produk',
      secondaryCta: 'Cara kerja sourcing',
      supplierPrompt: 'Pemasok dari Indonesia?',
      supplierLink: 'Perkenalkan produk Anda',
    },
    planner: {
      title: 'Pratinjau rute',
      from: 'Indonesia',
      productQuestion: 'Apa yang Anda cari?',
      destinationQuestion: 'Ke mana tujuannya?',
      products: {
        patchouli: 'Minyak nilam',
        kratom: 'Kratom',
        other: 'Asal lainnya',
      },
      destinations: {
        'east-asia': 'Asia Timur',
        'south-asia': 'Asia Selatan',
        'middle-east': 'Timur Tengah',
        africa: 'Afrika',
        europe: 'Eropa',
        americas: 'Amerika',
        oceania: 'Oseania',
      },
      note: 'Kelayakan, dokumen, dan syarat ditinjau untuk setiap rute.',
      cta: 'Mulai rute ini',
      autoplay: 'Menjelajahi rute…',
    },
    marquee: ['Warisan', 'Kejelasan', 'Koneksi', 'Kesinambungan', 'Asal yang terhubung', 'Banyak asal. Satu koneksi.'],
    marqueeLabel: 'Prinsip brand',
    premise: {
      eyebrow: '01 · Gagasan di balik ARCHI',
      titleLead: 'Banyak asal.',
      titleAccent: 'Satu koneksi.',
      body: 'Dinamai dari kata archipelago (kepulauan), ARCHI mewakili beragam tempat, orang, dan produk yang membentuk Indonesia — serta koneksi yang cermat agar semuanya dapat masuk ke percakapan bisnis global dengan jelas.',
      link: 'Baca kisah asal kami',
      mapFrom: 'Asal Indonesia',
      mapTo: 'Pasar global',
      facts: [
        { unit: 'pulau', text: 'Satu kepulauan dengan beragam asal, komunitas, dan keahlian.' },
        { unit: 'fase', text: 'Temukan, susun, hubungkan, dan koordinasikan setiap peluang.' },
        { unit: 'tahap peninjauan', text: 'Dari kebutuhan pertama hingga komunikasi berkelanjutan.' },
      ],
    },
    portfolio: {
      eyebrow: '02 · Portofolio sourcing',
      title: 'Produk dengan jejak asalnya.',
      body: 'Setiap kategori menunjukkan dengan tepat apa yang sudah dikonfirmasi dan apa yang masih dikualifikasi. Spesifikasi, dokumen, dan syarat disesuaikan dengan setiap peluang.',
      link: 'Lihat seluruh katalog',
      notListedEyebrow: 'Tidak tercantum?',
      notListedTitle: 'Bawa kebutuhan Anda. Kami tinjau asal di baliknya.',
      notListedLink: 'Jelaskan kebutuhan Anda',
    },
    approach: {
      eyebrow: '03 · Pendekatan ARCHI',
      titleLead: 'Dari asal',
      titleAccent: 'menuju peluang.',
      body: 'Kerangka praktis untuk mengubah percakapan sourcing menjadi langkah berikutnya yang jelas dan terkoordinasi.',
      link: 'Lihat kesebelas tahap',
      outcome: 'Hasil:',
      steps: [
        {
          title: 'Discover',
          text: 'Memahami asal, kategori produk, dan konteks pasokan potensial di balik sebuah kebutuhan.',
          output: 'Brief yang jelas dan pertanyaan terbuka yang terlihat',
        },
        {
          title: 'Structure',
          text: 'Menata spesifikasi, informasi mutu, dan materi presentasi dalam satu catatan yang konsisten.',
          output: 'Informasi yang dapat dibandingkan dan diverifikasi',
        },
        {
          title: 'Connect',
          text: 'Mempertemukan kebutuhan pembeli yang relevan dengan penawaran yang cermat dalam satu percakapan.',
          output: 'Dasar diskusi yang terkualifikasi',
        },
        {
          title: 'Coordinate',
          text: 'Menjaga komunikasi, pembaruan status, dan langkah berikutnya tetap jelas seiring berkembangnya peluang.',
          output: 'Langkah berikutnya yang terlihat dan bertanggung jawab',
        },
      ],
    },
    audience: {
      eyebrow: '04 · Kepada siapa kami berbicara',
      titleLead: 'Satu brand.',
      titleAccent: 'Percakapan yang berbeda.',
      body: 'Pilih peran Anda untuk melihat fokus ARCHI dan bagaimana percakapan pertama biasanya dimulai.',
      tablistLabel: 'Audiens',
      who: 'Siapa',
      whatMatters: 'Yang penting',
      howWeRespond: 'Cara ARCHI merespons',
      firstSteps: 'Langkah pertama',
      tabs: [
        {
          label: 'Pembeli global',
          who: 'Importir, distributor, dan brand spesialis',
          need: 'Kejelasan produk, konsistensi informasi, dan komunikasi yang dapat diandalkan.',
          approach: 'Penawaran terstruktur, klaim yang dapat ditelusuri, dan tindak lanjut profesional.',
          steps: ['Sampaikan produk dan tujuan', 'Terima tinjauan awal yang terstruktur', 'Diskusikan hanya yang sudah dikonfirmasi'],
          cta: 'Mulai inquiry pembeli',
        },
        {
          label: 'Mitra Indonesia',
          who: 'Petani, pengolah, dan pemasok lokal',
          need: 'Representasi asal yang adil dan hubungan komersial yang praktis.',
          approach: 'Persyaratan yang jelas, penceritaan yang menghormati, dan ekspektasi yang transparan.',
          steps: ['Perkenalkan produk dan asal Anda', 'Selaraskan bukti dan dokumen', 'Bertemu kebutuhan pembeli yang relevan'],
          cta: 'Perkenalkan pasokan Anda',
        },
        {
          label: 'Mitra strategis',
          who: 'Penyedia logistik, pengujian, dan layanan',
          need: 'Brand yang mudah dipahami dan koordinasi yang efisien.',
          approach: 'Dokumen yang konsisten, pembaruan status yang akurat, dan standar yang selaras.',
          steps: ['Tentukan peran dan cakupan Anda', 'Sepakati titik serah terima', 'Berkoordinasi dengan status yang terlihat'],
          cta: 'Jajaki kemitraan',
        },
      ],
    },
    information: {
      eyebrow: '05 · Mutu & transparansi',
      titleLead: 'Informasi',
      titleAccent: 'sebelum klaim.',
      body: 'Setiap detail produk di situs ini memiliki status. Anda selalu melihat apa yang sudah dikonfirmasi, apa yang dibagikan atas permintaan, dan apa yang masih diverifikasi — tanpa stok rekaan, tanpa spesifikasi asumsi.',
      explorerHint: 'Pilih sebuah status untuk melihatnya di lembar data.',
      sheetLabel: 'Contoh lembar data',
      illustrative: 'Ilustrasi',
      productName: 'Nama produk',
      rows: [
        { label: 'Asal', note: 'Daerah / Indonesia' },
        { label: 'Spesifikasi', note: 'Diukur dan dikonfirmasi per lot' },
        { label: 'Kemasan', note: 'Hanya opsi yang dikonfirmasi' },
        { label: 'MOQ / waktu tunggu', note: 'Konfirmasi komersial' },
        { label: 'Dokumen', note: 'Dicantumkan hanya bila tersedia' },
      ],
    },
    closing: {
      eyebrow: 'Mulai percakapan',
      titleLead: 'Mari hubungkan',
      titleAccent: 'peluang Anda berikutnya.',
      primary: 'Kirim inquiry sourcing',
      secondary: 'Menjadi mitra pemasok',
    },
  },

  origins: {
    hero: {
      eyebrow: 'Asal kami',
      titleLead: 'Brand yang lahir dari',
      titleAccent: 'kepulauan.',
      lede: 'ARCHI berawal dari keyakinan sederhana: setiap asal membawa konteks, karakter, dan nilai. Menghubungkannya dengan baik dimulai dengan memahaminya.',
      caption: 'Banyak tempat. Banyak orang. Banyak produk.',
      imageAlt: 'Garis pantai dari udara di Pantai Green Bowl, Bali, Indonesia',
      credit: 'Pantai Green Bowl, Bali · Nigel Tadyanehondo / Unsplash',
    },
    name: {
      eyebrow: '01 · Nama',
      srTitle: 'ARCHI, dari kata archipelago',
      lead: 'ARCHI berasal dari kata “archipelago” — ekspresi Indonesia sebagai negara yang dibentuk oleh pulau-pulau, sumber daya alam, komunitas, dan identitas daerah yang khas.',
      body: 'Nama ini mengingatkan bahwa sebuah produk tidak pernah sekadar baris dalam daftar. Asalnya membentuk ceritanya, spesifikasinya, dan cara produk itu seharusnya diperkenalkan di pasar baru. Gelombang pada huruf A melambangkan arus antarpulau — dan koneksi yang membawa sebuah asal keluar.',
    },
    story: {
      eyebrow: '02 · Kisah',
      titleLead: 'Berakar di Indonesia.',
      titleAccent: 'Terhubung ke dunia.',
      lead: 'Indonesia bukan satu cerita tunggal. Ia adalah rangkaian pulau, sumber daya, keterampilan, dan komunitas yang membentuk kekayaan asal yang beragam.',
      body: 'ARCHI lahir dari gagasan sederhana: potensi dari berbagai tempat dapat hadir sebagai satu pengalaman brand yang terarah. Melalui bahasa yang jelas, representasi yang jujur, dan hubungan yang berkelanjutan, ARCHI mempertemukan asal-usul Indonesia dengan kebutuhan pasar internasional.',
      narrativeLabel: 'Narasi brand',
      narrative: 'Banyak asal. Satu koneksi.',
    },
    lenses: {
      eyebrow: '03 · Merepresentasikan asal',
      titleLead: 'Tampilkan asalnya,',
      titleAccent: 'bukan klise.',
      body: 'Saat ARCHI merepresentasikan sebuah produk, kami melihatnya melalui empat lensa — dan hanya menyajikan apa yang dapat ditunjukkan dengan jujur. Pilih salah satu.',
      counter: 'Lensa',
      items: [
        {
          title: 'Tempat',
          text: 'Lanskap, daerah tumbuh, dan konteks lokal tempat sebuah produk berasal.',
          detail: 'Kami memulai dari tempat sesuatu tumbuh dan bagaimana tempat itu membentuknya — sebelum produk apa pun direpresentasikan.',
          alt: 'Sawah berundak di Bali, Indonesia',
        },
        {
          title: 'Orang',
          text: 'Petani, pengolah, dan keahlian di baliknya — direpresentasikan dengan izin dan rasa hormat.',
          detail: 'Mitra diperkenalkan sebagaimana mereka memperkenalkan diri: secara akurat, dan hanya dengan persetujuan mereka.',
          alt: '',
        },
        {
          title: 'Produk',
          text: 'Tekstur yang jujur, detail yang konsisten, dan spesifikasi yang dinyatakan persis seperti yang diketahui.',
          detail: 'Yang sudah dikonfirmasi ditampilkan sebagai terkonfirmasi. Yang masih terbuka ditampilkan sebagai terbuka — tidak pernah disamarkan.',
          alt: 'Dedaunan nilam dalam cahaya alami',
        },
        {
          title: 'Pertukaran',
          text: 'Pengemasan, sourcing, dan perpindahan — jalur praktis dari asal menuju pasar baru.',
          detail: 'Tanggung jawab, titik serah terima, dan dokumen disepakati per kerja sama, bukan diasumsikan.',
          alt: 'Garis pantai di Kepulauan Riau, Indonesia',
        },
      ],
    },
    premise: {
      eyebrow: '04 · Premis',
      srTitle: 'Premis',
      quoteLead: '“Asal lokal.',
      quoteAccent: 'Kemungkinan global.”',
      body: 'Setiap asal memiliki cerita, karakter, dan nilai. ARCHI memberi cerita itu identitas yang mudah dibawa ke mana pun — tanpa kehilangan konteksnya.',
      primary: 'Jelajahi portofolio',
      secondary: 'Profil perusahaan',
    },
  },

  products: {
    hero: {
      eyebrow: 'Portofolio produk',
      titleLead: 'Asal Indonesia,',
      titleAccent: 'disajikan dengan jelas.',
      lede: 'Arahkan kursor ke sebuah produk untuk menampilkannya. Setiap detail memiliki status, sehingga Anda tahu apa yang sudah dikonfirmasi sebelum bertanya.',
      filterLabel: 'Saring berdasarkan kategori',
      confirmed: '{verified} dari {total} detail terkonfirmasi',
      otherTitle: 'Mencari asal Indonesia lainnya?',
      otherText: 'Sampaikan produk dan tujuannya — kategori baru ditinjau per kebutuhan.',
    },
    ledger: {
      eyebrow: 'Buku informasi',
      titleLead: 'Apa yang sudah diketahui,',
      titleAccent: 'dan apa yang belum.',
      body: 'Saring berdasarkan status untuk melihat posisi setiap kategori dengan tepat.',
      filterLabel: 'Tampilkan detail yang',
      everything: 'Semua',
      openSheet: 'Buka lembar data {name}',
    },
    availability: {
      eyebrow: 'Catatan tentang ketersediaan',
      titleLead: 'Tanpa stok rekaan.',
      titleAccent: 'Tanpa spesifikasi asumsi.',
      body: 'Ketersediaan produk, grade, kemasan, pesanan minimum, waktu tunggu, dan dokumentasi dikonfirmasi berdasarkan peluang yang sedang berjalan — tidak pernah dipublikasikan lebih dulu.',
    },
  },

  productDetail: {
    breadcrumb: 'Remah roti',
    products: 'Produk',
    confirmed: 'Informasi terkonfirmasi',
    progressLabel: 'Informasi produk yang terverifikasi',
    inquireCta: 'Tanyakan produk ini',
    sheetCta: 'Baca lembar data',
    sheet: {
      eyebrow: 'Lembar data produk',
      titleLead: 'Disusun berdasarkan apa yang masih perlu',
      titleAccent: 'dikualifikasi.',
      body: 'Detail ditampilkan dengan status terkininya. Tidak ada yang disajikan sebagai terkonfirmasi sebelum diperiksa terhadap pemasok, lot, dan tujuan yang relevan.',
    },
    inquiry: {
      eyebrow: 'Inquiry sourcing',
      title: 'Ceritakan spesifikasi di balik kebutuhan Anda.',
      body: 'Semakin banyak konteks yang Anda bagikan, semakin berguna tinjauan pertama. Tidak ada ketersediaan atau syarat komersial yang tersirat sebelum dikonfirmasi.',
      steps: [
        { title: 'Tinjau', text: 'Kami membaca kebutuhan Anda dan mencatat apa yang sudah jelas dan apa yang masih terbuka.' },
        { title: 'Konfirmasi', text: 'Asal, spesifikasi, dan dokumen diperiksa dengan pemasok terkait.' },
        { title: 'Tanggapi', text: 'Anda menerima apa yang dapat dikonfirmasi — beserta langkah berikutnya yang berguna.' },
      ],
    },
    related: 'Juga di portofolio',
  },

  sourcing: {
    hero: {
      eyebrow: 'Proses sourcing',
      titleLead: 'Empat fase.',
      titleAccent: 'Sebelas tahap yang jelas.',
      lede: 'ARCHI memberi struktur pada tahap awal sourcing — memahami kebutuhan, mengkualifikasi informasi yang tersedia, dan mengoordinasikan langkah berikutnya yang berguna.',
    },
    dial: {
      legend: 'Fase sourcing — gunakan tombol panah untuk memutar dial',
      seeStages: 'Lihat tahapannya',
      previous: 'Fase sebelumnya',
      next: 'Fase berikutnya',
      turning: 'Berputar sendiri…',
      turn: 'Putar dialnya',
      phaseLabel: 'Fase {number}: {name}',
    },
    phase: 'Fase',
    stage: 'Tahap {number}',
    stages: 'Tahap {start}–{end}',
    outcome: 'Hasil:',
    phases: {
      discover: {
        name: 'Discover',
        summary: 'Memahami kebutuhan dan konteks pasokan yang dapat menjawabnya.',
        stages: [
          {
            title: 'Peninjauan kebutuhan',
            text: 'Memperjelas produk, tujuan, penggunaan, waktu, volume, standar, dan pertanyaan terbuka di balik brief.',
            output: 'Kebutuhan yang terstruktur dan celah informasi yang terlihat.',
          },
          {
            title: 'Penemuan pemasok',
            text: 'Mengidentifikasi konteks pasokan yang berpotensi relevan tanpa menganggap perkenalan sebagai kualifikasi.',
            output: 'Sekumpulan peluang yang terfokus untuk ditinjau awal.',
          },
        ],
      },
      structure: {
        name: 'Structure',
        summary: 'Mengubah bukti yang tersedia menjadi informasi yang dapat dibandingkan.',
        stages: [
          {
            title: 'Kualifikasi pemasok',
            text: 'Meninjau bukti identitas, kapabilitas, asal, mutu, dan dokumen yang relevan dengan brief.',
            output: 'Bukti yang diketahui dan kebutuhan verifikasi yang tersisa.',
          },
          {
            title: 'Penyelarasan spesifikasi',
            text: 'Membandingkan kebutuhan pembeli dengan informasi yang tersedia untuk produk atau lot potensial.',
            output: 'Catatan yang jelas tentang kesesuaian, pengecualian, dan poin terbuka.',
          },
          {
            title: 'Permintaan sampel',
            text: 'Bila sesuai, menentukan format sampel, referensi, tujuan, dan ekspektasi peninjauan.',
            output: 'Permintaan sampel yang terkait dengan kebutuhan sourcing.',
          },
          {
            title: 'Peninjauan sampel dan dokumen',
            text: 'Mengoordinasikan peninjauan sampel, spesifikasi, COA, hasil uji, atau dokumen relevan lain yang tersedia.',
            output: 'Masukan yang tercatat dan bukti berikutnya yang dibutuhkan.',
          },
        ],
      },
      connect: {
        name: 'Connect',
        summary: 'Mempertemukan konteks produk yang terverifikasi dengan kebutuhan nyata.',
        stages: [
          {
            title: 'Penyelarasan komersial',
            text: 'Memadukan konteks produk yang terverifikasi dengan kuantitas, kemasan, waktu, syarat, dan kebutuhan negara tujuan.',
            output: 'Dasar yang terkualifikasi untuk diskusi komersial.',
          },
        ],
      },
      coordinate: {
        name: 'Coordinate',
        summary: 'Menjaga tanggung jawab, dokumen, dan status tetap terlihat oleh semua pihak.',
        stages: [
          {
            title: 'Koordinasi kendali mutu',
            text: 'Menentukan kebutuhan inspeksi, pengujian, persetujuan, atau pelaporan sebelum menyajikannya sebagai bagian dari cakupan.',
            output: 'Persyaratan kendali mutu yang disepakati bila berlaku.',
          },
          {
            title: 'Dokumentasi ekspor',
            text: 'Meninjau kebutuhan dokumen terhadap produk, struktur pengiriman, dan pasar tujuan.',
            output: 'Daftar periksa dokumen yang terlihat dan persyaratan yang belum terselesaikan.',
          },
          {
            title: 'Koordinasi logistik',
            text: 'Memperjelas tanggung jawab, titik serah terima, waktu, dan informasi yang dibutuhkan untuk perpindahan barang yang disepakati.',
            output: 'Titik koordinasi yang jelas tanpa mengasumsikan peran logistik yang belum dikonfirmasi.',
          },
          {
            title: 'Komunikasi berkelanjutan',
            text: 'Menjaga keputusan, status, bukti, pertanyaan, dan tindakan berikutnya tetap terlihat seiring berkembangnya peluang.',
            output: 'Percakapan yang lebih jelas dari kebutuhan hingga langkah berikutnya.',
          },
        ],
      },
    },
    commitments: {
      eyebrow: 'Yang menuntun proses',
      titleLead: 'Jelas. Hangat.',
      titleAccent: 'Kredibel.',
      items: [
        'Kami menyatakan apa yang diketahui.',
        'Kami mengidentifikasi apa yang masih perlu dikonfirmasi.',
        'Kami tidak memublikasikan sertifikasi, stok, atau klaim komersial yang tidak didukung.',
        'Kami berkomunikasi dengan rasa hormat kepada pembeli maupun mitra asal.',
        'Cakupan dan tanggung jawab dikonfirmasi per peluang; tidak ada layanan kendali mutu, ekspor, atau logistik yang tersirat sebelum disepakati.',
      ],
    },
    readiness: {
      eyebrow: 'Sebelum Anda menulis',
      titleLead: 'Seberapa siap',
      titleAccent: 'brief Anda?',
      body: 'Centang apa yang sudah Anda ketahui. Tidak ada yang wajib — ini hanya menunjukkan seberapa fokus tinjauan pertama bisa dilakukan.',
      legend: 'Seberapa siap brief Anda?',
      cta: 'Tulis brief Anda',
      items: [
        'Saya tahu produk serta grade atau format yang saya butuhkan',
        'Saya tahu pasar tujuannya',
        'Saya punya perkiraan volume',
        'Saya sudah punya gambaran waktu',
        'Saya tahu dokumen apa yang dibutuhkan pasar saya',
        'Saya bisa membagikan spesifikasi atau sampel referensi',
      ],
      levels: [
        { title: 'Titik awal', text: 'Tidak masalah — tinjauan pertama adalah tempat brief terbentuk.' },
        { title: 'Fondasi yang baik', text: 'Bagikan apa yang Anda punya; poin terbuka akan dicatat, bukan diasumsikan.' },
        { title: 'Hampir siap', text: 'Tinjauan pertama yang terfokus sudah dimungkinkan dengan apa yang Anda ketahui.' },
        { title: 'Siap ditinjau', text: 'Brief Anda sudah mencakup hal-hal penting. Silakan kirim.' },
      ],
    },
    brief: {
      eyebrow: 'Mulai dari kebutuhan Anda',
      title: 'Bagikan brief di balik percakapan sourcing Anda berikutnya.',
      body: 'Produk, tujuan, waktu, perkiraan volume, dan standar yang relevan membantu kami menyusun tinjauan pertama yang tepat.',
    },
  },

  about: {
    hero: {
      eyebrow: 'Profil perusahaan',
      titleLead: 'Lahir dari kepulauan.',
      titleAccent: 'Dibangun untuk perdagangan global.',
      lede: 'Brand sourcing dan perdagangan berakar di Indonesia untuk pembeli yang menghargai kejelasan.',
      lockupAlt: 'ARCHI — Connecting Indonesian Origins to Global Market',
      glance: [
        { label: 'Nama', value: 'ARCHI' },
        { label: 'Sumber', value: 'Kepulauan, Indonesia' },
        { label: 'Identitas', value: 'Wordmark penuh' },
        { label: 'Suara', value: 'Jelas, hangat, kredibel' },
      ],
    },
    manifesto:
      'Kami membantu asal-usul Indonesia menjangkau pembeli global — dengan informasi yang jelas, representasi yang jujur, dan hubungan yang langgeng.',
    standsFor: {
      eyebrow: '01 · Positioning',
      title: 'Apa yang diperjuangkan ARCHI',
      body: 'Identitas perdagangan dan sourcing yang membawa cerita asal Indonesia ke percakapan bisnis global — secara profesional dan terukur.',
      cards: [
        { label: 'Esensi', value: 'Asal yang terhubung.' },
        { label: 'Janji', value: 'Jembatan yang lebih jelas antara pasokan Indonesia dan peluang global.' },
        { label: 'Kepribadian', value: 'Elegan, membumi, dapat diandalkan, dan terbuka.' },
        { label: 'Posisi', value: 'Brand sourcing berakar di Indonesia yang berorientasi ekspor.' },
      ],
    },
    leadership: {
      eyebrow: '02 · Kepemimpinan',
      title: 'Orang-orang di balik ARCHI',
      body: 'ARCHI didirikan dan dipimpin oleh tim kecil yang membangun jembatan antara asal-usul Indonesia dan pembeli global.',
      linkedin: 'Profil LinkedIn {name}',
      educationLabel: 'Lulusan',
      schoolNote: 'Salah satu kampus teknik terbaik di Indonesia',
      emailLabel: 'Email',
      roles: {
        founder: 'Founder',
        coFounder: 'Co-Founder',
      },
    },
    direction: {
      eyebrow: '03 · Arah',
      title: 'Tujuan, visi & misi',
      purposeLabel: 'Tujuan',
      purpose: 'Membuka koneksi yang bermakna antara kekayaan asal Indonesia dan peluang perdagangan global.',
      visionLabel: 'Visi',
      vision: 'Menjadi identitas penghubung yang dipercaya dalam memperkenalkan sumber produk Indonesia secara profesional ke pasar internasional.',
      missionLabel: 'Misi · Cara kami bekerja',
      missions: [
        { title: 'Memahami asal', text: 'Memahami karakter asal, konteks produk, dan kebutuhan setiap mitra.' },
        { title: 'Menyajikan dengan jelas', text: 'Menyampaikan informasi yang akurat, tertata, dan mudah dipahami.' },
        { title: 'Membangun koneksi', text: 'Menciptakan percakapan dan relasi bisnis yang berjalan lintas pasar.' },
      ],
    },
    approach: {
      eyebrow: '04 · Pendekatan ARCHI',
      title: 'Dari asal menuju peluang',
      body: 'Kerangka pengalaman yang sedang dibangun ARCHI — bukan klaim bahwa setiap layanan atau dokumen sudah tersedia. Setiap cakupan dikonfirmasi per kerja sama.',
      link: 'Jelajahi seluruh proses sourcing',
      steps: [
        { title: 'Discover', text: 'Meninjau asal, kategori produk, dan potensi pasokan.' },
        { title: 'Structure', text: 'Menata spesifikasi, informasi mutu, dan materi presentasi.' },
        { title: 'Connect', text: 'Mempertemukan kebutuhan pembeli dengan penawaran yang relevan dan cermat.' },
        { title: 'Coordinate', text: 'Menjaga komunikasi, pembaruan status, dan langkah berikutnya tetap jelas.' },
      ],
    },
    pillars: {
      eyebrow: '05 · Prinsip kami',
      titleLead: 'Empat pilar',
      titleAccent: 'brand.',
      items: [
        { title: 'Warisan', text: 'Menghormati keunikan asal dan cerita di balik setiap produk.' },
        { title: 'Kejelasan', text: 'Informasi dikomunikasikan dengan sederhana, tepat, dan terbuka.' },
        { title: 'Koneksi', text: 'Hubungan yang memberi nilai bagi pemasok dan pasar tujuan.' },
        { title: 'Kesinambungan', text: 'Konsistensi identitas dan relasi untuk jangka panjang.' },
      ],
    },
    focus: {
      eyebrow: '06 · Fokus saat ini',
      title: 'Kategori terfokus, disajikan secara bertanggung jawab.',
    },
    audiences: {
      eyebrow: '07 · Kepada siapa kami berbicara',
      title: 'Satu brand. Percakapan yang berbeda.',
      items: [
        { title: 'Pembeli global', who: 'Importir, distributor, brand spesialis', text: 'Penawaran terstruktur, klaim yang dapat ditelusuri, dan tindak lanjut profesional.' },
        { title: 'Mitra Indonesia', who: 'Petani, pengolah, pemasok lokal', text: 'Persyaratan yang jelas, penceritaan yang menghormati, dan ekspektasi yang transparan.' },
        { title: 'Mitra strategis', who: 'Penyedia logistik, pengujian, layanan', text: 'Dokumen yang konsisten, pembaruan status yang akurat, dan standar yang selaras.' },
      ],
    },
    trust: {
      eyebrow: '08 · Tanggung jawab komersial',
      titleLead: 'Informasi',
      titleAccent: 'sebelum klaim.',
      body: 'Profil yang kredibel tidak dibangun dari superlatif tanpa dasar. Ia dibangun dengan membuat informasi yang diketahui menjadi berguna dan pertanyaan terbuka menjadi terlihat.',
      points: [
        'Asal produk, spesifikasi, dan bukti pemasok ditinjau untuk peluang yang relevan.',
        'Sertifikasi dan dokumen pendukung dicantumkan hanya bila masih berlaku dan tersedia.',
        'Ketersediaan, syarat komersial, dan waktu tunggu dikonfirmasi sebelum disajikan sebagai penawaran.',
        'Kelayakan negara tujuan, cakupan, dan tanggung jawab diperjelas untuk setiap kerja sama.',
      ],
      note: 'Detail bisnis formal dan dokumen pendukung dibagikan sesuai konteks dan hanya bila telah terverifikasi.',
    },
    close: {
      eyebrow: 'Mulai percakapan',
      title: 'Bawa kebutuhan Anda. Kami bantu memperjelas langkah berikutnya.',
      primary: 'Inquiry pembeli',
      secondary: 'Perkenalan pemasok',
    },
  },

  contact: {
    eyebrow: 'Hubungi ARCHI',
    titleLead: 'Mulai dengan',
    titleAccent: 'kebutuhan yang jelas.',
    lede: 'Ceritakan apa yang Anda cari, ke mana tujuannya, dan informasi apa yang penting bagi keputusan Anda.',
    checklistTitle: 'Sebaiknya disertakan',
    checklist: [
      'Produk dan pasar tujuan',
      'Spesifikasi atau referensi, bila ada',
      'Perkiraan volume dan waktu',
      'Dokumen atau standar yang relevan untuk pasar Anda',
    ],
    nextTitle: 'Yang terjadi selanjutnya',
    next: [
      { title: 'Kami meninjau', text: 'Kebutuhan Anda dibaca secara menyeluruh dan poin terbuka dicatat.' },
      { title: 'Kami memperjelas', text: 'Bila ada yang kurang, kami bertanya sebelum berasumsi.' },
      { title: 'Kami menanggapi', text: 'Anda mendengar apa yang dapat dikonfirmasi — dan langkah berikutnya yang berguna.' },
    ],
    sensitiveNote: 'Mohon jangan membagikan kata sandi, nomor identitas pemerintah, atau informasi pembayaran melalui formulir ini.',
  },

  form: {
    roleLegend: 'Saya menghubungi ARCHI sebagai',
    roles: {
      buyer: {
        label: 'Pembeli atau importir',
        detail: 'Mencari produk',
        placeholder:
          'Produk, pasar tujuan, penggunaan, spesifikasi atau referensi, perkiraan volume, waktu, dan dokumen yang dibutuhkan pasar Anda.',
      },
      supplier: {
        label: 'Pemasok Indonesia',
        detail: 'Memperkenalkan pasokan',
        placeholder:
          'Produk dan asal daerah, format, kapasitas saat ini, dokumen mutu yang tersedia, dan pasar yang ingin Anda jangkau.',
      },
      general: {
        label: 'Mitra strategis',
        detail: 'Logistik, pengujian, layanan',
        placeholder:
          'Layanan Anda, wilayah operasional, peran yang dapat Anda ambil dalam kerja sama sourcing, dan cara Anda biasa berkoordinasi.',
      },
    },
    aboutYou: 'Tentang Anda',
    requirement: 'Kebutuhan Anda',
    fields: {
      name: 'Nama lengkap',
      company: 'Perusahaan',
      email: 'Email bisnis',
      country: 'Negara / pasar',
      product: 'Minat produk',
      productPlaceholder: 'Pilih kategori',
      productOther: 'Lainnya / tidak tercantum',
      details: 'Ceritakan kebutuhan Anda',
    },
    optional: '(opsional)',
    charsNeeded: 'Butuh {count} karakter lagi',
    consentLead: 'Saya setuju ARCHI dapat menggunakan data ini untuk meninjau dan menanggapi inquiry ini sebagaimana dijelaskan dalam',
    privacyPolicy: 'Kebijakan Privasi',
    consentEnd: '.',
    commercialNote: 'Syarat komersial dan ketersediaan dikonfirmasi hanya setelah ditinjau.',
    submit: 'Kirim inquiry',
    submitting: 'Mengirim…',
    errors: {
      name: 'Mohon masukkan nama lengkap Anda.',
      company: 'Mohon masukkan nama perusahaan Anda.',
      email: 'Mohon masukkan email bisnis yang valid.',
      country: 'Mohon sebutkan negara atau pasar Anda.',
      details: 'Mohon tuliskan minimal 20 karakter tentang kebutuhan Anda.',
      consent: 'Mohon berikan persetujuan agar kami dapat meninjau inquiry Anda.',
      generic: 'Inquiry tidak dapat dikirim. Silakan coba lagi.',
      invalid: 'Mohon periksa kembali detail inquiry yang wajib diisi.',
      rateLimited: 'Terlalu banyak percobaan dalam waktu singkat. Silakan coba lagi nanti.',
    },
    success: {
      eyebrow: 'Inquiry diterima',
      title: 'Terima kasih telah memulai percakapan.',
      body: 'Inquiry Anda telah diterima untuk ditinjau. ARCHI meninjau kebutuhan Anda terlebih dahulu, lalu menanggapi dengan apa yang dapat dikonfirmasi dan langkah berikutnya yang berguna.',
      again: 'Kirim inquiry lain',
    },
  },

  privacy: {
    eyebrow: 'Privasi',
    title: 'Informasi yang dikirim melalui situs ini.',
    updated: 'Terakhir diperbarui: 22 Oktober 2026',
    onThisPage: 'Di halaman ini',
    sections: [
      {
        id: 'collect',
        title: 'Yang kami kumpulkan',
        body: 'Formulir inquiry mengumpulkan informasi kontak, perusahaan, pasar, minat produk, dan kebutuhan yang Anda pilih untuk diberikan. Pesan yang dikirim ke Nusa, asisten situs ini, diproses oleh penyedia model AI pihak ketiga (melalui OpenRouter) untuk menghasilkan balasan. Sebagian penyedia tersebut dapat mencatat atau memakai pesan untuk meningkatkan modelnya, jadi mohon jangan membagikan informasi rahasia atau data pribadi di chat.',
      },
      {
        id: 'use',
        title: 'Mengapa kami menggunakannya',
        body: 'Informasi yang dikirim digunakan untuk meninjau inquiry, menentukan apakah ARCHI dapat mendukung permintaan tersebut, dan mengoordinasikan tanggapan.',
      },
      {
        id: 'storage',
        title: 'Cara penyimpanannya',
        body: 'Inquiry dikirim ke tim ARCHI melalui email (lewat layanan email Resend) dan, bila tersedia, juga disimpan di basis data privat situs ini. Catatan tersebut tidak dipublikasikan melalui katalog publik atau ditampilkan sebagai daftar publik.',
      },
      {
        id: 'sharing',
        title: 'Berbagi dan penyimpanan',
        body: 'Informasi hanya digunakan untuk peninjauan inquiry dan tindak lanjut yang relevan. Informasi hanya dibagikan kepada pihak yang diperlukan untuk menilai atau melanjutkan permintaan. Catatan disimpan untuk tujuan bisnis tersebut dan kewajiban hukum yang berlaku, lalu dihapus bila tidak lagi diperlukan.',
      },
      {
        id: 'contact',
        title: 'Kontak',
        body: 'Untuk meminta akses, koreksi, atau penghapusan, gunakan formulir inquiry umum. Jangan mengirim kata sandi, nomor identitas pemerintah, informasi pembayaran, atau data pribadi sensitif lainnya melalui formulir.',
      },
    ],
    contactLink: 'Formulir inquiry umum',
  },

  notFound: {
    eyebrow: '404 · Rute tidak ditemukan',
    titleLead: 'Rute ini belum sampai',
    titleAccent: 'ke tujuannya.',
    body: 'Kembali ke kisah ARCHI, jelajahi portofolio sourcing, atau mulai percakapan bisnis yang baru.',
    home: 'Kembali ke beranda',
    products: 'Jelajahi produk',
  },

  error: {
    eyebrow: 'Gangguan sementara',
    titleLead: 'Kami tidak dapat menyelesaikan',
    titleAccent: 'permintaan halaman ini.',
    body: 'Tidak ada inquiry yang terkirim. Coba muat ulang halaman atau kembali ke beranda untuk melanjutkan.',
    retry: 'Coba lagi',
    home: 'Kembali ke beranda',
  },
};

export default id;
