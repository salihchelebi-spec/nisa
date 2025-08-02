const ADMIN_USERNAME = 'scelebi';
const ADMIN_PASSWORD = '970901001';
const TOKEN_KEY = 'adminSession';
const MONTH_MS = 30 * 24 * 60 * 60 * 1000;

export function isAuthenticated() {
  const raw = localStorage.getItem(TOKEN_KEY);
  if (!raw) return false;
  try {
    const { token, expires } = JSON.parse(raw);
    if (!token || Date.now() > expires) {
      logout();
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

export async function login(username, password) {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = btoa(crypto.randomUUID());
    const expires = Date.now() + MONTH_MS;
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expires }));
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
}
