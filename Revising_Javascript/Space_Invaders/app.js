const grid = document.querySelector('.grid')
const resultDisplay = document.querySelector('.result')

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');


const width = 15
let currentShooterIndex = 202
let direction = 1
let invaderTimerId
let goingRight = true

let aliensRemoved = []
let result = 0
let shooterActiveButton


for (let i = 0; i < 225; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
}


const squares = Array.from(document.querySelectorAll('.grid div'))

let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]

function drawInvader() {

    // do not draw again the invaders which alredy shot down
    for (let i = 0; i < alienInvaders.length; i++) {
        if (!aliensRemoved.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader')
        }

    }
}

drawInvader()

function removeInvader() {
    for (let i = 0; i < alienInvaders.length; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
    }
}


// Draw shooter
squares[currentShooterIndex].classList.add('shooter')

// Move Shooter
function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShooterIndex % width !== 0) {
                currentShooterIndex -= 1
            }
            break;
        case 'ArrowRight':
            if (currentShooterIndex % width < width - 1) {
                currentShooterIndex += 1
            }
            break;
    }

    squares[currentShooterIndex].classList.add('shooter')

}



// Move Invaders
function moveInvaders() {

    // identify the left most and right most block every column
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

    removeInvader()

    if (rightEdge && goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
            alienInvaders[i] += width - 1
            direction = 1
            goingRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += direction
    }

    drawInvader()

    // if the invaders touch the shooter then game over
    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = "Game Over!"
        clearInterval(invaderTimerId)
    }

    // if the invaders touch the 2nd last row then game over
    for (let i = 0; i < alienInvaders.length; i++) {
        if (alienInvaders[i] > squares.length - width) {
            resultDisplay.innerHTML = "Game Over!"
            clearInterval(invaderTimerId)
            break;
        }
    }

    // check for win
    if (aliensRemoved.length === alienInvaders.length) {
        resultDisplay.innerHTML = "You Won!"
        clearInterval(invaderTimerId)
    }
}


// Shoot the invaders
function shoot(e) {

    let laserTimerId
    let currentLaserIndex = currentShooterIndex

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser")
        currentLaserIndex -= width
        squares[currentLaserIndex].classList.add("laser")

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove("laser")
            squares[currentLaserIndex].classList.remove("invader")
            squares[currentLaserIndex].classList.add("boom")

            setTimeout(() => { squares[currentLaserIndex].classList.remove("boom") }, 100)
            clearInterval(laserTimerId)

            const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
            aliensRemoved.push(alienRemoved)
            result += 1
            resultDisplay.querySelector('span').textContent = result
        }
    }

    switch (e.key) {
        case "ArrowUp":
            laserTimerId = setInterval(moveLaser, 50)
    }

}


// activate the shooter controls based on start condition
if (shooterActiveButton) {
    document.addEventListener('keydown', moveShooter);
    document.addEventListener('keydown', shoot)
}


// Reset Logic
resetButton.addEventListener('click', () => {
    // Reset game state
    result = 0;
    aliensRemoved = [];
    currentShooterIndex = 202;
    alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ]

    // Reset display
    resultDisplay.innerHTML = `Score: <span>${result}</span>`;
    squares.forEach(square => {
        square.classList.remove('shooter', 'laser', 'boom', 'invader');
    });

    // Reset positions
    squares[currentShooterIndex].classList.add('shooter');
    drawInvader();

    // Restart invaders
    clearInterval(invaderTimerId)

    // Reset the shooter controls
    if (shooterActiveButton) {
        document.removeEventListener('keydown', moveShooter);
        document.removeEventListener('keydown', shoot);
        shooterActiveButton = false;
    }
});


// Start Logic
startButton.addEventListener('click', () => {
    if (!shooterActiveButton) { 
        document.addEventListener('keydown', moveShooter);
        document.addEventListener('keydown', shoot);
        shooterActiveButton = true;
    }
    invaderTimerId = setInterval(moveInvaders, 500)
});