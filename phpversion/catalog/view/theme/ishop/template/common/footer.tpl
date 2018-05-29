</main>
<footer class="page-footer">
  <div class="container">
    <div class="page-footer__logo">
      <a href="/" class="page-footer__link">
        <img src="catalog/view/theme/ishop/image/logo-white.svg" alt="Sports Store" class="page-footer__logotype  " width="206" height="26">
      </a>
    </div>
    <section class="socials">
      <ul class="socials__list">
        <li class="socials__item">
          <a href="https://vk.com/" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-vk"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://twitter.com/" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-twitter"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://www.facebook.com/" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-facebook"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="http://instagram.com/" class="socials__link">
            <svg class="socials__icon" width="30" height="30">
              <use x="0" y="0" xlink:href="#icon-instagram"></use>
            </svg>
          </a>
        </li>
        <li class="socials__item">
          <a href="https://plus.google.com/discover?hl=ru" class="socials__link">
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
<button class="back-to-top" id="back-to-top" type="button" title="Наверх">
  <svg class="back-to-top__icon" width="20" height="20">
    <use x="0" y="0" xlink:href="#icon-arrow-top"></use>
  </svg>
</button>
<section class="search-popup search-popup--closed">
  <?php echo $search; ?>
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
<!-- BEGIN JIVOSITE CODE {literal} -->
<script type='text/javascript'>
    (function(){ var widget_id = 'LwBZhjS2Lk';var d=document;var w=window;function l(){var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;s.src = '//code.jivosite.com/script/widget/'+widget_id; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();
</script>
<!-- {/literal} END JIVOSITE CODE -->
</body>

</html>