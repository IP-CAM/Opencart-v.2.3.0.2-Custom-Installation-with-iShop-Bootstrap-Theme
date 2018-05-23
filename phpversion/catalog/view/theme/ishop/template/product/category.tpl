<?php echo $header; ?>

<section class="breadcrumbs" style="margin-bottom: 60px">
    <div class="container">
        <div class="breadcrumbs__inner">
            <h1 class="breadcrumbs__title"><?php echo $heading_title; ?></h1>
            <ul class="breadcrumbs__list" style="margin: 0">
                <li class="breadcrumbs__item"><a href="/" class="breadcrumbs__link">Каталог</a></li>
                <?php foreach ($breadcrumbs as $breadcrumb) { ?>
                <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
                <?php } ?>
            </ul>
        </div>
    </div>
</section>

<div class="container catalog" style="margin-bottom: 100px">
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?>">
      <h1 class="catalog__title" style="font-size: 30px"><?php echo $heading_title; ?></h1>
      <?php if ($thumb || $description) { ?>
      <div class="row">
        <?php if ($thumb) { ?>
        <div class="col-sm-2"><img src="<?php echo $thumb; ?>" alt="<?php echo $heading_title; ?>" title="<?php echo $heading_title; ?>" class="img-thumbnail" /></div>
        <?php } ?>
        <?php if ($description) { ?>
        <div class="col-sm-10"><?php echo $description; ?></div>
        <?php } ?>
      </div>
      <hr>
      <?php } ?>
      <?php if ($categories) { ?>
      <h3 class="catalog__title"><?php echo $text_refine; ?></h3>
      <?php if (count($categories) <= 5) { ?>
      <div class="row">
        <div class="col-sm-3">
          <ul>
            <?php foreach ($categories as $category) { ?>
            <li><a href="<?php echo $category['href']; ?>" class="catalog__link catalog__link--active" style="color: #101010;font-size: 16px;"><?php echo $category['name']; ?></a></li>
            <?php } ?>
          </ul>
        </div>
      </div>
      <?php } else { ?>
      <div class="row">
        <?php foreach (array_chunk($categories, ceil(count($categories) / 4)) as $categories) { ?>
        <div class="col-sm-3">
          <ul>
            <?php foreach ($categories as $category) { ?>
            <li><a href="<?php echo $category['href']; ?> " style="color: #101010" class="catalog__link catalog__link--active"><?php echo $category['name']; ?></a></li>
            <?php } ?>
          </ul>
        </div>
        <?php } ?>
      </div>
      <?php } ?>
      <?php } ?>
      <?php if ($products) { ?>
      <div class="row">
        <div class="col-md-2 col-sm-6 hidden-xs">
          <div class="btn-group btn-group-sm">
            <button type="button" id="list-view" class="btn btn-default" data-toggle="tooltip" title="<?php echo $button_list; ?>"><i class="fa fa-th-list"></i></button>
            <button type="button" id="grid-view" class="btn btn-default" data-toggle="tooltip" title="<?php echo $button_grid; ?>"><i class="fa fa-th"></i></button>
          </div>
        </div>
        <div class="col-md-3 col-sm-6" style="padding-top: 5px">

            <a href="<?php echo $compare; ?>" id="compare-total" class="catalog__link catalog__link--active" ><?php echo $text_compare; ?></a>

        </div>
        <div class="col-md-4 col-xs-6">
          <div class="form-group input-group input-group-sm">
            <label class="input-group-addon catalog" for="input-sort"><?php echo $text_sort; ?></label>
            <select id="input-sort" class="form-control" onchange="location = this.value;">
              <?php foreach ($sorts as $sorts) { ?>
              <?php if ($sorts['value'] == $sort . '-' . $order) { ?>
              <option value="<?php echo $sorts['href']; ?>" selected="selected"><?php echo $sorts['text']; ?></option>
              <?php } else { ?>
              <option value="<?php echo $sorts['href']; ?>"><?php echo $sorts['text']; ?></option>
              <?php } ?>
              <?php } ?>
            </select>
          </div>
        </div>
        <div class="col-md-3 col-xs-6">
          <div class="form-group input-group input-group-sm">
            <label class="input-group-addon" for="input-limit"><?php echo $text_limit; ?></label>
            <select id="input-limit" class="form-control" onchange="location = this.value;">
              <?php foreach ($limits as $limits) { ?>
              <?php if ($limits['value'] == $limit) { ?>
              <option value="<?php echo $limits['href']; ?>" selected="selected"><?php echo $limits['text']; ?></option>
              <?php } else { ?>
              <option value="<?php echo $limits['href']; ?>"><?php echo $limits['text']; ?></option>
              <?php } ?>
              <?php } ?>
            </select>
          </div>
        </div>
      </div>
      <div class="row">
        <?php foreach ($products as $product) { ?>
        <div class="product-layout product-list col-xs-12" style="margin-bottom: 20px">
          <div class="product-thumb">
            <div class="image"><a href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="img-responsive" style="margin: 0 auto" /></a></div>
            <div>
              <div class="caption">
                <h4 class="catalog__title" style="margin: 10px 0;"><a href="<?php echo $product['href']; ?>"  style="color: #101010;"><?php echo $product['name']; ?></a></h4>
                <p class="catalog__text" style="text-align: left;min-height: 66px"><?php echo $product['description']; ?></p>
                <?php if ($product['price']) { ?>
                <p class="price" style="color:#101010;font-size: 16px;font-weight: bold;">
                  <?php if (!$product['special']) { ?>
                  <?php echo $product['price']; ?>
                  <?php } else { ?>
                  <span class="price-new"><?php echo $product['special']; ?></span> <span class="price-old"><?php echo $product['price']; ?></span>
                  <?php } ?>
                </p>
                <?php } ?>
              </div>
              <div class="button-group" style="display: flex;justify-content: space-between">
                <button class="catalog__btn" type="button" onclick="cart.add('<?php echo $product['product_id']; ?>', '<?php echo $product['minimum']; ?>');"><i class="fa fa-shopping-cart"></i> <span class="hidden-xs hidden-sm hidden-md"><?php echo $button_cart; ?></span></button>
                <button class="catalog__btn" type="button" data-toggle="tooltip" title="<?php echo $button_wishlist; ?>" onclick="wishlist.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-heart"></i></button>
                <button class="catalog__btn" type="button" data-toggle="tooltip" title="<?php echo $button_compare; ?>" onclick="compare.add('<?php echo $product['product_id']; ?>');"><i class="fa fa-exchange"></i></button>
              </div>
            </div>
          </div>
        </div>
        <?php } ?>
      </div>
      <div class="row" style="margin-top: 50px;">
        <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
        <div class="col-sm-6 text-right"><?php echo $results; ?></div>
      </div>
      <?php } ?>
      <?php if (!$categories && !$products) { ?>
      <p><?php echo $text_empty; ?></p>
      <div class="buttons" style="display: flex">
        <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary"><?php echo $button_continue; ?></a></div>
      </div>
      <?php } ?>
      <?php echo $content_bottom; ?></div>
    <?php echo $column_right; ?></div>
</div>

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
<script src="catalog/view/javascript/bootstrap/js/bootstrap.min.js" type="text/javascript" defer></script>
<link href="catalog/view/javascript/bootstrap/css/bootstrap.css" rel="stylesheet" media="screen" />
<link href="catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
</body>

</html>
