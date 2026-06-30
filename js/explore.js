document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("exploreForm");
  var select = document.getElementById("trailSelect");
  var resultBlock = document.getElementById("trailResult");
  var weatherCard = document.getElementById("weatherCard");
  var trailInfo = document.getElementById("trailInfo");
  var wishBtn = document.getElementById("wishlistBtn");

  if (!form || !select) return;

  /* 1) ვავსებთ <select>-ს ბილიკებით TRAILS მასივიდან ( trails-data.js) */
  for (var i = 0; i < TRAILS.length; i++) {
    var trail = TRAILS[i];
    var option = document.createElement("option");
    option.value = trail.id;
    option.textContent = trail.name + " — " + trail.region;
    select.appendChild(option);
  }

  var currentTrailId = null;

  function refreshWishlistButton() {
    if (!currentTrailId) return;

    var saved = isInWishlist(currentTrailId);

    if (saved) {
      wishBtn.textContent = "✓ სიაშია — წაშლა";
      wishBtn.classList.remove("btn--ghost");
      wishBtn.classList.add("btn--danger");
    } else {
      wishBtn.textContent = "+ ჩემს გეგმაში დამატება";
      wishBtn.classList.add("btn--ghost");
      wishBtn.classList.remove("btn--danger");
    }
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    var chosenTrail = null;
    for (var i = 0; i < TRAILS.length; i++) {
      if (TRAILS[i].id === select.value) {
        chosenTrail = TRAILS[i];
        break;
      }
    }
    if (!chosenTrail) return;

    currentTrailId = chosenTrail.id;
    resultBlock.style.display = "grid";

    trailInfo.innerHTML =
      '<span class="card__tag">' +
      chosenTrail.region +
      "</span>" +
      "<h3>" +
      chosenTrail.name +
      "</h3>" +
      '<div class="card__meta">' +
      "<span>↑ " +
      chosenTrail.elevation +
      "</span>" +
      "<span>⏱ " +
      chosenTrail.duration +
      "</span>" +
      "<span>● " +
      chosenTrail.difficulty +
      "</span>" +
      "</div>";

    refreshWishlistButton();

    await renderWeatherCard(weatherCard, chosenTrail.lat, chosenTrail.lon);
  });

  wishBtn.addEventListener("click", function () {
    if (!currentTrailId) return;

    if (isInWishlist(currentTrailId)) {
      removeFromWishlist(currentTrailId);
    } else {
      addToWishlist(currentTrailId);
    }
    refreshWishlistButton();
  });
});
