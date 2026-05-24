// Mock user data for demo
const DEMO_USER = {
  email: "demo@cretechin.id",
  password: "demo123",
  name: "Demo User",
};

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