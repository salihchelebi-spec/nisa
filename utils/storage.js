const DEBUG = false;

function log(...args) {
  if (DEBUG) console.log('[storage]', ...args); // eslint-disable-line no-console
}

const hasChrome = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local;

// ---- Backend abstraction ----
const chromeBackend = {
  get: (keys) => new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(keys, (items) => {
        const err = chrome.runtime.lastError;
        if (err) reject(err);
        else resolve(items || {});
      });
    } catch (e) {
      reject(e);
    }
  }),
  set: (items) => new Promise((resolve, reject) => {
    try {
      chrome.storage.local.set(items, () => {
        const err = chrome.runtime.lastError;
        if (err) reject(err);
        else resolve();
      });
    } catch (e) {
      reject(e);
    }
  }),
  remove: (keys) => new Promise((resolve, reject) => {
    try {
      chrome.storage.local.remove(keys, () => {
        const err = chrome.runtime.lastError;
        if (err) reject(err);
        else resolve();
      });
    } catch (e) {
      reject(e);
    }
  }),
  clear: () => new Promise((resolve, reject) => {
    try {
      chrome.storage.local.clear(() => {
        const err = chrome.runtime.lastError;
        if (err) reject(err);
        else resolve();
      });
    } catch (e) {
      reject(e);
    }
  }),
  getAll() {
    return this.get(null);
  },
  bytesInUse: (keys = null) => new Promise((resolve, reject) => {
    try {
      chrome.storage.local.getBytesInUse(keys, (bytes) => {
        const err = chrome.runtime.lastError;
        if (err) reject(err);
        else resolve(bytes);
      });
    } catch (e) {
      reject(e);
    }
  }),
};

const localBackend = {
  async get(keys) {
    const result = {};
    const arr = keys === null ? Object.keys(localStorage) : (Array.isArray(keys) ? keys : [keys]);
    arr.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v !== null) result[k] = v;
    });
    return result;
  },
  async set(items) {
    Object.entries(items).forEach(([k, v]) => {
      localStorage.setItem(k, v);
    });
  },
  async remove(keys) {
    const arr = Array.isArray(keys) ? keys : [keys];
    arr.forEach((k) => localStorage.removeItem(k));
  },
  async clear() {
    localStorage.clear();
  },
  async getAll() {
    const out = {};
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      out[k] = localStorage.getItem(k);
    }
    return out;
  },
  async bytesInUse() {
    let total = 0;
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      const v = localStorage.getItem(k) || '';
      total += k.length + v.length;
    }
    return total;
  },
};

const backend = hasChrome ? chromeBackend : localBackend;

// ---- Helpers ----
function serialize(val) {
  return JSON.stringify(val);
}

function parse(val) {
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}

// ---- Public API ----
export async function get(keys, defaults = {}) {
  const arr = Array.isArray(keys) ? keys : [keys];
  const raw = await backend.get(arr);
  const result = {};
  arr.forEach((k) => {
    result[k] = raw[k] !== undefined ? parse(raw[k]) : defaults[k];
  });
  return Array.isArray(keys) ? result : result[arr[0]];
}

async function ensureCapacity(items) {
  if (!hasChrome) return;
  const current = await backend.bytesInUse();
  const incoming = new TextEncoder().encode(JSON.stringify(items)).length;
  const LIMIT = 5 * 1024 * 1024; // 5MB default Chrome quota
  if (current + incoming > LIMIT) {
    throw new Error('Storage quota exceeded');
  }
}

export async function set(items) {
  const serialized = {};
  Object.entries(items).forEach(([k, v]) => {
    serialized[k] = serialize(v);
  });
  await ensureCapacity(serialized);
  await backend.set(serialized);
  fireChange(items);
}

export async function remove(keys, confirmFn) {
  if (confirmFn && !(await confirmFn())) return false;
  await backend.remove(keys);
  fireChange({});
  return true;
}

export async function clear(confirmFn) {
  if (confirmFn && !(await confirmFn())) return false;
  await backend.clear();
  fireChange({});
  return true;
}

export async function exportData() {
  const raw = await backend.getAll();
  const out = {};
  Object.entries(raw).forEach(([k, v]) => {
    out[k] = parse(v);
  });
  return out;
}

export async function importData(data) {
  await set(data);
}

export async function backup() {
  return exportData();
}

// ---- Session storage ----
const sessionStore = new Map();

export const session = {
  get: (k, def = undefined) => (sessionStore.has(k) ? sessionStore.get(k) : def),
  set: (k, v) => {
    sessionStore.set(k, v);
  },
  remove: (k) => {
    sessionStore.delete(k);
  },
  clear: () => {
    sessionStore.clear();
  },
};

// ---- Events ----
const listeners = new Set();

export function onChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function fireChange(changes) {
  listeners.forEach((fn) => {
    try {
      fn(changes);
    } catch (e) {
      log('listener error', e);
    }
  });
}

if (hasChrome) {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local') {
      const parsed = {};
      Object.keys(changes).forEach((k) => {
        parsed[k] = parse(changes[k].newValue);
      });
      fireChange(parsed);
    }
  });
}

// ---- Encryption Helpers ----
const ENC_KEY = 'agentNilEncKey';

async function ensureKey() {
  const stored = await get(ENC_KEY);
  if (stored) {
    const raw = Uint8Array.from(atob(stored), (c) => c.charCodeAt(0));
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', true, ['encrypt', 'decrypt']);
  }
  const raw = crypto.getRandomValues(new Uint8Array(16));
  await set({ [ENC_KEY]: btoa(String.fromCharCode(...raw)) });
  return crypto.subtle.importKey('raw', raw, 'AES-GCM', true, ['encrypt', 'decrypt']);
}

export async function encryptText(text) {
  const key = await ensureKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(text);
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return {
    data: btoa(String.fromCharCode(...new Uint8Array(cipher))),
    iv: btoa(String.fromCharCode(...iv)),
  };
}

export async function decryptText(cipher) {
  const key = await ensureKey();
  const data = Uint8Array.from(atob(cipher.data), (c) => c.charCodeAt(0));
  const iv = Uint8Array.from(atob(cipher.iv), (c) => c.charCodeAt(0));
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
  return new TextDecoder().decode(plain);
}

export async function setSecure(key, plain) {
  const cipher = await encryptText(plain);
  await set({ [key]: cipher });
}

export async function getSecure(key, def = '') {
  const cipher = await get(key);
  if (!cipher) return def;
  try {
    return await decryptText(cipher);
  } catch (e) {
    log('decrypt error', e);
    return def;
  }
}

// allow tests to swap backend
export function __setBackend(b) {
  Object.assign(backend, b);
}

