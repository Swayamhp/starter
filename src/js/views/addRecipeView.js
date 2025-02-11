import View from "./view.js";
import icons from '../../img/icons.svg';
 
class addRecipeView extends View{
 _parentEle = document.querySelector('.upload');
 _window = document.querySelector('.add-recipe-window');
 _overlay = document.querySelector('.overlay');
 _btnOpen = document.querySelector('.nav__btn--add-recipe');
 _btnClose = document.querySelector('.btn--close-modal');
 _message='Here successfully added recipe'

constructor(){
  super();
  this.addHandlerShowWindow();
  this.addHandlerHideWindow();
}
toggleWindow(){
  this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
}
 addHandlerShowWindow(){
  this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
 }
 addHandlerHideWindow(){
  this._btnClose.addEventListener('click',this.toggleWindow.bind(this))
 }
 addHandlerUpload(handler){

this._parentEle.addEventListener('submit',function(e){
  e.preventDefault();
   const allData = [...new FormData(this)];
   const data = Object.fromEntries(allData);
   handler(data);
});
 }
}
export default new addRecipeView();