/* ==========================================================================
   ALPINDA EXPLORE — explore.js  (მხოლოდ explore.html-ისთვის)
   1. ბილიკის ჩამონათვალის შევსება <select>-ში TRAILS მასივიდან
   2. ფორმის submit-ზე ცოცხალი ამინდის fetch + ბილიკის ბარათის ჩვენება
   3. "სიაში დამატება" ღილაკი → localStorage (wishlist)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const form       = document.getElementById("exploreForm");
  const select      = document.getElementById("trailSelect");
  const resultBlock = document.getElementById("trailResult");
  const weatherCard = document.getElementById("weatherCard");
  const trailInfo   = document.getElementById("trailInfo");
  const wishBtn     = document.getElementById("wishlistBtn");

  if (!form || !select) return;

  // 1) <select>-ის შევსება TRAILS მონაცემებით (trails-data.js-დან)
  TRAILS.forEach(trail => {
    const opt = document.createElement("option");
    opt.value = trail.id;
    opt.textContent = `${trail.name} — ${trail.region}`;
    select.appendChild(opt);
  });

  let currentTrailId = null;

  function refreshWishlistButton() {
    if (!currentTrailId) return;
    const saved = isInWishlist(currentTrailId);
    wishBtn.textContent = saved ? "✓ სიაშია — წაშლა" : "+ ჩემს გეგმაში დამატება";
    wishBtn.classList.toggle("btn--ghost", !saved);
    wishBtn.classList.toggle("btn--danger", saved);
  }

  // 2) ფორმის გაგზავნა → ბილიკის ბარათის + ცოცხალი ამინდის ჩვენება
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const trail = TRAILS.find(t => t.id === select.value);
    if (!trail) return;

    currentTrailId = trail.id;
    resultBlock.style.display = "grid";

    trailInfo.innerHTML = `
      <span class="card__tag">${trail.region}</span>
      <h3>${trail.name}</h3>
      <div class="card__meta">
        <span>↑ ${trail.elevation}</span>
        <span>⏱ ${trail.duration}</span>
        <span>● ${trail.difficulty}</span>
      </div>`;

    refreshWishlistButton();

    // weather.js-ში განსაზღვრული ფუნქცია — async/await ეფექტურად
    // ელოდება Open-Meteo-ს პასუხს და ავსებს ბარათს
    await renderWeatherCard(weatherCard, trail.lat, trail.lon);
  });

  // 3) wishlist toggle
  wishBtn.addEventListener("click", () => {
    if (!currentTrailId) return;
    if (isInWishlist(currentTrailId)) {
      removeFromWishlist(currentTrailId);
    } else {
      addToWishlist(currentTrailId);
    }
    refreshWishlistButton();
  });

});
