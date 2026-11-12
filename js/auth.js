/* StudyVerse - shared login + welcome message (owner: AMEENA) - include on EVERY page, after nav.js.
   FRONT-END DEMO ONLY: the username is kept in this browser's localStorage. There is no password and no
   server, so it is not real security - say this on the Overview page (Ethical & Legal Considerations). */
(function () {
  var KEY = 'sv-user';
  var modalEl = document.getElementById('loginModal');
  var form = document.getElementById('login-form');
  var input = document.getElementById('loginName');
  var errBox = document.getElementById('loginError');
  var authBtn = document.getElementById('authBtn');
  var logoutBtn = document.getElementById('logoutBtn');
  var chip = document.getElementById('userChip');
  var chipName = document.getElementById('userName');
  var toast = document.getElementById('welcomeToast');
  var timer;
  var current = null;
  try { current = localStorage.getItem(KEY); } catch (e) {}

  function render() {
    var on = !!current;
    if (authBtn) authBtn.hidden = on;
    if (logoutBtn) logoutBtn.hidden = !on;
    if (chip) chip.hidden = !on;
    if (chipName) chipName.textContent = current || '';
  }

  function say(text) {
    if (!toast) return;
    toast.textContent = text;            // textContent: the name can never inject HTML
    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.hidden = true; }, 350);
    }, 4500);
  }

  function login(name, isNew) {
    current = name;
    try { localStorage.setItem(KEY, name); } catch (e) {}
    render();
    say(isNew ? 'Welcome to StudyVerse, ' + name + '!' : 'Welcome back, ' + name + '!');
  }

  function logout() {
    current = null;
    try { localStorage.removeItem(KEY); } catch (e) {}
    render();
    say('You have logged out. See you soon!');
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = input.value.trim();
      if (!/^[A-Za-z0-9\u0600-\u06FF ._-]{3,20}$/.test(name)) {
        input.classList.add('is-invalid');
        errBox.textContent = 'Username must be 3 to 20 characters (letters, numbers, spaces, . _ -).';
        return;
      }
      input.classList.remove('is-invalid');
      errBox.textContent = '';
      var m = window.bootstrap && bootstrap.Modal.getInstance(modalEl);
      if (m) m.hide();
      login(name, false);
    });
  }
  if (modalEl) {
    modalEl.addEventListener('shown.bs.modal', function () { input.focus(); });
    modalEl.addEventListener('hidden.bs.modal', function () { form.reset(); errBox.textContent = ''; input.classList.remove('is-invalid'); });
  }
  if (logoutBtn) logoutBtn.addEventListener('click', logout);

  window.svAuth = { login: login };      // home.js calls this after a successful registration
  render();
})();
