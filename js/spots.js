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
    image: ''
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

function showStatus(value) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Not confirmed";
}

function renderSpots(list) {
  spotList.innerHTML = "";
    if (list.length === 0) {
    spotList.innerHTML = `<div class="col-12"><p>No study spots match your filters. Try changing them.</p></div>`;
    return;
  }
  list.forEach(function (spot) {
    spotList.innerHTML += `
    
      <div class="col-12 col-md-6 col-lg-4">
                <article class="sv-card spot-card h-100 d-flex flex-column">
                          ${spot.image
            ? `<img class="spot-img" src="${spot.image}" alt="${spot.name}">`
            : `<div class="spot-img spot-img-empty" aria-hidden="true">Photo coming soon</div>`}
          <p class="eyebrow mb-1">${spot.location}</p>
          <h3>${spot.name}</h3>
          <div class="spot-badges">
            <span class="spot-badge">${spot.budget}</span>
            <span class="spot-badge">${spot.noise}</span>
            <span class="spot-badge">${spot.noise}</span>
            <span class="spot-badge">${spot.noise}</span>
          </div>
          <ul class="spot-facts list-unstyled">
            <li>Wi-Fi: ${showStatus(spot.wifi)}</li>
            <li>Power sockets: ${showStatus(spot.sockets)}</li>
          </ul>
          <a class="btn btn-outline-brand mt-auto" href="${spot.mapsUrl}" target="_blank" rel="noopener">Open in Google Maps</a>
        </article>
      </div>`;
  });
}

renderSpots(spots);
const filterForm = document.getElementById("filterForm");

function applyFilters() {
  const location = document.getElementById("filterLocation").value;
  const budget = document.getElementById("filterBudget").value;
  const noise = document.getElementById("filterNoise").value;
  const needWifi = document.getElementById("filterWifi").checked;
  const needSockets = document.getElementById("filterSockets").checked;

  const result = spots.filter(function (spot) {
    if (location !== "all" && spot.location !== location) return false;
    if (budget !== "all" && spot.budget !== budget) return false;
    if (noise !== "all" && spot.noise !== noise) return false;
    if (needWifi && spot.wifi !== true) return false;
    if (needSockets && spot.sockets !== true) return false;
    return true;
  });

  renderSpots(result);
}

filterForm.addEventListener("change", applyFilters);

filterForm.addEventListener("reset", function () {
  setTimeout(applyFilters, 0);
});
/*----------------------------------------------------------------*/
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('filterForm');
  const spots = document.querySelectorAll('.spot');
  const count = document.getElementById('resultCount');
  const noResults = document.getElementById('noResults');

  function applyFilters() {
    const f = form.elements;
    const location = f['location'].value;
    const budget = f['budget'].value;
    const noise = f['noise'].value;
    const needWifi = f['wifi'].checked;
    const needSockets = f['sockets'].checked;

    let shown = 0;
    spots.forEach(spot => {
      const d = spot.dataset;
      const match =
        (location === 'all' || d.location === location) &&
        (budget === 'all' || d.budget === budget) &&
        (noise === 'all' || d.noise === noise) &&
        (!needWifi || d.wifi === 'yes') &&
        (!needSockets || d.sockets === 'yes');

      spot.classList.toggle('d-none', !match);
      if (match) shown++;
    });

    count.textContent = `Showing ${shown} of ${spots.length} study spots`;
    noResults.classList.toggle('d-none', shown !== 0);
  }

  form.addEventListener('change', applyFilters);
  // the reset event fires before the fields clear, so wait one tick
  form.addEventListener('reset', () => setTimeout(applyFilters, 0));
  applyFilters();
});
</script>
