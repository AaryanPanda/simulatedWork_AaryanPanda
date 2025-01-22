const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');

const blockWidth = 100;
const blockHeight = 20;
const userStartPosition = [230, 10];
const boardWidth = 560;
const boardHeight = 300;

let currentPosition = userStartPosition;
let ballTimeId;
const ballDiameter = 20;
let xDirection = 2;
let yDirection = 2;
let score = 0;
let ballMoving = false;

const ballStartPosition = [270, 30];
let ballCurrentPosition = ballStartPosition;

// Reset the game
function resetGame() {
    location.reload();
}

// Create blocks
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

const blocks = [
    // Top row
    new Block(10, 270), new Block(120, 270), new Block(230, 270),
    new Block(340, 270), new Block(450, 270),
    // Middle row
    new Block(10, 240), new Block(120, 240), new Block(230, 240),
    new Block(340, 240), new Block(450, 240),
    // Bottom row
    new Block(10, 210), new Block(120, 210), new Block(230, 210),
    new Block(340, 210), new Block(450, 210),
];

function addBlocks() {
    blocks.forEach(block => {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');
        blockDiv.style.left = `${block.bottomLeft[0]}px`;
        blockDiv.style.bottom = `${block.bottomLeft[1]}px`;
        grid.appendChild(blockDiv);
    });
}

addBlocks();

// Add user
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
    user.style.left = `${currentPosition[0]}px`;
    user.style.bottom = `${currentPosition[1]}px`;
}

function moveUser(e) {
    if (e.key === 'ArrowLeft' && currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
    } else if (e.key === 'ArrowRight' && currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
    }
}

document.addEventListener('keydown', moveUser);

// Add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function drawBall() {
    ball.style.left = `${ballCurrentPosition[0]}px`;
    ball.style.bottom = `${ballCurrentPosition[1]}px`;
}

function moveBall() {
    if (!ballMoving) return;
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkCollision();
}

function startGame() {
    ballMoving = true;
    ballTimeId = setInterval(moveBall, 30);
}

function stopGame() {
    ballMoving = false;
    clearInterval(ballTimeId);
}

// Start button
startButton.addEventListener('click', () => {
    if (ballMoving) {
        stopGame();
        startButton.textContent = 'Start';
    } else {
        startGame();
        startButton.textContent = 'Pause';
    }
});

// Reset button
resetButton.addEventListener('click', resetGame);

function checkCollision() {
    // Block collision
    blocks.forEach((block, i) => {
        if (
            ballCurrentPosition[0] > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1]
        ) {
            document.querySelectorAll('.block')[i].remove();
            blocks.splice(i, 1);
            changeDirection();
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            if (!blocks.length) {
                scoreDisplay.textContent = 'You Won!';
                stopGame();
            }
        }
    });

    // Wall collision
    if (
        ballCurrentPosition[0] >= boardWidth - ballDiameter ||
        ballCurrentPosition[0] <= 0 ||
        ballCurrentPosition[1] >= boardHeight - ballDiameter
    ) {
        changeDirection();
    }

    // User collision
    if (
        ballCurrentPosition[0] > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] > currentPosition[1] &&
        ballCurrentPosition[1] < currentPosition[1] + blockHeight
    ) {
        changeDirection();
    }

    // Game over
    if (ballCurrentPosition[1] <= 0) {
        scoreDisplay.textContent = 'You Lost!';
        stopGame();
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
    } else if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
    } else if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
    } else if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
    }
}
