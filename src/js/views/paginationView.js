import View from './view.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentEle = document.querySelector('.pagination');
  _generateMarkup() {
    const currentPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.pageNumber
    );
   
    if (currentPage == 1 && numberOfPages > 1) {
      return ` <button data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    if (currentPage == numberOfPages) {
      return `<button  data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>`;
    }
    if (currentPage > 1 && numberOfPages > currentPage) {
      return `<button data-goto="${currentPage-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>${currentPage - 1}</span>
          </button>
          <button  data-goto="${currentPage+1}" class="btn--inline pagination__btn--next">
            <span>${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
     return 'only 1 page';
  }
  addHandlerClick(handler){
    this._parentEle.addEventListener('click',function(e){
    const btnEle =  e.target.closest('.btn--inline');
    if(!btnEle)return;
    const goto = +btnEle.dataset.goto;
    handler(goto);
    })
  }
}
export default new PaginationView();
