import async from 'regenerator-runtime';
import { API_URL, TIMER_SEC, NUMBEROFRESULTSPERPAGE, KEY } from './config.js';
import { toJSON, timeOut, sendJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    pageNumber: NUMBEROFRESULTSPERPAGE,
  },
  bookmarks: [],
};
export const createObject =  function (recipe) {
  console.log(Object.entries(recipe));
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cooking: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key:recipe.key}),
  };
};

export const persistsBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const loadRecipe = async function (id) {
  try {
    const data = await Promise.race([
      toJSON(API_URL + `/${id}`),
      timeOut(TIMER_SEC),
    ]);

    console.log(data);
    let { recipe } = data.data;
    state.recipe = createObject(recipe);

    if (state.bookmarks.some(bookmark => bookmark.id == id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (err) {
    console.error(err.message);
  }
};

export const loadSearchResults = async function (query) {
  state.search.query = query;
  try {
    const res = await fetch(`${API_URL}?search=${query}&key=${KEY}`);
    const data = await res.json();
    let results = data.data;
    state.search.results = results.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && {key:rec.key}),

      };
    });
  } catch (err) {
    console.error(err.message);
  }
  console.log(state.search.results);
};
// loadSeachResults('pizza');

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.pageNumber;
  let end = page * state.search.pageNumber;
  return state.search.results.slice(start, end);
};

export const addRecipeToBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (state.recipe.id === recipe.id) state.recipe.bookmarked = true;
  persistsBookmark();
};
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookId => bookId == id);
  state.bookmarks.splice(index, 1);
  if (id == state.recipe.id) state.recipe.bookmarked = false;
  persistsBookmark();
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createObject(data.data.recipe);
    addRecipeToBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
