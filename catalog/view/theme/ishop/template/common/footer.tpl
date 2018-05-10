</main>
<footer class="page-footer">
  <div class="container">
    <div class="page-footer__logo">
      <a href="<?=$home?>" class="page-footer__link">
        <img src="catalog/view/theme/ishop/image/logo-white.svg" alt="Sports Store" class="page-footer__logotype  " width="206" height="26">
      </a>
    </div>
    <section class="socials">
      <ul class="socials__list">
        <li class="socials__item">
          <a href="#" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="#" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="#" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="#" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-instagram"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="#" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-googleplus"></use>
            </svg>
          </a>
        </li>
      </ul>
    </section>
    <div class="page-footer__copyright">
      <p class="page-footer__text">© 2018 Алексей Истомин</p>
    </div>
  </div>
</footer>
<button class="back-to-top" id="back-to-top" type="button">
  <svg class="back-to-top__icon" width="20" height="20">
    <use x="0" y="0" xlink:href="#icon-arrow-top"></use>
  </svg>
</button>
<section class="search-popup search-popup--closed">
  <button class="search-popup__btn">
    <span></span>
    <span></span>
  </button>
  <form action="#" class="search-popup__form">
    <input type="search" class="search-popup__input" placeholder="Название товара">
  </form>
  <div class="search-popup__result">
  </div>
</section>
<script src="catalog/view/javascript/script.min.js" defer></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const styles = ['catalog/view/theme/ishop/stylesheet/style.min.css'];
        styles.forEach((path) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = path;
            document.head.appendChild(link);
        });
    });
</script>
</body>

</html>