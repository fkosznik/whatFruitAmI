'use strict';

const submit = document.querySelector('#submit');
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const fruitImage = document.querySelector('#fruitImage');
const recipeText = document.querySelector('#recipe');
const recipeLink = document.querySelector('#recipeLink');

const fruitSizes = [
  { week: 4, fruit: 'Poppy_seed', img: 'images/1.jpg' },
  { week: 5, fruit: 'Sesame_seed', img: 'images/2.jpg' },
  { week: 6, fruit: 'Lentil_seed', img: 'images/3.jpg' },
  { week: 7, fruit: 'Blueberry', img: 'images/4.jpg' },
  { week: 8, fruit: 'Raspberry', img: 'images/5.jpg' },
  { week: 9, fruit: 'Grape', img: 'images/6.jpg' },
  { week: 10, fruit: 'Date', img: 'images/7.jpg' },
  { week: 11, fruit: 'Lime', img: 'images/8.jpg' },
  { week: 12, fruit: 'Lemon', img: 'images/9.jpg' },
  { week: 13, fruit: 'Kiwi_fruit', img: 'images/10.jpg' },
  { week: 14, fruit: 'Peach', img: 'images/11.jpg' },
  { week: 15, fruit: 'Pear', img: 'images/12.jpg' },
  { week: 16, fruit: 'Avocado', img: 'images/13.jpg' },
  { week: 17, fruit: 'Orange', img: 'images/14.jpg' },
  { week: 18, fruit: 'Pomegranate', img: 'images/15.jpg' },
  { week: 19, fruit: 'Grapefruit', img: 'images/16.jpg' },
  { week: 20, fruit: 'Mango', img: 'images/17.jpg' },
  { week: 21, fruit: 'Watermelon', img: 'images/18.jpg' },
  { week: 22, fruit: 'Eggplant', img: 'images/19.jpg' },
  { week: 25, fruit: 'Papaya', img: 'images/20.jpg' },
  { week: 29, fruit: 'Pumpkin', img: 'images/21.jpg' },
  { week: 33, fruit: 'Honeydew', img: 'images/22.jpg' },
  { week: 37, fruit: 'Watermelon', img: 'images/23.jpg' },
];

async function fetchRecipe(fruit) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${fruit}`
    );
    const data = await response.json();

    if (data.meals) {
      const meal = data.meals[0]; // Get the first recipe
      recipeText.textContent = `Try this recipe: ${meal.strMeal}`;
      recipeLink.href = `https://www.themealdb.com/meal/${meal.idMeal}`;
      recipeLink.textContent = 'View Recipe';
      recipeLink.style.display = 'block';
    } else if (!data.meals && fruit === 'Watermelon') {
      recipeText.textContent = `Try this recipe: Celebrate Summer with Watermelon, Feta, and Mint Salad`;
      recipeLink.href = `https://www.allrecipes.com/watermelon-feta-and-mint-salad-recipe-7511300`;
      recipeLink.textContent = 'View Recipe';
      recipeLink.style.display = 'block';
    } else if (!data.meals && fruit === 'Papaya') {
      recipeText.textContent = `Try this recipe: Papaya Bruschetta`;
      recipeLink.href = `https://www.allrecipes.com/recipe/68839/papaya-bruschetta/`;
      recipeLink.textContent = 'View Recipe';
      recipeLink.style.display = 'block';
    } else if (!data.meals && fruit === 'Eggplant') {
      recipeText.textContent = `Try this recipe: Roasted Eggplant`;
      recipeLink.href = `https://www.allrecipes.com/roasted-eggplant-recipe-6737745`;
      recipeLink.textContent = 'View Recipe';
      recipeLink.style.display = 'block';
    } else if (!data.meals && fruit === 'Mango') {
      recipeText.textContent = `Try this recipe: Summertime Mango Drink`;
      recipeLink.href = `https://www.allrecipes.com/recipe/259088/summertime-mango-drink/`;
      recipeLink.textContent = 'View Recipe';
      recipeLink.style.display = 'block';
    } else {
      recipeText.textContent = 'No recipe found for this fruit.';
      recipeLink.style.display = 'none';
    }
  } catch (error) {
    recipeText.textContent = 'Error fetching recipe.';
    recipeLink.style.display = 'none';
  }
}

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
    fetchRecipe(fruitSize.fruit);
  } else {
    result.textContent = 'The selected date is in the future.';
    fruitImage.style.display = 'none';
  }
}
