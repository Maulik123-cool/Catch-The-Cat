const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let catIndex = -1;
let timerInterval, catMoveInterval;

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
                catIndex = -1; // prevent double score
            }
        };
        board.appendChild(tile);
    }
}

// Start the game
function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.innerText = `Score: ${score}`;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;
    createBoard();
    moveCat(); // Start the cat movement immediately

    clearInterval(timerInterval);
    clearInterval(catMoveInterval);

    timerInterval = setInterval(updateTimer, 1000);

    // Move cat every 1 second no matter what
    catMoveInterval = setInterval(() => {
        moveCat();
    }, 1000);
}

// Show the cat in a random tile
function moveCat() {
    removeCat();

    catIndex = Math.floor(Math.random() * 9);
    const tiles = document.querySelectorAll('.tile');
    const cat = document.createElement('img');
    cat.src = 'cat.png';
    cat.alt = 'Cat';
    tiles[catIndex].appendChild(cat);
}

// Remove all cats
function removeCat() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.innerHTML = '');
}

// Countdown timer
function updateTimer() {
    timeLeft--;
    timerDisplay.innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        clearInterval(catMoveInterval);
        endGame();
    }
}

// End game
function endGame() {
    alert(`⏰ Time's up! You scored ${score} points.`);
    board.innerHTML = '';
}
