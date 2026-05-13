// ─── State ──────────────────────────────────────────────────
const scores = { user: 0, draws: 0, computer: 0 };
const historyLog = [];

const emoji = {
  snake: "🐍",
  water: "💧",
  gun:   "🔫",
};

// ─── DOM refs ────────────────────────────────────────────────
const userAvatar   = document.getElementById("userAvatar");
const cpuAvatar    = document.getElementById("cpuAvatar");
const userMoveName = document.getElementById("userMoveName");
const cpuMoveName  = document.getElementById("cpuMoveName");
const resultBadge  = document.getElementById("resultBadge");
const scoreUser    = document.getElementById("scoreUser");
const scoreDraws   = document.getElementById("scoreDraws");
const scoreCpu     = document.getElementById("scoreCpu");

// ─── Build Rules + History strip on load ─────────────────────
window.addEventListener("DOMContentLoaded", () => {
  buildRulesBlock();
  buildHistoryStrip();
});

function buildRulesBlock() {
  const main = document.querySelector("main");
  const rules = document.createElement("div");
  rules.className = "rules";
  rules.innerHTML = `
    <div class="rule-item"><span>🐍 Snake</span> drinks 💧 Water</div>
    <div class="rule-item"><span>💧 Water</span> douses 🔫 Gun</div>
    <div class="rule-item"><span>🔫 Gun</span> shoots 🐍 Snake</div>
  `;
  main.appendChild(rules);
}

function buildHistoryStrip() {
  const main = document.querySelector("main");
  const strip = document.createElement("div");
  strip.className = "history-strip";
  strip.id = "historyStrip";
  main.appendChild(strip);
}

// ─── Core play function ───────────────────────────────────────
async function play(move) {

    try {

        const response = await fetch('/play', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                move: move
            })
        });

        if (!response.ok) {
            throw new Error("Server response failed");
        }

        const data = await response.json();

        renderResult(data);

    }

    catch(error) {

        console.log("ERROR:", error);

        resultBadge.textContent = "❌ Connection Error";
    }
}

// ─── Render result ────────────────────────────────────────────
function renderResult({ user, computer, winner }) {
  // Avatars
  animateAvatar(userAvatar, emoji[user] || "?");
  animateAvatar(cpuAvatar,  emoji[computer] || "?");

  userMoveName.textContent = user;
  cpuMoveName.textContent  = computer;
  userMoveName.classList.add("active");
  cpuMoveName.classList.add("active");

  // Result badge
  const labels = { user: "You win! 🎉", computer: "CPU wins!", draw: "Draw" };
  resultBadge.textContent = labels[winner] || winner;
  resultBadge.className   = "result-badge " + (winner === "user" ? "win" : winner === "computer" ? "lose" : "draw");

  // Avatar states
  userAvatar.className = "avatar " + (winner === "user" ? "win" : winner === "computer" ? "lose" : "draw");
  cpuAvatar.className  = "avatar " + (winner === "computer" ? "win" : winner === "user" ? "lose" : "draw");

  // Scores
  if (winner === "user")     scores.user++;
  else if (winner === "computer") scores.computer++;
  else                            scores.draws++;

  scoreUser.textContent  = scores.user;
  scoreDraws.textContent = scores.draws;
  scoreCpu.textContent   = scores.computer;

  // History chip
  historyLog.push({ user, computer, winner });
  addHistoryChip(user, winner);
}

// ─── Avatar pop animation ─────────────────────────────────────
function animateAvatar(el, content) {
  el.classList.remove("pop");
  void el.offsetWidth; // reflow
  el.textContent = content;
  el.classList.add("pop");
}

// ─── History chip ─────────────────────────────────────────────
function addHistoryChip(move, winner) {
  const strip = document.getElementById("historyStrip");
  const chip  = document.createElement("div");
  chip.className = "history-chip " + (winner === "user" ? "win" : winner === "computer" ? "lose" : "draw");
  chip.textContent = emoji[move] + " " + move;
  strip.appendChild(chip);
  strip.scrollLeft = strip.scrollWidth;
}

// ─── Helpers ──────────────────────────────────────────────────
function setButtonsDisabled(state) {
  document.querySelectorAll(".move-btn").forEach(btn => btn.disabled = state);
}

function highlightSelected(move) {
  document.querySelectorAll(".move-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.move === move);
  });
}

function resetGame() {
  scores.user = scores.draws = scores.computer = 0;
  scoreUser.textContent  = "0";
  scoreDraws.textContent = "0";
  scoreCpu.textContent   = "0";

  userAvatar.textContent   = "?";
  cpuAvatar.textContent    = "?";
  userAvatar.className     = "avatar";
  cpuAvatar.className      = "avatar";
  userMoveName.textContent = "—";
  cpuMoveName.textContent  = "—";
  userMoveName.classList.remove("active");
  cpuMoveName.classList.remove("active");
  resultBadge.textContent  = "Pick a move";
  resultBadge.className    = "result-badge";

  historyLog.length = 0;
  const strip = document.getElementById("historyStrip");
  if (strip) strip.innerHTML = "";

  document.querySelectorAll(".move-btn").forEach(btn => btn.classList.remove("selected"));
}