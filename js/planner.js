/* PERSON 2 - subtopic1.html (Plan Your Studies)
   TODO:
   1. Task planner: add task (name + subject + due date), mark completed, delete.
   2. Progress tracker: total / completed / remaining + progress bar (2 of 3 done = ~67%).
   3. Study goals checklist (3 simple daily goals).
   4. Deadline reminder: pick a date, show days remaining (use Date objects).
   5. Save tasks with localStorage so they survive a refresh.
   Tip: validate that the task name is not empty before adding. */

// ---------- Get the elements from the page ----------
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskSubject = document.getElementById("taskSubject");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");
const progressPercent = document.getElementById("progressPercent");
const progressBar = document.getElementById("progressBar");
const progressTrack = document.querySelector(".progress");

const deadlineDate = document.getElementById("deadlineDate");
const deadlineMessage = document.getElementById("deadlineMessage");

// This creates a message below the form to show success or error messages
const taskMessage = document.createElement("p");
taskMessage.setAttribute("role", "status");
taskMessage.setAttribute("aria-live", "polite");
taskMessage.className = "mt-3 mb-0";
taskForm.after(taskMessage);
taskForm.noValidate = true; // This allows the form to display our own error messages

// ---------- Load Saved Tasks ----------
// localStorage can only store text, so the array is saved as text with JASON.stringify()
// and turned back into an array with JSON.parse()
let tasks = [];
if(localStorage.getItem("sv-tasks") !== null){
   tasks = JSON.parse(localStorage.getItem("sv-tasks"));
}


function saveTasks(){
   localStorage.setItem("sv-tasks", JSON.stringify(tasks));
}


function showMessage(text, isError){
   taskMessage.textContent = text;
   taskMessage.className = "mt-3 mb-0 " + (isError ? "text-danger" : "text-success");
}

// ---------- Draw the task list ----------
function renderTasks(){
   taskList.innerHTML = "";

   if(tasks.length === 0) {
      const empty = document.createElement("p");
      empty.textContent = "No tasks yet. Add your first task above!";
      taskList.appendChild(empty);
   }

   for (let i = 0; i < tasks.length; i++){
      const task = tasks[i];

      // This crates one card per task to display the task information
      const card = document.createElement("div");
      card.className = "sv-card no-pin p-3 mb-3 d-flex align-items-center gap-3";

      // This creates a checkbox so that the user can mark a task as completed
      const check = document.createElement("input");
      check.type = "checkbox";
      check.className = "form-check-input mt-0";
      check.checked = task.done;
      check.setAttribute("aria-label", "Mark " + task.name + " as completed");
      check.addEventListener("change", function (){
         toggleTask(task.id);
      });

      // This creates a section to display the task information (name, then subject and due date)
      const info = document.createElement("div");
      info.className = "flex-grow-1";

      const title = document.createElement("strong");
      title.textContent = task.name;
      if (task.done){
         title.className = "text-decoration-line-through";
      }

      const details = document.createElement("div");
      details.textContent = task.subject + " • Due: " + task.date;
      if (!task.done && isOverdue(task.date)){
         details.textContent += " (overdue)";
         details.classList.add("text-danger");
      }

      info.appendChild(title);
      info.appendChild(details);

      // This creates a button that allows the user to delete a task
      const del = document.createElement("button");
      del.type = "button";
      del.className = "btn btn-outline-brand";
      del.textContent = "Delete";
      del.setAttribute("aria-label", "Delete " + task.name);
      del.addEventListener("click", function (){
         deleteTask(task.id);
      });

      card.appendChild(check);
      card.appendChild(info);
      card.appendChild(del);
      taskList.appendChild(card);
   }

   updateProgress();
}

function isOverdue(dateText){
   const due = new Date(dateText + "T00:00:00");
   const today = new Date();
   today.setHours(0,0,0,0);
   return due < today;
}

// ---------- Add / complete / delete ----------
function addTask(event){
   event.preventDefault();   // stop the page from reloading

   const name = taskName.value.trim();
   const subject = taskSubject.value.trim();
   const date = taskDate.value;

   if (name == ""){
      showMessage("Please enter a task name.", true);
      taskName.focus();
      return;
   }
   if(name.length < 3){
      showMessage("Task name must be at least 3 characters.", true);
      taskName.focus();
      return;
   }
   if (subject === ""){
      showMessage("Please enter a subject.", true);
      taskSubject.focus();
      return;
   }
   if (date === ""){
      showMessage("Please choose a due date.", true);
      taskDate.focus();
      return;
   }

   const newTask = {
      id: Date.now(),
      name: name,
      subject: subject,
      date: date,
      done: false
   };

   tasks.push(newTask);
   saveTasks();
   renderTasks();
   taskForm.reset();
   showMessage('Task "' + name + '" was added successfully!', false);
   buddySay('Nice! "' + name + '" is on your list.', false);
   checkBadges(true);
}

function toggleTask(id){
   let justDone = false;
   for (let i = 0; i < tasks.length; i++){
      if (tasks[i].id === id) {
         tasks[i].done = !tasks[i].done; // true becomes false, false becomes true
         justDone = tasks[i].done;
      }
   }
   saveTasks();
   renderTasks();

   const gotBadge = checkBadges(true);   // a badge message replaces the normal one
   if (justDone && !gotBadge){
      celebrate("Task completed! Great job!");
   }
}

function deleteTask(id){
   const remaining = [];
   for (let i = 0; i < tasks.length; i++){
      if (tasks[i].id !== id){
         remaining.push(tasks[i]);
      }
   }
   tasks = remaining;
   saveTasks();
   renderTasks();
   showMessage("Task deleted.", false);
}

// ---------- Progress tracker ----------
function updateProgress(){
   const total = tasks.length;
   let completed = 0;
   for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].done){
         completed++;
      }
   }

   let percent = 0;
   if (total > 0){
      percent = Math.round((completed / total) * 100); // 2 of 3 = 67
   }

   totalTasks.textContent = total;
   completedTasks.textContent = completed;
   remainingTasks.textContent = total - completed;
   progressPercent.textContent = percent + "%";
   progressBar.style.width = percent + "%";
   progressTrack.setAttribute("aria-valuenow", percent);
}

// ---------- Daily study goals (saved) ----------
const goalBoxes = [
   document.getElementById("goal1"),
   document.getElementById("goal2"),
   document.getElementById("goal3")
];

function loadGoals(){
   const saved = localStorage.getItem("sv-goals");
   if (saved !== null){
      const states = JSON.parse(saved); // eg: [true, false, true]
      for (let i = 0; i < goalBoxes.length; i++){
         goalBoxes[i].checked = states[i];
      }
   }
}

function saveGoals(){
   const states = [];
   for (let i = 0; i < goalBoxes.length; i++){
      states.push(goalBoxes[i].checked);
   }
   localStorage.setItem("sv-goals", JSON.stringify(states));
   checkBadges(true);
}

// ---------- Deadline reminder ----------
function showDaysRemaining(){
   if(deadlineDate.value === ""){
      deadlineMessage.textContent = "Select a date to see how many days remain.";
      return;
   }

   const deadline = new Date(deadlineDate.value + "T00:00:00");
   const today = new Date();
   today.setHours(0,0,0,0);  // ignore the time, compare dates only

   const msPerDay = 1000 * 60 * 60 * 24;
   const days = Math.round((deadline - today) / msPerDay);

   if (days > 1){
      deadlineMessage.textContent = days + " days remaining. Keep going!";
   } else if (days === 1){
      deadlineMessage.textContent = "1 day remaining. Almost there!";
   } else if (days === 0){
      deadlineMessage.textContent = "The deadline is today!";
   } else if (days === -1){
      deadlineMessage.textContent = "This deadline passed 1 day ago.";
   } else {
      deadlineMessage.textContent = "This deadline passed " + Math.abs(days) + " days ago.";
   }
   checkBadges(true);
}

// ---------- Study buddy (Bruno) ----------
const buddy = document.getElementById("buddy");
const buddyBtn = document.getElementById("buddyBtn");
const buddyBubble = document.getElementById("buddyBubble");
const confettiBox = document.getElementById("confetti");
let bubbleTimer;
let confettiTimer;

const tips = [
   "Small steps every day add up!",
   "Try 25 minutes of focus, then a 5 minute break.",
   "Write tomorrow's tasks tonight.",
   "Drink some water. Your brain will thank you!",
   "One task at a time. You've got this!"
];

function buddySay(text, cheer){
   buddyBubble.textContent = text;
   buddyBubble.classList.remove("is-hidden");
   if (cheer){
      buddy.classList.remove("cheer");
      void buddy.offsetWidth;              // restart the jump animation
      buddy.classList.add("cheer");
   }
   clearTimeout(bubbleTimer);
   bubbleTimer = setTimeout(function (){
      buddyBubble.classList.add("is-hidden");
      buddy.classList.remove("cheer");
   }, 4500);
}

buddyBtn.addEventListener("click", function (){
   const number = Math.floor(Math.random() * tips.length);
   buddySay(tips[number], false);
});

// ---------- Confetti ----------
function launchConfetti(){
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      return;                              // respect people who turn animations off
   }
   const colors = ["var(--accent)", "var(--accent-2)", "var(--pop)", "var(--ink-line)"];
   for (let i = 0; i < 45; i++){
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
   confettiTimer = setTimeout(function (){
      confettiBox.innerHTML = "";
   }, 4500);
}

function celebrate(message){
   launchConfetti();
   buddySay(message, true);
}

// ---------- Achievement badges ----------
const badgeList = document.getElementById("badgeList");
const badgeCount = document.getElementById("badgeCount");

const badges = [
   { id: "first-task",  icon: "⭐", name: "First Step",       text: "Add your first task." },
   { id: "first-done",  icon: "✅", name: "Task Master",      text: "Complete a task." },
   { id: "three-done",  icon: "🔥", name: "On a Roll",        text: "Complete 3 tasks." },
   { id: "all-goals",   icon: "🎯", name: "Goal Getter",      text: "Tick all 3 daily goals." },
   { id: "clean-sweep", icon: "🏆", name: "Clean Sweep",      text: "Finish every task (at least 3)." },
   { id: "deadline",    icon: "⏰", name: "Deadline Watcher", text: "Use the deadline reminder." }
];

let unlocked = [];
if (localStorage.getItem("sv-badges") !== null){
   unlocked = JSON.parse(localStorage.getItem("sv-badges"));
}

function isEarned(id){
   const total = tasks.length;
   let done = 0;
   for (let i = 0; i < tasks.length; i++){
      if (tasks[i].done){
         done++;
      }
   }
   let goalsDone = 0;
   for (let i = 0; i < goalBoxes.length; i++){
      if (goalBoxes[i].checked){
         goalsDone++;
      }
   }

   if (id === "first-task") { return total >= 1; }
   if (id === "first-done") { return done >= 1; }
   if (id === "three-done") { return done >= 3; }
   if (id === "all-goals") { return goalsDone === goalBoxes.length; }
   if (id === "clean-sweep") { return total >= 3 && done === total; }
   if (id === "deadline") { return deadlineDate.value !== ""; }
   return false;
}

// Unlocks any badge that has just been earned. Returns true if one was unlocked.
function checkBadges(announce){
   let newName = "";
   for (let i = 0; i < badges.length; i++){
      if (unlocked.indexOf(badges[i].id) === -1 && isEarned(badges[i].id)){
         unlocked.push(badges[i].id);
         if (newName !== ""){
            newName = newName + " + ";
         }
         newName = newName + badges[i].name;
      }
   }
   if (newName === ""){
      return false;
   }
   localStorage.setItem("sv-badges", JSON.stringify(unlocked));
   renderBadges();
   if (announce){
      celebrate("Badge unlocked: " + newName + "!");
   }
   return true;
}

function renderBadges(){
   badgeList.innerHTML = "";
   for (let i = 0; i < badges.length; i++){
      const badge = badges[i];
      const isUnlocked = unlocked.indexOf(badge.id) !== -1;

      const col = document.createElement("div");
      col.className = "col-6 col-md-4";

      const card = document.createElement("div");
      card.className = "sv-card no-pin badge-card " + (isUnlocked ? "unlocked" : "locked");

      const icon = document.createElement("div");
      icon.className = "badge-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = isUnlocked ? badge.icon : "🔒";

      const name = document.createElement("h3");
      name.textContent = badge.name;

      const text = document.createElement("p");
      text.textContent = isUnlocked ? badge.text : "Locked: " + badge.text;

      card.appendChild(icon);
      card.appendChild(name);
      card.appendChild(text);
      col.appendChild(card);
      badgeList.appendChild(col);
   }
   badgeCount.textContent = unlocked.length + " of " + badges.length;
}

// ----------- Connect everything ----------
taskForm.addEventListener("submit", addTask);

for(let i = 0; i < goalBoxes.length; i++){
   goalBoxes[i].addEventListener("change", saveGoals);
}
deadlineDate.addEventListener("change", showDaysRemaining);

loadGoals();
renderTasks();
renderBadges();
buddySay("Hi! I'm Bruno, your study buddy. Click me for a tip!", false);
