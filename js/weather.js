/* ==========================================================================
   ALPINDA EXPLORE — weather.js
   სერვერიდან ცოცხალი ინფორმაციის მიღება (DOMESTIC REQUIREMENT: fetch / async-await).
   API: Open-Meteo (https://open-meteo.com/) — უფასო, არ ითხოვს API key-ს,
   მუშაობს CORS-ის გარეშე პრობლემების.
   ========================================================================== */

/**
 * აბრუნებს მოცემული კოორდინატის ამინდს Open-Meteo-დან.
 * async/await სინტაქსი fetch-ის Promise-ს კითხვადად გარდაქმნის.
 */
async function fetchCurrentWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`სერვერმა დააბრუნა სტატუსი ${response.status}`);
  }

  const data = await response.json();
  // data.current_weather = { temperature, windspeed, weathercode, time, ... }
  return data.current_weather;
}

/**
 * ავსებს weather-card ბლოკს მონაცემებით ან აჩვენებს შეცდომის მდგომარეობას.
 * @param {HTMLElement} cardEl - .weather-card ელემენტი
 * @param {number} lat
 * @param {number} lon
 */
async function renderWeatherCard(cardEl, lat, lon) {
  if (!cardEl) return;

  cardEl.classList.add("is-loading");
  cardEl.classList.remove("is-error");

  const iconEl = cardEl.querySelector(".weather-card__icon");
  const tempEl = cardEl.querySelector(".weather-card__temp");
  const metaEl = cardEl.querySelector(".weather-card__meta");

  try {
    const weather = await fetchCurrentWeather(lat, lon);
    const { label, icon } = weatherLabelFor(weather.weathercode);

    iconEl.textContent = icon;
    tempEl.textContent = `${Math.round(weather.temperature)}°C`;
    metaEl.textContent = `${label} · ქარი ${Math.round(weather.windspeed)} კმ/სთ`;
  } catch (err) {
    cardEl.classList.add("is-error");
    iconEl.textContent = "⚠️";
    tempEl.textContent = "—";
    metaEl.textContent = "ამინდის მონაცემი ამჟამად მიუწვდომელია";
    console.error("Weather fetch failed:", err);
  } finally {
    cardEl.classList.remove("is-loading");
  }
}
