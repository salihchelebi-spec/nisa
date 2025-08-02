importScripts('src/utils/constants.js', 'src/utils/storage.js');

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "callApi") {
    const { endpoint, payload, retries = 2 } = request.payload;
    const { agentNilApiKey, agentNilApiKeyExpiration } = await get(["agentNilApiKey", "agentNilApiKeyExpiration"]);
    if (!agentNilApiKey || (agentNilApiKeyExpiration && Date.now() > agentNilApiKeyExpiration)) {
      sendResponse({ error: "API anahtarı yok veya süresi dolmuş." });
      return true;
    }
    for (let i = 0; i <= retries; i++) {
      try {
        const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${agentNilApiKey}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (response.ok) {
          sendResponse({ data });
          return true;
        } else {
          throw new Error(data.error?.message || response.statusText);
        }
      } catch (err) {
        if (i === retries) {
          sendResponse({ error: err.message });
        }
        await new Promise(res => setTimeout(res, Math.pow(2, i) * 700));
      }
    }
    return true;
  }
  if (request.action === "insertText") {
    // Forward to content.js
    chrome.tabs.sendMessage(sender.tab.id, { action: "insertText", text: request.payload.text }, resp => {
      sendResponse(resp);
    });
    return true;
  }
});
