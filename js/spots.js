/* PERSON 4 - subtopic3.html (Study Spot Finder)
   TODO:
   1. Filters: location, budget, noise level, Wi-Fi, power sockets -> show/hide the HTML cards
      (store each card's info in data-* attributes, e.g. data-location="Manama" data-noise="quiet").
   2. Environment quiz (silence vs noise, alone vs people, free vs paid) -> recommend a place.
   3. Atmosphere modes: Library / Cafe / Home -> change the page theme with CSS classes.
   Rules: only list Wi-Fi/power sockets if you VERIFIED them, add a Google Maps link on every card,
   and credit every image you use. */

   const spots = [
  {
    id: 1,
    name: "Higher Grounds Cafe",
    location: "Tubli",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Higher+Grounds+Cafe+Tubli+Bahrain",
    image: "images/higher-grounds.jpg"
  },
  {
    id: 2,
    name: "The Dot Cafe",
    location: "Awali",
    budget: 'High Priced',
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/hMcpDiexJv3mDqW47",
    image: "images/thedot3.jpg",
    imagePos: "100% 55%",

  },
  {
    id: 3,
    name: "Oz Cafe",
    location: "Seef",
    budget:'Budget friendly',
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Oz+cafe+Seef+Bahrain",
    image: "images/oz.jpg",
    
    imagePos: "center 100%",
    
    

  },
  {
    id: 4,
    name: "Innovation Themes & Coffee",
    location: "Zinj",
    budget: null,
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Innovation+Themes+and+Coffee+Galleria+Mall+Bahrain",
    image: ""

  },
  {
    id: 5,
    name: "Petal & Bean Cafe",
    location: "Zinj",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Petal+and+Bean+Galleria+Mall+Bahrain",
    image: "images/petal.jpg",
    imagePos: "20% 60%",

  },
  {
    id: 6,
    name: "Brewrista Cafe",
    location: "Tubli",
    budget: "Budget friendly",
    noise: null,
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Brewrista+Cafe+Tubli+Bahrain",
    image: "images/brewrista.jpg"

  },
  {
    id: 7,
    name: "Coffee Plus",
    location: "Seef",
    budget: "Budget friendly",
    noise: "Quiet",
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Coffee+Plus+Seef+Bahrain",
    image: "images/plus3.png",
    imagePos: "100% 75%",


  },
  {
    id: 8,
    name: "Think Coffee",
    location: "Zayed Town",
    budget: null,
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Think+Coffee+Zayed+Town+Bahrain",
    image: ""

  },
  {
    id: 9,
    name: "Akeed Cafe",
    location: "Zayed Town",
    budget: "Budget friendly",
    noise: null,
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Akeed+Cafe+Zayed+Town+Bahrain",
    image: "images/akeed.jpg",
    imagePos: "0% 50%",

  },
  {
    id: 10,
    name: "Been Cafe",
    location: "Seef",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Been+Cafe+Seef+Bahrain",
    image: "images/been.png",
    

  },
  {
    id: 11,
    name: "Hmmba Cafe",
    location: "Janabiya",
    budget: "Moderately Priced",
    noise: null,
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Been+Cafe+Seef+Bahrain",
    image: "images/hmmba2.jpg"

  },
  {
    id: 12,
    name: "Arena Coffe",
    location: "Janabiya",
    budget: "Budget friendly",
    noise: null,
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/merVyThDyZji2D4NA",
    image: "images/arena2.png",
    imagePos: "50% 75%",

  },
  {
    id: 13,
    name: "The Roastery",
    location: "Janabiya",
    budget: "High Priced",
    noise: "Lively",
    wifi: true,
    sockets: true,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Been+Cafe+Seef+Bahrain",
    image: ""

  },
  {
    id: 14,
    name: "Goodness Cafe & Bakery - Manama",
    location: "Manama",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/XTAJr1urXo6ocajZ7",
    image: ""

  },
  {
    id: 15,
    name: "Goodness Cafe & Bakery - Saar",
    location: "Saar",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/XTAJr1urXo6ocajZ7",
    image: "images/hmmba2.jpg"

  },
  {
    id: 16,
    name: "Fold cafe",
    location: "Riffa",
    budget: "High Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/Ttxvo36huptQD3ew7",
    image: "images/fold.jpg",
    imagePos: "50% 70%"
  },
  {
    id: 17,
    name: "Ghuloomi cafe",
    location: "Janabiya",
    budget: "High Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/LtKgCVcPV44niAQM8",
    image: "images/ghuloomi.png",
    imagePos: "100% 70%"
  },
  {
    id: 17,
    name: "Common Grounds",
    location: "Riffa",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/KhYoz9GuSoWBewgx7",
    image: "images/common2.png",
    imagePos: "0% 80%"
  },
  {
    id: 17,
    name: "Sip Cafe & Study",
    location: "Saar",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/o7vE33cGZnuWECW3A",
    image: "",
    
  },
  {
    id: 18,
    name: "Higher Grounds Cafe",
    location: "Tubli",
    budget: "Moderately Priced",
    noise: null,
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/ExSoke7oKGSsxAD37",
    image: "",
    
  },
  {
    id: 19,
    name: "Calla Cafe",
    location: "Diyar al-muharraq.",
    budget: "Moderately Priced",
    noise: 'Quiet',
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/5Re7VxLtGr9qLg9S7",
    image: "",
    
  },
  {
    id: 20,
    name: "Place Cafe - Saar",
    location: "Saar",
    budget: "High Priced",
    noise: 'Quiet',
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/yChrgsW8P2tPp7Fz8",
    image: "",
    
  },
  {
    id: 21,
    name: "Place Cafe - Riffa",
    location: "Riffa",
    budget: "High Priced",
    noise: 'Quiet',
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/yChrgsW8P2tPp7Fz8",
    image: "",
    
  },
  {
    id: 21,
    name: "SNUG Cafe",
    location: "Riffa",
    budget: "Moderately Priced",
    noise: 'Moderate',
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://maps.app.goo.gl/4UYEVKZq8cbE7WLV9",
    image: "",
    
  },
];

/* ===== LOCATION MENU: built automatically from the spots + search box ===== */
const locationMenu = document.getElementById("locationMenu");
const locationSearch = document.getElementById("locationSearch");

function buildLocationMenu() {
  // every location once, sorted A-Z
  const locations = [...new Set(spots.map(function (spot) { return spot.location; }).filter(Boolean))]
    .sort(function (a, b) { return a.localeCompare(b); });

  let html = `<li><button type="button" data-filter="location" data-value="all">All locations</button></li>`;
  locations.forEach(function (place) {
    html += `<li><button type="button" data-filter="location" data-value="${place}">${place}</button></li>`;
  });
  html += `<li class="spot-no-match" hidden>No matching location</li>`;

  locationMenu.insertAdjacentHTML("beforeend", html);
}

function searchLocations() {
  const text = locationSearch.value.trim().toLowerCase();
  let found = 0;

  locationMenu.querySelectorAll('[data-filter="location"]').forEach(function (button) {
    const show = button.dataset.value === "all"
      ? text === ""                                         // hide "All locations" while searching
      : button.textContent.toLowerCase().includes(text);
    button.parentElement.hidden = !show;
    if (show) found++;
  });

  locationMenu.querySelector(".spot-no-match").hidden = found > 0;
}

function clearLocationSearch() {
  locationSearch.value = "";
  searchLocations();
}

buildLocationMenu();
locationSearch.addEventListener("input", searchLocations);

const spotList = document.getElementById("spotList");
const showMoreBtn = document.getElementById("showMoreBtn");

const FIRST_BATCH = 12;   // cards shown at first (default view)
const MORE_BATCH = 6;     // cards added by each "Show more" click

let currentList = spots;  
let visibleCount = FIRST_BATCH;
let isFiltered = false;



const icons = {
  wifi: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5 12.5a10 10 0 0 1 14 0"/><path d="M8.5 16a5 5 0 0 1 7 0"/><circle cx="12" cy="19.5" r="1"/></svg>`,
  plug: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2v6M15 2v6"/><path d="M6 8h12v4a6 6 0 0 1-12 0z"/><path d="M12 18v4"/></svg>`
};

function featureChip(label, iconName, value) {
  let state = "unknown";
  let mark = "?";
  let text = "not confirmed";

  if (value === true) {
    state = "yes";
    mark = "✓";
    text = "available";
  } else if (value === false) {
    state = "no";
    mark = "✗";
    text = "not available";
  }

  return `<span class="spot-feature spot-feature-${state}">
    ${icons[iconName]}
    <span>${label}</span>
    <span aria-hidden="true">${mark}</span>
    <span class="visually-hidden">${text}</span>
  </span>`;
}

function renderSpots(list) {
  if (list.length === 0) {
    spotList.innerHTML = `<div class="col-12"><p>No study spots match your filters. Try changing them.</p></div>`;
    return;
  }

  let html = "";

  list.forEach(function (spot) {
    const photo = spot.image
  ? `<img class="spot-img" src="${spot.image}" alt="${spot.name}" style="object-position: ${spot.imagePos || "center"};">`
  : `<div class="spot-img spot-img-empty" aria-hidden="true">Photo coming soon</div>`;

    html += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="sv-card spot-card h-100 d-flex flex-column" tabindex="-1">
          ${photo}
          <p class="eyebrow mb-1">${spot.location}</p>
          <h3>${spot.name}</h3>
          <div class="spot-badges">
            <span class="spot-badge">${spot.budget || "Price not confirmed"}</span>
            <span class="spot-badge">${spot.noise || "Noise not confirmed"}</span>

          </div>
          <div class="spot-badges">
            ${featureChip("Wi-Fi", "wifi", spot.wifi)}
            ${featureChip("Sockets", "plug", spot.sockets)}
          </div>
          <div class="spot-actions mt-auto">
            <a class="btn btn-outline-brand" href="${spot.mapsUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
          </div>
        </article>
      </div>`;
  });

  spotList.innerHTML = html;
}

/* Shows the cards: all of them when filtered, otherwise only the first "visibleCount" */
function showSpots() {
  const list = isFiltered ? currentList : currentList.slice(0, visibleCount);
  renderSpots(list);

  const remaining = currentList.length - visibleCount;
  const hasMore = !isFiltered && remaining > 0;

  showMoreBtn.hidden = !hasMore;
  if (hasMore) {
    showMoreBtn.textContent = "Show more (" + remaining + " left)";
  }
}

showMoreBtn.addEventListener("click", function () {
  const firstNewIndex = visibleCount;
  visibleCount += MORE_BATCH;
  showSpots();

  // Move focus to the first new card so keyboard / screen-reader users know where the new ones start
  const firstNewCard = spotList.children[firstNewIndex];
  if (firstNewCard) {
    firstNewCard.querySelector(".spot-card").focus();
  }
});

const activeFilters = {
  location: "all",
  budget: "all",
  noise: "all",
  wifi: "all",
  sockets: "all"
};

const filterNames = {
  location: "Location",
  budget: "Budget",
  noise: "Noise",
  wifi: "Wi-Fi",
  sockets: "Power sockets"
};

function updateFilterButtons() {
  Object.keys(activeFilters).forEach(function (key) {
    const value = activeFilters[key];
    const button = document.getElementById(key + "Btn");
    button.textContent = value === "all"
      ? filterNames[key]
      : filterNames[key] + ": " + (value === "yes" ? "Yes" : value);
    button.classList.toggle("has-value", value !== "all");
  });

  document.querySelectorAll("[data-filter]").forEach(function (item) {
    item.classList.toggle("active", activeFilters[item.dataset.filter] === item.dataset.value);
  });
}

function applyFilters() {
  isFiltered = Object.values(activeFilters).some(function (value) {
    return value !== "all";
  });

  if (!isFiltered) {
    // Default view: back to the first 12 cards
    currentList = allSpots;  // TEST: change to "spots" later
    visibleCount = FIRST_BATCH;
  } else {
    // Filtered view: search only the real spots (no test copies), show every match
    currentList = spots.filter(function (spot) {
      if (activeFilters.location !== "all" && spot.location !== activeFilters.location) return false;
      if (activeFilters.budget !== "all" && spot.budget !== activeFilters.budget) return false;
      if (activeFilters.noise !== "all" && spot.noise !== activeFilters.noise) return false;
      if (activeFilters.wifi === "yes" && spot.wifi !== true) return false;
      if (activeFilters.sockets === "yes" && spot.sockets !== true) return false;
      return true;
    });
  }

  showSpots();
}

document.getElementById("filterBar").addEventListener("click", function (event) {
  const choice = event.target.closest("[data-filter]");

    if (choice) {
    activeFilters[choice.dataset.filter] = choice.dataset.value;
    updateFilterButtons();
    clearLocationSearch();          // NEW
    document.activeElement.blur();
  } else if (event.target.closest("#applyFilters")) {
    applyFilters();
  } else if (event.target.closest("#resetFilters")) {
    Object.keys(activeFilters).forEach(function (key) {
      activeFilters[key] = "all";
    });
    updateFilterButtons();
    clearLocationSearch();          // NEW
    applyFilters();
  }
});

showSpots();

const pageMain = document.getElementById("main");
const modeButtons = document.querySelectorAll(".spot-mode");

function setMode(mode) {
  pageMain.dataset.mode = mode;

  modeButtons.forEach(function (button) {
    button.setAttribute("aria-pressed", button.dataset.mode === mode);
  });
}

modeButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setMode(button.dataset.mode);
  });
});