// Mock data for admin dashboard
// In production, replace with API calls to /api/admin/*

export interface StatCardData {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  trend: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  icon: "DollarSign" | "Users" | "BookOpen" | "ShoppingBag";
  sparkline: number[];
}

export interface RevenueDataPoint {
  month: string;
  value: number; // dalam juta
  lastYear: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface Transaction {
  id: string;
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  item: string;
  amount: number;
  status: "berhasil" | "pending" | "gagal";
  date: string;
}

export const mockStats: StatCardData[] = [
  {
    id: "revenue",
    title: "Total Pendapatan",
    value: 150_000_000,
    formattedValue: "Rp 150.000.000",
    trend: { value: 12.5, label: "dari bulan lalu", isPositive: true },
    icon: "DollarSign",
    sparkline: [45, 52, 48, 61, 55, 68, 72, 80, 75, 88, 95, 108],
  },
  {
    id: "users",
    title: "Total Pengguna",
    value: 8542,
    formattedValue: "8.542",
    trend: { value: 8.2, label: "dari bulan lalu", isPositive: true },
    icon: "Users",
    sparkline: [120, 145, 168, 180, 195, 220, 245, 268, 290, 310, 340, 380],
  },
  {
    id: "courses",
    title: "Kursus Aktif",
    value: 127,
    formattedValue: "127",
    trend: { value: 5, label: "kursus baru", isPositive: true },
    icon: "BookOpen",
    sparkline: [98, 100, 102, 105, 108, 110, 112, 115, 118, 121, 124, 127],
  },
  {
    id: "products",
    title: "Produk Digital",
    value: 89,
    formattedValue: "89",
    trend: { value: 3, label: "produk baru", isPositive: true },
    icon: "ShoppingBag",
    sparkline: [62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 89],
  },
];

export const mockRevenueData: RevenueDataPoint[] = [
  { month: "Jan", value: 45, lastYear: 32 },
  { month: "Feb", value: 52, lastYear: 38 },
  { month: "Mar", value: 48, lastYear: 41 },
  { month: "Apr", value: 61, lastYear: 45 },
  { month: "Mei", value: 55, lastYear: 48 },
  { month: "Jun", value: 68, lastYear: 52 },
  { month: "Jul", value: 72, lastYear: 58 },
  { month: "Agu", value: 80, lastYear: 62 },
  { month: "Sep", value: 75, lastYear: 65 },
  { month: "Okt", value: 88, lastYear: 70 },
  { month: "Nov", value: 95, lastYear: 76 },
  { month: "Des", value: 108, lastYear: 82 },
];

export const mockCategoryData: CategoryDataPoint[] = [
  { name: "Teknologi", value: 45, color: "#A4D624" },
  { name: "Kreatif", value: 30, color: "#C5E256" },
  { name: "Bisnis", value: 25, color: "#8BC01F" },
];

export const mockRecentTransactions: Transaction[] = [
  {
    id: "TRX-001",
    user: {
      name: "Ahmad Hidayat",
      email: "ahmad.h@email.com",
      avatarUrl: "/images/avatar-1.jpeg",
    },
    item: "Full Stack Web Development",
    amount: 350_000,
    status: "berhasil",
    date: "2026-06-07T10:32:00Z",
  },
  {
    id: "TRX-002",
    user: {
      name: "Sarah Putri",
      email: "sarah.putri@email.com",
      avatarUrl: "/images/avatar-2.jpeg",
    },
    item: "UI/UX Design Masterclass",
    amount: 250_000,
    status: "berhasil",
    date: "2026-06-07T09:15:00Z",
  },
  {
    id: "TRX-003",
    user: {
      name: "Budi Santoso",
      email: "budi.s@email.com",
      avatarUrl: "/images/avatar-3.jpeg",
    },
    item: "Digital Marketing Pro",
    amount: 175_000,
    status: "pending",
    date: "2026-06-07T08:48:00Z",
  },
  {
    id: "TRX-004",
    user: {
      name: "Lina Marlina",
      email: "lina.m@email.com",
      avatarUrl: "/images/avatar-4.jpeg",
    },
    item: "Aset: Mobile UI Kit Bundle",
    amount: 120_000,
    status: "berhasil",
    date: "2026-06-06T21:22:00Z",
  },
  {
    id: "TRX-005",
    user: {
      name: "Reza Pratama",
      email: "reza.p@email.com",
      avatarUrl: "/images/avatar-5.jpeg",
    },
    item: "Webinar: AI for Business",
    amount: 50_000,
    status: "berhasil",
    date: "2026-06-06T18:05:00Z",
  },
];

export const formatCurrency = (value: number): string => {
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(0)}.000.000`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
};

export const formatCurrencyShort = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)}M`;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(0)}jt`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}rb`;
  return value.toString();
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString("id-ID");
};

export const formatRelativeTime = (isoString: string): string => {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "baru saja";
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
};
