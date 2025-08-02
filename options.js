import { get, set, remove, encryptText, decryptText } from './utils/storage.js';
import {
  UI_FRAMEWORKS,
  STYLE_SYSTEMS,
  SPEECH_ENGINES,
  TRANSLATION_ENGINES,
  STORAGE_METHODS,
  BUNDLERS,
} from './utils/constants.js';

const defaults = {
  theme: 'light',
  panelWidth: 400,
  lang: 'tr',
  notify: 'popup',
  fontSize: 'md',
  usageLimit: 0,
  assistant: '',
  model: 'gpt-3.5-turbo',
  uiFramework: UI_FRAMEWORKS[0],
  styleSystem: STYLE_SYSTEMS[0],
  speechRecognition: SPEECH_ENGINES[0],
  translationEngine: TRANSLATION_ENGINES[0],
  storageMethod: STORAGE_METHODS[0],
  bundler: BUNDLERS[0],
};

let dict = {};

function showMessage(level, text) {
  const container = document.getElementById('options-root');
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
    dict = await res.json();
  } catch (e) {
    console.warn('Dil dosyası yüklenemedi', e);
    if (lang !== 'en') {
      return loadLocale('en');
    }
    dict = {};
  }
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
}

async function applyTheme(theme) {
  document.body.classList.toggle('dark', theme === 'dark');
}

async function restore() {
  if (!document.getElementById('themeSelect')) return;
  const data = await get([
    'theme',
    'panelWidth',
    'agentNilApiKey',
    'lang',
    'notify',
    'fontSize',
    'usageLimit',
    'assistant',
    'model',
    'uiFramework',
    'styleSystem',
    'speechRecognition',
    'translationEngine',
    'storageMethod',
    'bundler',
  ]);

  const theme = data.theme || defaults.theme;
  document.getElementById('themeSelect').value = theme;
  applyTheme(theme);

  document.getElementById('panelWidth').value = data.panelWidth || defaults.panelWidth;

  if (data.agentNilApiKey) {
    try {
      const plain = await decryptText(data.agentNilApiKey);
      document.getElementById('apiKeyInput').value = plain;
    } catch (e) {
      console.error('API anahtarı çözülemedi', e);
    }
  }

  document.getElementById('langSelect').value = data.lang || defaults.lang;
  document.getElementById('notifySelect').value = data.notify || defaults.notify;
  document.getElementById('fontSize').value = data.fontSize || defaults.fontSize;
  document.getElementById('usageLimit').value = data.usageLimit || defaults.usageLimit;
  document.getElementById('assistantInput').value = data.assistant || '';
  document.getElementById('modelSelect').value = data.model || defaults.model;

  const manifest = chrome.runtime.getManifest();
  document.getElementById('versionInfo').textContent = `v${manifest.version}`;

  await loadLocale(data.lang || defaults.lang);
  populateDynamicSelects(data);
}

async function saveSettings(notifyBackground = false) {
  const theme = document.getElementById('themeSelect').value;
  const panelWidth = parseInt(document.getElementById('panelWidth').value, 10);
  const lang = document.getElementById('langSelect').value;
  const notify = document.getElementById('notifySelect').value;
  const fontSize = document.getElementById('fontSize').value;
  const usageLimit = parseInt(document.getElementById('usageLimit').value, 10) || 0;
  const assistant = document.getElementById('assistantInput').value.trim();
  const model = document.getElementById('modelSelect').value;
  const uiFramework = document.getElementById('uiFrameworkSelect').value;
  const styleSystem = document.getElementById('styleSystemSelect').value;
  const speechRecognition = document.getElementById('speechRecognitionSelect').value;
  const translationEngine = document.getElementById('translationEngineSelect').value;
  const storageMethod = document.getElementById('storageMethodSelect').value;
  const bundler = document.getElementById('bundlerSelect').value;

  const items = {
    theme,
    panelWidth,
    lang,
    notify,
    fontSize,
    usageLimit,
    assistant,
    model,
    uiFramework,
    styleSystem,
    speechRecognition,
    translationEngine,
    storageMethod,
    bundler,
  };

  const key = document.getElementById('apiKeyInput').value.trim();
  if (key) {
    const encrypted = await encryptText(key);
    const expiry = Date.now() + 30 * 24 * 60 * 60 * 1000;
    items.agentNilApiKey = encrypted;
    items.agentNilApiKeyExpiration = expiry;
  }

  await set(items);
  showMessage('success', dict.settingsSaved || 'Settings saved');
  if (notifyBackground) {
    chrome.runtime.sendMessage({ action: 'settingsUpdated', payload: items });
  }
}

function bindAutoSave(id, handler) {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', handler);
}

bindAutoSave('themeSelect', () => {
  saveSettings();
  applyTheme(document.getElementById('themeSelect').value);
});
bindAutoSave('panelWidth', () => saveSettings());
bindAutoSave('langSelect', () => {
  saveSettings();
  loadLocale(document.getElementById('langSelect').value).then(() => populateDynamicSelects());
});
bindAutoSave('notifySelect', () => saveSettings());
bindAutoSave('fontSize', () => saveSettings());
bindAutoSave('usageLimit', () => saveSettings());
bindAutoSave('assistantInput', () => saveSettings());
bindAutoSave('modelSelect', () => saveSettings());
bindAutoSave('uiFrameworkSelect', () => saveSettings());
bindAutoSave('styleSystemSelect', () => saveSettings());
bindAutoSave('speechRecognitionSelect', () => saveSettings());
bindAutoSave('translationEngineSelect', () => saveSettings());
bindAutoSave('storageMethodSelect', () => saveSettings());
bindAutoSave('bundlerSelect', () => saveSettings());

const saveBtn = document.getElementById('saveBtn');
if (saveBtn) saveBtn.addEventListener('click', () => saveSettings(true));

const resetBtn = document.getElementById('resetBtn');
if (resetBtn) resetBtn.addEventListener('click', async () => {
  await remove([
    'theme',
    'panelWidth',
    'agentNilApiKey',
    'agentNilApiKeyExpiration',
    'lang',
    'notify',
    'fontSize',
    'usageLimit',
    'assistant',
    'model',
    'uiFramework',
    'styleSystem',
    'speechRecognition',
    'translationEngine',
    'storageMethod',
    'bundler',
  ]);
  await restore();
  chrome.runtime.sendMessage({ action: 'settingsUpdated' });
  showMessage('success', dict.settingsReset || 'Settings reset');
});

const clearHistoryBtn = document.getElementById('clearHistory');
if (clearHistoryBtn) clearHistoryBtn.addEventListener('click', async () => {
  await remove(['chatHistory']);
  showMessage('info', dict.historyCleared || 'History cleared');
});

if (document.readyState !== 'loading') {
  restore();
} else {
  window.addEventListener('DOMContentLoaded', () => restore());
}

function populateSelectOptions(id, options, currentValue) {
  const select = document.getElementById(id);
  const value = currentValue || select.value;
  select.innerHTML = '';
  options.forEach((opt) => {
    const o = document.createElement('option');
    o.value = opt;
    o.textContent = dict[opt] || opt;
    select.appendChild(o);
  });
  select.value = value;
}

function populateDynamicSelects(data = {}) {
  populateSelectOptions('uiFrameworkSelect', UI_FRAMEWORKS, data.uiFramework || defaults.uiFramework);
  populateSelectOptions('styleSystemSelect', STYLE_SYSTEMS, data.styleSystem || defaults.styleSystem);
  populateSelectOptions('speechRecognitionSelect', SPEECH_ENGINES, data.speechRecognition || defaults.speechRecognition);
  populateSelectOptions('translationEngineSelect', TRANSLATION_ENGINES, data.translationEngine || defaults.translationEngine);
  populateSelectOptions('storageMethodSelect', STORAGE_METHODS, data.storageMethod || defaults.storageMethod);
  populateSelectOptions('bundlerSelect', BUNDLERS, data.bundler || defaults.bundler);
}
function __setDict(d) { dict = d; }
export { loadLocale, saveSettings, populateDynamicSelects, __setDict };
