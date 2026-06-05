import {
  UserCircle,
  CreditCard,
  GraduationCap,
  Image as ImageIcon,
  Award,
  Wrench,
  MessageSquare,
  Activity,
  Shield,
  FileText,
  Bug,
  Code2,
} from "lucide-react";
import type { FAQ, HelpCategory, QuickLinkItem } from "./types";

export const MOCK_FAQS: FAQ[] = [
  {
    id: "faq-001",
    question: "Bagaimana cara mengunduh sertifikat setelah menyelesaikan kelas?",
    answer: `Setelah Anda menyelesaikan 100% modul kelas, sertifikat akan otomatis tersedia di halaman **Profil > Sertifikat** Anda. Anda juga akan menerima email notifikasi dengan tautan unduhan.

**Cara mengunduh:**
1. Buka menu **Profil** di navbar atas
2. Pilih tab **Sertifikat**
3. Klik tombol **Unduh PDF** di sertifikat yang ingin Anda simpan

Sertifikat berformat PDF dengan kode QR verifikasi yang dapat dipindai oleh pihak ketiga untuk membuktikan keaslian.`,
    category: "certificate",
    tags: ["sertifikat", "download", "pdf", "selesai", "kelas"],
    isPopular: true,
    helpfulCount: 247,
    relatedLinks: [{ label: "Lihat sertifikat saya", href: "/profile" }],
    relatedFAQs: ["faq-002", "faq-003"],
    createdAt: "2026-01-15T10:00:00+07:00",
    updatedAt: "2026-04-20T14:30:00+07:00",
  },
  {
    id: "faq-002",
    question: "Metode pembayaran apa saja yang tersedia di CreTechin?",
    answer: `Kami mendukung berbagai metode pembayaran untuk kenyamanan Anda:

**Virtual Account (Bank Transfer):**
- BCA VA
- Mandiri VA
- BNI VA

**E-Wallet:**
- GoPay
- OVO
- DANA
- ShopeePay

**Kartu Kredit:**
- Visa, Mastercard, JCB

Semua pembayaran diproses melalui payment gateway terenkripsi dan aman. Invoice digital akan dikirim ke email Anda setelah pembayaran berhasil.`,
    category: "payment",
    tags: ["bayar", "payment", "VA", "gopay", "ovo", "ewallet", "kartu kredit"],
    isPopular: true,
    helpfulCount: 189,
    relatedLinks: [{ label: "Lihat transaksi saya", href: "/transactions" }],
    relatedFAQs: ["faq-004", "faq-005"],
    createdAt: "2026-01-10T09:00:00+07:00",
    updatedAt: "2026-05-01T11:15:00+07:00",
  },
  {
    id: "faq-003",
    question: "Apakah aset digital bisa diunduh berkali-kali?",
    answer: `**Ya, aset digital dapat diunduh tanpa batas.** Setelah pembelian berhasil, Anda dapat mengunduh file dari halaman **Marketplace > Aset Saya** kapan saja.

Unduhan tidak memiliki batas waktu atau jumlah. Kami sarankan untuk menyimpan salinan lokal di perangkat Anda sebagai backup, karena link unduhan sewaktu-waktu dapat berubah karena pemeliharaan server.`,
    category: "asset",
    tags: ["aset", "download", "berkali-kali", "limit"],
    isPopular: true,
    helpfulCount: 156,
    relatedLinks: [
      { label: "Lihat aset saya", href: "/marketplace?tab=my" },
    ],
    relatedFAQs: ["faq-006"],
    createdAt: "2026-01-12T10:00:00+07:00",
    updatedAt: "2026-03-15T09:00:00+07:00",
  },
  {
    id: "faq-004",
    question: "Bagaimana cara mengganti kata sandi akun saya?",
    answer: `Anda dapat mengganti kata sandi kapan saja melalui halaman **Pengaturan Akun**:

1. Klik avatar Anda di navbar kanan atas
2. Pilih **Pengaturan Akun**
3. Pilih tab **Kata Sandi** di sidebar kiri
4. Masukkan kata sandi lama dan kata sandi baru
5. Klik **Simpan Perubahan**

**Tips keamanan:**
- Gunakan minimal 8 karakter
- Kombinasikan huruf besar, kecil, angka, dan simbol
- Jangan gunakan kata sandi yang sama dengan akun lain

Jika Anda lupa kata sandi lama, gunakan fitur **Lupa Password** di halaman login.`,
    category: "account",
    tags: ["password", "kata sandi", "ganti", "keamanan", "login"],
    isPopular: true,
    helpfulCount: 134,
    relatedLinks: [
      {
        label: "Buka Pengaturan Akun",
        href: "/settings?tab=password",
      },
    ],
    relatedFAQs: ["faq-007"],
    createdAt: "2026-01-08T08:00:00+07:00",
    updatedAt: "2026-04-10T15:20:00+07:00",
  },
  {
    id: "faq-005",
    question: "Berapa lama proses verifikasi pembayaran?",
    answer: `Waktu verifikasi pembayaran bervariasi tergantung metode:

- **Virtual Account**: 1-5 menit setelah transfer berhasil
- **E-Wallet**: Real-time (langsung)
- **Kartu Kredit**: 1-3 menit untuk otentikasi

Jika lebih dari 15 menit status masih **Tertunda**, silakan:
1. Cek mutasi bank/ewallet Anda
2. Hubungi support via WhatsApp dengan menyertakan bukti transfer

Status transaksi dapat dicek di halaman **History Transaksi**.`,
    category: "payment",
    tags: ["verifikasi", "lama", "pending", "VA", "ewallet"],
    helpfulCount: 98,
    relatedLinks: [
      { label: "Cek status transaksi", href: "/transactions" },
    ],
    relatedFAQs: ["faq-002"],
    createdAt: "2026-02-01T11:00:00+07:00",
    updatedAt: "2026-04-25T10:00:00+07:00",
  },
  {
    id: "faq-006",
    question: "Apa itu CreTechin dan bagaimana cara bergabung?",
    answer: `**CreTechin** adalah platform edukasi dan marketplace digital yang menyediakan:
- Kelas online bersertifikat (desain, programming, bisnis, dll)
- Aset digital siap pakai (template, icon, font, UI kit)
- Acara komunitas dan webinar

**Cara bergabung:**
1. Klik tombol **Daftar** di navbar atas
2. Isi formulir pendaftaran (nama, email, password)
3. Verifikasi email Anda
4. Mulai eksplorasi katalog kami

Pendaftaran gratis, Anda hanya membayar untuk kelas atau aset yang Anda pilih.`,
    category: "account",
    tags: ["daftar", "register", "bergabung", "platform", "apa itu"],
    helpfulCount: 87,
    relatedLinks: [{ label: "Daftar sekarang", href: "/register" }],
    relatedFAQs: ["faq-004"],
    createdAt: "2026-01-05T09:00:00+07:00",
    updatedAt: "2026-02-20T14:00:00+07:00",
  },
  {
    id: "faq-007",
    question: "Saya tidak bisa login, apa yang harus dilakukan?",
    answer: `Jika Anda mengalami kesulitan login, coba langkah berikut:

1. **Pastikan email & password benar** — perhatikan huruf besar/kecil
2. **Reset password** — klik "Lupa Password" di halaman login
3. **Cek koneksi internet** — pastikan stabil
4. **Cek email verifikasi** — jika akun baru, pastikan sudah verifikasi
5. **Clear cache browser** — kadang data sesi lama menyebabkan konflik

Jika masih tidak bisa, hubungi support via WhatsApp dengan menyertakan:
- Email akun Anda
- Screenshot error (jika ada)
- Device & browser yang digunakan`,
    category: "account",
    tags: ["login", "tidak bisa", "masuk", "lupa password", "error"],
    helpfulCount: 76,
    relatedFAQs: ["faq-004"],
    createdAt: "2026-01-20T13:00:00+07:00",
    updatedAt: "2026-05-02T16:00:00+07:00",
  },
  {
    id: "faq-008",
    question: "Apakah ada kebijakan pengembalian dana (refund)?",
    answer: `**Ya, kami menyediakan kebijakan refund 7 hari** untuk kelas dan aset digital dengan syarat:

**Memenuhi syarat refund jika:**
- Kelas belum diakses lebih dari 20% progress
- Aset digital belum diunduh
- Permintaan diajukan dalam 7 hari kalender sejak pembelian

**Tidak memenuhi syarat jika:**
- Progress kelas sudah > 20%
- Aset sudah diunduh
- Lebih dari 7 hari sejak pembelian
- Pelanggaran Terms of Service

**Cara ajukan refund:**
1. Buka detail order di **History Transaksi**
2. Klik tombol **Ajukan Refund**
3. Isi alasan refund
4. Tim kami akan review dalam 2x24 jam

Dana akan dikembalikan ke metode pembayaran asal dalam 5-14 hari kerja.`,
    category: "payment",
    tags: ["refund", "pengembalian", "batal", "uang kembali", "kebijakan"],
    isPopular: true,
    helpfulCount: 145,
    relatedLinks: [
      { label: "Lihat transaksi saya", href: "/transactions" },
    ],
    relatedFAQs: ["faq-002", "faq-005"],
    createdAt: "2026-02-10T10:00:00+07:00",
    updatedAt: "2026-04-30T12:00:00+07:00",
  },
  {
    id: "faq-009",
    question: "Bagaimana cara mengakses kelas yang sudah saya beli?",
    answer: `Setelah membeli kelas, Anda dapat mengaksesnya melalui:

1. Klik **Kelas** di navbar atas
2. Pilih tab **Kelas Saya** (My Classes)
3. Klik kelas yang ingin Anda mulai
4. Anda akan diarahkan ke halaman course player

Progress belajar Anda tersimpan otomatis dan dapat dilanjutkan dari device manapun (tersinkronisasi via cloud).`,
    category: "course",
    tags: ["akses", "kelas", "belajar", "course", "mulai"],
    helpfulCount: 112,
    relatedLinks: [{ label: "Lihat kelas saya", href: "/courses?tab=my" }],
    relatedFAQs: ["faq-010"],
    createdAt: "2026-01-25T09:00:00+07:00",
    updatedAt: "2026-03-28T11:00:00+07:00",
  },
  {
    id: "faq-010",
    question: "Apakah saya bisa belajar kelas secara offline (tanpa internet)?",
    answer: `Saat ini, kelas **hanya dapat diakses secara online** dengan koneksi internet aktif. Ini karena:

- Video streaming memerlukan bandwidth
- Progress tracking real-time via cloud
- Update konten otomatis

**Namun**, untuk aset digital (template, icon, font, UI kit), Anda dapat mengunduh file dan menggunakannya secara offline 100% setelah pembelian.

Kami sedang mempertimbangkan fitur **download video untuk offline** di rilis mendatang. Stay tuned!`,
    category: "course",
    tags: ["offline", "tanpa internet", "download video"],
    helpfulCount: 65,
    relatedFAQs: ["faq-009"],
    createdAt: "2026-02-15T14:00:00+07:00",
    updatedAt: "2026-04-12T10:00:00+07:00",
  },
  {
    id: "faq-011",
    question: "Format file apa saja yang tersedia untuk aset digital?",
    answer: `Aset digital di CreTechin tersedia dalam format standar industri:

**Desain Grafis:**
- AI (Adobe Illustrator)
- PSD (Adobe Photoshop)
- Figma (file .fig + link)
- Sketch
- XD (Adobe XD)

**Template & Dokumen:**
- PDF
- DOCX (Microsoft Word)
- PPTX (PowerPoint)
- Google Docs/Slides (link)

**Aset Vektor & Ikon:**
- SVG
- EPS
- PNG (transparent)
- ICO (icon file)

**Font:**
- TTF (TrueType)
- OTF (OpenType)
- WOFF/WOFF2 (web font)

Setiap halaman detail produk mencantumkan format spesifik yang tersedia.`,
    category: "asset",
    tags: ["format", "file", "tipe", "AI", "PSD", "Figma", "SVG", "PNG"],
    helpfulCount: 54,
    relatedFAQs: ["faq-003"],
    createdAt: "2026-02-05T11:00:00+07:00",
    updatedAt: "2026-04-18T09:00:00+07:00",
  },
  {
    id: "faq-012",
    question: "Apakah lisensi aset digital termasuk untuk penggunaan komersial?",
    answer: `**Ya, semua aset digital di CreTechin menyertakan lisensi komersial.**

**Yang termasuk dalam lisensi komersial:**
- Penggunaan di project klien
- Produk digital yang Anda jual (template, theme, dll)
- Marketing & branding bisnis
- Aplikasi/web/app yang Anda buat untuk klien

**Yang TIDAK termasuk (perlu lisensi extended):**
- Redistribusi file asli (menjual kembali aset as-is)
- Penggunaan di template yang akan dijual kembali
- Sub-lisensi ke pihak ketiga

Lisensi extended tersedia untuk pembelian terpisah. Hubungi support untuk detail.`,
    category: "asset",
    tags: ["lisensi", "komersial", "komersil", "penggunaan", "legal"],
    helpfulCount: 78,
    relatedFAQs: ["faq-003", "faq-011"],
    createdAt: "2026-02-20T10:00:00+07:00",
    updatedAt: "2026-04-22T13:00:00+07:00",
  },
  {
    id: "faq-013",
    question: "Website lambat atau error, apa yang harus saya lakukan?",
    answer: `Jika Anda mengalami masalah teknis (loading lambat, error 500, blank page, dll):

**Troubleshooting cepat:**
1. **Refresh halaman** (Ctrl+R / Cmd+R)
2. **Clear cache browser** (Ctrl+Shift+Delete)
3. **Coba browser lain** (Chrome, Firefox, Safari)
4. **Coba mode Incognito** (untuk meng排除 ekstensi)
5. **Cek koneksi internet**

**Jika masih belum teratasi:**
- Cek **Status Platform** untuk melihat apakah ada maintenance
- Hubungi support via WhatsApp dengan menyertakan:
  - Screenshot error
  - URL halaman yang error
  - Device & browser info

Tim kami akan investigasi dalam 2x24 jam.`,
    category: "technical",
    tags: ["lambat", "error", "bug", "blank", "loading", "teknis"],
    isNew: true,
    helpfulCount: 42,
    relatedLinks: [{ label: "Cek status platform", href: "/status" }],
    relatedFAQs: ["faq-014"],
    createdAt: "2026-05-01T08:00:00+07:00",
    updatedAt: "2026-05-10T15:00:00+07:00",
  },
  {
    id: "faq-014",
    question: "Apakah CreTechin punya aplikasi mobile (iOS/Android)?",
    answer: `Saat ini CreTechin **hanya tersedia sebagai web app** yang responsive di semua device (desktop, tablet, mobile browser).

**Keuntungan web app:**
- Tidak perlu install/uninstall
- Selalu update otomatis
- Cross-platform (Windows/Mac/Linux/iOS/Android)
- Data tersinkronisasi real-time

Kami **sedang mengembangkan aplikasi mobile native** (React Native) yang ditargetkan rilis pada Q4 2026. Pengguna yang ingin menjadi beta tester dapat mendaftar di program early access kami.

Untuk pengalaman mobile yang optimal, kami sarankan menambahkan CreTechin ke Home Screen (PWA):
- **iOS Safari**: Tap tombol Share → "Add to Home Screen"
- **Android Chrome**: Menu → "Add to Home Screen"`,
    category: "technical",
    tags: ["mobile", "aplikasi", "iOS", "Android", "PWA"],
    helpfulCount: 89,
    createdAt: "2026-03-10T13:00:00+07:00",
    updatedAt: "2026-05-05T11:00:00+07:00",
  },
  {
    id: "faq-015",
    question: "Bagaimana cara mengubah email atau nomor telepon saya?",
    answer: `Untuk mengubah email atau nomor telepon akun:

1. Buka **Pengaturan Akun** dari avatar dropdown
2. Pilih tab **Profil**
3. Klik tombol **Edit** di bagian Email atau Nomor Telepon
4. Masukkan email/nomor baru
5. Kami akan kirim kode verifikasi ke email/nomor baru
6. Masukkan kode untuk konfirmasi

**Catatan penting:**
- Perubahan email akan mengubah login utama Anda
- Nomor telepon digunakan untuk notifikasi WhatsApp
- Kedua kontak harus unik (tidak boleh sama dengan akun lain)`,
    category: "account",
    tags: ["ganti email", "ganti nomor", "ubah", "kontak", "verifikasi"],
    helpfulCount: 56,
    relatedLinks: [{ label: "Buka Pengaturan", href: "/settings" }],
    relatedFAQs: ["faq-004", "faq-007"],
    createdAt: "2026-03-01T10:00:00+07:00",
    updatedAt: "2026-04-15T14:00:00+07:00",
  },
];

export const MOCK_CATEGORIES: HelpCategory[] = [
  {
    id: "account",
    label: "Akun & Profil",
    description: "Login, profil, keamanan",
    icon: UserCircle,
    href: "/help?cat=account",
    articleCount: 12,
  },
  {
    id: "payment",
    label: "Pembayaran",
    description: "VA, e-wallet, refund",
    icon: CreditCard,
    href: "/help?cat=payment",
    articleCount: 18,
  },
  {
    id: "course",
    label: "Kelas",
    description: "Akses, progress, modul",
    icon: GraduationCap,
    href: "/help?cat=course",
    articleCount: 15,
  },
  {
    id: "asset",
    label: "Aset Digital",
    description: "Download, lisensi, format",
    icon: ImageIcon,
    href: "/help?cat=asset",
    articleCount: 9,
  },
  {
    id: "certificate",
    label: "Sertifikat",
    description: "Download, verifikasi",
    icon: Award,
    href: "/help?cat=certificate",
    articleCount: 6,
  },
  {
    id: "technical",
    label: "Teknis",
    description: "Bug, error, performa",
    icon: Wrench,
    href: "/help?cat=technical",
    articleCount: 10,
  },
];

export const MOCK_QUICK_LINKS: QuickLinkItem[] = [
  {
    id: "discord",
    label: "Komunitas Discord",
    description: "Diskusi & tips",
    icon: MessageSquare,
    href: "https://discord.gg/cretechin",
    external: true,
  },
  {
    id: "status",
    label: "Status Platform",
    description: "Cek uptime",
    icon: Activity,
    href: "/status",
  },
  {
    id: "privacy",
    label: "Kebijakan Privasi",
    icon: Shield,
    href: "/privacy",
  },
  {
    id: "terms",
    label: "Syarat & Ketentuan",
    icon: FileText,
    href: "/terms",
  },
  {
    id: "bug-report",
    label: "Laporkan Bug",
    description: "Bantu kami improve",
    icon: Bug,
    href: "/report-bug",
  },
  {
    id: "api-docs",
    label: "API Documentation",
    description: "Untuk developer",
    icon: Code2,
    href: "/docs/api",
    external: true,
  },
];
