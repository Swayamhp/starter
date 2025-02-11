//parent class
import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0))
      return this.renderError();
    this._data = data;
    const markUp = this._generateMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    
    this._data = data;
    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    console.log(newDom);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEle.querySelectorAll('*'));
    newElements.forEach((newEle, i) => {
      const curEle = currentElements[i];
      if (
        !newEle.isEqualNode(curEle) &&
        newEle.firstChild?.nodeValue.trim() !== ''
      ) {
        curEle.textContent = newEle.textContent;
      }

      if(!newEle.isEqualNode(curEle)){
        Array.from(newEle.attributes).forEach(attr=>{
          curEle.setAttribute(attr.name,attr.value);
        })
      }
    });
 

  }
  _clear() {
    this._parentEle.innerHTML = '';
  }

  renderSpinner() {
    const markUp = `<div class="spinner">
           <svg>
             <use href="${icons}#icon-loader"></use>
           </svg>
         </div>`;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  }

  renderError(message = this._message) {
    const markup = `<div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message=this._message){
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
this._clear();
this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
