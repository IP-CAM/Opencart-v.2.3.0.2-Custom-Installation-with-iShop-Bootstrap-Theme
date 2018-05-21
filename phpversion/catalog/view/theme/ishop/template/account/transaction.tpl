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
<section class="login">
  <div id="content" class="container" style="color: #101010">
    <h1 class="login__title"><?php echo $heading_title; ?></h1>
    <p><?php echo $text_total; ?> <b><?php echo $total; ?></b>.</p>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
        <tr>
          <td class="text-left"><?php echo $column_date_added; ?></td>
          <td class="text-left"><?php echo $column_description; ?></td>
          <td class="text-right"><?php echo $column_amount; ?></td>
        </tr>
        </thead>
        <tbody>
        <?php if ($transactions) { ?>
        <?php foreach ($transactions  as $transaction) { ?>
        <tr>
          <td class="text-left"><?php echo $transaction['date_added']; ?></td>
          <td class="text-left"><?php echo $transaction['description']; ?></td>
          <td class="text-right"><?php echo $transaction['amount']; ?></td>
        </tr>
        <?php } ?>
        <?php } else { ?>
        <tr>
          <td class="text-center" colspan="5"><?php echo $text_empty; ?></td>
        </tr>
        <?php } ?>
        </tbody>
      </table>
    </div>
    <div class="row">
      <div class="col-sm-6 text-left"><?php echo $pagination; ?></div>
      <div class="col-sm-6 text-right"><?php echo $results; ?></div>
    </div>
    <div class="buttons">
      <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary login__btn" style="text-align: center; max-width: 150px; margin-top: 40px;"><?php echo $button_continue; ?></a></div>
    </div>
    <?php echo $content_bottom; ?></div>

</section>
</div>
<?=$footer?>
