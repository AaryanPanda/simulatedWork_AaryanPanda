const cardArray = [
    { name: 'fries', img: './assets/fries.png' },
    { name: 'cheeseburger', img: './assets/cheeseburger.png' },
    { name: 'hotdog', img: './assets/hotdog.png' },
    { name: 'ice-cream', img: './assets/ice-cream.png' },
    { name: 'milkshake', img: './assets/milkshake.png' },
    { name: 'pizza', img: './assets/pizza.png' },
    { name: 'fries', img: './assets/fries.png' },
    { name: 'cheeseburger', img: './assets/cheeseburger.png' },
    { name: 'hotdog', img: './assets/hotdog.png' },
    { name: 'ice-cream', img: './assets/ice-cream.png' },
    { name: 'milkshake', img: './assets/milkshake.png' },
    { name: 'pizza', img: './assets/pizza.png' }
];

cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const resetButton = document.querySelector('#reset');

let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    gridDisplay.innerHTML = ''; // Clear the grid for reset functionality
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', './assets/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
    }
    resultDisplay.textContent = '0';
    cardsWon.length = 0;
}

function checkMatch() {
    const cardsOnBoard = document.querySelectorAll('img');
    const [firstId, secondId] = cardsChosenIds;

    if (firstId === secondId) {
        alert("You clicked the same card!");
        cardsOnBoard[firstId].setAttribute('src', './assets/blank.png');
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match!');
        cardsOnBoard[firstId].setAttribute('src', './assets/white.png');
        cardsOnBoard[secondId].setAttribute('src', './assets/white.png');
        cardsOnBoard[firstId].removeEventListener('click', flipCard);
        cardsOnBoard[secondId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        alert('Sorry, try again!');
        cardsOnBoard[firstId].setAttribute('src', './assets/blank.png');
        cardsOnBoard[secondId].setAttribute('src', './assets/blank.png');
    }

    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = '🎉 Congratulations! You found them all! 🎉';
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (!cardsChosenIds.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].name);
        cardsChosenIds.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

// Reset the game
resetButton.addEventListener('click', () => {
    cardArray.sort(() => 0.5 - Math.random());
    createBoard();
});

createBoard();
