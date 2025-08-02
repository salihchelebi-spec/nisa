import React from 'react';
import Dropdown from './Dropdown.js';
import {
  UI_FRAMEWORKS,
  STYLE_SYSTEMS,
  SPEECH_ENGINES,
  TRANSLATION_ENGINES,
  STORAGE_METHODS,
  BUNDLERS,
} from '../utils/constants.js';

const buildOptions = (arr, locale) => arr.map((v) => ({ label: locale[v], value: v }));

const SettingsPanel = ({ locale, settings, onChange }) => {
  console.debug('SettingsPanel rendered');
  const handle = (key) => (value) => {
    onChange({ ...settings, [key]: value });
  };
  return (
    <form aria-label={locale.settings} className="space-y-2">
      <Dropdown
        label={locale.theme}
        options={[
          { label: locale.light, value: 'light' },
          { label: locale.dark, value: 'dark' },
          { label: locale.highContrast, value: 'contrast' },
        ]}
        value={settings.theme}
        onChange={handle('theme')}
      />
      <Dropdown
        label={locale.notification}
        options={[
          { label: locale.popup, value: 'popup' },
          { label: locale.banner, value: 'banner' },
          { label: locale.silent, value: 'silent' },
        ]}
        value={settings.notify}
        onChange={handle('notify')}
      />
      <Dropdown
        label={locale.uiFramework}
        options={buildOptions(UI_FRAMEWORKS, locale)}
        value={settings.uiFramework}
        onChange={handle('uiFramework')}
      />
      <Dropdown
        label={locale.styleSystem}
        options={buildOptions(STYLE_SYSTEMS, locale)}
        value={settings.styleSystem}
        onChange={handle('styleSystem')}
      />
      <Dropdown
        label={locale.speechRecognition}
        options={buildOptions(SPEECH_ENGINES, locale)}
        value={settings.speechRecognition}
        onChange={handle('speechRecognition')}
      />
      <Dropdown
        label={locale.translationEngine}
        options={buildOptions(TRANSLATION_ENGINES, locale)}
        value={settings.translationEngine}
        onChange={handle('translationEngine')}
      />
      <Dropdown
        label={locale.storageMethod}
        options={buildOptions(STORAGE_METHODS, locale)}
        value={settings.storageMethod}
        onChange={handle('storageMethod')}
      />
      <Dropdown
        label={locale.bundler}
        options={buildOptions(BUNDLERS, locale)}
        value={settings.bundler}
        onChange={handle('bundler')}
      />
    </form>
  );
};

export default SettingsPanel;

