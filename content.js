// content.js
// This script is injected via manifest.json. No build process required.
// 1. Dosya Amacı: Yalnızca web.whatsapp.com URL'sinde çalışacak içerik script'i.
// Bu script, uzantı arayüzü ile WhatsApp sayfası arasında bir köprü görevi görür.

/**
 * 17. Güvenlik: XSS zafiyetlerine karşı gelen metni temizler.
 * Bu fonksiyon, zararlı HTML etiketlerini ve JavaScript'i etkisiz hale getirir.
 * NOT: Üretim ortamında DOMPurify gibi profesyonel bir kütüphane kullanılması tavsiye edilir.
 * @param {string} text - Temizlenecek metin.
 * @returns {string} Güvenli metin.
 */
const sanitizeText = (text) => {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = text;
    return tempDiv.innerHTML;
};

/**
 * 18. Teknik Detay: Bir metni contenteditable alana yapıştırmak için modern bir yöntem.
 * document.execCommand'in yerine, Clipboard API'sine benzer bir yapı kullanılır.
 * @param {HTMLElement} element - Metnin ekleneceği DOM elementi.
 * @param {string} text - Eklenecek metin.
 */
const insertTextIntoInputBox = (element, text) => {
    // Veriyi DataTransfer objesine yerleştirme.
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text/plain', text);

    // Yeni bir 'paste' olayı oluşturma.
    const pasteEvent = new ClipboardEvent('paste', {
        clipboardData: dataTransfer,
        bubbles: true
    });
    
    // Olayı elementi üzerinde tetikleme.
    element.focus();
    element.dispatchEvent(pasteEvent);
};

// 2. Mesaj Dinleme: background.js'den gelen mesajları dinleyen dinleyici.
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        // 3. İşlevsellik: Mesajın aksiyon parametresini kontrol et.
        if (request.action === 'insertText') {
            // 4. Metin Ekleme: Gelen mesajdaki metni al ve temizle.
            const sanitizedText = sanitizeText(request.text);
            
            // 5. DOM Elemanı Bulma: Metin kutusunu bulmaya çalış.
            // 6. Robust DOM Bulucu: getWhatsAppInputBox gibi bir yardımcı fonksiyon burada kullanılabilir.
            // WhatsApp'ın DOM yapısı sık sık değişebilir, bu nedenle dayanıklı seçiciler kullanmak önemlidir.
            const inputBox = document.querySelector('div[contenteditable="true"][data-tab="1"]');
            
            // 7. Metin Ekleme Mekanizması: DOM elementine metin ekle.
            if (inputBox) {
                try {
                    // 13. Veri Kontrolü: Metnin geçerli olduğundan emin ol.
                    if (sanitizedText.length > 0) {
                        insertTextIntoInputBox(inputBox, sanitizedText);
                        // 10. Başarı Bildirimi: İşlem başarılı olursa background.js'e bildir.
                        sendResponse({ success: true, message: 'Metin başarıyla eklendi.' });
                    } else {
                        // 9. Geri Bildirim: Metin geçersizse hata gönder.
                        console.error('Gönderilen metin boş veya geçersiz.');
                        sendResponse({ success: false, error: 'Metin boş veya geçersiz.' });
                    }
                } catch (domError) {
                    // 8. Hata Yönetimi (DOM): DOM manipülasyon hatasını yakala.
                    // 20. Detaylı Loglama: Hata loguna stack trace eklenerek daha detaylı bilgi sağlanır.
                    console.error('Metin ekleme sırasında DOM hatası:', domError.stack || domError);
                    sendResponse({ success: false, error: 'Metin eklenirken bir DOM hatası oluştu.' });
                }
            } else {
                // 8. Hata Yönetimi (DOM): Mesaj kutusu bulunamazsa hata yakala.
                console.error('WhatsApp mesaj kutusu bulunamadı.');
                sendResponse({ success: false, error: 'Mesaj kutusu bulunamadı.' });
            }
        }
        // Asenkron yanıt bekleme
        return true; 
    }
);
