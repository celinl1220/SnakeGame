const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");

let gameOver = false;

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let intervalId;

let score = 0;
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `high score: ${highScore}`;

const changeDirection = (e) => {
	if (e.key === "ArrowRight" && velocityX !== -1) {
		velocityX = 1;
		velocityY = 0;
	} else if (e.key === "ArrowLeft" && velocityX !== 1) {
		velocityX = -1;
		velocityY = 0;
	} else if (e.key === "ArrowUp" && velocityY !== 1) {
		velocityX = 0;
		velocityY = -1;
	} else if (e.key === "ArrowDown" && velocityY !== -1) {
		velocityX = 0;
		velocityY = 1;
	}
}

const changeFoodPosition = () => {
	foodX = Math.floor(Math.random() * 30 + 1);
	foodY = Math.floor(Math.random() * 30 + 1);
}

const handleGameOver = () => {
	clearInterval(intervalId);
	alert("Game Over! Press OK to replay...");
	location.reload();
}

const loadGame = () => {
	if (gameOver) {
		return handleGameOver();
	}
	let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

	if (snakeX === foodX && snakeY === foodY) {
		changeFoodPosition();
		snakeBody.push([foodX, foodY]);

		score++;
		scoreElement.innerText = `score: ${score}`;

		highScore = score > highScore ? score : highScore;
		highScoreElement.innerText = `high score: ${highScore}`;
		localStorage.setItem("high-score", highScore);
	}

	for (let i = snakeBody.length - 1; i >= 0; i--) {
		snakeBody[i] = snakeBody[i-1];
	}

	snakeBody[0] = [snakeX, snakeY];

	snakeX += velocityX;
	snakeY += velocityY;

	if (snakeX < 1 || snakeX > 30 || snakeY < 1 || snakeY > 30) {
		gameOver = true;
	}

	for (let i = 0; i < snakeBody.length; i++) {
		htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
		if (i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
			return handleGameOver();
		}
	}

	playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
intervalId = setInterval(loadGame, 125);
document.addEventListener("keydown", changeDirection);