const squares = document.querySelectorAll(".square")
const timeLeft = document.getElementById("time-left")
const scoreDisplay = document.getElementById("score")
const startButton = document.getElementById("start-button")
const resetButton = document.getElementById("reset-button")

let result = 0
let currentTime = 60
let hitPosition
let timerId
let countDownTimerId

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole')
    })
    
    let randomPosition = squares[Math.floor(Math.random() * 9)]
    randomPosition.classList.add('mole') 
    hitPosition = randomPosition.id
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result += 1
            scoreDisplay.textContent = result
            hitPosition = null
        }
    })
})

function moveMole() {
    timerId = setInterval(randomSquare, 1000)
}

function startGame() {
    result = 0
    currentTime = 60
    scoreDisplay.textContent = result
    timeLeft.textContent = currentTime
    moveMole()
    countDownTimerId = setInterval(countDown, 1000)
    startButton.disabled = true
}

function countDown() {
    currentTime -= 1
    timeLeft.textContent = currentTime

    if (currentTime === 0) {
        clearInterval(countDownTimerId)
        clearInterval(timerId)
        alert("GAME OVER! Your final score is " + result)
        startButton.disabled = false
    }
}

function resetGame() {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    result = 0
    currentTime = 60
    scoreDisplay.textContent = result
    timeLeft.textContent = currentTime
    squares.forEach(square => square.classList.remove('mole'))
    startButton.disabled = false
}

startButton.addEventListener('click', startGame)
resetButton.addEventListener('click', resetGame)
