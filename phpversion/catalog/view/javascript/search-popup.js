var searchLink = document.querySelector(".page-header__search");
var searchPopup = document.querySelector(".search-popup");
var close = searchPopup.querySelector(".search-popup__btn");

searchLink.addEventListener("click", function(event) {
  event.preventDefault();
  searchPopup.classList.remove("search-popup--closed");
  searchPopup.classList.add("search-popup--opened");
});

close.addEventListener("click", function(event) {
  event.preventDefault();
  searchPopup.classList.remove("search-popup--opened");
  searchPopup.classList.add("search-popup--closed");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    if (searchPopup.classList.contains("search-popup--opened")) {
      searchPopup.classList.remove("search-popup--opened");
      searchPopup.classList.add("search-popup--closed");
    }
  }
});
