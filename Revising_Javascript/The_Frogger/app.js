const timeLeftDisplay = document.querySelector('#time-left');
const resultDisplay = document.querySelector('#result');
const startPauseButton = document.querySelector('#start-pause-button');
const restartButton = document.querySelector('#restart-button'); // New Restart Button

const squares = document.querySelectorAll('.grid div');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');

const gridWidth = 9;
let currentIndex = 76;

let autoMoveElementsTimerId;
let currentTime = 20;
let resultCheckTimerId;

// Function to reset the game to its initial state
function resetGame() {
    clearInterval(autoMoveElementsTimerId);
    clearInterval(resultCheckTimerId);

    // Reset time and display
    currentTime = 20;
    timeLeftDisplay.textContent = currentTime;

    // Reset result display
    resultDisplay.textContent = '';

    // Reset frog position
    squares[currentIndex].classList.remove('frog');
    currentIndex = 76;
    squares[currentIndex].classList.add('frog');

    // Re-enable event listener for frog movement
    document.addEventListener('keyup', moveFrog);
}

// Move the frog
function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');

    switch (e.key) {
        case 'ArrowLeft':
            if (currentIndex % gridWidth !== 0) {
                currentIndex -= 1;
            }
            break;

        case 'ArrowRight':
            if (currentIndex % gridWidth < (gridWidth - 1)) {
                currentIndex += 1;
            }
            break;

        case 'ArrowUp':
            if ((currentIndex - gridWidth) >= 0) {
                currentIndex -= gridWidth;
            }
            break;

        case 'ArrowDown':
            if ((currentIndex + gridWidth) < squares.length) {
                currentIndex += gridWidth;
            }
            break;
    }

    squares[currentIndex].classList.add('frog');
}

// Iterate over through the elements
function autoMoveElements() {
    currentTime -= 1;
    timeLeftDisplay.textContent = currentTime;

    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}

// Move the logs left (1st row)
function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    }
}

// Move the logs right (2nd row)
function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    }
}

// Move the cars left (1st row)
function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }
}

// Move the cars right (2nd row)
function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }
}

// Game Over and Win Logic 
function lose() {
    if (
        squares[currentIndex].classList.contains('c1') || // c1 represents the black square (traffic)
        squares[currentIndex].classList.contains('l4') || // l4 represents the light blue square (water)
        squares[currentIndex].classList.contains('l5') ||
        currentTime <= 0
    ) {
        resultDisplay.textContent = 'You Lose!';
        resultDisplay.style.color = 'red';
        // alert('Game Over! You crashed or drowned!');
        clearInterval(autoMoveElementsTimerId);
        clearInterval(resultCheckTimerId);
        squares[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog);
    }
}

function win() {
    if (squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You Win!';
        resultDisplay.style.color = 'green';
        // alert('Congratulations! You made it safely!');
        clearInterval(autoMoveElementsTimerId);
        clearInterval(resultCheckTimerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

function resultCheck() {
    lose(); // check for game over every second
    win();  // check for win every second
}

// Start-Pause Button
startPauseButton.addEventListener('click', () => {
    if (autoMoveElementsTimerId) {
        clearInterval(autoMoveElementsTimerId);
        clearInterval(resultCheckTimerId);

        resultCheckTimerId = null;
        autoMoveElementsTimerId = null;
        document.removeEventListener('keyup', moveFrog);
    } else {
        autoMoveElementsTimerId = setInterval(autoMoveElements, 1000);
        resultCheckTimerId = setInterval(resultCheck, 50);
        document.addEventListener('keyup', moveFrog);
    }
});

// Restart Button
restartButton.addEventListener('click', resetGame);