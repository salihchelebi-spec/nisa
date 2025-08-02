import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPanel from '../SettingsPanel.js';
import { UI_FRAMEWORKS } from '../../utils/constants.js';

const locale = {
  settings: 'settings',
  theme: 'theme',
  light: 'light',
  dark: 'dark',
  highContrast: 'contrast',
  notification: 'notification',
  popup: 'popup',
  banner: 'banner',
  silent: 'silent',
  uiFramework: 'uiFramework',
  styleSystem: 'styleSystem',
  speechRecognition: 'speechRecognition',
  translationEngine: 'translationEngine',
  storageMethod: 'storageMethod',
  bundler: 'bundler',
  react: 'React',
  svelte: 'Svelte',
  tailwind: 'Tailwind',
  sass: 'Sass',
  styledComponents: 'Styled Components',
  webSpeechApi: 'Web Speech API',
  openaiWhisper: 'OpenAI Whisper',
  openaiGpt: 'OpenAI GPT',
  google: 'Google',
  deepl: 'DeepL',
  microsoft: 'Microsoft',
  chromeStorage: 'Chrome Storage',
  indexedDb: 'IndexedDB',
  localStorage: 'localStorage',
  vite: 'Vite',
  webpack: 'Webpack'
};

const baseSettings = {
  theme: 'light',
  notify: 'popup',
  uiFramework: UI_FRAMEWORKS[0],
  styleSystem: 'tailwind',
  speechRecognition: 'webSpeechApi',
  translationEngine: 'openaiGpt',
  storageMethod: 'chromeStorage',
  bundler: 'vite'
};

test('renders framework options from constants and updates on change', () => {
  const handle = jest.fn();
  render(<SettingsPanel locale={locale} settings={baseSettings} onChange={handle} />);
  const select = screen.getByLabelText('uiFramework');
  expect(select.options).toHaveLength(UI_FRAMEWORKS.length);
  fireEvent.change(select, { target: { value: UI_FRAMEWORKS[1] } });
  expect(handle).toHaveBeenCalledWith({ ...baseSettings, uiFramework: UI_FRAMEWORKS[1] });
});
