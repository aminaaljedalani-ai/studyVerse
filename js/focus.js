
(() => {
  "use strict";

  // POMODORO TIMER

  const display = document.getElementById("timerDisplay");
  const modeLabel = document.getElementById("timerMode");
  const timerStatus = document.getElementById("timerStatus");
  const modeButtons = document.querySelectorAll(".focus-mode");

  let duration = 25 * 60;
  let remaining = duration;
  let timerId = null;
  let endTime = 0;
  let currentMode = "Focus";

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return String(minutes).padStart(2, "0") +
      ":" + String(secs).padStart(2, "0");
  }

  function renderTimer() {
    display.textContent = formatTime(remaining);
  }

  function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function updateTimer() {
    remaining = Math.max(
      0,
      Math.ceil((endTime - Date.now()) / 1000)
    );

    renderTimer();

    if (remaining === 0) {
      stopTimer();
      timerStatus.textContent =
        currentMode + " session completed! Great job!";
    }
  }

  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      stopTimer();

      currentMode = button.dataset.mode;
      duration = Number(button.dataset.minutes) * 60;
      remaining = duration;

      modeButtons.forEach(item => {
        const selected = item === button;

        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      modeLabel.textContent = currentMode.toUpperCase();
      timerStatus.textContent = currentMode + " selected.";

      renderTimer();
    });
  });

  document.getElementById("timerStart")
    .addEventListener("click", () => {
      if (timerId !== null) return;

      if (remaining === 0) {
        remaining = duration;
      }

      endTime = Date.now() + remaining * 1000;
      timerStatus.textContent = "Timer running. You've got this!";

      timerId = setInterval(updateTimer, 250);
      renderTimer();
    });

  document.getElementById("timerPause")
    .addEventListener("click", () => {
      if (timerId === null) {
        timerStatus.textContent = "Timer is not running.";
        return;
      }

      updateTimer();
      stopTimer();

      if (remaining > 0) {
        timerStatus.textContent = "Timer paused.";
      }
    });

  document.getElementById("timerReset")
    .addEventListener("click", () => {
      stopTimer();

      remaining = duration;
      renderTimer();

      timerStatus.textContent = "Timer reset.";
    });


  // STUDY MOOD MATCHER

  const moodTips = {
    stressed:
      "Take three deep breaths and begin with one small task.",

    tired:
      "Drink water, stretch, and take a short break.",

    motivated:
      "Start with your most important task while your energy is high.",

    distracted:
      "Put your phone away and close unnecessary browser tabs."
  };

  document.getElementById("moodMatch")
    .addEventListener("click", () => {
      const mood = document.getElementById("moodSelect").value;
      const result = document.getElementById("moodResult");

      result.textContent = mood
        ? moodTips[mood]
        : "Please select your mood first.";
    });


  // STRESS SOS

  const sosButton = document.getElementById("sosButton");
  const breathingArea = document.getElementById("breathingArea");

  sosButton.addEventListener("click", () => {
    breathingArea.hidden = false;
    sosButton.setAttribute("aria-expanded", "true");
  });

  document.getElementById("sosClose")
    .addEventListener("click", () => {
      breathingArea.hidden = true;
      sosButton.setAttribute("aria-expanded", "false");
      sosButton.focus();
    });


  // BREAK GENERATOR

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

  document.getElementById("surpriseBreak")
    .addEventListener("click", () => {
      let index = Math.floor(Math.random() * breakIdeas.length);

      if (index === previousBreak) {
        index = (index + 1) % breakIdeas.length;
      }

      previousBreak = index;

      document.getElementById("breakResult").textContent =
        breakIdeas[index];
    });

  renderTimer();
})();
