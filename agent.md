# AGENT.md

## AJAN NİL | WHATSAPP WEB CHROME ASİSTANI  
**Kullanıcı, geliştirici ve kurumlar için kapsamlı modern eklenti mimarisi**


---
## 1. Proje Vizyonu & Genel Hedefler

- WhatsApp Web üzerinde gerçek zamanlı, çok dilli, kişiselleştirilebilir ve güvenli bir asistan oluşturmak.
- Hem bireysel hem kurumsal kullanıcıların ihtiyaçlarını karşılayan sezgisel ve esnek bir arayüz sunmak.
- Dil bariyerini kaldırmak için entegre çeviri ve ses tanıma özellikleriyle global müşteri deneyimi.
- Sık tekrarlanan müşteri sorularını otomatik ve hızlı yanıtlayarak verimlilik ve kaliteyi artırmak.
- API anahtarı ve model yönetimiyle kişisel ve şirket asistanlarını özelleştirmek.
- Çağrı merkezi süreçlerini otomasyona kavuşturup maliyet ve zaman tasarrufu sağlamak.
- Her müşteriyle ayrı sohbet/bağlam yönetimi, kişiye özel cevap ve geçmiş saklama.
- Sesli komut, mikrofon, çoklu dil, model seçimi, API yönetimi, sohbet geçmişi gibi işlevler tek panelde.
- Kullanıcı ve kurumlara, WhatsApp Web’i tam teşekküllü bir müşteri iletişim platformuna dönüştürme fırsatı.

---

## 2. Güvenlik, Gizlilik ve API Yönetimi Standartları

- Tüm hassas veriler chrome.storage.local veya localStorage'da güvenli ve mümkünse şifrelenmiş saklanır.
- API anahtarları kullanıcı isteğiyle şifrelenip saklanır, süreyle sınırlandırılır ve gerektiğinde otomatik silinir.
- Sohbet/geçmiş/ayarlar hiçbir zaman harici sunucuya aktarılmaz; minimum API sorgusu ve tam gizlilik.
- Her asistan için ayrı model, anahtar ve güvenlik ayarı; veri sızıntısı ve yetkisiz erişim engellenir.
- API limiti, maliyet ve erişim panelde görsel olarak izlenebilir; aşımda uyarı.
- KVK, GDPR gibi yasal gerekliliklerle tam uyum.
- API kaydı ve doğrulaması background.js’de güvenli şekilde yapılır.
- Yalnızca izin verilen domainlerde (web.whatsapp.com) aktif.
- Kullanıcı verilerinin dışa aktarımı, sıfırlanması ve yedeklenmesi için ek kontroller sunulur.

---

## 3. Esnek, Modüler ve Sürdürülebilir Mimari

- Tüm işlevler ayrı dosya/component olarak modüler kurgulanır; manifest, background, content, arayüz, yardımcılar ayrıdır.
- Storage.js merkezi yönetim sağlar; tüm ayar/geçmiş/seçenekler burada saklanır.
- React/Svelte bileşenleri, context ve import/export ile kolay yönetilir/test edilir/güncellenir.
- Tema, çoklu dil ve UI sistemi klasörlerde, kolay güncellenebilir ve genişletilebilir şekilde düzenlenir.
- Yenilik, entegrasyon ve testler bağımsız eklenebilir; tüm güncellemeler merkezi state ile senkronize.
- Benzer müşteri destek platformlarına kolayca uyarlanabilir.
- Kod tekrarı ve karmaşa minimize edilmiş, sürdürülebilirlik ve dokümantasyon öncelikli.

---

## 4. Otomasyon, Verimlilik ve Zaman Tasarrufu

- Tekrarlayan işler ve müşteri soruları otomasyon ile minimum insan müdahalesiyle çözülür.
- Asistan ve çeviri otomasyonu, sesli komut ve panelden yönetim, çoklu dilde hızlı yanıt.
- Sık sorulan sorulara otomatik yanıt, verimlilik ve müşteri memnuniyeti sağlar.
- API ve model seçimiyle farklı maliyet-senaryo optimizasyonu.
- Panelden çok sayıda müşteriyle bağlamsal sohbet yönetimi, hızlı kısayollar, pratik ayarlar.
- Müşteri yanıtları otomatik bağlamsal olarak oluşturulur; dış veri (stok, fiyat, kampanya) entegre edilebilir.
- İşletme sahipleri asistanı şirket prosedürlerine eğiterek kurumsal verimlilik sağlar.

---

## 5. Kapsamlı Özelleştirme ve Genişletilebilirlik

- Kullanıcı, asistan listesi ve görevlerini, API/model/dil seçeneklerini tamamen özelleştirebilir.
- Her müşteri için ayrı geçmiş ve bağlam saklanır.
- Panelde özel asistanlar, test asistanı, tema, ikon ve UI fonksiyonları seçilebilir/gizlenebilir.
- API raporları, maliyet, kullanım istatistikleri tamamen kişiselleştirilebilir.
- Yeni asistan, yeni dil, yeni API, yeni modül kolayca eklenir.
- Arayüzdeki tüm ayar ve fonksiyonlar göster/gizle mantığıyla çalışır.
- Şirket içi bilgi ve prosedürler özel olarak atanabilir, sohbet/ayar/API sıfırlanabilir.

---

## 6. Kullanılan Temel ve Alternatif Teknolojiler

### 6.1 Temel Teknolojiler  
- **JavaScript (ES2022+)**  
- **React (v18+)** / **Svelte** (kullanıcı seçimi)
- **Tailwind CSS** / **Sass/SCSS** / **Styled Components** (seçilebilir)
- **Webpack / Vite** (geliştirici seçimi)
- **Manifest V3** (Chrome Extension API standartı)
- **Web Speech API** ve/veya **OpenAI Whisper API**  
- **OpenAI GPT-3.5/4, Assistant ID** ile model seçimi
- **Google Translate API / DeepL / Microsoft Translator** (alternatif çeviri)
- **Chrome Storage API (chrome.storage.local)**, **Web Crypto API**, **IndexedDB**  
- **Background Service Worker** ve **Content Scripts**
- **Chrome Messaging & Notifications API**
- **i18n (locales/ klasörü)**, **Tema yönetimi (Dark/Light/High Contrast)**
- **SVG/PNG assets**, **React Tooltip, Modal**, **React Query/SWR**
- **Git & GitHub/GitLab**, **ESLint & Prettier**, **Jest/Vitest**

### 6.2 Dropdown ile Kullanıcı Seçimli Teknolojiler  
- **Framework:** React (default), Svelte (dropdown)
- **Stil:** Tailwind (default), Sass/SCSS, Styled Components (dropdown)
- **Ses Tanıma:** Web Speech API (default), OpenAI Whisper (dropdown)
- **Çeviri:** GPT-4 (default), Google, DeepL, Microsoft (dropdown)
- **Model:** GPT-4, GPT-3.5, Assistant ID (dropdown)
- **Depolama:** Chrome Storage (default), IndexedDB, localStorage (dropdown)
- **Tema:** Açık, Koyu, Yüksek Kontrast (dropdown)
- **Bildirim:** Popup, Banner, Sessiz (dropdown)
- **Bundler:** Vite (default), Webpack (dropdown)

---

## 7. Dosya ve Klasör Bazlı Talimatlar

Her dosya ve klasör için **30 kritik teknik gereksinim ve bağlantı açıklaması** hazırlandı.  
Detaylar için aşağıdaki bölümlere bakınız:

### 7.1 [manifest.json](#manifestjson)  
### 7.2 [background.js / service_worker.js](#backgroundjs--service_workerjs)  
### 7.3 [sidepanel.html](#sidepanelhtml)  
### 7.4 [popup.html](#popuphtml)  
### 7.5 [options.html & options.js](#optionshtml--optionsjs)  
### 7.6 [content.js](#contentjs)  
### 7.7 [storage.js veya utils/storage.js](#storagejs-veya-utilsstoragejs)  
### 7.8 [components/](#components)  
### 7.9 [styles/](#styles)  
### 7.10 [locales/](#locales)  
### 7.11 [utils/ veya helpers/](#utils-veya-helpers)  
### 7.12 [assets/](#assets)  
### 7.13 [README.md ve Dokümantasyon](#readmemd-ve-dokümantasyon)  

---

<a name="manifestjson"></a>
### manifest.json için 30 Talimat
1. Uzantı adı, kısa açıklama ve versiyon eksiksiz olmalı.  
2. manifest_version: 3 (MV3 zorunlu).  
3. Simgeler (16/48/128px) assets/ klasöründen tanımlı olmalı.  
4. Tüm izinler (storage, scripting, activeTab, alarms, webRequest) eksiksiz yazılmalı.  
5. host_permissions ile uzantının çalışacağı domainler net belirtilmeli.  
6. background kısmında service_worker dosyası atanmalı.  
7. Yan panel veya popup arayüzleri action alanında açıkça tanımlanmalı.  
8. content_scripts ile harici sayfalarda çalışacak scriptler (content.js) eşleşme kurallarıyla eklenmeli.  
9. web_accessible_resources ile assets ve yan panel erişimi açılmalı.  
10. Gereksiz izin eklenmemeli, kapsam dar tutulmalı.  
11. description alanı uzantı işlevini özetlemeli.  
12. default_icon action alanında tanımlı olmalı.  
13. Yan panel, popup için gerekli tüm dosyalar açıkça gösterilmeli.  
14. Güncellemelerde izin ekle/çıkar işlemleri manifest üzerinden yapılmalı.  
15. content_scripts altında kullanılacak JS dosyaları sıralı olmalı.  
16. Her script’in matches kuralı net olmalı.  
17. permissions ile host_permissions farkı net anlaşılmalı.  
18. Manifest Chrome Web Store kurallarına %100 uyumlu olmalı.  
19. side_panel veya options için gerekli alanlar eklenmeli.  
20. API değişikliklerinde izinler güncellenmeli.  
21. web_accessible_resources ile build dosyaları (bundle.js) erişime açılmalı.  
22. Arka plan scriptleri (background.js/service_worker.js) type: "module" ile tanımlanmalı.  
23. Kısayollar/komutlar manifestte commands ile gösterilebilir.  
24. storage izni olmadan Storage API kullanılamaz.  
25. Her yeni domain için izin eklenmeli.  
26. Yanlış/eksik simgeler yüklemeyi engeller.  
27. Kullanıcı verisi ve gizlilik politikası açıklamaları eklenmeli.  
28. Gereksiz host_permissions eklenmemeli.  
29. Manifest hataları eklentinin yüklenmesini engeller.  
30. Her değişiklik sonrası uzantı tekrar yüklenmeli.

**Bağlantı:**  
Manifest, tüm dosya yolları ve izinleri yönetir. Content.js, background.js, sidepanel.html, assets/ ve bundle.js gibi kaynaklara erişim, sadece manifestte tanımlıysa olur. Tüm dosyaların çalışma yetkisi bu dosyadan yönetilir.

---
## 2. **background.js / service\_worker.js** için 30 Talimat
1. Dosya, arka planda sürekli çalışan bir kontrol ve yönlendirme merkezidir.
2. API anahtarının geçerliliğini düzenli aralıklarla kontrol eder (ör. alarm ile).
3. Kullanıcı arayüzünde yapılan değişiklikleri storage’dan okuyup yazar.
4. API çağrılarını güvenli şekilde gerçekleştirir, hata kontrolü yapar.
5. Kullanıcıya bildirim gönderebilmek için onMessage dinleyicisi kurar.
6. content.js ve yan panel arayüzüne “message passing” ile veri aktarır.
7. API anahtarı süresi dolmuşsa, uyarı gönderir ve yeni anahtar isteyebilir.
8. Günlük/aylık API kullanım istatistiklerini toplar ve storage’a kaydeder.
9. Eklentiye özel fonksiyonlar (ör. mesaj otomasyonu) burada güvenli şekilde yürütülür.
10. Birden çok sekme ve pencere ile çalışırken veri bütünlüğünü korur.
11. Diğer dosyalarla iletişimde Chrome Messaging API (runtime.onMessage) kullanır.
12. Alarmlar (chrome.alarms) ile zamanlanmış görevler yönetilir (ör: API anahtarı kontrolü).
13. WebRequest veya fetch ile üçüncü parti API’lere güvenli bağlantı sağlar.
14. İstek başına “retries” gibi parametrelerle otomatik tekrar deneyebilir.
15. Kullanıcı bildirimlerini (başarı, hata, uyarı, bilgi) uygun şekilde iletir.
16. Erişim yetkisi olmayan alanlarda işlem yapmaz, uyarı döner.
17. storage.js gibi yardımcı modüllerden veri okur/yazar.
18. Yan panelden veya content script’ten gelen istekleri ayırıp ilgili işlemi yapar.
19. Her işlemde try/catch ile hata yönetimi uygulanır.
20. API anahtarı şifrelenmiş şekilde alınmalı, açık şekilde kullanılmamalıdır.
21. Yan panelden gelen “insertText” mesajını content.js’e iletir.
22. Diğer sekmelere özel broadcast yapabilir.
23. Doğrudan DOM’a erişimi yoktur, sadece mesajlaşma ile müdahale eder.
24. Tarayıcı başlatıldığında veya uzantı yüklendiğinde gerekli setup işlemlerini yapar.
25. Sadece background’da çalışması gereken gizli bilgiler burada tutulur.
26. API kullanım limiti aşılırsa uyarı verir, yeni istekleri bloklayabilir.
27. Dosya mutlaka manifest’te background service\_worker olarak tanımlanmalıdır.
28. Kullanıcıya gösterilecek bildirimler için uygun formatta mesaj döner.
29. Veri bütünlüğü ve güvenliği için local storage ile paralel yedekleme yapabilir.
30. Sadece izin verilen alanlara API isteği yapar, diğerlerini bloklar.
**Bu kodun diğer kodlarla bağlantısı ve iletişim şekli:**
background.js, sidepanel.html’deki React uygulaması, content.js ve storage.js ile sürekli haberleşir. Messaging API ile gelen istekleri ilgili dosyalara iletir. storage.js’den veri alır/yazar, content.js’e DOM’a veri enjekte etmesi için mesaj yollar. Yan panel arayüzünden alınan API isteklerini yönlendirir ve sonuçları arayüze döner. Modüler ve güvenli bir geçiş noktasıdır.
---
## 3. **sidepanel.html** için 30 Talimat
1. Tarayıcıda uzantı simgesine tıklandığında açılan ilk arayüzdür.
2. <div id="root"></div> ana container ile React/Svelte arayüzünü yükler.
3. Doğru meta etiketlerle mobil ve masaüstü uyumluluğu sağlanmalıdır.
4. Tüm temel CSS ve JS dosyalarını (tailwind, bundle.js, inter fontu) yükler.
5. Panelin boyutu, responsive olarak en az 400px genişlikte olmalıdır.
6. Kullanıcı arayüzünün hızlı yüklenebilmesi için optimize edilmelidir.
7. sidepanel.html üzerinden sohbet, geçmiş, asistan, ayarlar sekmeleri başlatılır.
8. Kullanıcı API anahtarı girişi burada yapılır.
9. Diller arası geçiş için uygun dropdown veya butonlar panelde yer alır.
10. Bütün bildirimler, modal ve popup’lar bu panelde açılır.
11. Chat geçmişi ve müşteri listesi panelde görsel olarak sunulur.
12. Asistan/model/dil seçimleri, panelden yapılır ve storage’a yazılır.
13. Paneldeki butonlar, background.js ve content.js ile mesajlaşır.
14. Kullanıcı yeni mesaj yazdığında veya mikrofon başlattığında, panel ilgili fonksiyonları tetikler.
15. API anahtarı süresi/bitimi, kalan kullanım, maliyet ve limitler panelde görsel olarak sunulur.
16. Kullanıcı, geçmişi veya ayarları sıfırlayabilir.
17. Asistan listesinde gerçek/simülasyon etiketleri görünür.
18. Tüm kullanıcı ayarları, options.html ile entegre çalışır.
19. Tema değişimi (açık/koyu) panel üzerinden yapılabilir.
20. Paneldeki tüm değişiklikler storage.js ile Chrome Storage’a kaydedilir.
21. Her bileşenin kendi hata ve yükleniyor durumları panelde yönetilir.
22. Arayüzdeki tüm metinler, locales/ klasöründen gelen çeviriyle gösterilir.
23. Mikrofonla konuşma, konuşmayı başlat/durdur, karakter limiti kontrolü panelden yapılır.
24. Kısayollar veya özel tuş kombinasyonları burada tanımlanabilir.
25. Arayüzde kullanılacak tüm ikon ve görseller assets/ klasöründen yüklenir.
26. Paneldeki event’ler (tıklama, sürükle-bırak vs) modüler component yapısı ile ayrılır.
27. API kullanım ve maliyet istatistikleri panelde grafiksel veya sayısal gösterilir.
28. Paneldeki veri güncellemeleri, background.js’den gelen mesajlara göre anlık yenilenir.
29. Kullanıcı API anahtarı veya asistan ID’sini değiştirdiğinde, background ve storage’a bildirilir.
30. Panel, yüksek erişilebilirlik ve kullanıcı deneyimi için test edilmelidir.
**Bu kodun diğer kodlarla bağlantısı ve iletişim şekli:**
sidepanel.html, React veya Svelte ile oluşturulmuş uygulamanın arayüzüdür. Arayüzdeki aksiyonlar background.js’e mesaj yollar, content.js’e DOM değişikliklerini bildirir, storage.js ile veri okur/yazar, locales/’dan dil verisi çeker, options.js ve popup.html ile ayar/kısa yol işlemlerini entegre eder. Tüm görselleri assets/ klasöründen çeker ve kullanıcı aksiyonlarını background.js ile koordine eder.
---
---
## 4. **popup.html** için 30 Talimat
1. Chrome araç çubuğunda uzantı simgesine tıklandığında açılan küçük arayüzdür.
2. API anahtarını hızlıca değiştirmek için kısa bir giriş alanı olmalıdır.
3. Güncel kullanım özetini (API kullanımı, kalan gün vs.) gösterebilir.
4. “Yan paneli aç” veya “Ayarları hızlı aç” gibi kısayol butonları bulunmalıdır.
5. Ana paneldeki önemli fonksiyonlara hızlı erişim sağlar.
6. Hata ve başarı bildirimlerini küçük popup’ta gösterebilir.
7. HTML’de ana container `<div id="popup-root"></div>` şeklinde olmalıdır.
8. CSS ile 350x500px gibi taşınabilir bir tasarım olmalıdır.
9. Tüm metinler, locales/ klasöründen dinamik çekilmelidir.
10. Güncel tema (açık/koyu) popup’ta otomatik uyarlanmalıdır.
11. API anahtarı girildiğinde storage.js ile güvenli şekilde kaydedilmelidir.
12. Kalan API süresi veya kullanım limiti burada özet olarak gösterilmelidir.
13. Asistan seçimi ve hızlı model değişimi butonları olabilir.
14. Yardım veya SSS linkleri kullanıcıya buradan sunulabilir.
15. Diller arasında hızlı geçiş için dropdown eklenebilir.
16. Popup üzerinden yapılan tüm değişiklikler storage ve background.js’e anlık bildirilir.
17. Panelde olduğu gibi popup’ta da React/Svelte/Vanilla kullanılabilir.
18. Kullanıcı değişikliği kaydettikten sonra bilgi mesajı görmelidir.
19. Aktif asistan ve model burada gösterilebilir.
20. Herhangi bir ayar değişikliği panel ve background ile senkronize olmalıdır.
21. Arka planda bekleyen bildirimler, popup açılır açılmaz gösterilmelidir.
22. Sadece hızlı işlemler ve özet bilgi için tasarlanmalıdır; karmaşık ayar barındırmamalıdır.
23. Kullanıcı popup’ı kapattığında yapılan değişiklikler kalıcı olmalıdır.
24. Kapatma butonu ya da tık dışı kapanma desteği olmalıdır.
25. Hatalı girişlerde veya geçersiz API anahtarında kullanıcıya uyarı verilmelidir.
26. Tüm güncellemeler, Chrome Storage üzerinden arka planda güncellenir.
27. Tasarımda erişilebilirlik (a11y) kurallarına dikkat edilmelidir.
28. Önemli bildirimlerde dikkat çekici renkler/ikonlar kullanılmalıdır.
29. Pop-up açıldığında background.js’den güncel veri çekilmelidir.
30. Test ve hata ayıklama için popup.js ayrı dosyada tutulabilir.
**Bu kodun diğer kodlarla bağlantısı ve iletişim şekli:**
Popup.html, hızlı ayar ve bilgi panelidir. storage.js ile veri okur/yazar, background.js’e yapılan işlemleri bildirir, options.js veya sidepanel.html’deki ayarlarla senkronize olur. content.js ile doğrudan bağlantı yoktur. Bütün iletişim Chrome Messaging ve Storage API ile olur.
---
## 5. **options.html & options.js** için 30 Talimat
1. Uzantının detaylı ayarlarının yapıldığı ekranı oluşturur.
2. Tema seçimi (açık/koyu) ve panel genişliği gibi tercihler burada düzenlenebilir.
3. API anahtarı buradan da girilebilir, storage.js ile kaydedilir.
4. Asistan ve model yönetimi ayarları burada sunulabilir.
5. Tüm ayar değişiklikleri anında storage.js ile saklanır ve panel ile senkronize edilir.
6. Bildirim tercihleri (hata, uyarı, başarı) seçenekleri sunulmalıdır.
7. Panel fontu ve yazı tipi boyutu ayarları burada yapılabilir.
8. Dil seçimi ve yeni dil ekleme seçenekleri bulunabilir.
9. API kullanım limiti veya harcama limiti kullanıcı tarafından ayarlanabilir.
10. Tüm kullanıcı ayarları JSON formatında storage’da tutulmalıdır.
11. Koyu/açık tema seçimi, anında tüm uzantıya uygulanmalıdır.
12. Kullanıcı geçmişi temizleme (chat/history) için butonlar olmalıdır.
13. Gelişmiş seçeneklerde hata günlüğü veya logları indirilebilir.
14. Panelde yapılan değişiklikler options ile anlık uyumlu olmalıdır.
15. Asistan listesinde “gerçek” veya “simülasyon” etiketi burada düzenlenebilir.
16. Asistan ID’si ve varsayılan model atanabilir.
17. Kullanıcıya yardım ve sık sorulan sorular (SSS) bölümü sunulabilir.
18. API anahtarı girildiğinde, anahtarı şifrele ve storage’da güvenli sakla.
19. Tüm ayar ekranları erişilebilirlik için etiketlenmeli ve klavye ile kullanılabilir olmalıdır.
20. Kaydet butonu ile yapılan değişiklikler background.js’e haber verilir.
21. Reset (sıfırla) butonu tüm ayarları varsayılana döndürmelidir.
22. Hatalı girişlerde kullanıcıya açıklayıcı hata mesajı verilmelidir.
23. options.html’de yapılan değişiklikler sidepanel.html ve popup.html ile senkronize olur.
24. Uygulamanın sürümü ve lisans bilgisi burada gösterilebilir.
25. Kişiselleştirme seçenekleriyle ilgili açıklama ve uyarı metinleri yer almalıdır.
26. Panelde/arayüzde gözükmesini istemediğin asistanları burada gizleyebilirsin.
27. Her ayar değişikliğinde storage’da güncelleme anında yapılır.
28. Gelişmiş loglama, backup ve export seçenekleri olabilir.
29. React/Svelte ile yapılırsa options.js ayrı bir component olarak tutulur.
30. Tema ve dil değişimi hemen uygulanmalı, panel yeniden yüklenmemelidir.
**Bu kodun diğer kodlarla bağlantısı ve iletişim şekli:**
options.html/js, panel ve popup ile tamamen senkronizedir; storage.js ile veri paylaşır, background.js’e kritik değişiklikleri bildirir. content.js ile bağlantısı yoktur. settings/options değişikliği tüm arayüzlerde anlık güncellenir. Asistan yönetimi ve dil desteği için locales/ ve components/ klasörleriyle bağlantı kurar.
---
## 6. **content.js** için 30 Talimat
1. Chrome uzantısının, WhatsApp Web gibi harici sitelerde çalıştırdığı script’tir.
2. Yan panel veya background’dan gelen mesajları dinler.
3. DOM’da WhatsApp mesaj kutusunu bulur ve veri enjekte edebilir.
4. Kullanıcı, panelden mesaj gönderdiğinde içeriği mesaj kutusuna ekler.
5. Diller arası geçiş veya karakter limiti burada kontrol edilebilir.
6. Mikrofonla alınan metni doğrudan DOM’a gösterebilir.
7. Arayüzden gelen “insertText” mesajı burada işlenir.
8. Veri eklerken DOM güvenliği için sanitize (XSS koruma) uygulanır.
9. Yalnızca izin verilen sitelerde (web.whatsapp.com) çalışacak şekilde ayarlanmalıdır.
10. İçerik eklemede ClipboardEvent ile yapıştırma simülasyonu yapılabilir.
11. DOM manipülasyonu sırasında hata yönetimiyle stabil çalışmalıdır.
12. Panelden gelen tüm komutlar burada ayrı fonksiyonlarla işlenir.
13. Hata durumunda arayüze uygun hata mesajı döndürmelidir.
14. DOM’da input kutusu değişirse script otomatik tekrar çalışacak şekilde güncellenmelidir.
15. Eklenen metin panelden gelen veriyle birebir eşleşmelidir.
16. Diğer kullanıcı aksiyonları (ör. seçili metni kopyalama) da burada tetiklenebilir.
17. Başka bir script veya uzantı ile çakışma olmaması için izole çalışmalıdır.
18. Kendi çalıştığını test etmek için konsola log yazabilir.
19. Uzun mesajlarda karakter limiti aşıldıysa hata döndürmelidir.
20. DOM güncellenirse tekrar mesaj ekleme deneyebilir.
21. Güvenlik açısından panel dışı komutları kabul etmemelidir.
22. Kullanıcıya başarılı ekleme veya hata mesajı dönmelidir.
23. Mesaj kutusu bulunamazsa, açık hata verip işlemi sonlandırmalıdır.
24. Panelden gelen özel komutlarla (ör. dilleri güncelle) DOM’da değişiklik yapabilir.
25. content.js yalnızca manifest’te belirtilen domainlerde çalışmalıdır.
26. Panelden veya popup’tan eklenen metni clipboard’a da kopyalayabilir.
27. Kodda gereksiz global değişkenler kullanılmamalıdır.
28. DOM elementine erişim yavaşsa retry mekanizması ile tekrar denenebilir.
29. Sonuçta eklenen metin, WhatsApp’ta kullanıcıya hemen görünmelidir.
30. Güvenlik ve hata kayıtları için konsola loglama yapılmalıdır.
**Bu kodun diğer kodlarla bağlantısı ve iletişim şekli:**
content.js, sadece panel veya background.js’den gelen mesajları işler. WhatsApp Web’in DOM’una veri enjekte eder. storage.js ile doğrudan bağlantısı yoktur ama gerekirse geçici veriyi background.js üzerinden okuyabilir. Hata ve bilgi mesajlarını yine background.js’e döner.
---
## 7. **storage.js veya utils/storage.js** için 30 Talimat
1. Tüm veri okuma/yazma işlemlerini merkezi olarak yönetir.
2. API anahtarı, kullanıcı tercihleri, asistanlar ve konuşma geçmişleri burada tutulur.
3. Fonksiyonlar async/await ile asenkron çalışmalıdır.
4. Chrome ortamı varsa `chrome.storage.local`, yoksa `localStorage` kullanmalıdır.
5. Tüm veri yazma işlemleri hata yönetimiyle korunmalıdır.
6. Veri okuma sırasında anahtar eksikse defaultValue döndürülmelidir.
7. Veri JSON.stringify/parse ile otomatik olarak işlenmelidir.
8. Büyük verilerde storage kapasite kontrolü yapılmalıdır.
9. Veri bütünlüğü için kayıttan önce format kontrolü olmalıdır.
10. API anahtarı gibi hassas veriler şifrelenmelidir.
11. Kullanıcı ayarları tek fonksiyonla toplu olarak kaydedilebilmelidir.
12. Farklı modüllerden gelen çoklu anahtar okuma desteklenmelidir.
13. Silme (remove) fonksiyonu, silmeden önce onay mekanizması desteklemelidir.
14. Tüm veriyi temizlemeden önce yedekleme fonksiyonu olabilir.
15. Geliştirici için debug modunda konsola veri loglanabilir.
16. Export/import fonksiyonu ile tüm veriler dışarı aktarılabilir.
17. Storage değişiklikleri event olarak arayüz bileşenlerine bildirilmelidir.
18. Her kayıt işlemi sonunda başarılı/başarısız geri dönüş sağlanmalıdır.
19. Kısa süreli geçici veriler için ayrı bir “session” alanı olabilir.
20. API token limiti ve kullanım verileri burada saklanabilir.
21. Otomatik yedekleme ve zamanlayıcı desteği (örn: haftalık backup).
22. Storage kapasite limitine ulaşıldığında kullanıcıya uyarı verir.
23. Eski veri şemalarını yeni yapıya migrate edebilir.
24. Silinen veya güncellenen verilerde rollback desteği sunulabilir.
25. Paneldeki arayüz değişiklikleri storage ile otomatik güncellenmelidir.
26. Tüm fonksiyonlar modüler ve bağımsız olarak çalışmalıdır.
27. Farklı ortamlar için (Chrome, Edge, Firefox) uyumluluk sağlamalıdır.
28. Erişimler sırasında locale/language farklılıklarına dikkat edilmelidir.
29. Günlük, haftalık veya aylık API kullanım özetini saklayabilir.
30. Testlerde kolayca mock edilebilecek şekilde tasarlanmalıdır.
**Bağlantı ve iletişim:**
storage.js, background.js, options.js, popup.js ve tüm React/Svelte componentleri ile veri alışverişi yapar. Content.js ile doğrudan bağlantısı yoktur. Her ayar ve veri değişimi burada merkezi olarak yönetilir, diğer modüller ile veri alışverişi Messaging ve Storage API ile yapılır.

## 8. **components/** Klasörü için 30 Talimat
## components/ Klasörü için Güncel ve Ayrıntılı Talimatlar

### Amaç:
Her ana işlev, görsel/etkileşimli UI elemanı, ayar veya mesaj yönetimi ayrı bir React component olarak modüler dosyada tutulur. Her bir component bağımsız, yeniden kullanılabilir, kolay test edilebilir ve erişilebilir olmalıdır.

---

### Ortak Kurallar
1. **Her component tek dosyada** ve default export ile sunulmalıdır.
2. **Props ile veri aktarımı** zorunlu, global state sadece Context veya Provider ile paylaşılır.
3. **İsimlendirme**: Her component büyük harfle ve açıklayıcı olmalı (`ChatPanel`, `Dropdown` vb.).
4. **Kendi stilini** Tailwind veya component bazlı CSS ile yönetmeli.
5. **Erişilebilirlik (a11y)** için ARIA etiketleri, label’lar ve odak yönetimi sağlanmalıdır.
6. **Debug ve test kolaylığı** için console.debug veya özel test id’leri eklenebilir.
7. **Kullanılan yardımcı fonksiyonlar** utils/helpers klasöründen import edilir.
8. **Yeniden kullanılabilirlik** önceliklidir; her component başka panelde, ayarda veya testte bağımsız çalışmalı.
9. **Yerelleştirme (locale)** props olarak alınmalı, hardcoded metin olmamalı.
10. **Her yeni component** önce index.js’ye export edilir.
---

### Bileşen Bazlı Teknik Talimatlar

#### ChatPanel.js
- Sohbet mesajlarını, giriş kutusunu ve model seçim dropdown’u içerir.
- messages (array), onSend (fn), models (array), onModelChange (fn), locale (obj) props olarak alınır.
- Her mesajı liste halinde gösterir; formdan yeni mesaj gönderimi ve input temizliği içerir.
- Model seçimi opsiyoneldir ve ayrı Dropdown ile yapılır.
- Koyu/açık tema uyumu ve responsive tasarım zorunludur.

#### Dropdown.js
- Tüm seçim menülerinde kullanılır; label, options, value, onChange props zorunlu.
- Option array’i [{label, value}] şeklinde gelir.
- Erişilebilirlik için ARIA label ekli olmalı.
- Seçim değişikliğinde props.onChange çağrılır.
- Tüm panellerde ve ayar sayfalarında yeniden kullanılabilir olmalı.

#### HistoryPanel.js
- Eski sohbet geçmişini (chats objesi), ve seçim olayını yönetir.
- Her sohbet başlığı ve son mesajı, zaman damgası ile gösterir.
- Boşsa “noHistory” locale ile bilgi döner.
- onSelectChat fonksiyonu props ile alınır ve tıklanan id’yi döndürür.

#### LoadingSpinner.js
- Her async işlemi sırasında, durum göstergesi olarak kullanılır.
- label props olarak alınır ve sadece aria/screen-reader için gösterilir.
- SVG animasyonlu, minimalist ve temaya uyumlu olmalı.

#### MicrophoneButton.js
- Sesli komut/mikrofon başlatma/durdurma için tek tuşlu UI.
- isRecording boolean ve onToggle fonksiyonu props olarak alınır.
- locale objesinden metinler gelir; erişilebilirlik etiketi zorunlu.

#### Modal.js
- Onay, uyarı veya bilgi kutusu olarak kullanılır.
- isOpen, title, message, confirmText, cancelText, onConfirm, onCancel props zorunlu.
- Açıkken dialog/modal standartlarını ve odak yönetimini uygular.

#### ModelManager.js
- Tüm model seçimlerinde (GPT-4, GPT-3.5, vb.) tek tip arayüz.
- models array, selected değer ve onSelect fonksiyonu props ile gelir.
- models boşsa locale.noModels ile bilgi döner.

#### Notification.js
- Bilgilendirme, hata, başarı, uyarı mesajlarını gösterir.
- message, type (info/success/warning/error), onClose props alınır.
- Kapatma butonu isteğe bağlıdır, erişilebilirlik için aria-label eklenir.
- Renk/tema tailwind ile yönetilir.

#### SettingsPanel.js
- Tüm ayar ve tema seçeneklerini (dropdown ile) yönetir.
- settings objesi ve onChange fonksiyonu props ile alınır.
- Tüm ayarlar, props veya global context ile güncellenebilir.
- Tema, bildirim ve diğer opsiyonlar ayrı dropdown olarak gösterilir.

#### index.js
- Tüm component’ler bu dosyadan tek tek export edilir.
- Her yeni component buraya eklenmeli.
- Otomatik test ve import kolaylığı sağlar.

---

### Kod ve Klasör Yapısı Notları

- Tüm component’ler components/ altında kendi dosyasında.
- Ortak kullanımda olanlar ayrıca “shared/” veya “ui/” alt klasörüne taşınabilir.
- component eklerken örnek kullanım (story/test), propTypes/TypeScript tipi veya jest testi eklenmesi önerilir.

---

### Bağlantılar
- **components/**, UI’yı oluşturur ve tüm storage, helpers, locales ve styles klasörleriyle entegredir.
- Veri ve ayar akışı her zaman props, context veya global state üzerinden olmalı.
- Hiçbir component doğrudan storage.js ile veri yazmaz/okumaz, sadece event/prop ile tetikler.

---

## Kısa Özet
> Her component **tekil, erişilebilir, test edilebilir, prop tabanlı ve tekrar kullanılabilir** olacak şekilde yazılır.  
> Yeni eklenen veya güncellenen component için bu agent.md kuralları güncellenir.

---
---

### Ek Teknik Standartlar ve Gelişmiş Uygulama Kuralları

- Her component, kendi stil dosyasını (örn. `ChatPanel.css` veya `Component.module.css`) ekleyebilir; stil izolasyonu ve dışa sızmayı engelleyecek şekilde yapılandırılır.
- Ayar veya props değişikliğiyle component’in güncel halini anında yansıtabilmesi için React re-render mantığı (örn. useState, useEffect, memo) net olarak uygulanmalı; gereksiz render’a dikkat edilmeli.
- API veya veri çağrısı gerekiyorsa, doğrudan component içinde değil; merkezi bir hook, context veya yardımcı fonksiyon (`useApi`, `apiHelpers` gibi) üzerinden yapılmalı, kod tekrarına izin verilmemelidir.
- Sadece o component’e özgü küçük yardımcı fonksiyonlar dosya içinde olabilir; ortak yardımcılar ve utility fonksiyonlar `utils/` veya `helpers/` klasöründe tutulmalı, gerektiğinde import edilmelidir.
- Kullanıcı arayüzünde durumlara (yükleniyor, hata, geçişler) uygun animasyon ve efektler (örn. Tailwind CSS, Framer Motion, React Transition Group) ile sağlanmalı; kullanıcı deneyimi güçlendirilmelidir.
- Props ve state tanımlamaları açık, okunabilir ve mümkünse PropTypes veya TypeScript ile belgelenmeli; gereksiz global değişkenlerden, belirsiz context bağımlılıklarından kaçınılmalıdır.
- Her component bağımsız şekilde test edilebilir olmalı; unit veya integration testler (örn. Jest, React Testing Library) ile en az temel bir test eklenmeli ve testler güncel tutulmalıdır.
- Ana panel ve büyük UI blokları (örn. ChatPanel, SettingsPanel, HistoryPanel) ana bileşen olarak ayrılmalı, fonksiyon ve görünürlük bakımından alt bileşenlere bölünebilir yapı tasarlanmalıdır.
- Component’lerin yaşam döngüsü açık şekilde kontrol edilmeli; mount, update ve unmount (örn. event listener, timer, subscription) işlemlerinde cleanup doğru şekilde uygulanmalıdır.

---


**Bağlantı ve iletişim:**
components/ tüm ana arayüzdür ve storage.js ile veri alışverişi yapar. Context Provider ile global state yönetir. background.js ve popup.js’den veri okuyabilir, options.js ile tüm ayarları paylaşır. Locales/ ile çeviri metinlerini, styles/ ile CSS’i yükler. Content.js ile doğrudan bağlantısı yoktur.
---
## 9. **styles/** Klasörü için 30 Talimat
1. Tüm özel ve genel CSS/SCSS/SASS dosyaları burada tutulur.
2. Genel panel tasarımı için ana bir dosya (örn. main.css) bulunmalıdır.
3. Koyu ve açık tema ayrı dosyalarda (dark.css, light.css) olabilir.
4. Responsive tasarım için ayrı bir dosya eklenebilir.
5. Her component kendi özel stil dosyasını burada barındırabilir.
6. Varsayılan yazı tipi ve font family burada tanımlanır.
7. Panel arka plan, buton, input ve bildirim renkleri burada standartlaşır.
8. Notification/alert kutuları için özel stiller olabilir.
9. Farklı platformlar (Win/Mac/Linux) için uyumlu CSS sağlanmalıdır.
10. Tailwind veya Bootstrap gibi utility-first framework desteği olabilir.
11. Sadece sidepanel için değil, popup ve options için de ortak stil dosyaları olmalıdır.
12. Scrollbar tasarımı özelleştirilebilir.
13. Animasyon ve geçiş efektleri için transition ve keyframe’ler eklenebilir.
14. Farklı dil ve yön (LTR/RTL) desteği için stil eklenmelidir.
15. Bileşenlerde dinamik class atamaları desteklenmelidir.
16. Aktif sekme, seçili buton gibi durumlar için özel CSS tanımı yapılmalıdır.
17. Arayüzde badge, chip, avatar gibi mini UI ögeleri için de stil tanımı olmalıdır.
18. Kullanıcı tema seçtiğinde anında değişiklik yansıtılmalıdır.
19. Medya sorguları ile farklı çözünürlüklere uyumlu olmalıdır.
20. CSS değişiklikleri kolay güncellenebilmelidir.
21. Kodun sürdürülebilirliği için yorum satırları eklenmelidir.
22. Sadece gerekli stiller import edilmelidir, gereksiz şişirme olmamalıdır.
23. Tema renk paleti değiştirilebilir olmalıdır.
24. Özelleştirilebilir border-radius, gölge, spacing gibi utility class’lar tanımlanabilir.
25. Bileşenlerin kendi default stilleri override edilebilir olmalıdır.
26. Hata durumunda kırmızı, başarı durumunda yeşil tonları kullanılmalıdır.
27. Aktif bildirim veya uyarı durumunda animasyon desteği eklenebilir.
28. Temel ikon ve bayrak görselleri ile uyumlu class’lar sağlanmalıdır.
29. Dokunmatik cihazlarda kolay kullanım için padding ve boyutlar optimize edilmelidir.
30. Panelin görsel bütünlüğü için style guide’a uygun olunmalıdır.

---

### styles/ Klasörü: Dosya Yapısı ve Modülerlik Standartları

- **Her büyük UI fonksiyonu için** (ör. panel, popup, options, modal, badge) ayrı bir stil dosyası (örn. `panel.css`, `popup.css`, `modal.css`) oluşturulmalıdır.
- **Her React component** için, isterse kendi özel stil dosyasını (örn. `ChatPanel.module.css`, `Notification.module.scss`) styles/ altında veya ilgili component dizininde barındırabilir.
- **Ana tema ve varyantlar** (ör. `light.css`, `dark.css`, `high-contrast.css`) ayrı dosyalarda tutulmalı; bunlara override ve değişiklik kolay olmalıdır.
- **Global değişkenler, utility class’lar ve mixin’ler** (`variables.css`, `utils.scss`) ayrı dosyada yönetilmelidir.
- **Platform ve cihaz uyumluluğu** için farklı breakpoint/medya sorgusu dosyaları (`responsive.css`), platform bazlı override dosyaları (örn. `win.css`, `mac.css`) eklenebilir.
- **Animasyon ve keyframe tanımları** (`animations.css`) ayrı bir dosyada gruplanabilir.
- **Tüm stiller** ana `main.css` veya `index.css` dosyasından merkezi olarak import edilmelidir.
- Gereksiz şişirme ve tekrar eden kod önlenmeli; sadece gerekli olan stiller, component’te veya globalde import edilmeli.
- Dosya isimlendirmeleri işlevi açıkça göstermeli, örneğin: `Badge.css`, `SidebarTheme.scss`, `Alert.module.css`.
**Bağlantı ve iletişim:**
styles/ doğrudan HTML ve React/Svelte bileşenlerinde kullanılır. Sidepanel.html, popup.html, options.html dosyaları ile birlikte yüklenir. components/ klasörüyle sıkı entegrasyon sağlar. Doğrudan scriptlerle (content.js, background.js) bağlantısı yoktur.
---

> **NOT:**  
> Otomatik veya manuel kod üreten (Codex, ChatGPT, Copilot vs.) tüm sistemler,  
> styles/ klasöründe component sayısına ve fonksiyonuna göre yeni dosya yaratabilir.  
> Hangi component, hangi stil dosyasına ihtiyaç duyuyorsa,  
> agent.md’de belirtilen standart ve isimlendirme kurallarına uygun şekilde eklenmelidir.

---

### Sonuç
- **Tek bir dosya yetmez:** Modern ve ölçeklenebilir sistem için çoklu, tematik, fonksiyonel CSS/SCSS/Tailwind dosyası zorunludur.
- **AI ve takım üyeleri** styles/ klasöründe yeni dosya yaratırken  
  *agent.md*’deki kuralları referans almalı,  
  isimlendirme, modülerlik ve işlev bütünlüğüne dikkat etmelidir.
**Bağlantı ve iletişim:**
styles/ doğrudan HTML ve React/Svelte bileşenlerinde kullanılır. Sidepanel.html, popup.html, options.html dosyaları ile birlikte yüklenir. components/ klasörüyle sıkı entegrasyon sağlar. Doğrudan scriptlerle (content.js, background.js) bağlantısı yoktur.
---
## 10. **locales/** Klasörü için 30 Talimat
1. Çok dilli destek için tüm çeviri metinleri bu klasörde tutulur.
2. Her dil için ayrı bir dosya olmalıdır (en.json, tr.json, fr.json).
3. Dosya yapısı anahtar-değer (key-value) biçiminde olmalıdır.
4. Tüm arayüz metinleri buradan çekilmelidir; hardcoded metin olmamalıdır.
5. Yeni bir dil eklemek için sadece yeni dosya eklenir.
6. Diller arası geçiş anında uygulanabilir olmalıdır.
7. Panel açıldığında otomatik olarak sistem dili algılanabilir.
8. Eksik çeviri durumunda varsayılan dile (örn. İngilizce) fallback yapılmalıdır.
9. Uyarı, bildirim, hata mesajları burada tutulur.
10. Komponentler props veya context ile dili alır, ilgili metni çeker.
11. Geliştirici ve çevirmenler için kolay güncellenebilir olmalıdır.
12. Çeviri anahtarları kısa, açıklayıcı ve tekil olmalıdır.
13. Dinamik metinler için (örn. {days} gün kaldı) template kullanılmalıdır.
14. JSON dosyaları kolayca parse edilmelidir.
15. Panel, popup ve options arayüzlerinde aynı çeviri kaynağı kullanılır.
16. Yerel tarih/saat formatı çeviri dosyalarında belirtilebilir.
17. Çeviri dosyalarının tamamı git’te takip edilmelidir.
18. Çok dilli yardım/SSS metinleri de burada tutulabilir.
19. Test için “dummy” (geçici) bir dil eklenebilir.
20. Farklı bölgeler için (örn. en-GB, en-US) varyant desteği eklenebilir.
21. Kullanıcı kendi tercih ettiği dili ayarlardan seçebilir.
22. Yeni sürümlerde eski anahtarlar güncellenmelidir.
23. Anahtarların tekrarsız olması sağlanmalıdır.
24. Farklı yazılım araçlarına kolayca entegre edilebilmelidir.
25. Her dil dosyası ayrı alt klasöre de ayrılabilir (örn. locales/en/strings.json).
26. Otomatik çeviri veya manuel çeviri desteği olabilir.
27. Dil dosyası bozuksa veya bulunamazsa uygulama çökmemelidir.
28. Kullanıcı arayüzünde dil isimleri ana dilinde gösterilmelidir.
29. Seçili dil tarayıcıda saklanıp, tekrar açıldığında uygulanmalıdır.
30. Çeviriler güncellenirken hot-reload veya bildirim desteği olabilir.
**Bağlantı ve iletişim:**
locales/ klasörü tüm UI componentleriyle, sidepanel.html, popup.html ve options.html ile bağlantılıdır. storage.js üzerinden seçili dil bilgisi alınabilir. Doğrudan scriptlerle bağlantısı yoktur, sadece UI tarafında import edilir ve kullanılır.
---
## 11. **utils/** veya **helpers/** Klasörü için 30 Talimat
1. Tekrar kullanılan yardımcı fonksiyonlar burada tutulur.
2. Tarih ve saat biçimlendirme için fonksiyonlar bulunur.
3. Dil algılama, otomatik çeviri için yardımcı metotlar olabilir.
4. Mikrofon başlat/durdur yardımcıları burada yazılır.
5. API çağrılarını kolaylaştıran genel fonksiyonlar eklenir.
6. Mesajlaşma (message passing) için kısa fonksiyonlar olabilir.
7. Hata yönetimi ve error log fonksiyonları burada saklanır.
8. Şifreleme/deşifreleme için kriptografik yardımcılar burada tutulur.
9. Token ve karakter limiti kontrol yardımcıları eklenir.
10. Panelde hızlı scroll, otomatik odak gibi pratik yardımcılar eklenebilir.
11. Dosya ve dizin işlemleri için yardımcı metotlar olabilir.
12. Koyu/açık tema geçişi için fonksiyonlar burada olabilir.
13. Kullanıcı arayüzünde renk, ikon, bayrak eşleştiriciler eklenebilir.
14. API kullanımı ve istatistik raporlama için yardımcı fonksiyonlar bulunur.
15. Farklı ortamlar (Chrome, Firefox) için ortam algılama yardımcıları yazılır.
16. Bileşenler arası props/state dönüştürücüler olabilir.
17. JSON ve veri yapısı kontrol yardımcıları eklenir.
18. Clipboard işlemleri (kopyala, yapıştır) için fonksiyonlar bulunur.
19. Ayarlar ve tercihleri kolayca almak için fonksiyonlar eklenir.
20. Performans ve bellek optimizasyonu için cache fonksiyonları olabilir.
21. Paneldeki sesli bildirimler için yardımcı fonksiyonlar eklenir.
22. Storage.js ile kolay veri okuma/yazma fonksiyonları sağlanır.
23. Kullanıcı aksiyonlarını loglamak için yardımcılar bulunur.
24. Komponentlerin daha sade kalmasını sağlar.
25. Her fonksiyon, bağımsız olarak import edilebilir olmalıdır.
26. Test ve debug amaçlı özel fonksiyonlar olabilir.
27. Kütüphanede örnek kullanımlar ve açıklama satırları yer almalıdır.
28. Gereksiz tekrar ve kod karmaşasını azaltır.
29. Takım çalışmasında yeni fonksiyonlar kolayca eklenebilir.
30. API hata kodlarını anlamlı mesaja çeviren yardımcılar olabilir.
**Bağlantı ve iletişim:**
utils/ klasörü, components/, storage.js, background.js, options.js ve diğer tüm JS dosyalarında import edilir. Locales, styles ve assets ile doğrudan bağlantısı yoktur.
---
## 12. **assets/** Klasörü için 30 Talimat


## 12. **assets/** Klasörü için 30 AI Yönelik Talimat

1. Her UI bölümünde kullanılan tüm ikon, logo ve medya dosyalarını assets/ klasörü altında depola.
2. Her önemli DOM, panel veya ayar menüsü için sabit bir rakam ve 🟢 emoji ile tanımlayıcı oluştur.
3. Tüm mapping’i `mapping.json` gibi merkezi bir dosyada numara-ikon alan eşleştirmesiyle tut.
4. Her numaraya karşılık gelen SVG için ayrı bir upload alanı UI’da göster.
5. Yönetici arayüzünde, SVG seçilmemişse ilgili 🟢+rakam ve alan adı önde, SVG seçilmişse SVG’nin önizlemesi göster.
6. Her SVG yüklendiğinde ilgili numarayı/placeholder’ı otomatik olarak yeni SVG ile değiştir.
7. Yönetici panelinde, mevcut mapping ve SVG eşleşmelerini tablo şeklinde göster.
8. Tüm uploadlar sadece SVG formatında kabul edilmeli; diğer formatlar (PNG, JPG) opsiyonel ve ikinci planda olsun.
9. Her SVG dosyasını yüklerken isimlendirme: `alanAdi_{numara}.svg` şeklinde olmalı.
10. Aynı anda birden fazla SVG yüklenmesine ve güncellenmesine izin ver.
11. Yönetici panelinde, hangi numaranın hangi UI öğesini temsil ettiğini açıkça göster (örn. 🟢1 = Ana Menü).
12. SVG eşleştirmelerinde, mapping numaraları daima görünür olmalı (yönetim/arayüz haritalama için).
13. Tüm mapping ve dosya ilişkilerini build aşamasında otomatik test et; eksik veya yanlış eşleşme uyarısı ver.
14. Kullanıcı tarafında, mapping numaraları gizlenmeli, sadece atanmış SVG ikonları görünmeli.
15. Her yeni ayar/menü için mapping.json ve UI’da yeni bir 🟢+rakam ve upload alanı ekle.
16. Tüm assets dosyalarını alt klasörlere ayır: `/icons/`, `/flags/`, `/onboarding/`, `/logos/` gibi.
17. Temaya özel ikonlar (light/dark) için mapping’de tema varyantı destekle (`anaMenu_light.svg`, `anaMenu_dark.svg`).
18. Dosya yüklenirken, mevcut SVG dosyası üzerine otomatik olarak overwrite uygula; eski dosyaları sürümle.
19. Mapping.json dosyasını UI/UX yöneticisinin kolay güncellemesi için sade ve açıklamalı tut.
20. Build sırasında sadece atanmış ve kullanılan SVG/asset dosyalarını dahil et; gereksiz medya build’e eklenmesin.
21. Her yeni özellik veya UI bölümü için mapping ve SVG eşleşmesi AI tarafından otomatik önerilsin.
22. Kullanıcıya gösterilecek tüm SVG’ler, yönetici panelinde kolayca güncellenebilir ve önizlenebilir olmalı.
23. Yüklü SVG dosyaları optimize edilerek (SVGO vb.) boyut küçültülmeli.
24. Gerektiğinde mapping.json’a kategori veya grup bilgisi eklenerek toplu yönetim kolaylaştırılmalı.
25. Farklı dil/bölge için farklı bayrak SVG mapping’i desteklenmeli (`flag_tr.svg`, `flag_fr.svg` gibi).
26. Tüm upload ve değişiklikler loglanmalı, sürüm geçmişi saklanmalı.
27. Assets klasörü, proje sürüm kontrolüne (git) tam entegre edilmeli; değişiklikler net izlenebilmeli.
28. Kullanıcıya açık arayüzde, mapping numaraları görünmemeli; sadece yönetici panelinde ve debug’da aktif olmalı.
29. Ayar ve ikon mapping yönetimi tamamen klavye ile erişilebilir olmalı; her rakamla hızlı seç ve yükle işlemi mümkün olmalı.
30. Assets/ mapping sisteminde her SVG dosyasının hangi UI alanında (panel, menü, bildirim, vs.) kullanılacağı AI tarafından otomatik dokümante edilmeli.

**Bağlantı ve iletişim:**  
assets/ ve mapping sistemi, UI componentleri, sidepanel, popup ve options ile entegre çalışır.  
SVG mapping, yönetici panelinde AI ile otomatik öneriler ve güncellemeler sağlar.  
Kullanıcı tarafında ise sadece atanmış SVG ikonları görünür; mapping numaraları yönetim için gizlenebilir şekilde tutulur.
---

### Yönetici Girişi ve Oturum Yönetimi için AI Talimatları

### Yönetici Girişi

1. Yönetici paneline erişim için kullanıcı adı **xxxxx**, şifre **xxxxxxx** olarak zorunlu tutulmalıdır.
2. İlk girişte kullanıcı adı ve şifreyi isteyen, sade ve güvenli bir login arayüzü oluştur.
3. Giriş başarılı olursa, oturum bilgisi (örn. bir JWT, session token veya localStorage flag) **1 ay boyunca** güvenli şekilde saklanmalı; tekrar giriş istenmemeli.
4. 1 ay dolunca, yönetici tekrar login ekranına yönlendirilmeli.
5. Oturum kontrolü için merkezi bir JS dosyası (`adminAuth.js` gibi) oluşturulabilir; burada giriş, oturum saklama, otomatik süresi dolmuş kontrolü yönetilir.
6. Her admin fonksiyonu çağrısında, geçerli oturum kontrol edilmeli; yoksa login ekranı tetiklenmeli.
7. Şifre ve kullanıcı adı arayüzde maskelenmeli; yanlış girişte açık hata mesajı gösterilmeli.
8. Oturum, localStorage/sessionStorage’da şifrelenmiş veya hash’lenmiş şekilde tutulmalı.
9. Oturum süresince admin ayarları, mapping upload ve yönetim paneli erişimi aktif olur.
10. Güvenlik için, 1 ay dolmadan admin elle çıkış yapmak isterse “Oturumu Kapat” butonu sunulmalı ve token silinmelidir.
11. Giriş ekranı ve oturum yönetimi sadece assets yönetici panelinde görünür olmalıdır; kullanıcıya hiçbir şekilde gösterilmemelidir.
12. Oturum kimliği yalnızca assets yönetimi ve mapping işlemlerinde kontrol edilir; diğer uygulama alanları için kullanılmaz.

**Not:**  
Bu sistem ile yönetici bir kere giriş yaptıktan sonra, bir ay boyunca tekrar login olmadan mapping ve SVG yönetim panelini tam erişimle kullanabilir.

**Bağlantı ve iletişim:**  
Yönetici giriş ve oturum sistemi, tüm yönetici yetkisi gerektiren paneller, fonksiyonlar ve değişkenler ile bağlantılıdır.  
Bu sistem; assets yönetimi, API anahtarı değişimi, uygulama ayarları, mapping işlemleri ve diğer tüm yönetici erişimi gerektiren modüller üzerinde aktiftir.  
Giriş ve oturum bilgisi merkezi şekilde tutulur; ilgili JS dosyası (`adminAuth.js` gibi) tüm yönetici panellerinde import edilerek kullanılır.  
Yalnızca oturumu geçerli yöneticiler hassas yönetimsel fonksiyonlara erişebilir; oturum sona erdiğinde veya geçersizse tekrar giriş istenir.


---


---

---
## 13. **README.md ve Dökümantasyon** için 30 Talimat
1. Projenin kısa tanımı ve temel amacı burada yazılmalıdır.
2. Uzantının işlevi ve çözüm sunduğu problemler açıklanmalıdır.
3. Klasör/dosya yapısı detaylı açıklanmalıdır.
4. Kurulum adım adım anlatılmalıdır.
5. Gerekli sistem gereksinimleri ve uyumluluk listelenmelidir.
6. API anahtarı nasıl alınır/girilir açıklanmalıdır.
7. Chrome’a manuel kurulum için yönergeler verilmelidir.
8. Geliştiriciler için “nasıl katkıda bulunulur” bölümü eklenmelidir.
9. Hata ayıklama ve debug için ipuçları verilmelidir.
10. Sık karşılaşılan sorunlar ve çözümler SSS olarak eklenmelidir.
11. Sürüm geçmişi (changelog) açıklanmalıdır.
12. Her dosyanın ve klasörün işlevi tek tek tanımlanmalıdır.
13
. Kendi API anahtarını gizli tutma ve saklama uyarısı olmalıdır.
14\. Ekstra entegrasyon veya uyumlu diğer servisler anlatılmalıdır.
15\. Güncel API fiyatlandırması ve maliyet kontrolü anlatılmalıdır.
16\. Kullanıcı ayarlarını sıfırlama ve temizleme adımları yazılmalıdır.
17\. Yenilik ve güncelleme notları tarih sırasına göre eklenmelidir.
18\. Proje açık kaynak ise lisans ve telif hakkı bilgisi eklenmelidir.
19\. Katılımcılar ve proje sahipleri listelenmelidir.
20\. Destek ve iletişim bilgileri bulunmalıdır.
21\. Tüm kod blokları açıklamalı olmalıdır.
22\. Projenin çalışma prensibi ve veri akışı şeması olmalıdır.
23\. Farklı dilde kullanım için ekstra bilgi eklenmelidir.
24\. Build, test ve deploy adımları net yazılmalıdır.
25\. Versiyonlama ve güncelleme politikası açıklanmalıdır.
26\. Güvenlik ve gizlilik uyarıları olmalıdır.
27\. Performans iyileştirme önerileri yer almalıdır.
28\. Geliştirici ortamında özel notlar eklenmelidir.
29\. Kullanıcıların hata raporlaması için özel form veya mail adresi belirtilmelidir.
30\. Proje gelişimine dair yol haritası eklenmelidir.
**Bağlantı ve iletişim:**
README.md geliştirici, kullanıcı ve yeni katkı yapmak isteyen herkes için ana başvuru kaynağıdır. Diğer tüm dosyaların kullanımını, bağlantılarını ve ilişkilerini detaylıca açıklar. 


---

## Sonuç

Ajan Nil Chrome Uzantısı, **en modern, güvenli, esnek ve uzun ömürlü WhatsApp Web asistanı** için ihtiyacın olan tüm dokümantasyon, teknolojik altyapı ve dosya mimarisi burada bir aradadır.

> **Devamında her dosyanın teknik detaylarına bu AGENT.md üzerinden ulaşabilir, gerektiğinde dosya bazlı geliştirme ve test talimatı ekleyebilirsin.**
