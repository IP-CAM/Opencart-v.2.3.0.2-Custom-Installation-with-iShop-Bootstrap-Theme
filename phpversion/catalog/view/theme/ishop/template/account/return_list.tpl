<?php echo $header; ?>

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
  <div id="content" class="container" style="min-height: 60vh;">
    <h1 class="login__title"><?php echo $heading_title; ?></h1>
    <?php if ($returns) { ?>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
        <tr>
          <td class="text-right"><?php echo $column_return_id; ?></td>
          <td class="text-left"><?php echo $column_status; ?></td>
          <td class="text-left"><?php echo $column_date_added; ?></td>
          <td class="text-right"><?php echo $column_order_id; ?></td>
          <td class="text-left"><?php echo $column_customer; ?></td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        <?php foreach ($returns as $return) { ?>
        <tr>
          <td class="text-right">#<?php echo $return['return_id']; ?></td>
          <td class="text-left"><?php echo $return['status']; ?></td>
          <td class="text-left"><?php echo $return['date_added']; ?></td>
          <td class="text-right"><?php echo $return['order_id']; ?></td>
          <td class="text-left"><?php echo $return['name']; ?></td>
          <td class="text-right"><a href="<?php echo $return['href']; ?>" data-toggle="tooltip" title="<?php echo $button_view; ?>" class="btn btn-info"><i class="fa fa-eye"></i></a></td>
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
    <p style="color: #101010"><?php echo $text_empty; ?></p>
    <?php } ?>
    <div class="buttons clearfix">
      <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary login__btn" style="max-width: 80px"><?php echo $button_continue; ?></a></div>
    </div>
    <?php echo $content_bottom; ?></div>

</section>
</div>
<?php echo $footer; ?>
