// src/utils/constants.js
// Uygulama genelinde kullanılan tüm sabit verileri, değişmez değerleri ve yapılandırma ayarlarını içerir.
// Her bir sabit, projenin modülerlik, tutarlılık ve okunabilirlik standartlarını karşılamak üzere tasarlanmıştır.

// 1. Dosya Amacı: Uygulama genelinde kullanılacak tüm sabit verileri tek bir merkezde tanımlar.
// 2. Modülerlik: Her bir sabit bağımsız olarak 'export const' ile dışa aktarılır, bu da esnekliği artırır.

// 3. Dil Tanımları (`LANGUAGES`): Uzantının desteklediği dillerin listesi.
// Bu dizi, dil seçimi arayüzünü dinamik olarak oluşturmak için kullanılır.
export const LANGUAGES = [
  { code: 'tr-TR', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en-US', name: 'English', flag: '🇬🇧' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'de-DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar-SA', name: 'العربية', flag: '🇸🇦' },
  { code: 'nl-NL', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
];

// 4. Sınır Değeri (`MAX_CHARS`): Konuşarak yazdırma fonksiyonu için maksimum karakter sınırı.
// Bu sabit, konuşma tanıma sürecini kontrol etmek için kullanılır.
export const MAX_CHARS = 3000;

// 5. Varsayılan Değerler: Uygulamanın başlangıç ayarları.
export const DEFAULT_ASSISTANT_ID = 'asst_zKnlevVL1wzMmLqHJkAE1UUg';
export const DEFAULT_MODEL = 'gpt-4o';

// 6. Asistan Verileri (`ASSISTANTS`): Farklı görevler için asistanların listesi.
// 17. Yorumlama: Her bir sabit için kullanım amacı açıklanmıştır.
export const ASSISTANTS = [
  { id: DEFAULT_ASSISTANT_ID, name: 'Şirket SSS Asistanı', description: 'Şirketinizle ilgili sık sorulan soruları yanıtlar.', isSimulated: false },
  { id: 'asst_another_id_1', name: 'Kargo Takip Asistanı', description: 'Kargo durumu hakkında bilgi verir.', isSimulated: true },
  { id: 'asst_another_id_2', name: 'Facebook Reklam Yöneticisi', description: 'Facebook reklam metinleri oluşturur.', isSimulated: true },
];

// 7. Model Verileri (`MODELS`): OpenAI API modellerinin özelliklerini ve maliyet/hız bilgilerini tanımlar.
// Bu liste, model seçim arayüzünü dinamik hale getirir ve kullanıcıya maliyet hakkında bilgi sunar.
export const MODELS = [
  { id: 'gpt-4o', name: 'GPT-4o', cost: 'Yüksek', speed: 'Çok Hızlı', quality: 'Mükemmel' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', cost: 'Düşük', speed: 'Çok Hızlı', quality: 'İyi' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', cost: 'Orta', speed: 'Hızlı', quality: 'Çok İyi' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', cost: 'Çok Düşük', speed: 'Hızlı', quality: 'Orta' },
];

// 8. Mesajlaşma Aksiyonları (`MESSAGE_ACTIONS`): background.js ve diğer dosyalar arası iletişimde kullanılan aksiyon isimleri.
// Bu sabitler, message passing protokolünde tutarlılık sağlamak için kullanılır.
export const MESSAGE_ACTIONS = {
  CALL_API: 'callApi',
  INSERT_TEXT: 'insertText',
  NOTIFY: 'notify',
};

// 9. Hata Mesajları (`ERROR_MESSAGES`): Uygulama genelinde gösterilecek standart hata metinleri.
// UI'da tutarlı ve profesyonel hata bildirimleri için kullanılır.
export const ERROR_MESSAGES = {
  MESSAGE_SEND_FAILED: 'Mesaj gönderilemedi. Uzantı izinlerini kontrol edin.',
  UNEXPECTED_API_ERROR: 'API çağrısı sırasında beklenmeyen bir hata oluştu.',
  SPEECH_API_NOT_SUPPORTED: 'Tarayıcınız konuşma tanımayı desteklemiyor. Lütfen Chrome kullanın.',
  SPEECH_ERROR: 'Konuşma tanıma hatası',
  MIC_START_FAILED: 'Mikrofon başlatılamadı. Lütfen izinleri kontrol edin.',
  CHARACTER_LIMIT_EXCEEDED: `Karakter sınırı (${MAX_CHARS}) aşıldı. Dinleme durduruldu.`,
  STORAGE_READ_ERROR: 'Veri okunurken bir hata oluştu.',
  STORAGE_WRITE_ERROR: 'Veri kaydedilirken bir hata oluştu.',
  CONNECTION_REFUSED: 'Sunucuyla bağlantı kurulamadı. İnternet bağlantınızı kontrol edin.',
};

// 10. Simülasyon Verileri (`SIMULATION_CLIENTS`): Sohbet geçmişi sekmesi için örnek, gerçekçi veriler.
export const SIMULATION_CLIENTS = [
  { id: 'davina_lace', name: 'Davina’s Wedding Lace (Simülasyon)', isSimulated: true, messages: [
      { sender: 'assistant', message: "Merhaba, Davina’s Wedding Lace ile ilgili nasıl yardımcı olabilirim?", timestamp: Date.now() - 3600000 },
      { sender: 'user', message: "Düğün danteli siparişim ne zaman kargoya verilecek?", timestamp: Date.now() - 3000000 },
      { sender: 'assistant', message: "Siparişinizi kontrol ediyorum. En geç 2 gün içinde kargoya verilecek.", timestamp: Date.now() - 2800000 }
  ]},
  { id: 'aliexpress_customer', name: 'Ali Express Müşteri (Simülasyon)', isSimulated: true, messages: [
      { sender: 'user', message: "Paketim kayboldu, ne yapmalıyım?", timestamp: Date.now() - 7200000 },
      { sender: 'assistant', message: "Lütfen sipariş numaranızı ve takip kodunuzu paylaşır mısınız?", timestamp: Date.now() - 6000000 }
  ]},
  { id: 'payment_issue', name: 'Payment Issue Discussion (Simülasyon)', isSimulated: true, messages: [
      { sender: 'assistant', message: "Ödeme probleminizi çözmek için buradayım.", timestamp: Date.now() - 10800000 }
  ]},
];

// 11. UI Metinleri (`UI_STRINGS`): Arayüzde kullanılan metinler.
export const UI_STRINGS = {
  CHAT_HEADER: 'Sohbetler',
  SEARCH_PLACEHOLDER: 'Sohbetlerde ara...',
  NO_HISTORY_MESSAGE: 'Bu sohbette henüz mesaj yok.',
  PANEL_TITLE: 'Ajan Nil',
};

// 20. Boş Durum Mesajları (`EMPTY_STATE_MESSAGES`): Boş durumlar için kullanıcıya gösterilecek mesajlar.
export const EMPTY_STATE_MESSAGES = {
  NO_API_KEY: 'API anahtarı tanımlanmadı. Lütfen Ayarlar sekmesinden ekleyin.',
  NO_SENT_MESSAGES: 'Gönderilen mesaj bulunmamaktadır.',
  NO_CLIENTS_FOUND: 'Müşteri bulunamadı.',
  NO_HISTORY_MESSAGE: 'Bu sohbette henüz mesaj yok.',
};

// 12. Bildirim Tipleri (`NOTIFICATION_TYPES`): UI bildirimleri için tipler.
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

// 13. API Uç Noktaları (`API_ENDPOINTS`): OpenAI API'sinin uç noktaları.
export const API_ENDPOINTS = {
  CHAT_COMPLETIONS: 'chat/completions',
};

// 14. Depolama Anahtarları (`STORAGE_KEYS`): chrome.storage için kullanılan anahtar isimleri.
// Kodun farklı yerlerinde anahtar isimlerinin tutarlı kalmasını sağlar.
export const STORAGE_KEYS = {
  API_KEY: 'agentNilApiKey',
  API_KEY_EXPIRATION: 'agentNilApiKeyExpiration',
  SELECTED_ASSISTANT_ID: 'agentNilSelectedAssistantId',
  SELECTED_LANGUAGE: 'agentNilSelectedLanguage',
  SELECTED_MODEL: 'agentNilSelectedModel',
  CHAT_HISTORY: 'agentNilChatHistory',
  CURRENT_CHAT_ID: 'agentNilCurrentChatId',
  THEME: 'agentNilTheme',
};

// 15. Tema Verileri (`THEMES`): Açık ve koyu temaların adları.
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// 16. Validasyon Kuralları (`VALIDATION_RULES`): Form doğrulama için regex'ler.
export const VALIDATION_RULES = {
  API_KEY_REGEX: /^sk-[a-zA-Z0-9]{32,}/,
};

// 19. Yedekleme Anahtarları (`BACKUP_KEYS`): `storage.js` dosyasında kullanılan yedekleme anahtarları.
export const BACKUP_KEYS = {
  REMOVE: '_backup_remove',
  CLEAR: '_backup_clear',
};

// 21. UI Buton Metinleri ve Header Metinleri: Daha modüler bir yapı için ayrılmış sabitler.
// Her bir buton ve başlık metni bağımsız bir sabit olarak tanımlanır.
export const SEND_BUTTON_TEXT = 'Gönder';
export const SAVE_BUTTON_TEXT = 'Kaydet';
export const COPY_TO_CLIPBOARD_BUTTON_TEXT = 'Panoya Kopyala';
export const INSERT_TO_WHATSAPP_BUTTON_TEXT = 'Mesaj Kutusuna Ekle';
export const SPEAK_TEXT_BUTTON_TEXT = 'Metni Sesli Oku';
export const DELETE_CHAT_BUTTON_TEXT = 'Sohbeti Sil';
export const START_CHAT_BUTTON_TEXT = 'Sohbet Başlat';
export const CLEAR_HISTORY_BUTTON_TEXT = 'Sohbet Geçmişini Temizle';
export const RESET_SETTINGS_BUTTON_TEXT = 'Tüm Ayarları Sıfırla';

// Ardından, bu bağımsız sabitler gruplanmış bir obje içinde dışa aktarılır.
export const UI_BUTTON_TEXTS = {
  SEND: SEND_BUTTON_TEXT,
  SAVE: SAVE_BUTTON_TEXT,
  COPY_TO_CLIPBOARD: COPY_TO_CLIPBOARD_BUTTON_TEXT,
  INSERT_TO_WHATSAPP: INSERT_TO_WHATSAPP_BUTTON_TEXT,
  SPEAK_TEXT: SPEAK_TEXT_BUTTON_TEXT,
  DELETE_CHAT: DELETE_CHAT_BUTTON_TEXT,
  START_CHAT: START_CHAT_BUTTON_TEXT,
  CLEAR_HISTORY: CLEAR_HISTORY_BUTTON_TEXT,
  RESET_SETTINGS: RESET_SETTINGS_BUTTON_TEXT,
};

// 23. UI Header Metinleri: Arayüz başlıkları.
export const UI_HEADER_TEXTS = {
  CHAT_DETAIL: 'Sohbet Detayları',
  ASSISTANT_MODEL_TITLE: 'Asistan & Model Yönetimi',
  SETTINGS_TITLE: 'Ayarlar & Yardım',
};

// 24. UI Footer Metinleri: Alt kısım metinleri.
export const UI_FOOTER_TEXTS = {
  API_INFO: 'API anahtarınız güvenli bir şekilde saklanır.',
};

// 25. Kota Uyarısı (`STORAGE_QUOTA_WARN_THRESHOLD`): Depolama kotası dolmadan önce uyarı için eşik değeri.
export const STORAGE_QUOTA_WARN_THRESHOLD = 0.8; // %80 dolulukta uyarı ver.

