var TRAILS = [
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

var WEATHER_CODES = {
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
  if (WEATHER_CODES[code]) {
    return WEATHER_CODES[code];
  } else {
    return { label: "უცნობი ამინდი", icon: "🌡️" };
  }
}

var WISHLIST_KEY = "alpinda_wishlist";

function getWishlist() {
  try {
    var raw = localStorage.getItem(WISHLIST_KEY);
    if (raw) {
      return JSON.parse(raw);
    } else {
      return [];
    }
  } catch (e) {
    return [];
  }
}

function isInWishlist(trailId) {
  var list = getWishlist();
  return list.indexOf(trailId) !== -1;
}

function addToWishlist(trailId) {
  var list = getWishlist();
  if (list.indexOf(trailId) === -1) {
    list.push(trailId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  }
}

function removeFromWishlist(trailId) {
  var oldList = getWishlist();
  var newList = [];

  for (var i = 0; i < oldList.length; i++) {
    if (oldList[i] !== trailId) {
      newList.push(oldList[i]);
    }
  }

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(newList));
}
