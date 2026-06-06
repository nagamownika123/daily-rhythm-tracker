const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const gymDays = new Set([1, 3, 6]);
const optionalGymDays = new Set([5]);
const officeDay = 4;
const weekendDays = new Set([0, 6]);
const planWeekStart = new Date(2026, 5, 1);
const planWeekEnd = new Date(2026, 5, 7);

const cultPlan = {
  1: {
    label: "Strength day",
    title: "Cult: Strength class",
    note: "Book only an 8:00, 8:30, or 9:00 AM class. Prefer adidas strength+; backup Strength Bash or HRX if adidas is not available.",
  },
  3: {
    label: "HRX Workout",
    title: "Cult: HRX Workout",
    note: "Conditioning day for stamina and insulin sensitivity. Keep intensity moderate, not punishing.",
  },
  6: {
    label: "Evolve Yoga",
    title: "Cult: Yoga / Evolve Yoga",
    note: "Mobility, recovery, stress regulation, and consistency. Dance Fitness is the fun backup.",
  },
  5: {
    label: "Optional gym",
    title: "Optional Cult class",
    note: "Optional trial day. Keep it light: Yoga, Dance Fitness, or an easy strength class if sleep and work are okay.",
  },
};

const mealPlan = {
  1: {
    breakfast: "Sweet potato + curd or boiled egg",
    lunch: "Beerakay pachadi + rice base + air-fried chicken legs",
    dinner: "Chapathi + methi radish curry",
    prep: "Air fry chicken legs while rice cooks.",
  },
  2: {
    breakfast: "Egg toast or peanut butter toast",
    lunch: "Khichdi with vegetables and moong dal",
    dinner: "Protein pasta with paneer/tofu/chicken + peas/capsicum",
    prep: "Keep dal/rice measured and pasta vegetables ready.",
  },
  3: {
    breakfast: "Eggs + fruit",
    lunch: "Pappu + dondakay fry + rice base",
    dinner: "Savory oats with vegetables + curd or egg",
    prep: "Cook extra pappu if useful.",
  },
  4: {
    breakfast: "Poha with peanuts + peas",
    lunch: "Prawns coconut curry + rice base",
    dinner: "Egg salad with cucumber, onion, and greens",
    prep: "Boil eggs and keep salad vegetables washed.",
  },
  5: {
    breakfast: "Avocado toast + egg or sprouts",
    lunch: "Vankay nethalu + rice base",
    dinner: "Egg/veg noodles with egg/paneer/tofu + mixed vegetables",
    prep: "Keep mixed vegetables ready for noodles.",
  },
  6: {
    breakfast: "Idly + palli chutney",
    lunch: "Egg biryani + raita/cucumber if easy",
    dinner: "Veg + protein pizza with paneer/chicken/egg topping",
    prep: "Use leftover curd for raita.",
  },
  0: {
    breakfast: "Semiya upma with peanuts + vegetables",
    lunch: "Chicken curry + rasam + rice base",
    dinner: "Curd rice or bhel with sprouts/peanuts",
    prep: "Keep dinner light after heavier lunch.",
  },
};

const fruitPlan = {
  1: "4:30 PM fruit at desk: jamun if available, or papaya. Keep it whole fruit, not juice.",
  2: "4:30 PM fruit at desk: papaya or guava. Add a few nuts if you are hungry.",
  3: "4:30 PM fruit at desk: small bowl mango or muskmelon. Keep the portion moderate.",
  4: "4:30 PM fruit at desk: watermelon or muskmelon for hydration before evening meetings.",
  5: "4:30 PM fruit at desk: jamun, pomegranate, or guava. Good low-fuss desk fruit.",
  6: "4:30 PM fruit: jackfruit or mango as a small weekend portion, preferably after lunch has settled.",
  0: "4:30 PM fruit: papaya, guava, or muskmelon. Keep Sunday light and easy.",
};

const sundayMealPrep = [
  "Marinate chicken legs",
  "Boil 6-8 eggs",
  "Wash/chop cucumber, onion, greens, methi, radish",
  "Portion prawns, fish, and chicken separately",
  "Measure dal/rice for khichdi and pappu",
  "Keep peanuts, peas, mixed veg, curd, sprouts ready",
  "Make one chutney only, preferably palli chutney",
];

const prepCues = {
  1: {
    morning: "Today: use the marinated chicken legs if ready; chop methi/radish for dinner if not already done.",
    night: "For Tuesday: measure or soak moong dal + rice for khichdi; keep pasta vegetables/protein ready.",
  },
  2: {
    morning: "Today: keep khichdi dal/rice ready; move pasta protein or paneer/tofu to the fridge if needed.",
    night: "For Wednesday: keep eggs/fruit ready; chop dondakay and measure pappu for lunch.",
  },
  3: {
    morning: "Today: cook pappu and dondakay; keep vegetables ready for savory oats.",
    night: "For Thursday: boil eggs if not already done; wash cucumber/onion/greens; thaw prawns safely in the fridge.",
  },
  4: {
    morning: "Today: add peanuts/peas to poha; keep salad vegetables ready for dinner.",
    night: "For Friday: keep avocado/egg/sprouts ready; thaw nethalu/fish in the fridge; keep mixed vegetables for noodles.",
  },
  5: {
    morning: "For Saturday idly: if making batter from scratch, soak idly rice + urad dal this morning; otherwise check batter is available.",
    night: "For Saturday idly: grind batter and leave it to ferment overnight; keep palli chutney ingredients ready.",
  },
  6: {
    morning: "Today: use fermented idly batter; keep curd/cucumber ready for raita if making egg biryani.",
    night: "For Sunday: keep semiya, peanuts, and vegetables ready; thaw chicken curry pieces safely in the fridge.",
  },
  0: {
    morning: "Today: do weekly meal prep - marinate chicken, boil eggs, wash/chop vegetables, portion proteins, and measure dal/rice.",
    night: "For next week: keep the meal-planner chat updated with vegetables/proteins before planning Monday.",
  },
};

const basePlan = [
  {
    start: "07:00",
    end: "07:30",
    title: "Wake, water, nonfiction",
    note: "Phone stays away. Read before the day starts talking back.",
    type: "personal",
  },
  {
    start: "07:30",
    end: "08:00",
    title: "Breakfast and AM skin care",
    note: "Quick breakfast base, cleanse, moisturize, sunscreen. Keep phone away.",
    type: "food",
    morningPrepCue: true,
  },
  {
    start: "08:00",
    end: "10:00",
    title: "Morning block",
    note: "This changes by day: gym on fixed days, home/reset on non-gym days.",
    type: "gym",
    morningFlex: true,
  },
  {
    start: "10:00",
    end: "11:00",
    title: "Bath, breakfast, quick prep",
    note: "After gym: bath, AM skin care, breakfast. Non-gym: use this for breakfast plus lunch/dinner base.",
    type: "food",
  },
  {
    start: "11:15",
    end: "11:25",
    title: "Work setup",
    note: "Calendar, top three tasks, blockers, standup notes. This is part of the 9-hour work cap.",
    type: "work",
  },
  {
    start: "11:30",
    end: "12:00",
    title: "Standup with manager",
    note: "Share progress, blockers, and what will move today.",
    type: "work",
  },
  {
    start: "12:00",
    end: "14:15",
    title: "Deep work",
    note: "Best engineering/review block. No cooking and no phone drift.",
    type: "work",
  },
  {
    start: "14:15",
    end: "15:00",
    title: "Lunch and kitchen reset",
    note: "Eat home food, clear the counter, return cleanly.",
    type: "food",
  },
  {
    start: "15:00",
    end: "17:00",
    title: "Second work block",
    note: "Build, review, follow up, and finish important work before evening meetings.",
    type: "work",
    fruitCue: true,
  },
  {
    start: "17:00",
    end: "18:00",
    title: "Shallow work block",
    note: "Emails, Teams replies, light follow-ups, status notes, calendar cleanup, and low-focus admin.",
    type: "work",
  },
  {
    start: "18:00",
    end: "18:30",
    title: "Scooby walk",
    note: "Walk before the US meeting stretch. Dinner can be eaten at desk during meetings.",
    type: "personal",
  },
  {
    start: "18:30",
    end: "21:15",
    title: "US meetings and collaboration",
    note: "Calls, clarifications, reviews, and fast responses. Eat dinner at desk when the meeting flow allows.",
    type: "work",
  },
  {
    start: "21:15",
    end: "21:30",
    title: "Light reset",
    note: "No heavy dinner here. Water, herbal tea, fruit, or a small protein snack only if hungry.",
    type: "personal",
  },
  {
    start: "21:30",
    end: "21:50",
    title: "US hours wrap",
    note: "Only close urgent loops, send key updates, and park tomorrow's first task. This keeps the work day at 9 hours.",
    type: "work",
  },
  {
    start: "21:50",
    end: "22:05",
    title: "PM skin care",
    note: "Cleanse and moisturize. Do it before you get too sleepy.",
    type: "personal",
  },
  {
    start: "22:05",
    end: "22:20",
    title: "Tomorrow food prep",
    note: "Check if anything needs soaking, thawing, chopping, or batter fermentation.",
    type: "food",
    nightPrepCue: true,
  },
  {
    start: "22:20",
    end: "22:45",
    title: "Shutdown",
    note: "Laptop closed, tomorrow noted, phone away from bed.",
    type: "personal",
  },
  {
    start: "22:45",
    end: "23:15",
    title: "Fiction reading",
    note: "Read lightly. Aim lights out by 11:45 PM for 7+ hours.",
    type: "personal",
  },
];

const officePlan = [
  {
    start: "07:00",
    end: "07:30",
    title: "Wake, water, nonfiction",
    note: "Keep the first half hour phone-free.",
    type: "personal",
  },
  {
    start: "07:30",
    end: "08:00",
    title: "Breakfast and AM skin care",
    note: "Breakfast, cleanse, moisturize, sunscreen, outfit, bag, charger, ID card.",
    type: "food",
    morningPrepCue: true,
  },
  {
    start: "08:00",
    end: "10:00",
    title: "Office commute block",
    note: "Use this for commute or getting ready. No gym pressure on office day.",
    type: "personal",
  },
  {
    start: "10:00",
    end: "11:00",
    title: "Settle, breakfast, quick prep",
    note: "Reach office, finish breakfast if needed, water, AM skin care touch-up, and settle before work.",
    type: "personal",
  },
  {
    start: "11:00",
    end: "11:25",
    title: "Work setup",
    note: "Calendar, blockers, standup notes, priority list. This starts the 9-hour work cap.",
    type: "work",
  },
  {
    start: "11:30",
    end: "12:00",
    title: "Standup with manager",
    note: "Same clean update, even from office.",
    type: "work",
  },
  {
    start: "12:00",
    end: "14:15",
    title: "Office focus block",
    note: "Keep this for collaborative work and urgent fixes.",
    type: "work",
  },
  {
    start: "14:15",
    end: "15:00",
    title: "Lunch",
    note: "Carry food if possible; keep it simple.",
    type: "food",
  },
  {
    start: "15:00",
    end: "17:00",
    title: "Office follow-ups",
    note: "Use face time for discussions that are slow online. Stop at 5 to protect evening energy.",
    type: "work",
    fruitCue: true,
  },
  {
    start: "17:00",
    end: "18:00",
    title: "Return and pet walk",
    note: "A short walk still counts on office day.",
    type: "personal",
  },
  {
    start: "18:00",
    end: "18:25",
    title: "Early dinner",
    note: "Eat before US meetings, or carry a home-food dinner box for office day.",
    type: "food",
  },
  {
    start: "18:30",
    end: "21:30",
    title: "US meetings and wrap",
    note: "Meetings, updates, and key follow-ups. Keep office day capped at 9 work hours.",
    type: "work",
  },
  {
    start: "21:30",
    end: "22:20",
    title: "Final work close",
    note: "Only priority responses and tomorrow's first task. This closes the 9-hour work day.",
    type: "work",
  },
  {
    start: "22:20",
    end: "22:35",
    title: "PM skin care",
    note: "Cleanse and moisturize before you crash.",
    type: "personal",
  },
  {
    start: "22:35",
    end: "22:50",
    title: "Tomorrow food prep",
    note: "Check if anything needs soaking, thawing, chopping, or batter fermentation.",
    type: "food",
    nightPrepCue: true,
  },
  {
    start: "23:20",
    end: "23:45",
    title: "Fiction reading",
    note: "Keep it short. Aim lights out by 11:45 PM.",
    type: "personal",
  },
];

const weekendPlan = [
  {
    start: "07:30",
    end: "08:00",
    title: "Slow wake and nonfiction",
    note: "No work rush. Keep the phone away and let the day start quietly.",
    type: "personal",
    morningPrepCue: true,
  },
  {
    start: "08:00",
    end: "10:00",
    title: "Weekend morning block",
    note: "Saturday: gym if booked at 8, 8:30, or 9. Sunday: home reset, groceries, or quiet morning.",
    type: "personal",
    morningFlex: true,
  },
  {
    start: "10:00",
    end: "11:00",
    title: "Bath, breakfast, quick prep",
    note: "After gym or home reset: bath, AM skin care, breakfast, and a small kitchen reset.",
    type: "food",
  },
  {
    start: "11:00",
    end: "12:30",
    title: "Home food prep",
    note: "Batch one useful base for the weekend or Monday: dal, curry, chopped vegetables, or protein prep.",
    type: "food",
    prepFlex: true,
  },
  {
    start: "12:30",
    end: "14:00",
    title: "Lunch and rest",
    note: "Eat properly and keep this unhurried.",
    type: "food",
  },
  {
    start: "14:00",
    end: "16:30",
    title: "Personal time",
    note: "Fiction, errands, family, hobbies, or a nap. No work planning here.",
    type: "personal",
    fruitCue: true,
  },
  {
    start: "16:30",
    end: "17:30",
    title: "Weekly reset",
    note: "Plan gym bookings, groceries, clothes, meals, and the top work items for Monday.",
    type: "personal",
  },
  {
    start: "17:30",
    end: "18:15",
    title: "Pet walk",
    note: "Longer relaxed walk if energy is good.",
    type: "personal",
  },
  {
    start: "18:15",
    end: "19:00",
    title: "Dinner",
    note: "Eat earlier even on weekends so sleep stays easy.",
    type: "food",
  },
  {
    start: "21:45",
    end: "22:00",
    title: "PM skin care",
    note: "Cleanse and moisturize.",
    type: "personal",
  },
  {
    start: "22:00",
    end: "22:15",
    title: "Tomorrow food prep",
    note: "Check if anything needs soaking, thawing, chopping, or batter fermentation.",
    type: "food",
    nightPrepCue: true,
  },
  {
    start: "22:15",
    end: "23:00",
    title: "Fiction and wind down",
    note: "Keep weekends restorative. Sleep before the week steals the softness.",
    type: "personal",
  },
];

const boundaries = [
  ["Morning", "No phone for the first 30 minutes"],
  ["Deep work", "Phone away from 12:00 to 2:30"],
  ["Evening", "Check only between meetings when needed"],
  ["Sleep", "Fiction book replaces scrolling"],
];

let selectedDate = getInitialSelectedDate();

const timelineEl = document.querySelector("#timeline");
const weekGridEl = document.querySelector("#weekGrid");
const mealListEl = document.querySelector("#mealList");
const enableRemindersButton = document.querySelector("#enableReminders");
const reminderStatusEl = document.querySelector("#reminderStatus");
const todayLabelEl = document.querySelector("#todayLabel");
const selectedDayTitleEl = document.querySelector("#selectedDayTitle");
const dayTypeEl = document.querySelector("#dayType");
const progressTextEl = document.querySelector("#progressText");
const currentBlockEl = document.querySelector("#currentBlock");
const reminderState = {
  enabled: localStorage.getItem("routine-reminders-enabled") === "true",
  lastKey: localStorage.getItem("routine-reminders-last-key") || "",
};

function isoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getInitialSelectedDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today < planWeekStart) return new Date(planWeekStart);
  if (today > planWeekEnd) return new Date(planWeekStart);
  return today;
}

function startOfWeek(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(date);
}

function addDays(date, count) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + count);
  return copy;
}

function getPlan(date) {
  const day = date.getDay();
  const source = weekendDays.has(day) ? weekendPlan : day === officeDay ? officePlan : basePlan;
  const meals = mealPlan[day];
  const mealSummary = `Meals today: BF - ${meals.breakfast}; Lunch - ${meals.lunch}; Dinner - ${meals.dinner}.`;
  return source
    .filter((item) => {
      if (item.onlyGymDay) return gymDays.has(day);
      if (item.onlyNonGymDay) return !gymDays.has(day);
      return true;
    })
    .map((item) => {
      if (item.morningFlex) {
        if (gymDays.has(day) || optionalGymDays.has(day)) {
          const trialText = optionalGymDays.has(day) ? "Optional this week: " : "";
          return {
            ...item,
            title: `${trialText}Gym + cooking`,
            note: `${cultPlan[day].label}: ${cultPlan[day].note} ${mealSummary}`,
            type: "gym",
          };
        }
        return {
          ...item,
          title: "Cooking + home reset",
          note: `Use 8-10 for cooking base, laundry, groceries, quiet reading, or house reset. ${mealSummary}`,
          type: "personal",
        };
      }
      if (item.prepFlex && day === 0) {
        return {
          ...item,
          title: "Sunday meal prep",
          note: "Prep for the week: marinate chicken, boil eggs, wash/chop veg, portion proteins, measure dal/rice, and keep easy add-ons ready.",
        };
      }
      if (item.morningPrepCue) {
        return {
          ...item,
          note: `${item.note} ${prepCues[day].morning}`,
        };
      }
      if (item.nightPrepCue) {
        return {
          ...item,
          note: prepCues[day].night,
        };
      }
      if (item.fruitCue) {
        return {
          ...item,
          note: `${item.note} ${fruitPlan[day]}`,
        };
      }
      if (item.onlyGymDay && cultPlan[day]) {
        return { ...item, title: cultPlan[day].title, note: cultPlan[day].note };
      }
      return item;
    });
}

function minutes(value) {
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}

function timeLabel(item) {
  return `${to12Hour(item.start)} - ${to12Hour(item.end)}`;
}

function to12Hour(value) {
  const [hourRaw, minute] = value.split(":").map(Number);
  const hour = hourRaw % 12 || 12;
  const suffix = hourRaw >= 12 ? "PM" : "AM";
  return `${hour}:${String(minute).padStart(2, "0")} ${suffix}`;
}

function storageKey(date) {
  return `routine-tracker:${isoDate(date)}`;
}

function readDone(date) {
  try {
    return JSON.parse(localStorage.getItem(storageKey(date))) || {};
  } catch {
    return {};
  }
}

function writeDone(date, done) {
  localStorage.setItem(storageKey(date), JSON.stringify(done));
}

function taskId(item) {
  return `${item.start}-${item.title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function getCurrentTask(plan, date) {
  const now = new Date();
  if (isoDate(now) !== isoDate(date)) return null;
  const current = now.getHours() * 60 + now.getMinutes();
  return plan.find((item) => {
    const start = minutes(item.start);
    let end = minutes(item.end);
    if (end === 0) end = 24 * 60;
    return current >= start && current < end;
  }) || null;
}

function isSameDay(first, second) {
  return isoDate(first) === isoDate(second);
}

function getReminderDate() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today >= planWeekStart && today <= planWeekEnd) return today;
  return selectedDate;
}

function reminderSupported() {
  return "Notification" in window;
}

function reminderPermissionLabel() {
  if (!reminderSupported()) return "unsupported";
  return Notification.permission;
}

function updateReminderStatus() {
  if (!reminderSupported()) {
    reminderStatusEl.textContent = "This browser does not support pop-up reminders.";
    enableRemindersButton.disabled = true;
    return;
  }

  const permission = reminderPermissionLabel();
  if (reminderState.enabled && permission === "granted") {
    reminderStatusEl.textContent = "Pop-ups are on. Keep this tracker open in a browser tab.";
    enableRemindersButton.textContent = "Disable reminders";
  } else if (permission === "denied") {
    reminderStatusEl.textContent = "Pop-ups are blocked in browser settings.";
    enableRemindersButton.textContent = "Reminders blocked";
  } else {
    reminderStatusEl.textContent = "Pop-ups are off. Enable once, then keep this tab open.";
    enableRemindersButton.textContent = "Enable reminders";
  }
}

function showReminder(task, date) {
  const title = `${timeLabel(task)}: ${task.title}`;
  const body = task.note || "Time for this block.";

  if (document.visibilityState === "visible") {
    const oldToast = document.querySelector(".reminder-toast");
    if (oldToast) oldToast.remove();
    const toast = document.createElement("div");
    toast.className = "reminder-toast";
    toast.innerHTML = `<strong>${title}</strong><span>${body}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 9000);
  }

  if (reminderSupported() && Notification.permission === "granted") {
    new Notification(title, {
      body,
      tag: `routine-${isoDate(date)}-${taskId(task)}`,
      silent: false,
    });
  }
}

function checkReminders() {
  if (!reminderState.enabled || !reminderSupported() || Notification.permission !== "granted") return;

  const date = getReminderDate();
  const now = new Date();
  if (!isSameDay(now, date)) return;

  const plan = getPlan(date);
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const task = plan.find((item) => minutes(item.start) === currentMinutes);
  if (!task) return;

  const key = `${isoDate(date)}-${taskId(task)}-${itemStartKey(task)}`;
  if (reminderState.lastKey === key) return;

  reminderState.lastKey = key;
  localStorage.setItem("routine-reminders-last-key", key);
  showReminder(task, date);
}

function itemStartKey(item) {
  return item.start.replace(":", "");
}

function dayType(date) {
  if (weekendDays.has(date.getDay())) return date.getDay() === 6 ? "Weekend gym/off" : "Weekend off";
  if (date.getDay() === officeDay) return "Office day";
  if (gymDays.has(date.getDay())) return cultPlan[date.getDay()].label;
  if (optionalGymDays.has(date.getDay())) return "Optional gym";
  return "WFH rhythm";
}

function renderTimeline() {
  const plan = getPlan(selectedDate);
  const done = readDone(selectedDate);
  const current = getCurrentTask(plan, selectedDate);
  const completed = plan.filter((item) => done[taskId(item)]).length;
  const progress = plan.length ? Math.round((completed / plan.length) * 100) : 0;

  todayLabelEl.textContent = `Meal week: ${formatShortDate(planWeekStart)} - ${formatShortDate(planWeekEnd)}`;
  selectedDayTitleEl.textContent = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(selectedDate);
  dayTypeEl.textContent = dayType(selectedDate);
  progressTextEl.textContent = `${progress}%`;
  currentBlockEl.textContent = current ? current.title : "No active block";

  timelineEl.innerHTML = "";
  plan.forEach((item) => {
    const id = taskId(item);
    const row = document.createElement("article");
    row.className = `task ${item.type}`;
    if (done[id]) row.classList.add("done");
    if (current && taskId(current) === id) row.classList.add("is-current");

    row.innerHTML = `
      <div class="time">${timeLabel(item)}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${item.note}</p>
      </div>
      <label class="check">
        <input type="checkbox" ${done[id] ? "checked" : ""} aria-label="Mark ${item.title} complete">
        <span aria-hidden="true">✓</span>
      </label>
    `;

    row.querySelector("input").addEventListener("change", (event) => {
      const next = readDone(selectedDate);
      next[id] = event.target.checked;
      writeDone(selectedDate, next);
      renderTimeline();
      renderWeek();
    });

    timelineEl.appendChild(row);
  });
}

function renderMeals() {
  const day = selectedDate.getDay();
  const meals = mealPlan[day];
  mealListEl.innerHTML = "";
  [
    ["Breakfast", meals.breakfast],
    ["Lunch", meals.lunch],
    ["Dinner", meals.dinner],
    ["Fruit", fruitPlan[day]],
    ["Prep cue", meals.prep],
    ["Morning reminder", prepCues[day].morning],
    ["Night reminder", prepCues[day].night],
  ].forEach(([label, value]) => {
    const item = document.createElement("div");
    item.className = "meal-item";
    item.innerHTML = `
      <span>${label}</span>
      <strong>${value}</strong>
    `;
    mealListEl.appendChild(item);
  });

  if (day === 0) {
    const prep = document.createElement("div");
    prep.className = "meal-prep";
    prep.innerHTML = `
      <span>Sunday prep</span>
      <strong>${sundayMealPrep.join(" • ")}</strong>
    `;
    mealListEl.appendChild(prep);
  }
}

function renderBoundaries() {
  const boundaryList = document.querySelector("#boundaryList");
  boundaryList.innerHTML = "";
  boundaries.forEach(([time, label]) => {
    const item = document.createElement("div");
    item.className = "boundary";
    item.innerHTML = `
      <div class="boundary-icon" aria-hidden="true">•</div>
      <div>
        <span>${time}</span>
        <strong>${label}</strong>
      </div>
    `;
    boundaryList.appendChild(item);
  });
}

function renderWeek() {
  const start = new Date(planWeekStart);
  weekGridEl.innerHTML = "";
  for (let index = 0; index < 7; index += 1) {
    const date = addDays(start, index);
    const plan = getPlan(date);
    const done = readDone(date);
    const completed = plan.filter((item) => done[taskId(item)]).length;
    const progress = plan.length ? Math.round((completed / plan.length) * 100) : 0;
    const button = document.createElement("button");
    button.className = "day-tile";
    if (isoDate(date) === isoDate(selectedDate)) button.classList.add("selected");

    const tags = [];
    if (weekendDays.has(date.getDay())) tags.push(["Off", "personal"]);
    if (gymDays.has(date.getDay())) tags.push([cultPlan[date.getDay()].label, "gym"]);
    if (optionalGymDays.has(date.getDay())) tags.push(["Optional gym", "gym"]);
    if (date.getDay() === officeDay) tags.push(["Office", "office"]);
    tags.push(["Pet walk", "personal"]);
    if (!weekendDays.has(date.getDay())) tags.push(["Meetings 6:30", "work"]);

    button.innerHTML = `
      <h3>${dayNames[date.getDay()]} <span>${formatShortDate(date)}</span></h3>
      <div class="day-tags">
        ${tags.map(([label, type]) => `<span class="tag ${type}">${label}</span>`).join("")}
        <span class="tag personal">${progress}% done</span>
      </div>
    `;

    button.addEventListener("click", () => {
      selectedDate = date;
      renderTimeline();
      renderMeals();
      renderWeek();
    });

    weekGridEl.appendChild(button);
  }
}

document.querySelector("#resetDay").addEventListener("click", () => {
  localStorage.removeItem(storageKey(selectedDate));
  renderTimeline();
  renderMeals();
  renderWeek();
});

enableRemindersButton.addEventListener("click", async () => {
  if (!reminderSupported()) return;

  if (reminderState.enabled && Notification.permission === "granted") {
    reminderState.enabled = false;
    localStorage.setItem("routine-reminders-enabled", "false");
    updateReminderStatus();
    return;
  }

  const permission = Notification.permission === "granted"
    ? "granted"
    : await Notification.requestPermission();

  if (permission === "granted") {
    reminderState.enabled = true;
    localStorage.setItem("routine-reminders-enabled", "true");
    new Notification("Daily Rhythm reminders are on", {
      body: "I will pop up at the start of each planned block while this tracker tab is open.",
      tag: "routine-reminders-enabled",
    });
  }

  updateReminderStatus();
});

renderBoundaries();
renderTimeline();
renderMeals();
renderWeek();
updateReminderStatus();
setInterval(renderTimeline, 60 * 1000);
setInterval(checkReminders, 20 * 1000);
checkReminders();
