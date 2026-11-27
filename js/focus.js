(function () {
    "use strict";

    // Helper functions
    function $(id) {
        return document.getElementById(id);
    }

    function on(id, evt, fn) {
        const el = $(id);
        if (el) el.addEventListener(evt, fn);
    }

    // ---------- Pomodoro Timer ----------

    const display = $("timerDisplay");
    const modeLabel = $("timerMode");
    const timerStatus = $("timerStatus");
    const ring = $("timerRing");
    const breakChooser = $("breakChooser");
    const focusMinutes = $("focusMinutes");
    const breakMinutes = $("breakMinutes");
    const autoStart = $("autoStart");
    const timerSound = $("timerSound");
    const startButton = $("timerStart");
    const pauseButton = $("timerPause");
    const skipBreak = $("skipBreak");
    const presetButtons = document.querySelectorAll(".timer-preset");
    const CIRC = 2 * Math.PI * 90;

    // Play notification sound
    function playTimerSound() {
        if (timerSound.checked) {
            const audio = $("notificationSound");
            audio.currentTime = 0;
            audio.play();
        }
    }

    // ---------- Daily Study Statistics ----------

    // Get today's date
    function getToday() {
        const today = new Date();

        return today.getFullYear() + "-" +
            String(today.getMonth() + 1).padStart(2, "0") + "-" +
            String(today.getDate()).padStart(2, "0");
    }

    // Load saved statistics
    let dailyStats = JSON.parse(localStorage.getItem("sv-focus-stats"));

    if (!dailyStats || dailyStats.date !== getToday()) {
        dailyStats = {
            date: getToday(),
            focusSeconds: 0,
            sessions: 0
        };
    }

    // Save statistics
    function saveDailyStats() {
        localStorage.setItem("sv-focus-stats", JSON.stringify(dailyStats));
    }

    // Update statistics on the page
    function updateDailyStats() {
        const minutes = Math.floor(dailyStats.focusSeconds / 60);

        $("dailyFocusTime").textContent = minutes + " min";
        $("dailySessions").textContent = dailyStats.sessions;

        const tasks = JSON.parse(localStorage.getItem("sv-tasks")) || [];
        let completed = 0;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].done) {
                completed++;
            }
        }

        $("dailyTasks").textContent = completed + " / " + tasks.length;
    }

    // ---------- Planner Task Synchronization ----------

    // Display tasks saved by the Planner
    function renderFocusTasks() {
        const taskList = $("focusTaskList");
        const progressText = $("focusTaskProgress");
        const progressBar = $("focusTaskProgressBar");
        const tasks = JSON.parse(localStorage.getItem("sv-tasks")) || [];

        taskList.innerHTML = "";
        let completed = 0;

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            if (task.done) {
                completed++;
            }

            // Create a task card
            const card = document.createElement("div");
            card.className = "focus-task";

            if (task.done) {
                card.classList.add("is-completed");
            }

            // Create a checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "form-check-input";
            checkbox.checked = task.done;
            checkbox.setAttribute("aria-label", "Complete " + task.name);

            checkbox.addEventListener("change", function () {
                toggleFocusTask(task.id);
            });

            // Display task information
            const info = document.createElement("div");
            info.className = "flex-grow-1";

            const name = document.createElement("div");
            name.className = "focus-task-name";
            name.textContent = task.name;

            const details = document.createElement("div");
            details.className = "focus-task-details";
            details.textContent = task.subject + " • Due: " + task.date;

            info.appendChild(name);
            info.appendChild(details);
            card.appendChild(checkbox);
            card.appendChild(info);
            taskList.appendChild(card);
        }

        // Display a message if there are no tasks
        if (tasks.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "No study tasks yet. Add tasks in your Planner!";
            taskList.appendChild(empty);
        }

        // Calculate task progress
        let percent = 0;

        if (tasks.length > 0) {
            percent = Math.round(completed / tasks.length * 100);
        }

        progressText.textContent =
            completed + " of " + tasks.length + " tasks completed";

        progressBar.style.width = percent + "%";

        const progress = document.querySelector("#focusTasksSection .progress");
        progress.setAttribute("aria-valuenow", percent);

        updateDailyStats();
    }

    // Change task completion status
    function toggleFocusTask(id) {
        const tasks = JSON.parse(localStorage.getItem("sv-tasks")) || [];
        let justCompleted = false;

        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks[i].done = !tasks[i].done;
                justCompleted = tasks[i].done;
                break;
            }
        }

        localStorage.setItem("sv-tasks", JSON.stringify(tasks));
        renderFocusTasks();

        if (justCompleted) {
            celebrate("Task completed! You're one step closer to your goals! 🎉");
        }
    }

    // Refresh tasks when Planner changes in another tab
    window.addEventListener("storage", function (event) {
        if (event.key === "sv-tasks") {
            renderFocusTasks();
        }
    });

    renderFocusTasks();

    // ---------- Sticky Notes ----------

    const noteTitle = $("noteTitle");
    const studyNotes = $("studyNotes");
    const addNote = $("addNote");
    const stickyNotesBoard = $("stickyNotesBoard");
    const notesStatus = $("notesStatus");

    let stickyNotes = JSON.parse(localStorage.getItem("sv-sticky-notes")) || [];

    const noteColors = [
        "note-yellow",
        "note-pink",
        "note-blue",
        "note-purple"
    ];

    // Save sticky notes
    function saveStickyNotes(message) {
        localStorage.setItem("sv-sticky-notes", JSON.stringify(stickyNotes));
        renderStickyNotes();
        notesStatus.textContent = message;
    }

    // Display sticky notes
    function renderStickyNotes() {
        stickyNotesBoard.innerHTML = "";

        if (stickyNotes.length === 0) {
            stickyNotesBoard.innerHTML =
                "<p>No sticky notes yet. Add your first note!</p>";
            return;
        }

        for (let index = 0; index < stickyNotes.length; index++) {
            const note = stickyNotes[index];

            const card = document.createElement("article");
            card.className = "sticky-note " + noteColors[index % noteColors.length];

            const title = document.createElement("h3");
            title.textContent = note.title;

            const content = document.createElement("p");
            content.textContent = note.content;

            const buttons = document.createElement("div");
            buttons.className = "sticky-note-actions";

            const editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-sm btn-outline-brand";
            editButton.textContent = "Edit";

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-sm btn-outline-brand";
            deleteButton.textContent = "Delete";

            // Edit a sticky note
            editButton.addEventListener("click", function () {
                const newTitle = prompt("Edit your note title:", note.title);

                if (newTitle === null) return;

                const newContent = prompt("Edit your note:", note.content);

                if (newContent === null) return;

                if (newTitle.trim() === "" || newContent.trim() === "") {
                    notesStatus.textContent = "Your note cannot be empty.";
                    return;
                }

                note.title = newTitle.trim();
                note.content = newContent.trim();

                saveStickyNotes("Your note has been updated!");
            });

            // Delete a sticky note
            deleteButton.addEventListener("click", function () {
                const confirmDelete = confirm("Are you sure you want to delete this note?");

                if (confirmDelete) {
                    stickyNotes.splice(index, 1);
                    saveStickyNotes("Your note has been deleted.");
                }
            });

            buttons.appendChild(editButton);
            buttons.appendChild(deleteButton);
            card.appendChild(title);
            card.appendChild(content);
            card.appendChild(buttons);
            stickyNotesBoard.appendChild(card);
        }
    }

    // Add a new sticky note
    addNote.addEventListener("click", function () {
        const title = noteTitle.value.trim();
        const content = studyNotes.value.trim();

        if (title === "" || content === "") {
            notesStatus.textContent = "Please enter a title and note.";
            return;
        }

        stickyNotes.push({
            title: title,
            content: content
        });

        saveStickyNotes("Your sticky note has been saved!");

        noteTitle.value = "";
        studyNotes.value = "";
    });

    renderStickyNotes();

    // ---------- Timer Functionality ----------

    ring.style.strokeDasharray = CIRC;

    let currentMode = "Focus";
    let duration = 25 * 60;
    let remaining = duration;
    let timerId = null;
    let endTime = 0;

    // Convert seconds into minutes and seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return String(minutes).padStart(2, "0") + ":" +
            String(secs).padStart(2, "0");
    }

    // Update the timer display
    function renderTimer() {
        display.textContent = formatTime(remaining);
        modeLabel.textContent = currentMode.toUpperCase();
        ring.style.strokeDashoffset = CIRC * (1 - remaining / duration);

        if (currentMode === "Focus") {
            ring.style.stroke = "var(--accent)";
        } else {
            ring.style.stroke = "var(--accent-2)";
        }
    }

    // Validate timer settings
    function validSettings() {
        const focus = Number(focusMinutes.value);
        const rest = Number(breakMinutes.value);

        if (!Number.isInteger(focus) || focus < 1 || focus > 120) {
            timerStatus.textContent = "Enter a focus time between 1 and 120 minutes.";
            focusMinutes.focus();
            return false;
        }

        if (!Number.isInteger(rest) || rest < 1 || rest > 60) {
            timerStatus.textContent = "Enter a break time between 1 and 60 minutes.";
            breakMinutes.focus();
            return false;
        }

        return true;
    }

    // Enable or disable timer settings
    function lockSettings(locked) {
        focusMinutes.disabled = locked;
        breakMinutes.disabled = locked;

        for (let i = 0; i < presetButtons.length; i++) {
            presetButtons[i].disabled = locked;
        }
    }

    // Highlight the selected preset
    function updatePresets() {
        for (let i = 0; i < presetButtons.length; i++) {
            const button = presetButtons[i];

            const selected =
                Number(button.dataset.focus) === Number(focusMinutes.value) &&
                Number(button.dataset.break) === Number(breakMinutes.value);

            button.classList.toggle("is-selected", selected);
            button.setAttribute("aria-pressed", String(selected));
        }
    }

    // Stop the timer
    function stopTimer() {
        clearInterval(timerId);
        timerId = null;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }

    // Switch between focus and break
    function setMode(mode) {
        stopTimer();
        currentMode = mode;

        if (mode === "Focus") {
            duration = Number(focusMinutes.value) * 60;
            breakChooser.hidden = true;
            skipBreak.hidden = true;
        } else {
            duration = Number(breakMinutes.value) * 60;
            breakChooser.hidden = false;
            skipBreak.hidden = false;
        }

        remaining = duration;
        startButton.textContent = "Start";
        renderTimer();
    }

    // Start or resume the timer
    function startTimer() {
        if (timerId !== null || !validSettings()) {
            return;
        }

        lockSettings(true);

        endTime = Date.now() + remaining * 1000;
        timerId = setInterval(updateTimer, 250);

        startButton.disabled = true;
        pauseButton.disabled = false;

        if (currentMode === "Focus") {
            timerStatus.textContent = "Stay focused. You've got this!";
        } else {
            timerStatus.textContent = "Take a moment to relax and recharge.";
        }

        renderTimer();
    }

    // Update the remaining time
    function updateTimer() {
        const newRemaining = Math.max(
            0,
            Math.ceil((endTime - Date.now()) / 1000)
        );

        const elapsed = remaining - newRemaining;

        // Count only focus time
        if (currentMode === "Focus" && elapsed > 0) {
            dailyStats.focusSeconds += elapsed;
            saveDailyStats();
            updateDailyStats();
        }

        remaining = newRemaining;
        renderTimer();

        if (remaining === 0) {
            endSession();
        }
    }

    // Switch to the next session
    function endSession() {
        stopTimer();
        playTimerSound();

        if (currentMode === "Focus") {
            dailyStats.sessions++;

            saveDailyStats();
            updateDailyStats();

            celebrate("Amazing work! You completed a focus session!");

            setMode("Break");

            timerStatus.textContent =
                "Focus session completed! You earned a break.";

            buddySay("Time to relax! You've earned this break.", false);
        } else {
            setMode("Focus");

            timerStatus.textContent =
                "Break completed! Ready to focus again?";

            buddySay("Break time is over! You're refreshed and ready for another round!", false);
        }

        if (autoStart.checked) {
            startTimer();
        }
    }

    // ---------- Timer Buttons ----------

    on("timerStart", "click", startTimer);

    // Pause button
    on("timerPause", "click", function () {
        if (timerId === null) {
            return;
        }

        updateTimer();

        if (timerId === null) {
            return;
        }

        stopTimer();
        renderTimer();

        startButton.textContent = "Resume";
        timerStatus.textContent = "Timer paused. Resume whenever you're ready.";
    });

    // Reset button
    on("timerReset", "click", function () {
        stopTimer();
        lockSettings(false);

        if (!validSettings()) {
            return;
        }

        setMode("Focus");
        timerStatus.textContent = "Timer reset. Ready when you are!";
    });

    // Skip break button
    on("skipBreak", "click", function () {
        if (currentMode === "Break") {
            setMode("Focus");
            timerStatus.textContent = "Break skipped. Ready to focus again?";

            if (autoStart.checked) {
                startTimer();
            }
        }
    });

    // Quick timer presets
    for (let i = 0; i < presetButtons.length; i++) {
        const button = presetButtons[i];

        button.addEventListener("click", function () {
            focusMinutes.value = button.dataset.focus;
            breakMinutes.value = button.dataset.break;

            setMode("Focus");
            updatePresets();

            timerStatus.textContent = "Timer settings updated!";
        });
    }

    // Custom timer settings
    function updateSettings() {
        updatePresets();

        if (validSettings()) {
            setMode("Focus");
            timerStatus.textContent = "Custom timer settings applied!";
        }
    }

    focusMinutes.addEventListener("change", updateSettings);
    breakMinutes.addEventListener("change", updateSettings);

    updatePresets();
    pauseButton.disabled = true;
    renderTimer();

    // ---------- Bruno's Study Coach ----------

    const coachTips = {
        concentration: {
            advice: "Let's start small! Put away distractions and try focusing on one task for 15 minutes.",
            focus: 15,
            rest: 5
        },

        motivation: {
            advice: "Choose your easiest task first. Every small achievement counts! Start with just 15 minutes.",
            focus: 15,
            rest: 5
        },

        starting: {
            advice: "Check your study tasks and choose one priority. Give yourself 25 minutes to work on it.",
            focus: 25,
            rest: 5
        },

        exhausted: {
            advice: "You deserve a rest. Take a proper break, drink some water and return when you're ready.",
            focus: null,
            rest: null
        },

        ready: {
            advice: "That's the spirit! Choose a task, prepare your study space and let's get started!",
            focus: 25,
            rest: 5
        }
    };

    const coachButtons = document.querySelectorAll(".coach-option");
    const coachResponse = $("coachResponse");
    const coachAdvice = $("coachAdvice");
    const applyRecommendation = $("applyRecommendation");

    let recommendedFocus = null;
    let recommendedBreak = null;

    // Display Bruno's advice
    for (let i = 0; i < coachButtons.length; i++) {
        const button = coachButtons[i];

        button.addEventListener("click", function () {
            const struggle = button.dataset.struggle;
            const recommendation = coachTips[struggle];

            for (let j = 0; j < coachButtons.length; j++) {
                coachButtons[j].classList.remove("is-selected");
                coachButtons[j].setAttribute("aria-pressed", "false");
            }

            button.classList.add("is-selected");
            button.setAttribute("aria-pressed", "true");

            coachAdvice.textContent = recommendation.advice;
            coachResponse.hidden = false;

            recommendedFocus = recommendation.focus;
            recommendedBreak = recommendation.rest;

            applyRecommendation.hidden = recommendedFocus === null;
        });
    }

    // Apply Bruno's recommended timer
    on("applyRecommendation", "click", function () {
        if (recommendedFocus === null) {
            return;
        }

        focusMinutes.value = recommendedFocus;
        breakMinutes.value = recommendedBreak;

        stopTimer();
        lockSettings(false);
        setMode("Focus");
        updatePresets();

        timerStatus.textContent =
            "Bruno's recommendation applied! You're ready to focus.";

        $("pomodoroHeading").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    });

    // ---------- Floating Bruno Buddy ----------

    const buddy = $("buddy");
    const buddyBtn = $("buddyBtn");
    const buddyBubble = $("buddyBubble");
    const confettiBox = $("confetti");

    let bubbleTimer;
    let confettiTimer;

    const buddyTips = [
        "Small steps every day add up!",
        "You've got this! Keep going!",
        "Remember to take breaks and drink water.",
        "One task at a time. You're doing great!",
        "Believe in yourself. You're making progress!"
    ];

    // Display Bruno's message
    function buddySay(message, cheer) {
        buddyBubble.textContent = message;
        buddyBubble.classList.remove("is-hidden");

        if (cheer) {
            buddy.classList.remove("cheer");
            void buddy.offsetWidth;
            buddy.classList.add("cheer");
        }

        clearTimeout(bubbleTimer);

        bubbleTimer = setTimeout(function () {
            buddyBubble.classList.add("is-hidden");
            buddy.classList.remove("cheer");
        }, 4500);
    }

    // Display a random motivational message
    on("buddyBtn", "click", function () {
        let tips = buddyTips;

        if (currentMode === "Break") {
            tips = [
                "Stretch your arms and shoulders!",
                "Drink some water and stay hydrated.",
                "Give your eyes a little rest from the screen.",
                "Take a short walk and get moving!",
                "Relax, breathe and enjoy your break."
            ];
        }

        const number = Math.floor(Math.random() * tips.length);
        buddySay(tips[number], false);
    });

    // ---------- Confetti Celebration ----------

    function launchConfetti() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const colors = [
            "var(--accent)",
            "var(--accent-2)",
            "var(--pop)",
            "var(--ink-line)"
        ];

        for (let i = 0; i < 45; i++) {
            const piece = document.createElement("span");

            piece.className = "confetti-piece";
            piece.style.left = Math.random() * 100 + "%";
            piece.style.width = 6 + Math.random() * 8 + "px";
            piece.style.height = 10 + Math.random() * 10 + "px";
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
            piece.style.animationDelay = Math.random() * 0.4 + "s";

            confettiBox.appendChild(piece);
        }

        clearTimeout(confettiTimer);

        confettiTimer = setTimeout(function () {
            confettiBox.innerHTML = "";
        }, 4500);
    }

    // Celebrate an achievement
    function celebrate(message) {
        launchConfetti();
        buddySay(message, true);
    }

    // ---------- Surprise Break ----------

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

    on("surpriseBreak", "click", function () {
        let i = Math.floor(Math.random() * breakIdeas.length);

        if (i === previousBreak) {
            i = (i + 1) % breakIdeas.length;
        }

        previousBreak = i;
        $("breakResult").textContent = breakIdeas[i];
    });

    // ---------- Stress SOS Breathing Exercise ----------

    const sosButton = $("sosButton");
    const breathingArea = $("breathingArea");
    const breathLabel = $("breathLabel");
    const breathCount = $("breathCount");

    const phases = ["Breathe in", "Hold", "Breathe out"];

    let breathId = null;

    // Start breathing exercise
    function startBreathing() {
        let phase = 0;
        let count = 4;

        breathLabel.textContent = phases[0];
        breathCount.textContent = count;

        breathId = setInterval(function () {
            count--;

            if (count === 0) {
                phase = (phase + 1) % phases.length;
                count = 4;
                breathLabel.textContent = phases[phase];
            }

            breathCount.textContent = count;
        }, 1000);
    }

    // Stop breathing exercise
    function stopBreathing() {
        clearInterval(breathId);
        breathId = null;
    }

    // Open breathing exercise
    if (sosButton) {
        sosButton.addEventListener("click", function () {
            breathingArea.hidden = false;
            sosButton.setAttribute("aria-expanded", "true");

            stopBreathing();
            startBreathing();
        });
    }

    // Close breathing exercise
    on("sosClose", "click", function () {
        stopBreathing();

        breathingArea.hidden = true;
        sosButton.setAttribute("aria-expanded", "false");
        sosButton.focus();
    });

    renderTimer();

})();