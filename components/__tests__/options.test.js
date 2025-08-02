import {
  loadLocale,
  saveSettings,
  populateDynamicSelects,
  __setDict
} from '../../options.js';
import {
  UI_FRAMEWORKS,
  STYLE_SYSTEMS,
  SPEECH_ENGINES,
  TRANSLATION_ENGINES,
  STORAGE_METHODS,
  BUNDLERS
} from '../../utils/constants.js';
import * as storage from '../../utils/storage.js';

jest.mock('../../utils/storage.js', () => ({
  get: jest.fn().mockResolvedValue({}),
  set: jest.fn(),
  remove: jest.fn(),
  encryptText: jest.fn(),
  decryptText: jest.fn()
}));

global.chrome = { runtime: { getURL: (p) => p, sendMessage: jest.fn() } };

test('loadLocale updates elements', async () => {
  global.fetch = jest.fn().mockResolvedValue({ json: async () => ({ hello: 'Merhaba' }) });
  document.body.innerHTML = '<p data-i18n="hello"></p>';
  await loadLocale('tr');
  expect(document.querySelector('[data-i18n="hello"]').textContent).toBe('Merhaba');
});

test('saveSettings encrypts api key and persists', async () => {
  const { set, encryptText } = storage;
  encryptText.mockResolvedValue({ data: 'enc', iv: 'iv' });
  document.body.innerHTML = `
    <div id="options-root"></div>
    <select id="themeSelect"><option value="light">light</option></select>
    <input id="panelWidth" value="500" />
    <select id="langSelect"><option value="en">en</option></select>
    <select id="notifySelect"><option value="popup">popup</option></select>
    <select id="fontSize"><option value="md">md</option></select>
    <input id="usageLimit" value="5" />
    <input id="assistantInput" value="asst" />
    <select id="modelSelect"><option value="gpt-3.5-turbo">gpt-3.5-turbo</option></select>
    <select id="uiFrameworkSelect"><option value="${UI_FRAMEWORKS[0]}">${UI_FRAMEWORKS[0]}</option></select>
    <select id="styleSystemSelect"><option value="${STYLE_SYSTEMS[0]}">${STYLE_SYSTEMS[0]}</option></select>
    <select id="speechRecognitionSelect"><option value="${SPEECH_ENGINES[0]}">${SPEECH_ENGINES[0]}</option></select>
    <select id="translationEngineSelect"><option value="${TRANSLATION_ENGINES[0]}">${TRANSLATION_ENGINES[0]}</option></select>
    <select id="storageMethodSelect"><option value="${STORAGE_METHODS[0]}">${STORAGE_METHODS[0]}</option></select>
    <select id="bundlerSelect"><option value="${BUNDLERS[0]}">${BUNDLERS[0]}</option></select>
    <input id="apiKeyInput" value="abc" />
  `;
  __setDict({});
  await saveSettings(true);
  expect(encryptText).toHaveBeenCalledWith('abc');
  expect(set).toHaveBeenCalled();
  expect(chrome.runtime.sendMessage).toHaveBeenCalled();
});

test('populateDynamicSelects fills selects from constants', () => {
  document.body.innerHTML = `
    <select id="uiFrameworkSelect"></select>
    <select id="styleSystemSelect"></select>
    <select id="speechRecognitionSelect"></select>
    <select id="translationEngineSelect"></select>
    <select id="storageMethodSelect"></select>
    <select id="bundlerSelect"></select>
  `;
  __setDict({});
  populateDynamicSelects();
  expect(document.getElementById('uiFrameworkSelect').options).toHaveLength(UI_FRAMEWORKS.length);
  expect(document.getElementById('bundlerSelect').options).toHaveLength(BUNDLERS.length);
});
