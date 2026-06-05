import type { UserProfile } from "./types";

export const MOCK_USER_PROFILE: UserProfile = {
  id: "vito-aditya",
  email: "vito@student.unair.ac.id",
  password: "",
  name: "Vito Aditya",
  createdAt: "2026-05-20T00:00:00Z",
  joinDate: "2026-05-20T00:00:00Z",

  bio: "Seorang mahasiswa yang antusias belajar UI/UX dan Web Development. Saat ini sedang fokus membangun portofolio project freelance sambil menyelesaikan studi. Hobi membaca dokumentasi API dan exploring design tools baru.",

  institution: "Universitas Airlangga",
  jobTitle: "Mahasiswa",
  location: "Surabaya, Jawa Timur",
  avatarUrl: "/images/avatar-4.jpeg",

  phone: "+62 812-3456-7890",
  phoneVerified: true,
  emailVerified: true,

  socialLinks: {
    github: "https://github.com/vitoaditya",
    linkedin: "https://linkedin.com/in/vitoaditya",
    instagram: "https://instagram.com/vitoaditya",
    website: "https://vitoaditya.dev",
  },

  role: "student",
  isVerified: true,

  stats: {
    coursesEnrolled: 12,
    certificatesEarned: 5,
    assetsOwned: 3,
    eventsAttended: 8,
  },
};
