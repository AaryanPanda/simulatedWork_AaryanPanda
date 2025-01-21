const computerChoiceDisplay = document.getElementById('computer-choice');
const userChoiceDisplay = document.getElementById('user-choice');
const resultDisplay = document.getElementById('result');
const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');
const resetButton = document.getElementById('reset');
const possibleChoices = document.querySelectorAll('.btn:not(.reset-btn)');

let userChoice;
let computerChoice;
let result;
let userScore = 0;
let computerScore = 0;

possibleChoices.forEach(button =>
    button.addEventListener('click', (e) => {
        userChoice = e.target.id;
        userChoiceDisplay.innerHTML = userChoice;
        generateComputerChoice();
        getResult();
    })
);

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    const choices = ['rock', 'paper', 'scissors'];
    computerChoice = choices[randomNumber];
    computerChoiceDisplay.innerHTML = computerChoice;
}

function getResult() {
    if (computerChoice === userChoice) {
        result = "It's a Draw!";
    } else if (
        (computerChoice === 'rock' && userChoice === 'paper') ||
        (computerChoice === 'paper' && userChoice === 'scissors') ||
        (computerChoice === 'scissors' && userChoice === 'rock')
    ) {
        result = "You Won!";
        userScore++;
    } else {
        result = "You Lost!";
        computerScore++;
    }
    resultDisplay.innerHTML = result;
    userScoreDisplay.innerHTML = userScore;
    computerScoreDisplay.innerHTML = computerScore;
}

resetButton.addEventListener('click', () => {
    userChoice = '';
    computerChoice = '';
    result = 'Make your move!';
    userScore = 0;
    computerScore = 0;

    userChoiceDisplay.innerHTML = '...';
    computerChoiceDisplay.innerHTML = '...';
    resultDisplay.innerHTML = result;
    userScoreDisplay.innerHTML = userScore;
    computerScoreDisplay.innerHTML = computerScore;
});