<?=$header?>
<section class="breadcrumbs">
  <div class="container">
    <div class="breadcrumbs__inner">
      <h1 class="breadcrumbs__title">История заказов</h1>
      <ul class="breadcrumbs__list">
        <li class="breadcrumbs__item">
          <a href="/my-account" class="breadcrumbs__link">Мой аккаунт</a>
        </li>
        <li class="breadcrumbs__item">
          <a href="order-history/" class="breadcrumbs__link breadcrumbs__link--active">История заказов</a>
        </li>
      </ul>
    </div>
  </div>
</section>
<section class="login">
  <div id="content" class="container" style="color: #101010;">
    <h1 class="login__title"><?php echo $heading_title; ?></h1>
    <?php if ($orders) { ?>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
        <tr>
          <td class="text-right"><?php echo $column_order_id; ?></td>
          <td class="text-left"><?php echo $column_customer; ?></td>
          <td class="text-right"><?php echo $column_product; ?></td>
          <td class="text-left"><?php echo $column_status; ?></td>
          <td class="text-right"><?php echo $column_total; ?></td>
          <td class="text-left"><?php echo $column_date_added; ?></td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($orders as $order) { ?>
        <tr>
          <td class="text-right">#<?php echo $order['order_id']; ?></td>
          <td class="text-left"><?php echo $order['name']; ?></td>
          <td class="text-right"><?php echo $order['products']; ?></td>
          <td class="text-left"><?php echo $order['status']; ?></td>
          <td class="text-right"><?php echo $order['total']; ?></td>
          <td class="text-left"><?php echo $order['date_added']; ?></td>
          <td class="text-right"><?php if (!empty($order['ocstore_payeer_onpay'])) { ?><a rel="nofollow" onclick="location='<?php echo $order['ocstore_payeer_onpay']; ?>'" data-toggle="tooltip" title="<?php echo $button_ocstore_payeer_onpay; ?>" class="btn btn-info"><i class="fa fa-usd"></i></a>&nbsp;&nbsp;<?php } ?><?php if (!empty($order['ocstore_yk_onpay'])) { ?><a rel="nofollow" onclick="location='<?php echo $order['ocstore_yk_onpay']; ?>'" data-toggle="tooltip" title="<?php echo $button_ocstore_yk_onpay; ?>" class="btn btn-info" ><i class="fa fa-usd"></i></a>&nbsp;&nbsp;<?php } ?><a href="<?php echo $order['view']; ?>" data-toggle="tooltip" title="<?php echo $button_view; ?>" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
        </tr>
        <?php } ?>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
      <div class="col-sm-6 text-right"><?php echo $results; ?></div>
    </div>
    <?php } else { ?>
    <p><?php echo $text_empty; ?></p>
    <?php } ?>
    <div class="buttons">
      <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary login__btn" style="text-align: center;max-width: 150px;margin-top: 40px;"><?php echo $button_continue; ?></a></div>
    </div>
    <?php echo $content_bottom; ?></div>

</section>
</div>
<?=$footer?>
