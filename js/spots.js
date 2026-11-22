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
    name: "EXAMPLE - replace with a real place",
    location: "Manama",
    budget: "Free",
    noise: "Quiet",
    wifi: null,
    sockets: null,
    mode: "library",
    mapsUrl: "https://www.google.com/maps",
    image: ""
  },
    {
    id: 2,
    name: "EXAMPLE 2 - replace",
    location: "Riffa",
    budget: "$$",
    noise: "Moderate",
    wifi: null,
    sockets: null,
    mode: "cafe",
    mapsUrl: "https://www.google.com/maps",
    image: ""
  },
  {
    id: 3,
    name: "EXAMPLE 3 - replace",
    location: "Muharraq",
    budget: "$",
    noise: "Lively",
    wifi: null,
    sockets: null,
    mode: "home",
    mapsUrl: "https://www.google.com/maps",
    image: ""
  }
  
];

const spotList = document.getElementById("spotList");



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
  spotList.innerHTML = "";

  if (list.length === 0) {
    spotList.innerHTML = `<div class="col-12"><p>No study spots match your filters. Try changing them.</p></div>`;
    return;
  }

  list.forEach(function (spot) {
    const photo = spot.image
      ? `<img class="spot-img" src="${spot.image}" alt="${spot.name}">`
      : `<div class="spot-img spot-img-empty" aria-hidden="true">Photo coming soon</div>`;

    spotList.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
        <article class="sv-card spot-card h-100 d-flex flex-column">
          ${photo}
          <p class="eyebrow mb-1">${spot.location}</p>
          <h3>${spot.name}</h3>
          <div class="spot-badges">
            <span class="spot-badge">${spot.budget}</span>
            <span class="spot-badge">${spot.noise}</span>
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
}

renderSpots(spots);

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
  const result = spots.filter(function (spot) {
    if (activeFilters.location !== "all" && spot.location !== activeFilters.location) return false;
    if (activeFilters.budget !== "all" && spot.budget !== activeFilters.budget) return false;
    if (activeFilters.noise !== "all" && spot.noise !== activeFilters.noise) return false;
    if (activeFilters.wifi === "yes" && spot.wifi !== true) return false;
    if (activeFilters.sockets === "yes" && spot.sockets !== true) return false;
    return true;
  });

  renderSpots(result);
}

document.getElementById("filterBar").addEventListener("click", function (event) {
  const choice = event.target.closest("[data-filter]");

  if (choice) {
    activeFilters[choice.dataset.filter] = choice.dataset.value;
    updateFilterButtons();
    document.activeElement.blur();
  } else if (event.target.closest("#applyFilters")) {
    applyFilters();
  } else if (event.target.closest("#resetFilters")) {
    Object.keys(activeFilters).forEach(function (key) {
      activeFilters[key] = "all";
    });
    updateFilterButtons();
    applyFilters();
  }
});

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
