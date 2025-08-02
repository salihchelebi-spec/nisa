// src/utils/helpers.js
// Uygulama genelinde tekrar kullanılan yardımcı fonksiyonları içerir.
// Her fonksiyon, belirlenen talimatlara uygun olarak modüler ve hataya dayanıklı bir şekilde tasarlanmıştır.

/**
 * Sayısal bir değeri, belirtilen para birimi cinsinden okunabilir bir metin formatına dönüştürür.
 * @param {number} amount - Biçimlendirilecek sayısal değer.
 * @param {string} [currency='USD'] - Para birimi kodu (örn: 'EUR', 'TRY').
 * @param {string} [locale='en-US'] - Yerel ayar kodu (örn: 'tr-TR', 'en-US').
 * @returns {string} Biçimlendirilmiş para birimi metni veya hata mesajı.
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  // 3. Fonksiyon: formatCurrency
  // 4. Parametreler: amount, currency, locale
  try {
    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('Geçersiz miktar parametresi.');
    }
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    });
    return formatter.format(amount);
  } catch (error) {
    // 5. Hata Yönetimi: Geçersiz parametre durumunda hata loglanır.
    console.error('formatCurrency hatası:', error.message);
    return 'N/A';
  }
};

/**
 * Bir zaman damgasını, göreceli zaman ifadesine dönüştürür (örn: "5 dakika önce").
 * @param {number} timestamp - Epoch zaman damgası (milisaniye).
 * @param {string} [locale='tr-TR'] - Yerel ayar kodu.
 * @returns {string} Göreceli zaman ifadesi veya hata mesajı.
 */
export const formatTimeAgo = (timestamp, locale = 'tr-TR') => {
  // 6. Fonksiyon: formatTimeAgo
  // 7. Parametreler: timestamp, locale
  // 8. formatTimeAgo Yerel Ayarları: Zaman ifadeleri locale'ye göre dinamik olarak oluşturulur.
  const messages = {
    'tr-TR': { year: 'yıl önce', month: 'ay önce', day: 'gün önce', hour: 'saat önce', minute: 'dakika önce', second: 'saniye önce', invalid: 'Geçersiz tarih' },
    'en-US': { year: 'years ago', month: 'months ago', day: 'days ago', hour: 'hours ago', minute: 'minutes ago', second: 'seconds ago', invalid: 'Invalid date' },
  };
  const localizedMessages = messages[locale] || messages['tr-TR'];

  try {
    if (typeof timestamp !== 'number' || isNaN(timestamp) || timestamp <= 0) {
      throw new Error('Geçersiz zaman damgası.');
    }
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval)} ${localizedMessages.year}`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval)} ${localizedMessages.month}`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval)} ${localizedMessages.day}`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval)} ${localizedMessages.hour}`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval)} ${localizedMessages.minute}`;
    }
    return `${Math.floor(seconds)} ${localizedMessages.second}`;
  } catch (error) {
    // 6. Hata Yönetimi: Geçersiz zaman damgası durumunda hata loglanır ve yerel mesaj döndürülür.
    console.error('formatTimeAgo hatası:', error.message);
    return localizedMessages.invalid;
  }
};

/**
 * Kodun bir Chrome uzantı ortamında çalışıp çalışmadığını kontrol eder.
 * @returns {boolean} Uzantı ortamında ise true, aksi halde false.
 */
export const isExtensionEnvironment = () => {
  // 9. Fonksiyon: isExtensionEnvironment
  // 10. Geri Dönüş Değeri: boolean
  // 11. Uygulama Mantığı: 'chrome' nesnesinin ve 'runtime' API'sinin varlığını kontrol eder.
  return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
};

/**
 * WhatsApp Web'in mesaj yazma kutusunu güvenli bir şekilde bulur.
 * DOM'daki dinamik değişikliklere karşı dayanıklıdır.
 * @param {number} [retryCount=5] - Elementi bulmak için deneme sayısı.
 * @param {number} [interval=200] - Her deneme arasındaki bekleme süresi (ms).
 * @returns {Promise<HTMLElement|null>} Mesaj kutusu elementi veya null.
 */
export const getWhatsAppInputBox = async (retryCount = 5, interval = 200) => {
  // 11. Fonksiyon: getWhatsAppInputBox
  // 12. Parametreler: retryCount, interval
  // 13. Geri Dönüş Değeri: Promise<HTMLElement|null>
  for (let i = 0; i < retryCount; i++) {
    const selector = 'div[contenteditable="true"][data-tab="1"]';
    const element = document.querySelector(selector);
    if (element) {
      return element;
    }
    // 19. Hata Toleransı: Element bulunamazsa bekle ve tekrar dene.
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  // 11. getWhatsAppInputBox RetryCount Hata Yönetimi: Tüm denemelerden sonra loglanacak hata.
  console.error('getWhatsAppInputBox: WhatsApp mesaj kutusu bulunamadı. Lütfen sayfayı yenileyin veya destek alın.');
  return null;
};

/**
 * Bir fonksiyonun çağrısını, belirli bir süre içinde yalnızca bir kez tetiklenmesini sağlayacak şekilde geciktirir.
 * Hızlı ardışık olayların (örneğin, klavye girişi) performans sorunlarına yol açmasını önler.
 * @param {Function} func - Debounce edilecek fonksiyon.
 * @param {number} delay - Gecikme süresi (ms).
 * @returns {Function} Debounce edilmiş yeni fonksiyon.
 */
export const debounce = (func, delay) => {
  // 14. Fonksiyon: debounce
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Bir fonksiyonun belirli bir zaman aralığında en fazla bir kez çalışmasını sağlar.
 * Performans kritik olaylarda (örneğin, pencere boyutlandırma) gereksiz tetiklenmeyi önler.
 * @param {Function} func - Throttle edilecek fonksiyon.
 * @param {number} delay - Olaylar arasındaki minimum gecikme süresi (ms).
 * @returns {Function} Throttle edilmiş yeni fonksiyon.
 */
export const throttle = (func, delay) => {
  // 16. throttle Fonksiyonu: Belirli bir zaman aralığında en fazla bir kez çalışır.
  let timeoutId = null;
  let lastArgs = null;
  return (...args) => {
    lastArgs = args;
    if (!timeoutId) {
      func(...lastArgs);
      timeoutId = setTimeout(() => {
        if (lastArgs) {
          func(...lastArgs);
          lastArgs = null;
        }
        timeoutId = null;
      }, delay);
    }
  };
};

/**
 * Bir string'in OpenAI API anahtarı formatına uygun olup olmadığını kontrol eder.
 * @param {string} key - Kontrol edilecek API anahtarı.
 * @returns {boolean} Format uygunsa true, aksi halde false.
 */
export const validateApiKey = (key) => {
  // 19. Fonksiyon: validateApiKey
  // 20. Geri Dönüş Değeri: boolean
  // constants.js dosyasındaki regex kuralı kullanılır.
  const API_KEY_REGEX = /^sk-[a-zA-Z0-9]{32,}/;
  return API_KEY_REGEX.test(key);
};

/**
 * Universal benzersiz bir kimlik (UUID) oluşturur.
 * Sohbetlere, mesajlara vb. benzersiz ID atamak için kullanılır.
 * @returns {string} Benzersiz bir UUID.
 */
export const generateUUID = () => {
  // 22. Fonksiyon: uuid
  // 23. Geri Dönüş Değeri: string (UUID)
  return crypto.randomUUID();
};
