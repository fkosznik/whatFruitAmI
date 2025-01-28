'use strict';

const submit = document.querySelector('#submit');
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const fruitImage = document.querySelector('#fruitImage');

const fruitSizes = [
  { week: 4, fruit: 'Poppy seed', img: 'images/1.jpg' },
  { week: 5, fruit: 'Sesame seed', img: 'images/2.jpg' },
  { week: 6, fruit: 'Lentil seed', img: 'images/3.jpg' },
  { week: 7, fruit: 'Blueberry', img: 'images/4.jpg' },
  { week: 8, fruit: 'Raspberry', img: 'images/5.jpg' },
  { week: 9, fruit: 'Grape', img: 'images/6.jpg' },
  { week: 10, fruit: 'Date', img: 'images/7.jpg' },
  { week: 11, fruit: 'Lime', img: 'images/8.jpg' },
  { week: 12, fruit: 'Plum', img: 'images/9.jpg' },
  { week: 13, fruit: 'Kiwi fruit', img: 'images/10.jpg' },
  { week: 14, fruit: 'Peach', img: 'images/11.jpg' },
  { week: 15, fruit: 'Pear', img: 'images/12.jpg' },
  { week: 16, fruit: 'Avocado', img: 'images/13.jpg' },
  { week: 17, fruit: 'Naval orange', img: 'images/14.jpg' },
  { week: 18, fruit: 'Pomegranate', img: 'images/15.jpg' },
  { week: 19, fruit: 'Grapefruit', img: 'images/16.jpg' },
  { week: 20, fruit: 'Mango', img: 'images/17.jpg' },
  { week: 21, fruit: 'Rockmelon', img: 'images/18.jpg' },
  { week: 22, fruit: 'Eggplant', img: 'images/19.jpg' },
  { week: 25, fruit: 'Papaya', img: 'images/20.jpg' },
  { week: 29, fruit: 'Pumpkin', img: 'images/21.jpg' },
  { week: 33, fruit: 'Honeydew', img: 'images/22.jpg' },
  { week: 37, fruit: 'Watermelon', img: 'images/23.jpg' },
];

function calcWeek() {
  const inputDate = new Date(input.value);
  const today = new Date();

  if (!input.value) {
    result.textContent = 'Please select a valid date.';
    fruitImage.style.display = 'none';
    return;
  }

  const diffInDays = Math.floor((today - inputDate) / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffInDays / 7);

  let fruitSize = { fruit: 'unknown', img: '' };
  for (let i = fruitSizes.length - 1; i >= 0; i--) {
    if (week >= fruitSizes[i].week) {
      fruitSize = fruitSizes[i + 1];
      break;
    }
  }

  if (week >= 0) {
    result.textContent = `You are in week ${
      week + 1
    } of your pregnancy. Your baby is the size of a ${fruitSize.fruit}.`;
    if (fruitSize.img) {
      fruitImage.src = fruitSize.img;
      fruitImage.alt = fruitSize.fruit;
      fruitImage.style.display = 'block';
    } else {
      fruitImage.style.display = 'none';
    }
  } else {
    result.textContent = 'The selected date is in the future.';
    fruitImage.style.display = 'none';
  }
}
