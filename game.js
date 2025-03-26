const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const restartButton = document.createElement("button");
restartButton.innerText = "Reiniciar";
restartButton.style.display = "none";
document.body.appendChild(restartButton);

import { showScoreForm } from "./modulo.js";

let bird = { x: 50, y: 250, radius: 15, gravity: 1.2, lift: -12, velocity: 0 };
let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let gameInterval;
let frames = 0; 
const FPS = 60;

function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function drawPipes() {
    ctx.fillStyle = "green";
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipe.width, canvas.height - pipe.bottom);
    });
}

function updateGame() {
    if (gameOver) {
        clearInterval(gameInterval);
        restartButton.style.display = "block";
        showScoreForm(score); // Llamamos a la función para guardar puntuación
        return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.radius >= canvas.height) gameOver = true;

    pipes.forEach(pipe => {
        pipe.x -= 2;
        if (pipe.x + pipe.width < 0) {
            pipes.shift();
            score++;
        }
        if (bird.x + bird.radius > pipe.x && bird.x - bird.radius < pipe.x + pipe.width && 
            (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)) {
            gameOver = true;
        }
    });

    if (frames % 90 === 0) {
        let gap = 200;
        let topHeight = Math.floor(Math.random() * (canvas.height - gap - 50));
        pipes.push({ x: canvas.width, width: 50, top: topHeight, bottom: topHeight + gap });
    }

    drawBird();
    drawPipes();
    ctx.fillStyle = "black";
    ctx.fillText("Puntuación: " + score, 10, 20);
    frames++;
}

function jump() {
    bird.velocity = bird.lift;
}

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !gameOver && gameStarted) jump();
});
document.addEventListener("click", function() {
    if (!gameOver && gameStarted) jump();
});

startButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    gameStarted = true;
    gameInterval = setInterval(updateGame, 1000 / FPS);
});

restartButton.addEventListener("click", function() {
    bird = { x: 50, y: 250, radius: 15, gravity: 1.2, lift: -12, velocity: 0 };
    pipes = [];
    score = 0;
    gameOver = false;
    frames = 0;
    restartButton.style.display = "none";
    gameInterval = setInterval(updateGame, 1000 / FPS);
});

