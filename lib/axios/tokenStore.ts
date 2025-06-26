// Token storage and pub/sub for auth tokens
// Handles in-memory, localStorage sync, and notifies subscribers on change

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

// In-memory token store
let tokens: AuthTokens | undefined = undefined;

// Subscribers to token changes
type Subscriber = (tokens?: AuthTokens) => void;

const subscribers = new Set<Subscriber>();

// LocalStorage key
const STORAGE_KEY = 'auth_tokens';

// Load tokens from localStorage on init
if (typeof window !== 'undefined') {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      tokens = JSON.parse(raw);
    } catch {}
  }
}

function notify() {
  for (const cb of subscribers) {
    cb(tokens);
  }
}

export function setTokens(newTokens: AuthTokens) {
  tokens = newTokens;
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTokens));
  }
  notify();
}

export function clearTokens() {
  tokens = undefined;
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  notify();
}

export function getTokens(): AuthTokens | undefined {
  return tokens;
}

export function onAuthChange(cb: Subscriber): () => void {
  subscribers.add(cb);
  // Call immediately with current tokens
  cb(tokens);
  return () => {
    subscribers.delete(cb);
  };
}

// Listen to localStorage changes (multi-tab sync)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      if (e.newValue) {
        try {
          tokens = JSON.parse(e.newValue);
        } catch {
          tokens = undefined;
        }
      } else {
        tokens = undefined;
      }
      notify();
    }
  });
}

// TODO: Optionally, add encryption for localStorage if needed.
