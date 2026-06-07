// Mock user data for demo
const DEMO_USER = {
  email: "demo@cretechin.id",
  password: "demo123",
  name: "Demo User",
};

// Mock admin user data for demo
const DEMO_ADMIN = {
  email: "admin@cretechin.id",
  password: "admin123",
  name: "Atmin Gondrong",
};

// Registered admin users (stored in localStorage)
const ADMINS_KEY = "cretechin_admins";
const ADMIN_SESSION_KEY = "cretechin_current_admin";
const ADMIN_ATTEMPTS_KEY = "cretechin_admin_attempts";
const ADMIN_LOCKOUT_KEY = "cretechin_admin_lockout";

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// Simulated registered users (stored in localStorage)
const USERS_KEY = "cretechin_users";

export interface User {
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

// Get stored users
const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Save users to storage
const saveUsers = (users: User[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Check if email already exists
const isEmailTaken = (email: string): boolean => {
  const users = getStoredUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
};

// Login function
export const login = async (email: string, password: string): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check demo user
  if (email.toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
    return {
      success: true,
      user: {
        email: DEMO_USER.email,
        password: DEMO_USER.password,
        name: DEMO_USER.name,
        createdAt: "Demo",
      },
    };
  }

  // Check registered users
  const users = getStoredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (user) {
    return { success: true, user };
  }

  return { success: false, error: "Email atau kata sandi salah" };
};

// Register function
export const register = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Check if email is taken
  if (isEmailTaken(email)) {
    return { success: false, error: "Email sudah terdaftar" };
  }

  // Create new user
  const newUser: User = {
    email,
    password,
    name,
    createdAt: new Date().toISOString(),
  };

  // Save to storage
  const users = getStoredUsers();
  users.push(newUser);
  saveUsers(users);

  return { success: true, user: newUser };
};

// Logout function
export const logout = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cretechin_current_user");
};

// Save current user session
export const saveSession = (user: User): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("cretechin_current_user", JSON.stringify(user));
};

// Get current session
export const getSession = (): User | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("cretechin_current_user");
  return stored ? JSON.parse(stored) : null;
};

// Clear session
export const clearSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cretechin_current_user");
};

// Auth state storage keys
export const AUTH_TOKEN_KEY = "cretechin_auth_token";

// ========================================================================
// ADMIN AUTH
// ========================================================================

export type AdminRole = "super_admin" | "admin" | "moderator";

export interface AdminUser {
  email: string;
  password: string;
  name: string;
  role: AdminRole;
  enable2FA: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface AdminSession {
  email: string;
  name: string;
  role: AdminRole;
  avatarUrl?: string;
  loggedInAt: string;
  expiresAt: string;
}

export interface AdminAuthResult {
  success: boolean;
  error?: string;
  user?: AdminUser;
  requires2FA?: boolean;
}

export interface AttemptRecord {
  count: number;
  firstAttemptAt: number;
}

export interface LockoutRecord {
  until: number;
}

// Get stored admins
const getStoredAdmins = (): AdminUser[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ADMINS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveAdmins = (admins: AdminUser[]): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
};

const isAdminEmailTaken = (email: string): boolean => {
  return getStoredAdmins().some(
    (a) => a.email.toLowerCase() === email.toLowerCase()
  );
};

// Rate limit helpers (per email)
const getAttempts = (email: string): AttemptRecord => {
  if (typeof window === "undefined") return { count: 0, firstAttemptAt: 0 };
  const stored = localStorage.getItem(ADMIN_ATTEMPTS_KEY);
  if (!stored) return { count: 0, firstAttemptAt: 0 };
  const all: Record<string, AttemptRecord> = JSON.parse(stored);
  const now = Date.now();
  const rec = all[email.toLowerCase()];
  if (!rec) return { count: 0, firstAttemptAt: 0 };
  // Reset if outside window
  if (now - rec.firstAttemptAt > ATTEMPT_WINDOW_MS) {
    return { count: 0, firstAttemptAt: 0 };
  }
  return rec;
};

const recordFailedAttempt = (email: string): void => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(ADMIN_ATTEMPTS_KEY);
  const all: Record<string, AttemptRecord> = stored ? JSON.parse(stored) : {};
  const key = email.toLowerCase();
  const now = Date.now();
  const existing = all[key];
  if (!existing || now - existing.firstAttemptAt > ATTEMPT_WINDOW_MS) {
    all[key] = { count: 1, firstAttemptAt: now };
  } else {
    all[key] = { count: existing.count + 1, firstAttemptAt: existing.firstAttemptAt };
  }
  localStorage.setItem(ADMIN_ATTEMPTS_KEY, JSON.stringify(all));
};

const clearAttempts = (email: string): void => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(ADMIN_ATTEMPTS_KEY);
  if (!stored) return;
  const all: Record<string, AttemptRecord> = JSON.parse(stored);
  delete all[email.toLowerCase()];
  localStorage.setItem(ADMIN_ATTEMPTS_KEY, JSON.stringify(all));
};

const getLockout = (email: string): LockoutRecord | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(ADMIN_LOCKOUT_KEY);
  if (!stored) return null;
  const all: Record<string, LockoutRecord> = JSON.parse(stored);
  return all[email.toLowerCase()] ?? null;
};

const setLockout = (email: string): void => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(ADMIN_LOCKOUT_KEY);
  const all: Record<string, LockoutRecord> = stored ? JSON.parse(stored) : {};
  all[email.toLowerCase()] = { until: Date.now() + LOCKOUT_DURATION_MS };
  localStorage.setItem(ADMIN_LOCKOUT_KEY, JSON.stringify(all));
};

// Login admin (mock) with rate limiting & lockout
export const loginAsAdmin = async (
  email: string,
  password: string
): Promise<AdminAuthResult> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lowerEmail = email.toLowerCase();

  // Check lockout first
  const lockout = getLockout(lowerEmail);
  if (lockout && lockout.until > Date.now()) {
    const minutes = Math.ceil((lockout.until - Date.now()) / 60000);
    return {
      success: false,
      error: `Terlalu banyak percobaan. Coba lagi dalam ${minutes} menit.`,
    };
  }

  // Validate credentials
  let admin: AdminUser | null = null;

  if (lowerEmail === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
    admin = {
      email: DEMO_ADMIN.email,
      password: DEMO_ADMIN.password,
      name: DEMO_ADMIN.name,
      role: "super_admin",
      enable2FA: false,
      createdAt: "Demo",
    };
  } else {
    const admins = getStoredAdmins();
    const found = admins.find(
      (a) => a.email.toLowerCase() === lowerEmail && a.password === password
    );
    if (found) admin = found;
  }

  if (!admin) {
    // Record failure
    recordFailedAttempt(lowerEmail);
    const attempts = getAttempts(lowerEmail);
    if (attempts.count >= MAX_ATTEMPTS) {
      setLockout(lowerEmail);
      return {
        success: false,
        error: `Akun terkunci karena ${MAX_ATTEMPTS} percobaan gagal. Coba lagi dalam 30 menit.`,
      };
    }
    return {
      success: false,
      error: `Email atau password salah. Sisa ${MAX_ATTEMPTS - attempts.count} percobaan.`,
    };
  }

  // If 2FA enabled, signal client to ask for OTP
  if (admin.enable2FA) {
    return { success: false, requires2FA: true, user: admin };
  }

  clearAttempts(lowerEmail);
  return { success: true, user: admin };
};

// Verify 2FA OTP (mock: any 6-digit code accepted, but reject obviously invalid)
export const verifyAdmin2FA = async (
  email: string,
  _otp: string
): Promise<AdminAuthResult> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (!/^\d{6}$/.test(_otp)) {
    return { success: false, error: "Kode verifikasi harus 6 digit angka" };
  }
  // Mock: accept "123456" as valid OTP, others are "kadaluarsa/salah"
  if (_otp !== "123456") {
    return { success: false, error: "Kode verifikasi salah atau kadaluarsa" };
  }

  // Find admin and return success
  const lowerEmail = email.toLowerCase();
  if (lowerEmail === DEMO_ADMIN.email) {
    return {
      success: true,
      user: {
        email: DEMO_ADMIN.email,
        password: DEMO_ADMIN.password,
        name: DEMO_ADMIN.name,
        role: "super_admin",
        enable2FA: true,
        createdAt: "Demo",
      },
    };
  }
  const found = getStoredAdmins().find(
    (a) => a.email.toLowerCase() === lowerEmail
  );
  if (found) return { success: true, user: found };
  return { success: false, error: "Admin tidak ditemukan" };
};

// Save admin session
export const saveAdminSession = (
  admin: AdminUser,
  rememberMe: boolean = false
): void => {
  if (typeof window === "undefined") return;
  const now = Date.now();
  const lifetimeMs = rememberMe ? 24 * 60 * 60 * 1000 : 4 * 60 * 60 * 1000;
  const session: AdminSession = {
    email: admin.email,
    name: admin.name,
    role: admin.role,
    avatarUrl: admin.avatarUrl,
    loggedInAt: new Date(now).toISOString(),
    expiresAt: new Date(now + lifetimeMs).toISOString(),
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const getAdminSession = (): AdminSession | null => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(ADMIN_SESSION_KEY);
  if (!stored) return null;
  try {
    const session: AdminSession = JSON.parse(stored);
    if (new Date(session.expiresAt).getTime() < Date.now()) {
      clearAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

export const clearAdminSession = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const getAdminLockoutRemaining = (email: string): number => {
  const lockout = getLockout(email.toLowerCase());
  if (!lockout) return 0;
  const remaining = lockout.until - Date.now();
  return remaining > 0 ? remaining : 0;
};

export const getAdminFailedAttempts = (email: string): number => {
  return getAttempts(email.toLowerCase()).count;
};

// Register admin (for setup/testing only, not exposed in UI)
export const registerAdmin = async (
  name: string,
  email: string,
  password: string,
  role: AdminRole = "admin"
): Promise<AdminAuthResult> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  if (isAdminEmailTaken(email)) {
    return { success: false, error: "Email admin sudah terdaftar" };
  }
  const newAdmin: AdminUser = {
    email,
    password,
    name,
    role,
    enable2FA: false,
    createdAt: new Date().toISOString(),
  };
  const admins = getStoredAdmins();
  admins.push(newAdmin);
  saveAdmins(admins);
  return { success: true, user: newAdmin };
};