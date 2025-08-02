export const get = (keys) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.get(keys, (items) => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  } catch (e) {
    reject(e);
  }
});

export const set = (items) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.set(items, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  } catch (e) {
    reject(e);
  }
});

export const remove = (keys) => new Promise((resolve, reject) => {
  try {
    chrome.storage.local.remove(keys, () => {
      const err = chrome.runtime.lastError;
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  } catch (e) {
    reject(e);
  }
});
