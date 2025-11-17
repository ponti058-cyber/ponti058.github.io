const gameContainer = document.querySelector('.memory-game');
const movesDisplay = document.getElementById('moves');
const pairsDisplay = document.getElementById('pairs');
const restartButton = document.querySelector('.btn-restart');

// You can customize these image paths to use your own images
const images = [
    'images/skydive.JPG',
    'images/wow.jpeg',
    'images/river.jpeg',
    'images/mountainhiking.jpeg',
    'images/milfordsound.jpeg',
    'media/coffee.jpeg'
];

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let pairsFound = 0;

// Create the card elements
function createCards() {
    // Create pairs of cards
    const cardPairs = [...images, ...images];
    // Shuffle the cards
    cardPairs.sort(() => Math.random() - 0.5);

    cardPairs.forEach((img, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.image = img;
        
        // Create front of card (image)
        const front = document.createElement('div');
        front.classList.add('front');
        const image = document.createElement('img');
        image.src = img;
        image.alt = 'Memory Card';
        front.appendChild(image);
        
        // Create back of card
        const back = document.createElement('div');
        back.classList.add('back');
        
        // Add front and back to card
        card.appendChild(front);
        card.appendChild(back);
        
        // Add click event
        card.addEventListener('click', flipCard);
        
        // Add to game board
        gameContainer.appendChild(card);
        cards.push(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // First click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    moves++;
    movesDisplay.textContent = moves;

    let isMatch = firstCard.dataset.image === secondCard.dataset.image;

    if (isMatch) {
        pairsFound++;
        pairsDisplay.textContent = pairsFound;
        disableCards();
        if (pairsFound === images.length) {
            setTimeout(() => {
                startCelebration(); // Start the confetti celebration
                alert('Congratulations! You won in ' + moves + ' moves!');
            }, 500);
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function restartGame() {
    // Reset counters
    moves = 0;
    pairsFound = 0;
    movesDisplay.textContent = moves;
    pairsDisplay.textContent = pairsFound;
    
    // Remove existing cards
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
    
    // Reset variables
    cards = [];
    resetBoard();
    
    // Create new cards
    createCards();
}

// Initialize game
restartButton.addEventListener('click', restartGame);
createCards();