diff --git a/background.js b/background.js
index 208b57b3ac09ed00873828dfc6a968e54d331d89..8eebfad26f872ae7ea697dedb9322c6af2ab56f7 100644
--- a/background.js
+++ b/background.js
@@ -1,44 +1,110 @@
-importScripts('src/utils/constants.js', 'src/utils/storage.js');
-
-chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
-  if (request.action === "callApi") {
-    const { endpoint, payload, retries = 2 } = request.payload;
-    const { agentNilApiKey, agentNilApiKeyExpiration } = await get(["agentNilApiKey", "agentNilApiKeyExpiration"]);
-    if (!agentNilApiKey || (agentNilApiKeyExpiration && Date.now() > agentNilApiKeyExpiration)) {
-      sendResponse({ error: "API anahtarı yok veya süresi dolmuş." });
-      return true;
-    }
-    for (let i = 0; i <= retries; i++) {
-      try {
-        const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
-          method: "POST",
-          headers: {
-            "Content-Type": "application/json",
-            "Authorization": `Bearer ${agentNilApiKey}`,
-          },
-          body: JSON.stringify(payload),
-        });
-        const data = await response.json();
-        if (response.ok) {
-          sendResponse({ data });
-          return true;
-        } else {
-          throw new Error(data.error?.message || response.statusText);
-        }
-      } catch (err) {
-        if (i === retries) {
-          sendResponse({ error: err.message });
-        }
-        await new Promise(res => setTimeout(res, Math.pow(2, i) * 700));
-      }
-    }
-    return true;
-  }
-  if (request.action === "insertText") {
-    // Forward to content.js
-    chrome.tabs.sendMessage(sender.tab.id, { action: "insertText", text: request.payload.text }, resp => {
-      sendResponse(resp);
-    });
-    return true;
-  }
-});
+import { get, set } from './storage.js';
+
+const API_ALARM = 'agent-nil-api-check';
+const CHECK_INTERVAL_MINUTES = 60;
+
+const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
+const decodeKey = (enc) => {
+  try {
+    return atob(enc);
+  } catch (e) {
+    console.error('API anahtarı çözülemedi', e);
+    return '';
+  }
+};
+
+async function checkApiKey() {
+  try {
+    const { agentNilApiKey, agentNilApiKeyExpiration } = await get([
+      'agentNilApiKey',
+      'agentNilApiKeyExpiration',
+    ]);
+    if (!agentNilApiKey || (agentNilApiKeyExpiration && Date.now() > agentNilApiKeyExpiration)) {
+      chrome.runtime.sendMessage({ type: 'notify', level: 'warning', message: 'API anahtarı yok veya süresi dolmuş.' });
+    }
+  } catch (e) {
+    console.error('API anahtar kontrolü başarısız', e);
+  }
+}
+
+chrome.runtime.onInstalled.addListener(() => {
+  chrome.alarms.create(API_ALARM, { periodInMinutes: CHECK_INTERVAL_MINUTES });
+  checkApiKey();
+});
+
+chrome.runtime.onStartup.addListener(() => {
+  chrome.alarms.create(API_ALARM, { periodInMinutes: CHECK_INTERVAL_MINUTES });
+  checkApiKey();
+});
+
+chrome.alarms.onAlarm.addListener((alarm) => {
+  if (alarm.name === API_ALARM) {
+    checkApiKey();
+  }
+});
+
+async function callApi({ endpoint, payload, retries = 2 }) {
+  const { agentNilApiKey, usage = 0, usageLimit } = await get([
+    'agentNilApiKey',
+    'usage',
+    'usageLimit',
+  ]);
+  const apiKey = decodeKey(agentNilApiKey);
+  if (!apiKey) {
+    throw new Error('API anahtarı yok veya geçersiz.');
+  }
+  if (usageLimit && usage >= usageLimit) {
+    throw new Error('API kullanım limiti aşıldı.');
+  }
+
+  for (let i = 0; i <= retries; i++) {
+    try {
+      const res = await fetch(`https://api.openai.com/v1/${endpoint}`, {
+        method: 'POST',
+        headers: {
+          'Content-Type': 'application/json',
+          Authorization: `Bearer ${apiKey}`,
+        },
+        body: JSON.stringify(payload),
+      });
+      const data = await res.json();
+      if (!res.ok) {
+        throw new Error(data.error?.message || res.statusText);
+      }
+      await set({ usage: usage + 1 });
+      return { data };
+    } catch (err) {
+      if (i === retries) {
+        throw err;
+      }
+      await sleep(2 ** i * 700);
+    }
+  }
+}
+
+chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
+  (async () => {
+    try {
+      if (request.action === 'callApi') {
+        const result = await callApi(request.payload);
+        sendResponse(result);
+      } else if (request.action === 'insertText') {
+        chrome.tabs.sendMessage(
+          sender.tab.id,
+          { action: 'insertText', text: request.payload.text },
+          sendResponse,
+        );
+      } else if (request.action === 'broadcast') {
+        const tabs = await chrome.tabs.query({});
+        tabs.forEach((t) => chrome.tabs.sendMessage(t.id, request.payload));
+        sendResponse({ ok: true });
+      } else {
+        sendResponse({ error: 'Bilinmeyen eylem' });
+      }
+    } catch (err) {
+      chrome.runtime.sendMessage({ type: 'notify', level: 'error', message: err.message });
+      sendResponse({ error: err.message });
+    }
+  })();
+  return true;
+});
