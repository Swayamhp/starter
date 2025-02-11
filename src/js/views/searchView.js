class SearchView{
  #parentEle = document.querySelector('.search');
  _data;
  getQuery(){
    const query  = this.#parentEle.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  addHandlerSearch(handler){
    this.#parentEle.addEventListener('submit',function(e){
      e.preventDefault();
      handler();

    })
  }
  #clearInput(){
    this.#parentEle.querySelector('.search__field').value = '';
  }
}
export default new SearchView();