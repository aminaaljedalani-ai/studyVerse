(() => {
  "use strict";

  // helpers: never crash if an element is missing
  const $ = (id) => document.getElementById(id);
  const on = (id, evt, fn) => {
    const el = $(id);
    if (el) el.addEventListener(evt, fn);
  };

  // ---------- STUDY MOOD ----------
  const moodTips = {
    great: "Love that! Use the energy for your hardest task first.",
    okay: "Steady is good. Try one 25-minute focus session.",
    tired: "Drink water, stretch, and take a short break before you start.",
    stressed: "Try Stress SOS below, then begin with one small task.",
    sad: "Be kind to yourself. A short walk or chatting with a friend can help."
  };

  const moodButtons = document.querySelectorAll("#moodOptions [data-mood]");
  const moodAdvice = $("moodAdvice");

  moodButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      moodButtons.forEach(b => {
        const selected = b === btn;
        b.classList.toggle("is-selected", selected);
        b.setAttribute("aria-pressed", String(selected));
      });
      if (moodAdvice) {
        moodAdvice.textContent = moodTips[btn.dataset.mood];
        moodAdvice.hidden = false;
      }

      // Stressed: scroll down to the Stress SOS section
      if (btn.dataset.mood === "stressed") {
        const sos = $("sosSection");
        if (sos) {
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          sos.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
        }
      }
    });
  });

  // ---------- POMODORO TIMER ----------
  const FOCUS_MINUTES = 25;
  const display = $("timerDisplay");
  const modeLabel = $("timerMode");
  const timerStatus = $("timerStatus");
  const ring = $("timerRing");
  const breakChooser = $("breakChooser");
  const CIRC = 2 * Math.PI * 90;

  if (ring) ring.style.strokeDasharray = CIRC;

  let currentMode = "Focus";
  let duration = FOCUS_MINUTES * 60;
  let remaining = duration;
  let timerId = null;
  let endTime = 0;

  const formatTime = (s) =>
    String(Math.floor(s / 60)).padStart(2, "0") + ":" +
    String(s % 60).padStart(2, "0");

  function renderTimer() {
    display.textContent = formatTime(remaining);
    if (ring) ring.style.strokeDashoffset = CIRC * (1 - remaining / duration);
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function setMode(name, minutes) {
    stopTimer();
    currentMode = name;
    duration = minutes * 60;
    remaining = duration;
    modeLabel.textContent = name.toUpperCase();
    renderTimer();
  }

  function startTimer() {
    if (timerId !== null) return;
    if (remaining === 0) remaining = duration;
    endTime = Date.now() + remaining * 1000;
    timerId = setInterval(updateTimer, 250);
    timerStatus.textContent =
      currentMode === "Focus"
        ? "Timer running. You've got this!"
        : currentMode + " started. Relax!";
    renderTimer();
  }

  function updateTimer() {
    remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
    renderTimer();
    if (remaining === 0) endSession();
  }

  function endSession() {
    stopTimer();
    if (currentMode === "Focus") {
      timerStatus.textContent = "Focus session completed! Great job! Pick a break.";
      breakChooser.hidden = false;
    } else {
      breakChooser.hidden = true;
      setMode("Focus", FOCUS_MINUTES);
      timerStatus.textContent = "Break over. Next focus session started!";
      startTimer();
    }
  }

  on("timerStart", "click", startTimer);

  on("timerPause", "click", () => {
    if (timerId === null) {
      timerStatus.textContent = "Timer is not running.";
      return;
    }
    updateTimer();
    stopTimer();
    if (remaining > 0) timerStatus.textContent = "Timer paused.";
  });

  on("timerReset", "click", () => {
    stopTimer();
    breakChooser.hidden = true;
    setMode("Focus", FOCUS_MINUTES);
    timerStatus.textContent = "Timer reset.";
  });

  // break length buttons (data-break + data-minutes)
  document.querySelectorAll(".focus-mode[data-break]").forEach(btn => {
    btn.addEventListener("click", () => {
      setMode(btn.dataset.break, Number(btn.dataset.minutes));
      startTimer();
    });
  });

  // ---------- SURPRISE BREAK ----------
  const breakIdeas = [
    "Stretch your arms and shoulders for two minutes.",
    "Drink a glass of water.",
    "Take a three-minute walk.",
    "Rest your eyes away from the screen.",
    "Listen to relaxing music for five minutes.",
    "Tidy your desk.",
    "Write down one thing you achieved today."
  ];
  let previousBreak = -1;

  on("surpriseBreak", "click", () => {
    let i = Math.floor(Math.random() * breakIdeas.length);
    if (i === previousBreak) i = (i + 1) % breakIdeas.length;
    previousBreak = i;
    $("breakResult").textContent = breakIdeas[i];
  });

  // ---------- STRESS SOS (4-4-4 breathing) ----------
  const sosButton = $("sosButton");
  const breathingArea = $("breathingArea");
  const breathLabel = $("breathLabel");
  const breathCount = $("breathCount");
  const phases = ["Breathe in", "Hold", "Breathe out"];
  let breathId = null;

  function startBreathing() {
    let phase = 0;
    let count = 4;
    breathLabel.textContent = phases[0];
    breathCount.textContent = count;

    breathId = setInterval(() => {
      count--;
      if (count === 0) {
        phase = (phase + 1) % phases.length;
        count = 4;
        breathLabel.textContent = phases[phase];
      }
      breathCount.textContent = count;
    }, 1000);
  }

  function stopBreathing() {
    clearInterval(breathId);
    breathId = null;
  }

  if (sosButton) {
    sosButton.addEventListener("click", () => {
      breathingArea.hidden = false;
      sosButton.setAttribute("aria-expanded", "true");
      stopBreathing();
      startBreathing();
    });
  }

  on("sosClose", "click", () => {
    stopBreathing();
    breathingArea.hidden = true;
    sosButton.setAttribute("aria-expanded", "false");
    sosButton.focus();
  });

  renderTimer();
})();
