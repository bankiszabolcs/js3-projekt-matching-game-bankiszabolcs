import icons from './icons.js';

const cardTable = document.querySelector('.cards');

const randomizeData = () => icons.sort(() => Math.random() - 0.5);

const uploadHTML = () => {
  let html = '';
  randomizeData().forEach((item) => {
    html += `<div class="card">
        <img class="card__front" src="${item.icon}" alt="">
        <div class="card__back"></div>
    </div>`;
  });
  cardTable.innerHTML = html;
};

uploadHTML();
