// Sitedeki tüm içerik burada. `draft: true` = tahmini/taslak metin, hoca ile kontrol edilmeli.

export const brand = {
  name: "GNG Akademi",
  teacher: "Yusuf Gündoğan",
  tagline: "KPSS · YKS · LGS Matematik",
};

export const socials = [
  { id: "youtube", label: "YouTube", handle: "@gngakademi", href: "https://www.youtube.com/@Gngakademi" },
  { id: "instagram", label: "Instagram", handle: "@gngakademii", href: "https://www.instagram.com/gngakademii/" },
  { id: "tiktok", label: "TikTok", handle: "@gng.akademi", href: "https://www.tiktok.com/@gng.akademi" },
] as const;

export const contact = {
  phone: "0537 873 44 44",
  tel: "tel:+905378734444",
  whatsapp: `https://wa.me/905378734444?text=${encodeURIComponent("Merhaba, GNG Akademi web sitesinden yazıyorum. Özel ders hakkında bilgi almak istiyorum.")}`,
  dm: "https://ig.me/m/gngakademii",
  subscribe: "https://www.youtube.com/@Gngakademi?sub_confirmation=1",
};

export const nav = [
  { href: "#sinavlar", label: "Sınavlar" },
  { href: "#videolar", label: "Videolar" },
  { href: "#yontem", label: "Yöntem" },
  { href: "#platform", label: "Platform" },
  { href: "#sss", label: "SSS" },
];

export const hero = {
  left: "Matematik",
  right: "çözülür.",
  metaTL: "KPSS · YKS · LGS",
  metaTR: "Yusuf Gündoğan",
  metaBL: "Konu anlatımı, soru çözümü ve birebir özel ders.",
  eyebrow: "GNG Akademi · Matematik",
  title: ["Her soru,", "adım adım çözülür."] as [string, string],
  lead: "Ezber formül yerine mantığı kuran dersler. Sınavına göre plan, soruna göre çözüm.", // draft
};

export const topics = [
  "Temel Kavramlar", "Sayı Basamakları", "Bölme · Bölünebilme", "Rasyonel Sayılar", "Üslü Sayılar",
  "Köklü Sayılar", "Mutlak Değer", "Oran · Orantı", "Problemler", "Kümeler", "Fonksiyonlar",
  "Polinomlar", "Permütasyon", "Olasılık", "Sayısal Mantık", "Türev", "İntegral", "Logaritma",
  "Trigonometri", "Diziler", "Geometri", "Veri Analizi",
];

export const exams = [
  {
    id: "lgs",
    code: "LGS",
    tone: "cyan",
    level: "8. sınıf",
    title: "Liselere Geçiş Sınavı",
    text: "Yeni nesil sorulara alışmak için konu temeli + bol soru çözümü. Okul müfredatıyla birlikte ilerleyen, sınava doğru hızlanan bir tempo.",
    units: ["Çarpanlar ve Katlar", "Üslü İfadeler", "Kareköklü İfadeler", "Veri Analizi", "Olasılık", "Cebirsel İfadeler", "Doğrusal Denklemler", "Eşitsizlikler", "Üçgenler", "Eşlik ve Benzerlik", "Dönüşüm Geometrisi", "Geometrik Cisimler"],
    formula: "√48 = 4√3",
  },
  {
    id: "yks",
    code: "YKS",
    tone: "magenta",
    level: "TYT · AYT",
    title: "Yükseköğretim Kurumları Sınavı",
    text: "TYT'de hız ve doğruluk, AYT'de derinlik. Temel matematikten türev-integrale kadar konu konu anlatım ve deneme analizleri.",
    units: ["Temel Kavramlar", "Problemler", "Fonksiyonlar", "Polinomlar", "Permütasyon · Kombinasyon", "Olasılık", "Logaritma", "Diziler", "Trigonometri", "Limit · Türev", "İntegral"],
    formula: "f′(x) = 2x − 4",
  },
  {
    id: "kpss",
    code: "KPSS",
    tone: "gold",
    level: "Ortaöğretim · Önlisans · Lisans",
    title: "Kamu Personeli Seçme Sınavı",
    text: "Genel Yetenek matematiğinde kısa yol ve doğru strateji. Çıkmış soru çözümleri ve zamanı yöneten soru tipleri.",
    units: ["Temel Kavramlar", "Sayılar", "Rasyonel Sayılar", "Üslü · Köklü Sayılar", "Mutlak Değer", "Oran · Orantı", "Problemler", "Sayısal Mantık", "Tablo · Grafik", "Geometri"],
    formula: "|x − |x|| = 16",
  },
];

export const manifesto =
  "Matematik ezberlenecek bir formül yığını değil; doğru sırayla kurulan bir düşünme biçimi. GNG Akademi'de her konu temelden başlar, her soru tahtada adım adım çözülür ve her öğrenci kendi hızında ilerler."; // draft

export const featuredVideo = {
  id: "MpX9vr8sFAc",
  title: "KPSS 2026 Önlisans Matematik Çözümleri",
  date: "4 Ekim 2026",
  thumb: "/images/video-kpss.jpg",
};

// draft: hocanın gerçek çalışma şekline göre güncellenecek
export const method = [
  { n: "01", title: "Seviye tespiti", text: "Kısa bir ön görüşme ve tanılama sorularıyla eksik konuları buluyoruz.", icon: "target" },
  { n: "02", title: "Kişisel plan", text: "Sınav tarihine ve günlük çalışma süresine göre haftalık bir konu planı.", icon: "plan" },
  { n: "03", title: "Birebir ders", text: "Konu anlatımı ve soru çözümü; öğrencinin sorusu dersin merkezinde.", icon: "board" },
  { n: "04", title: "Video tekrar", text: "Çözülen soru tipleri video olarak tekrar izlenebilir.", icon: "play" },
  { n: "05", title: "Deneme & analiz", text: "Deneme sonuçlarına göre plan güncellenir, zayıf konulara dönülür.", icon: "chart" },
];

// draft: ücretli video platformu (sonraki aşama) için tanıtım
export const platform = {
  features: [
    { title: "Konu konu video dersler", text: "LGS, YKS ve KPSS müfredatına göre sıralanmış anlatımlar." },
    { title: "Soru çözüm arşivi", text: "Çıkmış sorular ve yeni nesil soru tipleri, adım adım." },
    { title: "Kaldığın yerden devam", text: "İzlediğin dersler ve ilerlemen hesabında saklanır." },
  ],
  lessons: [
    { t: "Mutlak Değer · Temel", d: "12:40", s: "done" },
    { t: "Mutlak Değer · Soru Çözümü", d: "18:05", s: "now" },
    { t: "Üslü Sayılar · Temel", d: "14:22", s: "lock" },
    { t: "Köklü Sayılar · Temel", d: "16:10", s: "lock" },
    { t: "Oran · Orantı", d: "11:58", s: "lock" },
  ],
};

export const faq = [
  { q: "Hangi sınavlara hazırlık var?", a: "LGS (8. sınıf), YKS (TYT ve AYT matematik) ve KPSS (Genel Yetenek matematik: ortaöğretim, önlisans, lisans)." },
  { q: "Özel ders için nasıl iletişime geçerim?", a: "0537 873 44 44 numarasından arayabilir ya da WhatsApp'tan yazabilirsin; Instagram'da @gngakademii hesabından da ulaşabilirsin. Sınavını, sınıfını ve uygun olduğun günleri yazman yeterli." },
  { q: "Ders ücretleri ne kadar?", a: "Ders sayısı ve sınav türüne göre değişiyor. Mesaj attığında güncel bilgiyi paylaşıyoruz." },
  { q: "Videolar ücretsiz mi?", a: "YouTube kanalındaki çözüm videoları ücretsiz. Konu konu ilerleyen kapsamlı ders arşivi için GNG Akademi platformu hazırlanıyor." },
  { q: "Platform ne zaman açılıyor?", a: "Çok yakında. Açıldığında ilk haberi Instagram ve YouTube'dan duyuracağız; takipte kal." },
];
