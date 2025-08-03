
import React from 'react';
import { createRoot } from 'react-dom/client';
import { get } from './utils/storage.js';
import { SidePanel } from './components/index.js';

async function loadLocale(lang) {
  try {
    const res = await fetch(chrome.runtime.getURL(`locales/${lang}.json`));
    return await res.json();
  } catch {
    const res = await fetch(chrome.runtime.getURL('locales/en.json'));
    return await res.json();
  }
}

async function init() {
  const { lang = 'tr' } = await get(['lang']);
  const locale = await loadLocale(lang);
  createRoot(document.getElementById('root')).render(<SidePanel locale={locale} />);
}

init();