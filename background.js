import { get, set, decryptText } from './utils/storage.js';

const API_ALARM = 'agent-nil-api-check';
const CHECK_INTERVAL_MINUTES = 60;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getApiKey() {
  const { agentNilApiKey } = await get(['agentNilApiKey']);
  if (!agentNilApiKey) {
    return '';
  }
  try {
    return await decryptText(agentNilApiKey);
  } catch (e) {
    console.error('API anahtarı çözülemedi', e);
    return '';
  }
}

async function checkApiKey() {
  try {
    const { agentNilApiKeyExpiration } = await get(['agentNilApiKeyExpiration']);
    const apiKey = await getApiKey();
    if (!apiKey || (agentNilApiKeyExpiration && Date.now() > agentNilApiKeyExpiration)) {
      chrome.runtime.sendMessage({ type: 'notify', level: 'warning', message: 'API anahtarı yok veya süresi dolmuş.' });
    }
  } catch (e) {
    console.error('API anahtar kontrolü başarısız', e);
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create(API_ALARM, { periodInMinutes: CHECK_INTERVAL_MINUTES });
  checkApiKey();
});

chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create(API_ALARM, { periodInMinutes: CHECK_INTERVAL_MINUTES });
  checkApiKey();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === API_ALARM) {
    checkApiKey();
  }
});

async function callApi({ endpoint, payload, retries = 2 }) {
  const { usage = 0, usageLimit } = await get(['usage', 'usageLimit']);
  const apiKey = await getApiKey();
  if (!apiKey) {
    throw new Error('API anahtarı yok veya geçersiz.');
  }
  if (usageLimit && usage >= usageLimit) {
    throw new Error('API kullanım limiti aşıldı.');
  }

  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(`https://api.openai.com/v1/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || res.statusText);
      }
      await set({ usage: usage + 1 });
      return { data };
    } catch (err) {
      if (i === retries) {
        throw err;
      }
      await sleep(2 ** i * 700);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  (async () => {
    try {
      if (request.action === 'callApi') {
        const result = await callApi(request.payload);
        sendResponse(result);
      } else if (request.action === 'insertText') {
        chrome.tabs.sendMessage(
          sender.tab.id,
          { action: 'insertText', text: request.payload.text },
          sendResponse,
        );
      } else if (request.action === 'broadcast') {
        const tabs = await chrome.tabs.query({});
        tabs.forEach((t) => chrome.tabs.sendMessage(t.id, request.payload));
        sendResponse({ ok: true });
      } else if (request.action === 'getStatus') {
        const data = await get([
          'usage',
          'usageLimit',
          'agentNilApiKeyExpiration',
          'assistant',
          'model',
        ]);
        sendResponse({
          usage: data.usage || 0,
          usageLimit: data.usageLimit,
          expiration: data.agentNilApiKeyExpiration,
          assistant: data.assistant,
          model: data.model,
        });
      } else if (request.action === 'settingsUpdated') {
        sendResponse({ ok: true });
      } else {
        sendResponse({ error: 'Bilinmeyen eylem' });
      }
    } catch (err) {
      chrome.runtime.sendMessage({ type: 'notify', level: 'error', message: err.message });
      sendResponse({ error: err.message });
    }
  })();
  return true;
});
