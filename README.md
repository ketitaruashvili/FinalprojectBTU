# Alpinda Explore — საგამოცდო პროექტი

ინტერაქტიული ვებ-აპლიკაცია: ცოცხალი ამინდი საქართველოს ლაშქრობის ბილიკებზე + პირადი
"გეგმის" სია (localStorage). ეგივე ბრენდი/დიზაინი, რაც შუალედურ პროექტში (Alpinda),
გაფართოებული JS ფუნქციონალით.

## ფაილების სტრუქტურა
```
wanderly-exam/
├── index.html        ← მთავარი + ცოცხალი ამინდის სნეპშოტი
├── explore.html       ← ბილიკის არჩევა + ამინდის fetch + wishlist-ში დამატება
├── wishlist.html       ← "ჩემი გეგმა" — localStorage-დან წაკითხული სია
├── contact.html
├── css/
│   ├── style.css
├── assets/
│   └── alpinda-logo.svg  ← ლოგო (ჩაანაცვლეთ საკუთარი ფოტო/ლოგოთი)
└── js/
    ├── trails-data.js  ← ბილიკების მონაცემები + localStorage helper-ები
    ├── weather.js       ← fetch/async-await Open-Meteo API-სთან
    ├── explore.js        ← explore.html-ის ლოგიკა
    ├── wishlist.js        ← wishlist.html-ის ლოგიკა
    └── main.js             ← ბურგერი, header-on-scroll, scroll-to-top, cookie banner
```

## დავალების მოთხოვნები — checklist
- [x] სემანტიკური HTML5 თეგები
- [x] hover ეფექტები / transitions
- [x] Responsive 1024/768/480/320px
- [x] ფონტები (Google Fonts)
- [x] ბურგერის ფუნქციონალი (`js/main.js`)
- [x] სერვერიდან მონაცემი — `fetch` + `async/await` (`js/weather.js`, Open-Meteo API)
- [x] დამატებითი JS ლოგიკა (მოთხოვნილია მინ. 1, განხორციელებულია 3):
      header-ის ფონის ცვლილება სქროლზე, scroll-to-top, scroll-reveal ანიმაცია
- [x] localStorage — "ჩემი გეგმა" (wishlist) + cookie-consent ბანერი
      (Accept-ზე დაჭერის შემდეგ ბანერი მეტად არ ჩვენდება)
- [x] მინიმუმ 3-4 HTML გვერდი → გვაქვს 4 (index, explore, wishlist, contact)
- [x] არც jQuery, არც Bootstrap JS გამოყენებული არ არის

## API, რომელიც გამოყენებულია
**Open-Meteo** (https://open-meteo.com/) — არ ითხოვს API key-ს, არ აქვს CORS პრობლემები,
უფასოა non-commercial გამოყენებისთვის (10 000 request/დღეში). ენდპოინტი:
```
GET https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true
```

## ლოკალურად გაშვება
უბრალოდ გახსენით `index.html` ბრაუზერში. fetch მუშაობს `file://`-დანაც, რადგან
Open-Meteo-ს API-ს არ აქვს CORS შეზღუდვა — თუმცა რჩევაა გამოიყენოთ Live Server.

## GitHub Pages
იგივე ნაბიჯები, რაც შუალედური პროექტის README-შია — `git init/add/commit/push`,
შემდეგ **Settings → Pages → Source: main**.

## ლოგოს შეცვლა
ნავიგაციაში ამჟამად დევს ჩემ მიერ შექმნილი მინიმალისტური ლოგო-ნიშანი
(`assets/alpinda-logo.svg` — მთის სილუეტი წრეში, ბრენდის ფერებში).
საკუთარი ფოტო/ლოგოს ჩასასმელად უბრალოდ:
1. ჩადეთ თქვენი სურათი (`.svg`, `.png` ან `.jpg`) `assets/` ფოლდერში.
2. ყველა HTML ფაილში (`index.html`, `explore.html`, `wishlist.html`, `contact.html`)
   იპოვეთ ხაზი:
   ```html
   <img class="brand__mark" src="assets/alpinda-logo.svg" alt="Alpinda Explore">
   ```
   და შეცვალეთ `src="assets/alpinda-logo.svg"` თქვენი ფაილის სახელით,
   მაგ. `src="assets/my-logo.png"`.
3. ლოგო ავტომატურად დამრგვალდება წრედ და ჩაეტევა 30×30px ზომაში
   (`object-fit: cover` — თუ ფოტო კვადრატული არ არის, ის ცენტრიდან მოიჭრება).
