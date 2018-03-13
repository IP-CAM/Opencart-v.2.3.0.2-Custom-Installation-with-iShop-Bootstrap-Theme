var subToggle = document.querySelector('.main-nav__toggler');
var subNav = document.querySelector('.main-nav__sublist');

subToggle.addEventListener('click', function() {
  if (subNav.classList.contains('main-nav__sublist--closed')) {
    subNav.classList.remove('main-nav__sublist--closed');
    subNav.classList.add('main-nav__sublist--opened');
    subToggle.classList.add('main-nav__toggler__toggler--opened')
  } else {
    subNav.classList.add('main-nav__sublist--closed');
    subNav.classList.remove('main-nav__sublist--opened');
    subToggle.classList.remove('main-nav__toggler__toggler--opened');
  }
});
