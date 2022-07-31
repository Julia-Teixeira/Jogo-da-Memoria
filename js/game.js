const grid = document.querySelector('.grid');
const characteres = [
    'Choji', 'Shino',
    'Hinata2', 'Shikamaru',
    'Sasuke', 'Neji',
    'Sakura', 'Kiba',
    'Itachi', 'Naruto',
];
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const btnReiniciar = document.querySelector('.btn-Reiniciar');
const btnSair = document.querySelector('.btn-sair');

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 20){
        clearInterval(this.loop);
        // alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} s.`);
        alert("Parabéns," + spanPlayer.innerHTML + "! Seu tempo foi "+ timer.innerHTML + "s!");
    }
}

const checkCards = () => {

    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';
        checkEndGame();
    } else {

        setTimeout(() => {

            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = '';
            secondCard = '';

        }, 500);
    }
}

function revealCard({ target }) {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
}

const createCard = (characteres) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'front face');
    const back = createElement('div', 'back face');

    front.style.backgroundImage = `url('../images/${characteres}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', characteres);

    return card;
}

const loadGame = () => {

    const duplicateCharacters = [...characteres, ...characteres];

    const shuffleArray = duplicateCharacters.sort(() => Math.random() - 0.5);


    shuffleArray.forEach((characteres) => {

        const card = createCard(characteres);
        grid.appendChild(card);
    });
}

const startTime = () => {
   this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

function reiniciar(){
    window.location = 'game.html';
}
function sair(){
    window.location = '../index.html';
}
window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTime();
    loadGame();
}

btnReiniciar.addEventListener('click', reiniciar);
btnSair.addEventListener('click', sair);