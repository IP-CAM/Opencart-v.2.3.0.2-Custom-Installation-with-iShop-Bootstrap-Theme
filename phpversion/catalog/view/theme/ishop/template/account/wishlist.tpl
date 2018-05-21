<?=$header?>
<section class="breadcrumbs">
  <div class="container">
    <div class="breadcrumbs__inner">
      <h1 class="breadcrumbs__title"><?php echo $heading_title; ?></h1>
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link">Главная</a></li>
        <?php foreach ($breadcrumbs as $breadcrumb) { ?>
        <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
        <?php } ?>
      </ul>
    </div>
  </div>
</section>

<section class="wishlist" style="min-height: 80vh;padding-bottom: 50px">
  <div id="content" class="container">
    <?php if ($products) { ?>
    <div class="table-responsive">
      <table class="table table-bordered table-hover wishlist__table" style="width: 100%">
        <thead class="wishlist__thead">
        <tr class="wishlist__tr wishlist__tr--border">
          <td class="text-center wishlist__remove wishlist__remove--padding"></td>
          <td class="text-left wishlist__thumbnail wishlist__thumbnail--padding"><?php echo $column_image; ?></td>
          <td class="text-left wishlist__name wishlist__name--padding"><?php echo $column_name; ?></td>
          <td class="text-right wishlist__price wishlist__price--padding"><?php echo $column_price; ?></td>
          <td class="text-right wishlist__stock wishlist__stock--padding"><?php echo $column_stock; ?></td>
          <td class="text-right wishlist__cart wishlist__cart--padding"><?php echo $column_action; ?></td>
        </tr>
        </thead>
        <tbody class="wishlist__tbody">
        <?php foreach ($products as $product) { ?>
        <tr class="wishlist__item">
          <td class="text-center wishlist__remove">
            <a href="<?php echo $product['remove']; ?>" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger wishlist__link wishlist__link--remove">
              <span></span>
              <span></span>
            </a>
          </td>
          </td>
          <td class="text-left wishlist__thumbnail">
            <?php if ($product['thumb']) { ?> <a class="wishlist__link" href="<?php echo $product['href']; ?>"><img class="wishlist__img" src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" /></a> <?php } ?>
          </td>
          <td class="text-left wishlist__name">
            <a class="wishlist__link" href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a></td>
          <td class="text-right wishlist__price">
            <?php if ($product['price']) { ?>
            <div class="price">
              <?php if (!$product['special']) { ?>
              <?php echo $product['price']; ?>
              <?php } else { ?>
              <b><?php echo $product['special']; ?></b> <s><?php echo $product['price']; ?></s>
              <?php } ?>
            </div>
            <?php } ?></td>
          <td class="text-right wishlist__stock"><a href="<?php echo $product['href']; ?>" class="wishlist__text wishlist__text--orange"><?php echo $product['stock']; ?></a></td>
          <td class="text-right wishlist__cart">
            <button type="button" onclick="cart.add('<?php echo $product['product_id']; ?>');" data-toggle="tooltip" title="<?php echo $button_cart; ?>" class="wishlist__btn" style="margin: 0">В корзину</button>
        </tr>
        <?php } ?>
        </tbody>
      </table>
    </div>
    <?php } else { ?>
    <p class="wishlist__text--orange"><?php echo $text_empty; ?></p>
    <?php } ?>
</section>
</div>
<?=$footer?>
