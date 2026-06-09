export type UserRole = "admin" | "user" | "super_admin";
export type UserStatus = "active" | "suspended" | "banned";

export type JoinPeriod = "all" | "7days" | "30days" | "3months" | "this_year";
export type UserSortBy = "newest" | "oldest" | "name_asc" | "name_desc";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;

  avatarUrl?: string;
  phone?: string;
  bio?: string;
  location?: string;
  institution?: string;

  coursesEnrolled: number;
  coursesCompleted: number;
  certificates: number;
  totalSpent: number;
  eventsAttended: number;
  lastActiveAt: string | null;

  emailVerified: boolean;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserFilter {
  search: string;
  role: UserRole | "all";
  status: UserStatus | "all";
  joinPeriod: JoinPeriod;
  sortBy: UserSortBy;
  page: number;
  perPage: number;
}

export interface UserStats {
  total: number;
  admin: number;
  active: number;
  suspended: number;
  banned: number;
}

export interface PaginationResult<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}
