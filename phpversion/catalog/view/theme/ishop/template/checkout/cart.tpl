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

  <?php if ($attention) { ?>
  <div class="alert alert-info"><i class="fa fa-info-circle"></i> <?php echo $attention; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>
  <?php if ($success) { ?>
  <div class="alert alert-success"><i class="fa fa-check-circle"></i> <?php echo $success; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>
  <?php if ($error_warning) { ?>
  <div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?>
    <button type="button" class="close" data-dismiss="alert">&times;</button>
  </div>
  <?php } ?>

<section class="cart">
  <div id="content" class="container">
    <h1 class="cart__title"><?php echo $heading_title; ?>
      <?php if ($weight) { ?>
      &nbsp;(<?php echo $weight; ?>)
      <?php } ?>
    </h1>
    <form action="<?php echo $action; ?>" method="post" class="cart__field" enctype="multipart/form-data">
      <div class="table-responsive">
        <table class="table table-bordered cart__table" style="width: 100%">
          <thead>
          <tr class="cart__tr cart__tr--border">
            <td class="text-center cart__remove cart__remove--padding"></td>
            <td class="text-left cart__thumbnail cart__thumbnail--padding"></td>
            <td class="text-left cart__name cart__name--padding"><?php echo $column_name; ?></td>
            <td class="text-left cart__price cart__price--padding"><?php echo $column_price; ?></td>
            <td class="text-right cart__quantity cart__quantity--padding"><?php echo $column_quantity; ?></td>
            <td class="text-right cart__subtotal cart__subtotal--padding"><?php echo $column_total; ?></td>
          </tr>
          </thead>
          <tbody>
          <?php foreach ($products as $product) { ?>
          <tr class="cart__item">
            <td class="text-center cart__remove">
              <button style="background: transparent; border: none;padding: 0" type="button" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger cart__link cart__link--remove" onclick="cart.remove('<?php echo $product['cart_id']; ?>');">
                <span></span>
                <span></span>
              </button>
            </td>
            <td class="text-left cart__thumbnail"><?php if ($product['thumb']) { ?>
              <a class="cart__link" href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="img-thumbnail cart__img" /></a>
              <?php } ?></td>
            <td class="text-left cart__name">
              <a class="cart__link" href="<?php echo $product['href']; ?>"><?php echo $product['name']; ?></a>
              <?php if (!$product['stock']) { ?>
              <span class="text-danger">***</span>
              <?php } ?>
              <?php if ($product['option']) { ?>
              <?php foreach ($product['option'] as $option) { ?>
              <br />
              <small><?php echo $option['name']; ?>: <?php echo $option['value']; ?></small>
              <?php } ?>
              <?php } ?>
              <?php if ($product['reward']) { ?>
              <br />
              <small><?php echo $product['reward']; ?></small>
              <?php } ?>
              <?php if ($product['recurring']) { ?>
              <br />
              <span class="label label-info"><?php echo $text_recurring_item; ?></span> <small><?php echo $product['recurring']; ?></small>
              <?php } ?></td>
            <td class="text-left cart__price">
              <?php echo $product['price']; ?>
            </td>
            <td class="text-right cart__quantity">
              <div class="input-group btn-block" style="max-width: 200px;">
                <input type="text" name="quantity[<?php echo $product['cart_id']; ?>]" value="<?php echo $product['quantity']; ?>" size="1" class="form-control cart__input" />
              </div>
            </td>
            <td class="text-right cart__subtotal cart__price cart__price--orange"><?php echo $product['total']; ?>
            </td>
          </tr>
          <?php } ?>
          <?php foreach ($vouchers as $voucher) { ?>
          <tr>
            <td></td>
            <td class="text-left"><?php echo $voucher['description']; ?></td>
            <td class="text-left"></td>
            <td class="text-left"><div class="input-group btn-block" style="max-width: 200px;">
                <input type="text" name="" value="1" size="1" disabled="disabled" class="form-control" />
                <span class="input-group-btn">
                                <button type="button" data-toggle="tooltip" title="<?php echo $button_remove; ?>" class="btn btn-danger" onclick="voucher.remove('<?php echo $voucher['key']; ?>');"><i class="fa fa-times-circle"></i></button>
                    </span></div></td>
            <td class="text-right"><?php echo $voucher['amount']; ?></td>
            <td class="text-right"><?php echo $voucher['amount']; ?></td>
          </tr>
          <?php } ?>
          <tr>
            <td class="cart__buttons">

              <button style="margin-left: auto" type="submit" data-toggle="tooltip" title="<?php echo $button_update; ?>" class="cart__button">Обновить</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </form>

    <?php if ($modules) { ?>
    <h2 class="cart__title" style="margin-top: 50px"><?php echo $text_next; ?></h2>
    <p class="cart__variation"><?php echo $text_next_choice; ?></p>
    <div class="panel-group" id="accordion">
      <?php foreach ($modules as $module) { ?>
      <?php echo $module; ?>
      <?php } ?>
    </div>
    <?php } ?>
    <br />
    <div class="row">
      <div class="col-sm-4 col-sm-offset-8">
        <table class="table table-bordered cart__table cart__table--total" style="margin-top: 50px;margin-bottom: 50px">
          <?php foreach ($totals as $total) { ?>
          <tr class="cart__pricing">
            <td class="text-right cart__th" style="color: #101010"><strong><?php echo $total['title']; ?>:</strong></td>
            <td class="text-right cart__th"><?php echo $total['text']; ?></td>
          </tr>
          <?php } ?>
        </table>
      </div>
    </div>
    <div class="buttons clearfix" style="display: flex; flex-wrap: wrap">
      <div class="pull-left"><a href="<?php echo $continue; ?>" class="cart__button" style="margin-bottom: 10px;margin-right: 20px"><?php echo $button_shopping; ?></a></div>
      <div class="pull-right"><a href="<?php echo $checkout; ?>" class="cart__button"><?php echo $button_checkout; ?></a></div>
    </div>
</section>


<?php echo $footer; ?>
