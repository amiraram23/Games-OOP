import {
  displayGames,
  displayCategories,
  displayGameDetails,
  showHomePage,
  showLoading,
  hideLoading,
  setActiveCategory,
} from "./UI.js";

export class Games {
  constructor() {
    this.games = [];
    this.currentCategory = "all";
    this.init();
  }

  async init() {
    showLoading();
    try {
      await this.fetchGames();
      displayCategories();
      this.setupEventListeners();
    } catch (error) {
      console.error("Initialization error:", error);
      hideLoading();
    }
  }

  async fetchGames(category = "all") {
    try {
      let url = "https://free-to-play-games-database.p.rapidapi.com/api/games";
      if (category !== "all") {
        url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
      }

      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "350bace4f9msh05d18dffe91b044p1da175jsned8ddff8e386",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      this.games = await response.json();
      displayGames(this.games);
      setActiveCategory(category);
    } catch (error) {
      console.error("Error fetching games:", error);
      hideLoading();
    }
  }

  setupEventListeners() {
    document.getElementById("categories").addEventListener("click", (e) => {
      if (e.target.classList.contains("nav-link")) {
        e.preventDefault();
        const category = e.target.dataset.category;
        this.currentCategory = category;
        showLoading();
        this.fetchGames(category);
      }
    });

    document
      .getElementById("games-container")
      .addEventListener("click", (e) => {
        let card = e.target.closest(".game-card");
        if (card) {
          const gameId = card.dataset.id;
          const game = this.games.find((g) => g.id == gameId);
          if (game) {
            this.showGameDetails(game);
          }
        }
      });
  }

  showGameDetails(game) {
    displayGameDetails(game);
  }
}
