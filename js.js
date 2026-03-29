const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.getElementById("themeToggle");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

function loadTheme() {
  const savedTheme = localStorage.getItem("aihub-theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) themeToggle.textContent = "Light";
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) themeToggle.textContent = "Dark";
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("aihub-theme", "dark");
      themeToggle.textContent = "Light";
    } else {
      localStorage.setItem("aihub-theme", "light");
      themeToggle.textContent = "Dark";
    }
  });
}

loadTheme();

function addChatBubble(text, type = "bot") {
  const chatMessages = document.getElementById("chatMessages");
  if (!chatMessages) return;

  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${type}`;
  bubble.innerHTML = text;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function recommendTool() {
  const input = document.getElementById("toolQuestion");
  if (!input) return;

  const query = input.value.toLowerCase().trim();
  if (!query) return;

  addChatBubble(input.value, "user");

  let reply = "";

  if (query.includes("research") || query.includes("citation") || query.includes("paper")) {
    reply = `Best for research:
    <br><strong>Perplexity</strong> for citations and sources
    <br><strong>Claude</strong> for writing
    <br><strong>ChatGPT</strong> for explanation`;
  } else if (query.includes("coding") || query.includes("programming") || query.includes("debug")) {
    reply = `Best for coding:
    <br><strong>DeepSeek</strong> for logic
    <br><strong>Cursor</strong> for AI coding
    <br><strong>VS Code</strong> for editor download`;
  } else if (query.includes("image") || query.includes("design") || query.includes("poster")) {
    reply = `Best for design:
    <br><strong>Midjourney</strong> for high-end art
    <br><strong>Leonardo AI</strong> for assets
    <br><strong>Canva AI</strong> for easy graphics`;
  } else if (query.includes("video") || query.includes("animation") || query.includes("audio") || query.includes("voice")) {
    reply = `Best for video/audio:
    <br><strong>Runway</strong> for video
    <br><strong>Pika Labs</strong> for animation
    <br><strong>ElevenLabs</strong> for voice
    <br><strong>Suno AI</strong> for music`;
  } else if (query.includes("pdf") || query.includes("word") || query.includes("excel") || query.includes("edit") || query.includes("convert")) {
    reply = `Best for editing and converting files:
    <br><strong>Word Online</strong> for Word files
    <br><strong>Excel Online</strong> for sheets
    <br><strong>Smallpdf</strong> and <strong>iLovePDF</strong> for PDF editing and conversion
    <br><strong>Google Docs</strong> and <strong>Google Sheets</strong> for online editing`;
  } else if (query.includes("slides") || query.includes("presentation") || query.includes("productivity")) {
    reply = `Best for productivity:
    <br><strong>Gamma</strong> for presentations
    <br><strong>Humata AI</strong> for PDFs
    <br><strong>Julius AI</strong> for statistics`;
  } else if (query.includes("download") || query.includes("software") || query.includes("app")) {
    reply = `Best download section tools:
    <br><strong>VS Code</strong>
    <br><strong>GitHub Desktop</strong>
    <br><strong>LinkedIn</strong>
    <br><strong>Canva</strong>
    <br><strong>Adobe Photoshop</strong>`;
  } else {
    reply = `Suggested tools:
    <br><strong>ChatGPT</strong>
    <br><strong>Gemini</strong>
    <br><strong>Perplexity</strong>
    <br>These are strong all-round tools for students.`;
  }

  addChatBubble(reply, "bot");
  input.value = "";
}

function saveFavorite(name, link) {
  let favorites = JSON.parse(localStorage.getItem("aihub-favorites")) || [];
  const exists = favorites.find(item => item.name === name);

  if (!exists) {
    favorites.push({ name, link });
    localStorage.setItem("aihub-favorites", JSON.stringify(favorites));
    alert(name + " added to favorites.");
  } else {
    alert(name + " is already in favorites.");
  }

  renderFavorites();
}

function removeFavorite(name) {
  let favorites = JSON.parse(localStorage.getItem("aihub-favorites")) || [];
  favorites = favorites.filter(item => item.name !== name);
  localStorage.setItem("aihub-favorites", JSON.stringify(favorites));
  renderFavorites();
}

function renderFavorites() {
  const favoritesList = document.getElementById("favoritesList");
  const favoritesPreview = document.getElementById("favoritesPreview");
  const favorites = JSON.parse(localStorage.getItem("aihub-favorites")) || [];

  const cardHTML = favorites.map(item => `
    <div class="tool-card">
      <div class="tool-top">
        <div class="tool-icon pink">★</div>
        <span class="badge green">Saved</span>
      </div>
      <h3>${item.name}</h3>
      <p>Your saved favorite tool.</p>
      <div class="tool-buttons">
        <a href="${item.link}" target="_blank" class="btn primary-btn">Open Tool</a>
        <button class="btn heart-btn" onclick="removeFavorite('${item.name.replace(/'/g, "\\'")}')">Remove</button>
      </div>
    </div>
  `).join("");

  if (favoritesList) {
    favoritesList.innerHTML = favorites.length ? cardHTML : `<div class="tool-card"><h3>No favorites yet</h3><p>Save tools from other pages and they will appear here.</p></div>`;
  }

  if (favoritesPreview) {
    favoritesPreview.innerHTML = favorites.length ? cardHTML.slice(0, 10000) : `<div class="tool-card"><h3>No favorites yet</h3><p>Save tools from category pages.</p></div>`;
  }
}

renderFavorites();

const pageSearch = document.getElementById("pageSearch");
if (pageSearch) {
  pageSearch.addEventListener("input", function () {
    const value = this.value.toLowerCase();
    const cards = document.querySelectorAll(".searchable-card");

    cards.forEach(card => {
      const text = card.dataset.name.toLowerCase();
      if (text.includes(value)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

const adTools = [
  {
    title: "ChatGPT",
    desc: "General study help, writing, summaries, and brainstorming.",
    link: "https://chatgpt.com"
  },
  {
    title: "Perplexity",
    desc: "Best for citations, research papers, and source-based answers.",
    link: "https://www.perplexity.ai"
  },
  {
    title: "DeepSeek",
    desc: "Strong for coding logic, math, and technical reasoning.",
    link: "https://www.deepseek.com"
  },
  {
    title: "Canva AI",
    desc: "Easy design, presentations, posters, and student graphics.",
    link: "https://www.canva.com"
  },
  {
    title: "Runway",
    desc: "Powerful AI tool for video generation and editing.",
    link: "https://runwayml.com"
  }
];

let adIndex = 0;

function rotateAds() {
  const adTitle = document.getElementById("adTitle");
  const adDesc = document.getElementById("adDesc");
  const adLink = document.getElementById("adLink");

  if (!adTitle || !adDesc || !adLink) return;

  const tool = adTools[adIndex];
  adTitle.textContent = tool.title;
  adDesc.textContent = tool.desc;
  adLink.href = tool.link;

  adIndex = (adIndex + 1) % adTools.length;
}

rotateAds();
setInterval(rotateAds, 10000);