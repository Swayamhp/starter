import View from "./view.js";
import icons from '../../img/icons.svg';
 
class ResultView extends View{
 _parentEle = document.querySelector('.results');
 _message='No recipes found !! please search another query :(';

 _generateMarkup = function(){
  return  this._data.map(this._generateMarkupPreview).join('');
 }
 _generateMarkupPreview = function(result){
  return `<li class="preview">
            <a class="preview__link preview__link--active" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>` 
 }
 
}
export default new ResultView();