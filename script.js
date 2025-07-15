let score = 0;
let timeLeft = 30;
let running = false;
let catImg;
let moveInterval;
let countdownInterval;

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const gameArea = document.getElementById("gameArea");
const startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", startGame);

function startGame() {
  if (running) return;
  running = true;
  score = 0;
  timeLeft = 30;
  scoreDisplay.innerText = "Score: 0";
  timerDisplay.innerText = "Time: 30s";
  moveCat();
  moveInterval = setInterval(moveCat, 800);
  countdownInterval = setInterval(countdown, 1000);
}

function moveCat() {
  if (catImg) catImg.remove();

  const x = Math.random() * (250);
  const y = Math.random() * (250);

  catImg = document.createElement("img");
  catImg.src = "cat.png";
  catImg.classList.add("cat");
  catImg.style.left = `${x}px`;
  catImg.style.top = `${y}px`;

  catImg.onclick = () => {
    if (!running) return;
    score++;
    scoreDisplay.innerText = `Score: ${score}`;
    catImg.remove();
  };

  gameArea.appendChild(catImg);
}

function countdown() {
  timeLeft--;
  timerDisplay.innerText = `Time: ${timeLeft}s`;

  if (timeLeft <= 0) {
    running = false;
    clearInterval(moveInterval);
    clearInterval(countdownInterval);
    if (catImg) catImg.remove();
    scoreDisplay.innerText = `Final Score: ${score}`;
    timerDisplay.innerText = `Time: 0s`;
  }
}
