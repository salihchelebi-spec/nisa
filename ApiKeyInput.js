import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AgentNilContext } from '..componentsAgentNilProvider';
import  as storage from '..utilsstorage';
import { 
  STORAGE_KEYS, 
  ERROR_MESSAGES, 
  NOTIFICATION_TYPES,
  VALIDATION_RULES,
  UI_BUTTON_TEXTS,
  UI_FOOTER_TEXTS
} from '..utilsconstants';
import { isExtensionEnvironment } from '..utilshelpers';  Geliştirme ortamı kontrolü için


  Kullanıcıdan OpenAI API anahtarını almayı, geçerlilik süresini yönetmeyi ve depolamaya güvenli bir şekilde kaydetmeyi sağlayan bileşen.
  @returns {React.ReactElement} API anahtar yönetimi arayüzü.
 
export const ApiKeyInput = () = {
   3. Durum Yönetimi Bileşenin kendi durumunu yönetmek için useState kullan.
  const [inputApiKey, setInputApiKey] = useState('');
  const [expirationDays, setExpirationDays] = useState(30);

   4. Bağlam Erişimi Global durum ve fonksiyonlara eriş.
  const { 
    apiKey, 
    setApiKey, 
    apiKeyExpiration, 
    setApiKeyExpiration, 
    addNotification 
  } = useContext(AgentNilContext);

   6. Kalıcılık Bileşen yüklendiğinde storage'dan verileri al.
  useEffect(() = {
    const loadApiKeyData = async () = {
      try {
        const {
          [STORAGE_KEYS.API_KEY] storedKey,
          [STORAGE_KEYS.API_KEY_EXPIRATION] storedExpiration
        } = await storage.get([STORAGE_KEYS.API_KEY, STORAGE_KEYS.API_KEY_EXPIRATION]);
        
         Anahtar varsa input alanını maskele.
        if (storedKey) {
          setInputApiKey('');
        }
        
        setApiKey(storedKey  '');
        setApiKeyExpiration(storedExpiration  0);
      } catch (e) {
        console.error(API anahtarı yüklenirken hata oluştu, e);
        addNotification(ERROR_MESSAGES.STORAGE_READ_ERROR, NOTIFICATION_TYPES.ERROR);
      }
    };
    loadApiKeyData();
  }, [setApiKey, setApiKeyExpiration, addNotification]);  18. Bağımlılıklar Doğru ayarlanmış.

   9. Depolama İşlemi API anahtarını kaydetme.
  const handleSaveApiKey = useCallback(async () = {
     8. Anahtar Doğrulama Anahtar formatını kontrol et.
    if (!inputApiKey  !VALIDATION_RULES.API_KEY_REGEX.test(inputApiKey)) {
      addNotification('Lütfen geçerli bir API anahtarı girin.', NOTIFICATION_TYPES.ERROR);
      return;
    }
    
    try {
      const expirationTimestamp = Date.now() + expirationDays  24  60  60  1000;
      const success = await storage.set({ 
        [STORAGE_KEYS.API_KEY] inputApiKey,
        [STORAGE_KEYS.API_KEY_EXPIRATION] expirationTimestamp 
      });

      if (success) {
         10. Başarı Geri Bildirimi Başarılı mesaj göster.
        setApiKey(inputApiKey);
        setApiKeyExpiration(expirationTimestamp);
        addNotification('API anahtarı başarıyla kaydedildi!', NOTIFICATION_TYPES.SUCCESS);
        setInputApiKey('');
      }
    } catch (error) {
       14. Hata Yönetimi Depolama hatasını yakala.
      console.error('API anahtarı kaydedilirken hata oluştu', error);
      addNotification(ERROR_MESSAGES.STORAGE_WRITE_ERROR, NOTIFICATION_TYPES.ERROR);
    }
  }, [inputApiKey, expirationDays, setApiKey, setApiKeyExpiration, addNotification]);

   11. Süre Hesaplama Kalan süreyi dinamik olarak hesaplayan yardımcı fonksiyon.
  const getRemainingTime = () = {
    if (!apiKeyExpiration  apiKeyExpiration = Date.now()) {
      return Süre doldu;
    }
    const remainingMillis = apiKeyExpiration - Date.now();
    const days = Math.floor(remainingMillis  (1000  60  60  24));
    const hours = Math.floor((remainingMillis % (1000  60  60  24))  (1000  60  60));
    const minutes = Math.floor((remainingMillis % (1000  60  60))  (1000  60));

    let timeString = ;
    if (days  0) timeString += `${days} gün `;
    if (hours  0) timeString += `${hours} saat `;
    if (minutes  0 && days === 0) timeString += `${minutes} dakika`;

    return timeString.trim();
  };

  return (
     16. Görsel Tasarım Tailwind sınıfları ile modern bir görünüm.
    div className=p-4 bg-white darkbg-gray-800 rounded-xl shadow-md
      h3 className=text-lg font-semibold text-gray-800 darktext-white mb-2
        OpenAI API Anahtarı Yönetimi
      h3
      div className=mb-4
        label htmlFor=api-key-input className=block text-sm font-medium text-gray-700 darktext-gray-300 mb-1
          API Anahtarınız
        label
        input
           19. Kullanıcı Deneyimi Güvenlik için password tipi.
          type=password
          id=api-key-input
          value={inputApiKey}
          onChange={(e) = setInputApiKey(e.target.value)}  7. Kontrollü Form Elemanı
          className=w-full p-3 border border-gray-300 darkborder-gray-600 rounded-lg bg-gray-50 darkbg-gray-700 text-gray-900 darktext-white focusring-blue-500 focusborder-blue-500
          placeholder=sk-...
        
      div
      div className=mb-4
        label htmlFor=expiration-days-input className=block text-sm font-medium text-gray-700 darktext-gray-300 mb-1
          Anahtarın geçerlilik süresi (gün)
        label
        input
          type=number
          id=expiration-days-input
          value={expirationDays}
          onChange={(e) = setExpirationDays(e.target.value)}  7. Kontrollü Form Elemanı
          className=w-full p-3 border border-gray-300 darkborder-gray-600 rounded-lg bg-gray-50 darkbg-gray-700 text-gray-900 darktext-white focusring-blue-500 focusborder-blue-500
          min=1  13. Uç Durum Yönetimi min değeri 1.
          max=365  13. Uç Durum Yönetimi max değeri 365.
        
      div
      {apiKey && (
        div className=p-3 bg-gray-100 darkbg-gray-700 rounded-lg text-sm mb-4
          p className=text-gray-700 darktext-gray-300
            Geçerlilik süresi span className=font-semibold{getRemainingTime()}span
          p
        div
      )}
      button
        onClick={handleSaveApiKey}
        className=w-full px-4 py-2 bg-blue-500 text-white rounded-full hoverbg-blue-600 transition-colors duration-200
      
        {UI_BUTTON_TEXTS.SAVE}
      button
      p className=mt-4 text-sm text-gray-600 darktext-gray-400
        {UI_FOOTER_TEXTS.API_INFO}
      p
      {!isExtensionEnvironment() && (
         15. Geliştirme Ortamı Uyarısı Uzantı ortamı değilse uyarı göster.
        div className=mt-4 p-3 bg-red-100 darkbg-red-800 text-red-800 darktext-red-200 rounded-lg text-sm
          Bu bir geliştirme ortamı olduğu için API anahtarı sayfa yenilendiğinde sıfırlanabilir. Gerçek uzantı sürümünde bu sorun yaşanmaz.
        div
      )}
    div
  );
};
