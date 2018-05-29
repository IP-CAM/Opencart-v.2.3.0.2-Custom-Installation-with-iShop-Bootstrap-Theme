<section class="featured">
  <div class="container">
  <h3 class="featured__title"><?php echo $heading_title; ?></h3>
  <ul class="featured__slider featured__slider--flex">
  <?php foreach ($products as $product) { ?>
    <li class="featured__item featured__item--maxwidth">
      <div class="featured__buttons">
        <a href="<?php echo $product['href']; ?>" class="featured__link">
          <img data-src="<?php echo $product['thumb']; ?>" alt="#" class="featured__img lazyload" width="600" height="600"> </a>
        <button class="featured__button" type="button" onclick="cart.add('<?php echo $product['product_id']; ?>');">В корзину</button>
      </div>
      <div class="featured__row">
        <div class="featured__btns">
          <button onclick="wishlist.add('<?php echo $product['product_id']; ?>')" class="featured__btn">
            <svg class="featured__icon" width="15" height="15">
              <use x="0" y="0" xlink:href="#icon-heart"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="featured__description">
        <a href="<?php echo $product['href']; ?>" class="featured__name"><?php echo $product['name']; ?></a>
        <div class="featured__info">
              <span class="featured__price">
                <p class="price">
          <?php if (!$product['special']) { ?>
                  <?php echo $product['price']; ?>
                  <?php } else { ?>
                  <span class="price-new"><?php echo $product['special']; ?></span> <span class="price-old"><?php echo $product['price']; ?></span>
                  <?php } ?>
                </p>
              </span>
        </div>
      </div>
    </li>
  <?php } ?>
  </ul>
  </div>
</section>