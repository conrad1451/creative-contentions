const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

const ballRadius = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

const paddleHeight = 80;
const paddleWidth = 10;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
const paddleSpeed = 10;

let playerScore = 0;
let computerScore = 0;

function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'lightgreen';
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(x, y) {
  ctx.fillStyle = 'lightblue';
  ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Player: ${playerScore}`, 10, 20);
  ctx.fillText(`Computer: ${computerScore}`, canvas.width - 110, 20);
}

function update() {
  // Clear the canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle(0, leftPaddleY);
  drawPaddle(canvas.width - paddleWidth, rightPaddleY);
  drawScore();

  // Move the ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with left paddle
  if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball collision with right paddle
  if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds (scoring)
  if (ballX - ballRadius < 0) {
    computerScore++;
    resetBall();
  } else if (ballX + ballRadius > canvas.width) {
    playerScore++;
    resetBall();
  }

  // Simple AI for the right paddle
  if (ballY > rightPaddleY + paddleHeight / 2) {
    rightPaddleY += paddleSpeed / 2;
  } else if (ballY < rightPaddleY + paddleHeight / 2) {
    rightPaddleY -= paddleSpeed / 2;
  }

  // Keep paddles within the bounds
  leftPaddleY = Math.max(0, Math.min(leftPaddleY, canvas.height - paddleHeight));
  rightPaddleY = Math.max(0, Math.min(rightPaddleY, canvas.height - paddleHeight));
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX; // Reverse direction after scoring
  ballSpeedY = (Math.random() - 0.5) * 10; // Add some random vertical direction
}

// Event listener for player paddle control (using mouse)
canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseY = event.clientY - rect.top;
  leftPaddleY = mouseY - paddleHeight / 2;
});

// Game loop
function gameLoop() {
  update();
  drawBall(); // Redraw the ball after updating its position
  requestAnimationFrame(gameLoop);
}

gameLoop();
