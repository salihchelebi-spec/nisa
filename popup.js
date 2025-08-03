
import { get, set, encryptText, decryptText } from './utils/storage.js';
import { sendMessage, addMessageListener } from './utils/messaging.js';
import { applyTheme } from './utils/theme.js';

let localeDict = {};

function showMessage(level, text) {
  const container = document.getElementById('popup-root');
  const div = document.createElement('div');
  const base = 'p-2 text-sm rounded mb-2';
  const styles = {
    success: 'bg-green-600 text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-600 text-white',
  };
  div.className = `${base} ${styles[level] || styles.info}`;
  div.textContent = text;
  container.prepend(div);
  setTimeout(() => div.remove(), 3000);
}

async function loadLocale(lang) {
  try {
    const res = await fetch(chrome.runtime.getURL(`locales/${lang}.json`));
    localeDict = await res.json();
  } catch (e) {
    console.warn('Dil dosyası yüklenemedi', e);
    if (lang !== 'en') {
      return loadLocale('en');
    }
    localeDict = {};
  }
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (localeDict[key]) {
      el.textContent = localeDict[key];
    }
  });
}

async function loadStatus() {
  const status = await sendMessage({ action: 'getStatus' });
  const { agentNilApiKey } = await get(['agentNilApiKey']);
  if (agentNilApiKey) {
    try {
      const plain = await decryptText(agentNilApiKey);
      document.getElementById('apiKeyInput').value = plain;
    } catch (e) {
      console.error('API anahtarı çözülemedi', e);
    }
  }
  const usageText = `${status.usage ?? 0}${status.usageLimit ? '/' + status.usageLimit : ''}`;
  let extra = '';
  if (status.expiration) {
    const remaining = Math.max(0, status.expiration - Date.now());
    const days = Math.ceil(remaining / (1000 * 60 * 60 * 24));
    extra = ` - ${days}g`;
  }
  document.getElementById('usageInfo').textContent = `${localeDict.usage}: ${usageText}${extra}`;
  document.getElementById('assistantInfo').textContent = `${localeDict.assistant}: ${status.assistant || '-'} (${status.model || '-'})`;
}

async function init() {
  const { lang = 'tr' } = await get(['lang']);
  await applyTheme();
  await loadLocale(lang);
  document.getElementById('langSelect').value = lang;
  loadStatus();
}

init();

document.getElementById('saveKey').addEventListener('click', async () => {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (!key) {
    showMessage('error', localeDict.apiKeyRequired || 'API key cannot be empty');
    return;
  }
  try {
    const encrypted = await encryptText(key);
    const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
    await set({ agentNilApiKey: encrypted, agentNilApiKeyExpiration: expiry });
    showMessage('success', localeDict.apiKeySaved || 'API key saved');
    await sendMessage({ type: 'notify', level: 'info', message: localeDict.apiKeyUpdated || 'API key updated' });
    loadStatus();
  } catch (e) {
    showMessage('error', localeDict.apiKeySaveError || 'API key could not be saved');
  }
});

document.getElementById('openPanel').addEventListener('click', () => {
  sendMessage({ action: 'openSidePanel', payload: { tab: 'messaging' } });
});

document.getElementById('openSettings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

document.getElementById('langSelect').addEventListener('change', async (e) => {
  await set({ lang: e.target.value });
  loadLocale(e.target.value);
});

addMessageListener((msg) => {
  if (msg && msg.type === 'notify') {
    showMessage(msg.level, msg.message);
  }
});