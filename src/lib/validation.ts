// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) return { isValid: false, error: "Email harus diisi" };
  if (!EMAIL_REGEX.test(email)) return { isValid: false, error: "Format email tidak valid" };
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) return { isValid: false, error: "Kata sandi harus diisi" };
  if (password.length < 6) return { isValid: false, error: "Kata sandi minimal 6 karakter" };
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) return { isValid: false, error: "Nama harus diisi" };
  if (name.trim().length < 2) return { isValid: false, error: "Nama minimal 2 karakter" };
  return { isValid: true };
};

export const validateRegisterPassword = (password: string): ValidationResult => {
  if (!password) return { isValid: false, error: "Kata sandi harus diisi" };
  if (password.length < 8) return { isValid: false, error: "Minimal 8 karakter" };
  return { isValid: true };
};

export const validatePasswordConfirmation = (password: string, confirmation: string): ValidationResult => {
  if (!confirmation) return { isValid: false, error: "Konfirmasi kata sandi harus diisi" };
  if (password !== confirmation) return { isValid: false, error: "Kata sandi tidak cocok" };
  return { isValid: true };
};

export type PasswordStrength = "weak" | "medium" | "strong";

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return "weak";
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/\d/.test(password)) score++;
  if (/[a-zA-Z]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;
  if (score <= 2) return "weak";
  if (score <= 3) return "medium";
  return "strong";
};

export const validateTerms = (accepted: boolean): ValidationResult => {
  if (!accepted) return { isValid: false, error: "Anda harus menyetujui syarat dan ketentuan" };
  return { isValid: true };
};

export interface LoginFormData { email: string; password: string; }
export const validateLoginForm = (data: LoginFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid && emailResult.error) errors.email = emailResult.error;
  const passwordResult = validatePassword(data.password);
  if (!passwordResult.isValid && passwordResult.error) errors.password = passwordResult.error;
  return errors;
};

export interface RegisterFormData {
  name: string; email: string; password: string; confirmPassword: string; terms: boolean;
}
export const validateRegisterForm = (data: RegisterFormData): Record<string, string> => {
  const errors: Record<string, string> = {};
  const nameResult = validateName(data.name);
  if (!nameResult.isValid && nameResult.error) errors.name = nameResult.error;
  const emailResult = validateEmail(data.email);
  if (!emailResult.isValid && emailResult.error) errors.email = emailResult.error;
  const passwordResult = validateRegisterPassword(data.password);
  if (!passwordResult.isValid && passwordResult.error) errors.password = passwordResult.error;
  const confirmResult = validatePasswordConfirmation(data.password, data.confirmPassword);
  if (!confirmResult.isValid && confirmResult.error) errors.confirmPassword = confirmResult.error;
  const termsResult = validateTerms(data.terms);
  if (!termsResult.isValid && termsResult.error) errors.terms = termsResult.error;
  return errors;
};