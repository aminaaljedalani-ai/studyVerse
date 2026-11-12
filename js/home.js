/* StudyVerse - home page registration validation (owner: AMEENA)
   Front-end only: it validates and shows a message. It does NOT store
   anything (no real accounts without a backend) - say this on the
   Overview page under Ethical & Legal Considerations. */
(function () {
  const form = document.getElementById('registration-form');
  if (!form) return;

  const rules = {
    firstName: { test: v => v.trim().length >= 3, msg: 'First name must be at least 3 characters.' },
    lastName:  { test: v => v.trim().length >= 3, msg: 'Last name must be at least 3 characters.' },
    mobile:    { test: v => /^\d{8}$/.test(v.trim()), msg: 'Mobile number must be exactly 8 digits (numbers only).' },
    email:     { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()), msg: 'Enter a valid email, for example name@example.com.' }
  };

  function check(id) {
    const input = document.getElementById(id);
    const feedback = document.getElementById(id + 'Error');
    const ok = rules[id].test(input.value);
    input.classList.toggle('is-valid', ok);
    input.classList.toggle('is-invalid', !ok);
    feedback.textContent = ok ? '' : rules[id].msg;
    return ok;
  }

  Object.keys(rules).forEach(id => {
    document.getElementById(id).addEventListener('blur', () => check(id));
    document.getElementById(id).addEventListener('input', () => {
      if (document.getElementById(id).classList.contains('is-invalid')) check(id);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.getElementById('form-message');
    const allValid = Object.keys(rules).map(check).every(Boolean); // check every field, don't stop at first error
    if (allValid) {
      const name = document.getElementById('firstName').value.trim();
      message.className = 'text-success';
      message.textContent = 'Welcome to StudyVerse, ' + name + '! Your registration was successful.';
      form.reset();
      if (window.svAuth) window.svAuth.login(name, true);   // shows the welcome message (js/auth.js)
      form.querySelectorAll('.form-control').forEach(i => i.classList.remove('is-valid'));
    } else {
      message.className = 'text-danger';
      message.textContent = 'Please fix the highlighted fields and try again.';
    }
  });
})();
