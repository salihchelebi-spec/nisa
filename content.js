// Content script for WhatsApp Web integration
// Listens for extension messages and injects text into the chat box

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 500;

function log(...args) {
  console.log('[AgentNil content]', ...args);
}

function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.textContent;
}

function queryBox() {
  return document.querySelector('[contenteditable="true"][role="textbox"]');
}

async function getMessageBox() {
  for (let i = 0; i < MAX_RETRIES; i++) {
    const box = queryBox();
    if (box) return box;
    await new Promise((r) => setTimeout(r, RETRY_INTERVAL_MS));
  }
  throw new Error('Mesaj kutusu bulunamadı.');
}

function pasteText(target, text) {
  const dataTransfer = new DataTransfer();
  dataTransfer.setData('text/plain', text);
  const event = new ClipboardEvent('paste', {
    clipboardData: dataTransfer,
    bubbles: true,
    cancelable: true,
  });
  target.dispatchEvent(event);
}

async function insertText({ text, maxChars }) {
  const box = await getMessageBox();
  const clean = sanitize(text);
  if (maxChars && clean.length > maxChars) {
    throw new Error('Karakter limiti aşıldı.');
  }
  box.focus();
  pasteText(box, clean);
  box.dispatchEvent(new InputEvent('input', { bubbles: true }));
  try {
    await navigator.clipboard.writeText(clean);
  } catch (e) {
    log('Kopyalama başarısız', e);
  }
  return { inserted: true };
}

async function copyToClipboard({ text }) {
  const clean = sanitize(text);
  await navigator.clipboard.writeText(clean);
  return { copied: true };
}

function updateLanguage({ lang }) {
  document.documentElement.lang = lang || 'en';
  return { ok: true };
}

const handlers = {
  insertText,
  copyToClipboard,
  updateLanguage,
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return;
  const handler = handlers[request.action];
  if (!handler) {
    sendResponse({ error: 'Bilinmeyen eylem' });
    return;
  }
  (async () => {
    try {
      const res = await handler(request.payload || {});
      sendResponse({ ok: true, ...res });
    } catch (err) {
      log('İşlem hatası', err);
      sendResponse({ error: err.message });
    }
  })();
  return true;
});

log('Content script yüklendi');
