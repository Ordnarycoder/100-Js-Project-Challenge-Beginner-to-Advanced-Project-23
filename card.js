const gridContainer = document.querySelector('.grid-container');
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.querySelector('.score').textContent = score;

const cardData = [
    {
        "image": "../assets/eren.webp",
        "name": "eren"
    },
    {
        "image": "../assets/erza.webp",
        "name": "erza"
    },
    {
        "image": "../assets/levi.webp",
        "name": "levi"
    },
    {
        "image": "../assets/luffy.webp",
        "name": "luffy"
    },
    {
        "image": "../assets/mavis.webp",
        "name": "mavis"
    },
    {
        "image": "../assets/mikasa.webp",
        "name": "mikasa"
    },
    {
        "image": "../assets/sanji.webp",
        "name": "sanji"
    },
    {
        "image": "../assets/zeref.webp",
        "name": "zeref"
    },
    {
        "image": "../assets/zoro.webp",
        "name": "zoro"
    }
];

cards = [...cardData, ...cardData];

function shuffleCards() {
    let currentIndex = cards.length, randomIndex, tempValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        tempValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = tempValue;
    }
}

shuffleCards();

function generateCards() {
    cards.forEach(item => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="card-back"></div>
            </div>
        `;
        cardElement.setAttribute('data-name', item.name);
        gridContainer.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    });
}

generateCards();

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        score++;
        document.querySelector('.score').textContent = score;
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
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}
