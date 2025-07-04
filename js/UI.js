export function displayGames(games) {
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.innerHTML = "";

  if (games.length === 0) {
    gamesContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-gamepad fs-1 text-muted mb-3"></i>
                <h3 class="text-muted">No games found</h3>
                <p>Try selecting a different category</p>
            </div>
        `;
    return;
  }

  games.forEach((game) => {
    const gameCard = createGameCard(game);
    gamesContainer.appendChild(gameCard);
  });

  document.getElementById("loading-spinner").classList.add("d-none");
  document.getElementById("home-page").classList.remove("d-none");
}

function createGameCard(game) {
  const col = document.createElement("div");
  col.className = "col-md-4 col-lg-3";

  const card = document.createElement("div");
  card.className = "card game-card h-100";
  card.dataset.id = game.id;

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = game.thumbnail;
  img.alt = game.title;
  img.loading = "lazy";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = game.title;

  const genre = document.createElement("p");
  genre.className = "card-text text-muted";
  genre.textContent = game.genre;

  cardBody.appendChild(title);
  cardBody.appendChild(genre);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

export function displayCategories() {
  const categoriesContainer = document.getElementById("categories");

  const predefinedCategories = [
    "mmorpg",
    "shooter",
    "sailing",
    "permadeath",
    "superhero",
    "pixel",
  ];

  predefinedCategories.forEach((category) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = "#";
    a.textContent = formatCategoryName(category);
    a.dataset.category = category;

    li.appendChild(a);
    categoriesContainer.appendChild(li);
  });
}

function formatCategoryName(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function setActiveCategory(category) {
  const links = document.querySelectorAll("#categories .nav-link");
  links.forEach((link) => {
    link.classList.remove("active");
    if (link.dataset.category === category) {
      link.classList.add("active");
    }
  });
}

export function displayGameDetails(game) {
  document.getElementById("game-image").src =
    game.thumbnail || "https://via.placeholder.com/600x400?text=No+Image";
  document.getElementById("game-title").textContent =
    game.title || "Untitled Game";
  document.getElementById("game-category").textContent =
    game.genre || "Unknown Genre";
  document.getElementById("game-platform").textContent = formatPlatform(
    game.platform
  );
  document.getElementById("game-status").textContent = formatStatus(
    game.status
  );
  document.getElementById("game-description").textContent = cleanDescription(
    game.description
  );
  document.getElementById("game-link").href = game.game_url || "#";

  document.getElementById("home-page").classList.add("d-none");
  document.getElementById("details-page").classList.remove("d-none");
  document.body.classList.add("details-page");
  window.scrollTo(0, 0);
}

function formatPlatform(platform) {
  return platform === "PC (Windows)"
    ? "Windows PC"
    : platform === "Web Browser"
    ? "Web Browser"
    : platform || "Unknown Platform";
}

function formatStatus(status) {
  const statusMap = {
    Live: "Available Now",
    Beta: "In Beta Testing",
    Alpha: "In Alpha Testing",
    Offline: "Currently Offline",
    Cancelled: "Cancelled",
  };
  return statusMap[status] || status || "Unknown Status";
}

function cleanDescription(description) {
  if (!description) return "No description available.";

  let text = description;
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return text.replace(/<[^>]*>/g, "");
}

export function showHomePage() {
  document.getElementById("details-page").classList.add("d-none");
  document.getElementById("home-page").classList.remove("d-none");
  document.body.classList.remove("details-page");
}

export function showLoading() {
  document.getElementById("loading-spinner").classList.remove("d-none");
  document.getElementById("home-page").classList.add("d-none");
}

export function hideLoading() {
  document.getElementById("loading-spinner").classList.add("d-none");
}
