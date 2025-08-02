import React, { useState, useEffect, createContext, useCallback } from 'react';
import * as storage from '../utils/storage.js';
import {
  STORAGE_KEYS,
  DEFAULT_ASSISTANT_ID,
  DEFAULT_MODEL,
  NOTIFICATION_TYPES,
  ERROR_MESSAGES,
} from '../utils/constants.js';
import LoadingSpinner from './LoadingSpinner.js'; // Örnek bir yükleme bileşeni

// 1. Modüler Yapı: Dışa aktarılabilir bir Context nesnesi oluşturulur.
export const AgentNilContext = createContext();

/**
 * Bu bileşen, uygulamanın tüm global durumunu yöneten bir Context Provider'ıdır.
 * Depolama (storage) ile durumu senkronize eder ve tüm alt bileşenlere erişim sağlar.
 * @param {{ children: React.ReactNode }} props - React çocuk bileşenleri.
 */
export const AgentNilProvider = ({ children }) => {
  // 15. İşlevsellik: Tüm global durumlar için useState kullanılır.
  const [isStorageLoaded, setIsStorageLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeyExpiration, setApiKeyExpiration] = useState(0);
  const [selectedAssistantId, setSelectedAssistantId] = useState(DEFAULT_ASSISTANT_ID);
  const [selectedLanguage, setSelectedLanguage] = useState('tr-TR');
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [chatHistory, setChatHistory] = useState({});
  const [currentChatId, setCurrentChatId] = useState('default_chat');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('chat');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  // Tüm callback fonksiyonları performans için useCallback ile memoize edilir.
  const addNotification = useCallback((message, type = NOTIFICATION_TYPES.INFO, duration = 3000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, duration);
  }, []);

  const addMessageToHistory = useCallback((chatId, sender, message) => {
    setChatHistory(prevHistory => {
      const updatedChat = prevHistory[chatId] ? [...prevHistory[chatId], { sender, message, timestamp: Date.now() }] : [{ sender, message, timestamp: Date.now() }];
      return { ...prevHistory, [chatId]: updatedChat };
    });
  }, []);

  const openModal = useCallback((title, message, onConfirm) => {
    setModalContent({ title, message, onConfirm });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalContent({});
  }, []);

  // 15. Talimat: Başlangıçta depolamadan verileri asenkron olarak yükler.
  // 18. Talimat: useEffect'in bağımlılıkları doğru ayarlanmıştır.
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const loadedData = await storage.get(Object.values(STORAGE_KEYS));
        setApiKey(loadedData[STORAGE_KEYS.API_KEY] || '');
        setApiKeyExpiration(loadedData[STORAGE_KEYS.API_KEY_EXPIRATION] || 0);
        setSelectedAssistantId(loadedData[STORAGE_KEYS.SELECTED_ASSISTANT_ID] || DEFAULT_ASSISTANT_ID);
        setSelectedLanguage(loadedData[STORAGE_KEYS.SELECTED_LANGUAGE] || 'tr-TR');
        setSelectedModel(loadedData[STORAGE_KEYS.SELECTED_MODEL] || DEFAULT_MODEL);
        setChatHistory(loadedData[STORAGE_KEYS.CHAT_HISTORY] || {});
        setCurrentChatId(loadedData[STORAGE_KEYS.CURRENT_CHAT_ID] || 'default_chat');
      } catch (e) {
        // 17. Hata Yönetimi: Depolama hatası yakalanır ve bildirilir.
        console.error("Başlangıç verileri yüklenirken hata oluştu:", e);
        addNotification(ERROR_MESSAGES.STORAGE_READ_ERROR, NOTIFICATION_TYPES.ERROR);
      } finally {
        setIsStorageLoaded(true);
      }
    };
    loadInitialData();
  }, [addNotification]);

  // 16. Talimat: Durum değiştiğinde veriyi depolamaya asenkron olarak kaydeder.
  // 18. Talimat: Bağımlılıklar doğru ayarlanmıştır.
  useEffect(() => {
    if (!isStorageLoaded) return;

    const dataToSave = {
      [STORAGE_KEYS.API_KEY]: apiKey,
      [STORAGE_KEYS.API_KEY_EXPIRATION]: apiKeyExpiration,
      [STORAGE_KEYS.SELECTED_ASSISTANT_ID]: selectedAssistantId,
      [STORAGE_KEYS.SELECTED_LANGUAGE]: selectedLanguage,
      [STORAGE_KEYS.SELECTED_MODEL]: selectedModel,
      [STORAGE_KEYS.CHAT_HISTORY]: chatHistory,
      [STORAGE_KEYS.CURRENT_CHAT_ID]: currentChatId,
    };

    storage.set(dataToSave).catch(e => {
      console.error("Veriler depolamaya kaydedilirken hata oluştu:", e);
      addNotification(ERROR_MESSAGES.STORAGE_WRITE_ERROR, NOTIFICATION_TYPES.ERROR);
    });
  }, [isStorageLoaded, apiKey, apiKeyExpiration, selectedAssistantId, selectedLanguage, selectedModel, chatHistory, currentChatId, addNotification]);

  // Context değerleri
  const contextValue = {
    apiKey, setApiKey,
    apiKeyExpiration, setApiKeyExpiration,
    selectedAssistantId, setSelectedAssistantId,
    selectedLanguage, setSelectedLanguage,
    selectedModel, setSelectedModel,
    chatHistory, setChatHistory,
    currentChatId, setCurrentChatId,
    notifications, addNotification,
    addMessageToHistory,
    activeTab, setActiveTab,
    isModalOpen, openModal, closeModal, modalContent
  };

  // 2. Talimat: Yükleme tamamlanana kadar LoadingSpinner gösterilir.
  if (!isStorageLoaded) {
    return <LoadingSpinner />;
  }

  // 1. Modüler Yapı: Context Provider'ı ile çocuk bileşenleri sarmalanır.
  return (
    <AgentNilContext.Provider value={contextValue}>
      {children}
    </AgentNilContext.Provider>
  );
};

export default AgentNilProvider;
