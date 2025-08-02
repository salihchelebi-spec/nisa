export function sendMessage(message, tabId) {
  return new Promise((resolve, reject) => {
    try {
      const cb = (response) => {
        const err = chrome.runtime.lastError;
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      };
      if (typeof tabId === 'number') {
        chrome.tabs.sendMessage(tabId, message, cb);
      } else {
        chrome.runtime.sendMessage(message, cb);
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function addMessageListener(handler) {
  const listener = (msg, sender, sendResponse) => {
    Promise.resolve(handler(msg, sender))
      .then((res) => {
        if (res !== undefined) {
          sendResponse(res);
        }
      })
      .catch((err) => sendResponse({ error: err.message }));
    return true;
  };
  chrome.runtime.onMessage.addListener(listener);
  return () => chrome.runtime.onMessage.removeListener(listener);
}
