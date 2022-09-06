import icons from './icons.js';

const cardTable = document.querySelector('.cards');
const timerEl = document.querySelector('.timer');
let play = false;
let now;
let ourInterval;

const resetCounter = () => {
  now = new Date();
  now.setMilliseconds(0);
  now.setSeconds(0);
  now.setMinutes(0);
  timerEl.textContent = (new Intl.DateTimeFormat('hu-HU', {
    minute: 'numeric',
    second: 'numeric',
  }).format(now));
};

const makeCounterWork = () => {
  resetCounter()
  timerEl.textContent = (new Intl.DateTimeFormat('hu-HU', {
    minute: 'numeric',
    second: 'numeric',
  }).format(now));
};

function counter() {
  let sec = 0;
  ourInterval = setInterval(() => {
    timerEl.textContent = (new Intl.DateTimeFormat('hu-HU', {
      minute: 'numeric',
      second: 'numeric',
    }).format(now.setSeconds(sec += 1)));
  }, 1000);
}

const randomizeData = () => icons.sort(() => Math.random() - 0.5);

const uploadHTML = () => {
  let html = '';
  randomizeData().forEach((item) => {
    html += `<div name="${item.name}" class="card">
        <div class="card__front"><img src="${item.icon}" alt=""></div> 
            <div class="card__back"></div>
    </div>`;
  });
  cardTable.innerHTML = html;
};

const checkTwoItems = (item1, item2) => item1 === item2;
const checkIfWin = () => {
  const cards = document.querySelectorAll('.card');
  return Array.from(cards).every((actualCard) => actualCard.classList.contains('winner'));
};

const checkCards = function (e) {
  cardTable.addEventListener('click', (e) => {
    if (e.target.closest('.card')) e.target.closest('.card').classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
      if (checkTwoItems(flippedCards[0].getAttribute('name'), flippedCards[1].getAttribute('name'))) {
        flippedCards.forEach((actualCard) => {
          actualCard.style.pointerEvents = 'none';
          actualCard.classList.remove('flipped');
          actualCard.classList.add('winner');
        });
        if (checkIfWin()) {
          clearInterval(ourInterval);
          setInterval(reset, 5000);
        }
      } else {
        flippedCards.forEach((actualCard) => {
          actualCard.classList.remove('flipped');
          setTimeout(() => {
            actualCard.classList.remove('toggleCard');
          }, 1000);
        });
      }
    }
  });
};

const makeCardsWork = function () {
  cardTable.addEventListener('click', (event) => {
    if (event.target.closest('.card')) { event.target.closest('.card').classList.toggle('toggleCard'); }
    if (!play) counter();
    play = true;
  });
  checkCards();
};

const init = () => {
  makeCardsWork();
  uploadHTML();
  makeCounterWork();
};

const reset = () => {
  document.querySelector('.cards').innerHTML = '';
  uploadHTML();
  makeCounterWork();
  counter();
};

init();
