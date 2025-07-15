const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let catIndex = -1;
let timerInterval, catTimeout;

// Create the 3x3 grid
function createBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.index = i;
        tile.onclick = () => {
            if (parseInt(tile.dataset.index) === catIndex) {
                score++;
                scoreDisplay.innerText = `Score: ${score}`;
                removeCat();
            }
        };
        board.appendChild(tile);
    }
}

// Start game logic
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.innerText = `Score: ${score}`;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;
    createBoard();
    moveCat(); // start first cat
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

// Move the cat image to a random tile
function moveCat() {
    removeCat();

    catIndex = Math.floor(Math.random() * 9);
    const tiles = document.querySelectorAll('.tile');
    const cat = document.createElement('img');
    cat.src = 'cat.png';
    cat.alt = 'Cat';
    tiles[catIndex].appendChild(cat);

    // Remove cat after 1 second if not clicked
    catTimeout = setTimeout(() => {
        removeCat();
        if (timeLeft > 0) {
            moveCat();
        }
    }, 1000);
}

// Remove current cat
function removeCat() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.innerHTML = '');
    clearTimeout(catTimeout);
    catIndex = -1;
}

// Countdown timer
function updateTimer() {
    timeLeft--;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearTimeout(catTimeout);
        endGame();
    }
}

// End the game
function endGame() {
    alert(`⏰ Time's up! You scored ${score} points.`);
    board.innerHTML = '';
}
