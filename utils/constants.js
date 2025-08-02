export const STORAGE_KEYS = {
  API_KEY: 'apiKey',
  API_KEY_EXPIRATION: 'apiKeyExpiration',
  SELECTED_ASSISTANT_ID: 'selectedAssistantId',
  SELECTED_LANGUAGE: 'selectedLanguage',
  SELECTED_MODEL: 'selectedModel',
  CHAT_HISTORY: 'chatHistory',
  CURRENT_CHAT_ID: 'currentChatId'
};

export const DEFAULT_ASSISTANT_ID = 'assistant_default';
export const DEFAULT_MODEL = 'gpt-3.5-turbo';

export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

export const ERROR_MESSAGES = {
  STORAGE_READ_ERROR: 'Storage read error',
  STORAGE_WRITE_ERROR: 'Storage write error'
};

export const UI_FRAMEWORKS = ['react', 'svelte'];
export const STYLE_SYSTEMS = ['tailwind', 'sass', 'styledComponents'];
export const SPEECH_ENGINES = ['webSpeechApi', 'openaiWhisper'];
export const TRANSLATION_ENGINES = ['openaiGpt', 'google', 'deepl', 'microsoft'];
export const STORAGE_METHODS = ['chromeStorage', 'indexedDb', 'localStorage'];
export const BUNDLERS = ['vite', 'webpack'];
