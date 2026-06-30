/* ==========================================================================
   ALPINDA EXPLORE — wishlist.js  (მხოლოდ wishlist.html-ისთვის)
   კითხულობს localStorage-დან შენახულ trail ID-ებს, რენდერავს ბარათებად
   და უზრუნველყოფს წაშლის ფუნქციონალს (to-do-list-ის ლოგიკის ანალოგი).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const listEl  = document.getElementById("wishlistContainer");
  const emptyEl = document.getElementById("emptyState");
  if (!listEl) return;

  function render() {
    const ids = getWishlist();
    const trails = TRAILS.filter(t => ids.includes(t.id));

    listEl.innerHTML = "";

    if (trails.length === 0) {
      emptyEl.style.display = "block";
      listEl.style.display = "none";
      return;
    }

    emptyEl.style.display = "none";
    listEl.style.display = "block";

    trails.forEach(trail => {
      const row = document.createElement("div");
      row.className = "wishlist-item reveal is-visible";
      row.innerHTML = `
        <div class="wishlist-item__info">
          <b>${trail.name}</b>
          <span>${trail.region} · ↑ ${trail.elevation} · ⏱ ${trail.duration} · ● ${trail.difficulty}</span>
        </div>
        <button class="btn btn--danger btn--sm" data-id="${trail.id}">წაშლა</button>
      `;
      listEl.appendChild(row);
    });

    // ყველა "წაშლა" ღილაკზე event listener — event delegation-ის ნაცვლად
    // პირდაპირ თითოეულზე, რადგან ბარათების რაოდენობა მცირეა (მაქს. 6)
    listEl.querySelectorAll("button[data-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        removeFromWishlist(btn.dataset.id);
        render(); // სიის ხელახლა დახატვა განახლებული მონაცემებით
      });
    });
  }

  render();
});
