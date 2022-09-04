import icons from './icons.js';

const cardTable = document.querySelector('.cards');
const timerEl = document.querySelector('.timer');
let timeleft = 5;
let play = false;

/* const countDowner = function () {
  setInterval(() => {
    if (timeleft <= -1) {
      clearInterval(setInterval);
    }
    timerEl.textContent = `00:0${timeleft}`;
    timeleft -= 1;
  }, 1000);
}; */

function counter() {
  timeleft = 5;
  const ourInterval = setInterval(() => {
    if (timeleft <= 0) {
      clearInterval(ourInterval);
      console.log('vége a számlálónak');
      play = false;
      timeleft = 5;
      console.log(play);
      reset();
    }
    timerEl.textContent = `00:0${timeleft}`;
    timeleft -= 1;
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

const checkCards = function (e) {
  cardTable.addEventListener('click', (e) => {
    if (e.target.closest('.card')) e.target.closest('.card').classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === 2) {
      if (checkTwoItems(flippedCards[0].getAttribute('name'), flippedCards[1].getAttribute('name'))) {
        flippedCards.forEach((actualCard) => {
          actualCard.style.pointerEvents = 'none';
          actualCard.classList.remove('flipped');
        });
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
};

const reset = () => {
  document.querySelector('.cards').innerHTML = '';
  uploadHTML()
};

init();
