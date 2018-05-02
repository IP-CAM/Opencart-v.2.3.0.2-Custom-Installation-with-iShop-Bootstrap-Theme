var dropdown = document.querySelectorAll('.dropdown');
var dropdownArray = Array.prototype.slice.call(dropdown,0);

dropdownArray.forEach(function(el) {
  var button = el.querySelector('span.main-nav__toggler'),
    menu = el.querySelector('.dropdown-menu');


  button.onclick = function(event) {
    if(!menu.hasClass('main-nav__sublist--opened')) {
      menu.classList.add('main-nav__sublist--opened');
      menu.classList.remove('main-nav__sublist--closed');
      event.preventDefault();
    }
    else {
      menu.classList.remove('main-nav__sublist--opened');
      menu.classList.add('main-nav__sublist--closed');
      event.preventDefault();
    }
  };
});

Element.prototype.hasClass = function(className) {
  return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
};
