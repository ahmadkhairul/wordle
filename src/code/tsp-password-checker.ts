export function isValidPassword(password: string) {
  if (password.length < 7 || password.length > 34) {
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    return false;
  }

  if (!/\d/.test(password)) {
    return false;
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }

  if (/password/i.test(password)) {
    return false;
  }

  return true;
}