export const DEMO_EMAIL = "demo@cfn.news";
export const DEMO_PASSWORD = "demo";
const KEY = "cfn-demo-auth";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  try { return localStorage.getItem(KEY) === "true"; } catch { return false; }
}

export function loginDemo(email: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  const ok = email === DEMO_EMAIL && password === DEMO_PASSWORD;
  if (ok) localStorage.setItem(KEY, "true");
  return ok;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  try { localStorage.removeItem(KEY); } catch {}
}
