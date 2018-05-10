window.onscroll = function() {myFunction()};

var nav = document.querySelector('.page-header');
var sticky = nav.offsetTop + 200;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("page-header--fixed");
  } else {
    nav.classList.remove("page-header--fixed");
  }
}
