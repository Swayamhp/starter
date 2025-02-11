import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import View from './views/view.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

export const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    // renderSpinner(recipeContainer);
    await model.loadRecipe(id);
    recipeView.renderSpinner();

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    // resultView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);

    resultView.render(model.getSearchResultPage(1));
    paginationView.render(model.state.search);
  } catch (err) {
    resultView.renderError();
  }
};
const controlServings = function (newServings) {
  recipeView.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
paginationControl = function (goto) {
  resultView.render(model.getSearchResultPage(goto));
  paginationView.render(model.state.search);
};

controlBookmark = function () {
  if (!model.state.recipe.bookmarked)
    model.addRecipeToBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  console.log(model.state.bookmarks);
  bookmarkView.render(model.state.bookmarks);
  recipeView.update(model.state.recipe);
};
const loadBookmarkFromlocation = function () {
  model.state.bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
};
controlAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmarks);
    //change id in url
    window.history.pushState(null,'',`#${model.state.recipe.id}`);


    //close window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2500);

  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  recipeView.renderSpinner();
  searchView.addHandlerSearch(controlSearchResults);
  showRecipe();
  paginationView.addHandlerClick(paginationControl);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
const initBookMark = function () {
  loadBookmarkFromlocation();
  bookmarkView.render(model.state.bookmarks);
};
initBookMark();
window.addEventListener('hashchange', showRecipe);
