/* StudyVerse - shared navbar behaviour (owner: AMEENA) - include on EVERY page.
   1) Sliding highlight: the pill follows the hovered/focused link, returns to the current page's
      link, and also glides from the previous page's position when you navigate.
   2) Dark/light toggle (moon button), remembered in localStorage.  Don't edit - ask Ameena. */
(function () {
  var root = document.documentElement;
  var btn = document.getElementById('themeToggle');
  function label() {
    if (!btn) return;
    var light = root.getAttribute('data-bs-theme') === 'light';
    btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  }
  if (btn) {
    label();
    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-bs-theme', next);
      try { localStorage.setItem('sv-theme', next); } catch (e) {}
      label();
    });
  }

  var pill = document.querySelector('.nav-pill');
  if (!pill) return;
  var ind = pill.querySelector('.nav-indicator');
  var links = [].slice.call(pill.querySelectorAll('.nav-link'));
  var active = pill.querySelector('.nav-link.active') || links[0];

  function place(link) {
    if (!link) return;
    ind.style.width = link.offsetWidth + 'px';
    ind.style.height = link.offsetHeight + 'px';
    ind.style.transform = 'translate(' + link.offsetLeft + 'px,' + link.offsetTop + 'px)';
  }

  var prev = null;
  try { prev = sessionStorage.getItem('sv-nav-prev'); sessionStorage.removeItem('sv-nav-prev'); } catch (e) {}
  var start = (prev !== null && links[+prev]) ? links[+prev] : active;
  ind.style.transition = 'none';
  place(start);
  void ind.offsetWidth;            // force reflow so the next move animates
  ind.style.transition = '';
  requestAnimationFrame(function () { place(active); });

  links.forEach(function (l) {
    l.addEventListener('mouseenter', function () { place(l); });
    l.addEventListener('focus', function () { place(l); });
    l.addEventListener('click', function () {
      try { sessionStorage.setItem('sv-nav-prev', links.indexOf(active)); } catch (e) {}
    });
  });
  pill.addEventListener('mouseleave', function () { place(active); });
  pill.addEventListener('focusout', function () { place(active); });
  window.addEventListener('resize', function () { place(active); });
  var menu = document.getElementById('mainNav');
  if (menu) menu.addEventListener('shown.bs.collapse', function () { place(active); });
  // Re-measure whenever the real font finishes loading or any link changes size, so the circle
  // always sits exactly on the active link (web fonts load after the first layout).
  if (document.fonts) {
    if (document.fonts.ready) document.fonts.ready.then(function () { place(active); });
    if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', function () { place(active); });
  }
  window.addEventListener('load', function () { place(active); });
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { place(active); });
    links.forEach(function (l) { ro.observe(l); });
  }
})();
