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

<div class="container catalog">
  <div class="row"><?php echo $column_left; ?>
    <?php if ($column_left && $column_right) { ?>
    <?php $class = 'col-sm-6'; ?>
    <?php } elseif ($column_left || $column_right) { ?>
    <?php $class = 'col-sm-9'; ?>
    <?php } else { ?>
    <?php $class = 'col-sm-12'; ?>
    <?php } ?>
    <div id="content" class="<?php echo $class; ?>">
      <h1 class="catalog__title"><?php echo $heading_title; ?></h1>
      <label class="control-label catalog__link" for="input-search"><?php echo $entry_search; ?></label>
      <div class="row">
        <div class="col-sm-4">
          <input type="text" name="search" value="<?php echo $search; ?>" placeholder="<?php echo $text_keyword; ?>" id="input-search" class="form-control catalog__input" />
        </div>
        <div class="col-sm-3">
          <select name="category_id" class="form-control catalog__input">
            <option value="0"><?php echo $text_category; ?></option>
            <?php foreach ($categories as $category_1) { ?>
            <?php if ($category_1['category_id'] == $category_id) { ?>
            <option value="<?php echo $category_1['category_id']; ?>" selected="selected"><?php echo $category_1['name']; ?></option>
            <?php } else { ?>
            <option value="<?php echo $category_1['category_id']; ?>"><?php echo $category_1['name']; ?></option>
            <?php } ?>
            <?php foreach ($category_1['children'] as $category_2) { ?>
            <?php if ($category_2['category_id'] == $category_id) { ?>
            <option value="<?php echo $category_2['category_id']; ?>" selected="selected">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $category_2['name']; ?></option>
            <?php } else { ?>
            <option value="<?php echo $category_2['category_id']; ?>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $category_2['name']; ?></option>
            <?php } ?>
            <?php foreach ($category_2['children'] as $category_3) { ?>
            <?php if ($category_3['category_id'] == $category_id) { ?>
            <option value="<?php echo $category_3['category_id']; ?>" selected="selected">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $category_3['name']; ?></option>
            <?php } else { ?>
            <option value="<?php echo $category_3['category_id']; ?>">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<?php echo $category_3['name']; ?></option>
            <?php } ?>
            <?php } ?>
            <?php } ?>
            <?php } ?>
          </select>
        </div>
        <div class="col-sm-3">
          <label class="checkbox-inline catalog__link">
            <?php if ($sub_category) { ?>
            <input type="checkbox" name="sub_category" value="1" checked="checked" style="top:8px"/>
            <?php } else { ?>
            <input type="checkbox" name="sub_category" value="1" style="top:8px"/>
            <?php } ?>
            <?php echo $text_sub_category; ?></label>
        </div>
      </div>
      <p>
        <label class="checkbox-inline catalog__link">
          <?php if ($description) { ?>
          <input type="checkbox" name="description" value="1" id="description" checked="checked" style="top:8px"/>
          <?php } else { ?>
          <input type="checkbox" name="description" value="1" id="description" style="top:8px"/>
          <?php } ?>
          <?php echo $entry_description; ?></label>
      </p>
      <input type="button" value="<?php echo $button_search; ?>" id="button-search" class="btn btn-primary" style="width: 196px" />
      <h2 class="catalog__title" style="margin-top: 50px"><?php echo $text_search; ?></h2>
      <?php if ($products) { ?>
      <div class="row">
        <div class="col-md-2 col-sm-6 hidden-xs">
          <div class="btn-group btn-group-sm">
            <button type="button" id="list-view" class="btn btn-default" data-toggle="tooltip" title="<?php echo $button_list; ?>"><i class="fa fa-th-list"></i></button>
            <button type="button" id="grid-view" class="btn btn-default" data-toggle="tooltip" title="<?php echo $button_grid; ?>"><i class="fa fa-th"></i></button>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="form-group">
            <a href="<?php echo $compare; ?>" id="compare-total" class="btn btn-link catalog__link catalog__link--active" style="color: #cb4b16"><?php echo $text_compare; ?></a>
          </div>
        </div>
        <div class="col-md-4 col-xs-6">
          <div class="form-group input-group input-group-sm">
            <label class="input-group-addon" for="input-sort"><?php echo $text_sort; ?></label>
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
      <div class="row">
        <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
        <div class="col-sm-6 text-right"><?php echo $results; ?></div>
      </div>
      <?php } else { ?>
      <p><?php echo $text_empty; ?></p>
      <?php } ?>
      <?php echo $content_bottom; ?></div>
    <?php echo $column_right; ?></div>
</div>
</main>
<footer style="margin-top: 100px" class="page-footer">
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
</footer s>
<button class="back-to-top" id="back-to-top" type="button">
  <svg class="back-to-top__icon" width="20" height="20">
    <use x="0" y="0" xlink:href="#icon-arrow-top"></use>
  </svg>
</button>

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
<script type="text/javascript"><!--
    $('#button-search').bind('click', function() {
        url = 'index.php?route=product/search';

        var search = $('#content input[name=\'search\']').prop('value');

        if (search) {
            url += '&search=' + encodeURIComponent(search);
        }

        var category_id = $('#content select[name=\'category_id\']').prop('value');

        if (category_id > 0) {
            url += '&category_id=' + encodeURIComponent(category_id);
        }

        var sub_category = $('#content input[name=\'sub_category\']:checked').prop('value');

        if (sub_category) {
            url += '&sub_category=true';
        }

        var filter_description = $('#content input[name=\'description\']:checked').prop('value');

        if (filter_description) {
            url += '&description=true';
        }

        location = url;
    });

    $('#content input[name=\'search\']').bind('keydown', function(e) {
        if (e.keyCode == 13) {
            $('#button-search').trigger('click');
        }
    });

    $('select[name=\'category_id\']').on('change', function() {
        if (this.value == '0') {
            $('input[name=\'sub_category\']').prop('disabled', true);
        } else {
            $('input[name=\'sub_category\']').prop('disabled', false);
        }
    });

    $('select[name=\'category_id\']').trigger('change');
    --></script>
<script src="catalog/view/javascript/bootstrap/js/bootstrap.min.js" type="text/javascript" defer></script>
<link href="catalog/view/javascript/bootstrap/css/bootstrap.css" rel="stylesheet" media="screen" />
<link href="catalog/view/javascript/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
</body>

</html>