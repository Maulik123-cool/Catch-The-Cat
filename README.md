# Catch-The-Cat
Catch the Cat is a fun little game where a cheeky cat keeps popping out of boxes, and your job is to click it before it disappears! 🐱 Every time you catch the cat, you get a point. Miss it? Oops — you lose one! It's fast, silly, and a great way to test how quick your fingers are.


![image](https://github.com/user-attachments/assets/2afc9cd3-1927-46d5-8f6b-4a6286bccc3f)

![image](https://github.com/user-attachments/assets/3b46840c-620b-4959-b1cc-61bcfb9a4d44)


![image](https://github.com/user-attachments/assets/9a3d8432-13ff-496a-a111-fe011eda649a)

How to Play

- Click the **Start Game** button.
- A cat will randomly appear in one of the boxes.
- **Click the cat** before it hides again to earn points.
- Miss the cat? You lose a point!
- The game lasts for **30 seconds** — try to get the highest score!

Features

- Simple and fast-paced gameplay
- Cute cat image 🐾
- Score tracker and countdown timer
- Playable right in your browser
- Great for friendly competitions!

CODE - for PLAYING!! (HTML)

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Catch the Cat!</title>
  <style>
    body {
      font-family: 'Comic Sans MS', cursive;
      background: #1d1d1d;
      color: white;
      text-align: center;
      margin: 0;
      padding: 20px;
    }
    h1 {
      color: #ffdd57;
      margin-bottom: 10px;
    }
    #score {
      font-size: 1.5em;
      margin-bottom: 20px;
    }
    #gameBoard {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      grid-gap: 15px;
      justify-content: center;
      margin: auto;
    }
    .box {
      width: 100px;
      height: 100px;
      background-color: #333;
      border-radius: 10px;
      position: relative;
      cursor: pointer;
      transition: background 0.2s;
    }
    .box:hover {
      background-color: #555;
    }
    .cat {
      width: 80px;
      height: 80px;
      background-image: url('https://i.imgur.com/5fj4VbX.png');
      background-size: cover;
      position: absolute;
      top: 10px;
      left: 10px;
      display: none;
    }
    #startBtn {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 1em;
      background-color: #ffdd57;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    #timer {
      margin-top: 15px;
      font-size: 1.2em;
    }
  </style>
</head>
<body>

  <h1>🐱 Catch the Cat!</h1>
  <div id="score">Score: 0</div>
  <div id="timer">Time left: 30s</div>
  <div id="gameBoard"></div>
  <button id="startBtn">Start Game</button>

  <script>
    const board = document.getElementById("gameBoard");
    const scoreDisplay = document.getElementById("score");
    const timerDisplay = document.getElementById("timer");
    const startBtn = document.getElementById("startBtn");

    let boxes = [];
    let score = 0;
    let timeLeft = 30;
    let currentCatBox = null;
    let gameInterval, countdown;

    function createBoard() {
      board.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const box = document.createElement("div");
        box.classList.add("box");

        const cat = document.createElement("div");
        cat.classList.add("cat");

        box.appendChild(cat);
        box.addEventListener("click", () => {
          if (cat.style.display === "block") {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            cat.style.display = "none";
          } else {
            score = Math.max(0, score - 1);
            scoreDisplay.textContent = `Score: ${score}`;
          }
        });

        board.appendChild(box);
        boxes.push(box);
      }
    }

    function showRandomCat() {
      if (currentCatBox) {
        currentCatBox.querySelector(".cat").style.display = "none";
      }
      const randomIndex = Math.floor(Math.random() * boxes.length);
      const cat = boxes[randomIndex].querySelector(".cat");
      cat.style.display = "block";
      currentCatBox = boxes[randomIndex];
    }

    function startGame() {
      score = 0;
      timeLeft = 30;
      scoreDisplay.textContent = `Score: ${score}`;
      timerDisplay.textContent = `Time left: ${timeLeft}s`;
      startBtn.disabled = true;

      createBoard();

      gameInterval = setInterval(showRandomCat, 800);
      countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(gameInterval);
          clearInterval(countdown);
          alert(`⏰ Time's up! Final score: ${score}`);
          startBtn.disabled = false;
        }
      }, 1000);
    }

    startBtn.addEventListener("click", startGame);
    createBoard();
  </script>

</body>
</html>
