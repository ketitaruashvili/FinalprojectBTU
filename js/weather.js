async function fetchCurrentWeather(lat, lon) {
  var url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&current_weather=true";

  var response = await fetch(url);

  if (!response.ok) {
    throw new Error("სერვერმა დააბრუნა სტატუსი " + response.status);
  }

  var data = await response.json();
  return data.current_weather;
}

async function renderWeatherCard(cardEl, lat, lon) {
  if (!cardEl) return;

  cardEl.classList.add("is-loading");
  cardEl.classList.remove("is-error");

  var iconEl = cardEl.querySelector(".weather-card__icon");
  var tempEl = cardEl.querySelector(".weather-card__temp");
  var metaEl = cardEl.querySelector(".weather-card__meta");

  try {
    var weather = await fetchCurrentWeather(lat, lon);
    var info = weatherLabelFor(weather.weathercode); // ეს ფუნქცია trails-data.js-შია

    iconEl.textContent = info.icon;
    tempEl.textContent = Math.round(weather.temperature) + "°C";
    metaEl.textContent =
      info.label + " · ქარი " + Math.round(weather.windspeed) + " კმ/სთ";
  } catch (err) {
    // თუ რაიმე ვერ ჩაიტვირთა — ვაჩვენებთ შეცდომის მდგომარეობას
    cardEl.classList.add("is-error");
    iconEl.textContent = "⚠️";
    tempEl.textContent = "—";
    metaEl.textContent = "ამინდის მონაცემი ამჟამად მიუწვდომელია";
    console.error("Weather fetch failed:", err);
  } finally {
    cardEl.classList.remove("is-loading");
  }
}
