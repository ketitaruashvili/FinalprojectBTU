/* ==========================================================================
   ALPINDA EXPLORE — trails-data.js
   ბილიკების მონაცემთა ბაზა (JS ობიექტების მასივი) + localStorage helper-ები.
   ეს ფაილი ჩაირთვება ყველა გვერდზე, რათა ერთი წყარო ემსახურებოდეს
   index.html-ს, explore.html-ს და wishlist.html-ს.
   ========================================================================== */

// თითოეულ ბილიკს აქვს ნამდვილი (მიახლოებითი) კოორდინატები —
// ეს გვაძლევს საშუალებას ვიწვიოთ ცოცხალი ამინდის API ზუსტ წერტილზე.
const TRAILS = [
  {
    id: "gergeti",
    name: "გერგეტის მყინვარი",
    region: "ყაზბეგი",
    lat: 42.6601,
    lon: 44.6175,
    difficulty: "საშუალო",
    duration: "6-7სთ",
    elevation: "900მ",
  },
  {
    id: "koruldi",
    name: "კორულდის ტბები",
    region: "სვანეთი",
    lat: 43.0444,
    lon: 42.7185,
    difficulty: "რთული",
    duration: "7-8სთ",
    elevation: "1100მ",
  },
  {
    id: "atsunta",
    name: "აწუნთის უღელტეხილი",
    region: "თუშეთი",
    lat: 42.3833,
    lon: 45.6333,
    difficulty: "რთული",
    duration: "3 დღე",
    elevation: "1500მ",
  },
  {
    id: "borjomi",
    name: "ნაკრძალის რგოლი",
    region: "ბორჯომი-ხარაგაული",
    lat: 41.8398,
    lon: 43.3998,
    difficulty: "მარტივი",
    duration: "5სთ",
    elevation: "650მ",
  },
  {
    id: "mtirala",
    name: "მტირალას ჯუნგლები",
    region: "მტირალა, ბათუმი",
    lat: 41.7151,
    lon: 41.7903,
    difficulty: "მარტივი",
    duration: "3-4სთ",
    elevation: "400მ",
  },
  {
    id: "ninigori",
    name: "ნინიგორის ტბა",
    region: "ლაგოდეხი",
    lat: 41.8264,
    lon: 46.2974,
    difficulty: "რთული",
    duration: "2 დღე",
    elevation: "1200მ",
  },
];

// Open-Meteo-ის weathercode → მოკლე ქართული აღწერა + ემოჯი-აიქონი.
// (Open-Meteo არ ითხოვს API key-ს და თავსებადია CORS-თან — იდეალურია სასწავლო პროექტისთვის)
const WEATHER_CODES = {
  0: { label: "კრიალა", icon: "☀️" },
  1: { label: "ნაწილობრივ მოწმენდილი", icon: "🌤️" },
  2: { label: "ღრუბლიანი", icon: "⛅" },
  3: { label: "მოღრუბლული", icon: "☁️" },
  45: { label: "ნისლი", icon: "🌫️" },
  48: { label: "ხშირი ნისლი", icon: "🌫️" },
  51: { label: "მცირე წვიმა", icon: "🌦️" },
  61: { label: "წვიმა", icon: "🌧️" },
  71: { label: "მცირე ნამქერი", icon: "🌨️" },
  73: { label: "ნამქერი", icon: "🌨️" },
  75: { label: "ძლიერი ნამქერი", icon: "❄️" },
  80: { label: "წვიმის შხაპუნი", icon: "🌧️" },
  95: { label: "ჭექა-ქუხილი", icon: "⛈️" },
};

function weatherLabelFor(code) {
  return WEATHER_CODES[code] || { label: "უცნობი ამინდი", icon: "🌡️" };
}

/* ---------- LOCALSTORAGE WISHLIST HELPERS ----------
   ვინახავთ მხოლოდ trail ID-ების მასივს localStorage-ში key="alpinda_wishlist"-ით.
   JSON.stringify/parse გვაძლევს მასივის შენახვა-წაკითხვის საშუალებას,
   რადგან localStorage მხოლოდ string-ებს ინახავს. */
const WISHLIST_KEY = "alpinda_wishlist";

function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isInWishlist(trailId) {
  return getWishlist().includes(trailId);
}

function addToWishlist(trailId) {
  const list = getWishlist();
  if (!list.includes(trailId)) {
    list.push(trailId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }
}

function removeFromWishlist(trailId) {
  const list = getWishlist().filter((id) => id !== trailId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
}
