  <div id="cart" class="btn-group btn-block">
  <ul class="dropdown-menu pull-right" style="margin: 0">
    <?php if ($products || $vouchers) { ?>
    <li>
      <table class="table table-striped page-header__items page-header__wrap" style="border-collapse:separate;
  border-spacing: 0 1em;">
        <?php foreach ($products as $product) { ?>
        <tr style="margin-bottom: 20px">
          <td style="width: 20%; text-align: center" class="text-center"><?php if ($product['thumb']) { ?>
            <a href="<?php echo $product['href']; ?>"><img src="<?php echo $product['thumb']; ?>" alt="<?php echo $product['name']; ?>" title="<?php echo $product['name']; ?>" class="page-header__img img-thumbnail" /></a>
            <?php } ?>
          </td sty>
          <td style="width: 20%; text-align: center" class="text-left"><a href="<?php echo $product['href']; ?>" class="page-header__link" style="width: auto"><?php echo $product['name']; ?></a>
          </td>
          <td style="width: 20%; text-align: center" class="text-right page-header__price" style="font-size: 12px">x <?php echo $product['quantity']; ?></td>
          <td style="width: 20%;text-align: center" class="text-right page-header__value" style="font-size: 12px"><?php echo $product['total']; ?></td>
          <td style="width: 20%;text-align: center" class="text-center">
            <button type="button" style="border: none; background: transparent; padding: 0" onclick="cart.remove('<?php echo $product['cart_id']; ?>');" title="<?php echo $button_remove; ?>" class="btn btn-danger btn-xs">
              <svg class="page-header__icon" width="20" height="20">
                <use x="0" y="0" xlink:href="#icon-cross"></use>
              </svg>
            </button>
          </td>
        </tr>
        <?php } ?>
        <?php foreach ($vouchers as $voucher) { ?>
        <tr>
          <td class="text-center"></td>
          <td class="text-left"><?php echo $voucher['description']; ?></td>
          <td class="text-right">x&nbsp;1</td>
          <td class="text-right"><?php echo $voucher['amount']; ?></td>
          <td class="text-center text-danger"><button type="button" onclick="voucher.remove('<?php echo $voucher['key']; ?>');" title="<?php echo $button_remove; ?>" class="btn btn-danger btn-xs"><i class="fa fa-times"></i></button></td>
        </tr>
        <?php } ?>
      </table>
    </li>
    <li>
      <div style="margin: 0 30px">
        <table class="table table-bordered">
          <?php foreach ($totals as $total) { ?>
          <tr>
            <td class="text-right page-header__subtotal" style="padding-right: 40px"><strong><?php echo $total['title']; ?></strong></td>
            <td class="text-right page-header__subtotal" style="min-width: 70px"><?php echo $total['text']; ?></td>
          </tr>
          <?php } ?>
        </table>
        <p class="text-right page-header__btns" style="padding-top: 20px"><a href="<?php echo $cart; ?>" class="page-header__btn"><strong><i class="fa fa-shopping-cart"></i> <?php echo $text_cart; ?></strong></a>&nbsp;&nbsp;&nbsp;<a href="<?php echo $checkout; ?>" class="page-header__btn page-header__btn--orange"><strong><i class="fa fa-share"></i> <?php echo $text_checkout; ?></strong></a></p>
      </div>
    </li>
    <?php } else { ?>
    <li>
      <p class="text-center" style="display:block; text-align: center; color: white;"><?php echo $text_empty; ?></p>
    </li>
    <?php } ?>
  </ul>
</div>
