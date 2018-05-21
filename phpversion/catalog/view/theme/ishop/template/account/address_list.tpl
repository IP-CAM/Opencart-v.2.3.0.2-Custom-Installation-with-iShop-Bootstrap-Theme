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
  <div id="content" class="container">
    <h2 class="login__title"><?php echo $text_address_book; ?></h2>
    <?php if ($addresses) { ?>
    <div class="table-responsive">
      <table class="table table-bordered table-hover" style="color: #101010;">
        <?php foreach ($addresses as $result) { ?>
        <tr>
          <td class="text-left"><?php echo $result['address']; ?></td>
        </tr>
        <?php } ?>
      </table>
    </div>
    <?php } else { ?>
    <p><?php echo $text_empty; ?></p>
    <?php } ?>
    <div class="buttons" style="margin-top: 20px;">
      <a href="<?php echo $result['update']; ?>" class="btn btn-info"><?php echo $button_edit; ?></a> &nbsp;
      <a href="<?php echo $result['delete']; ?>" class="btn btn-danger"><?php echo $button_delete; ?></a>
      <div class="pull-right" style="margin-top: 40px"><a href="<?php echo $add; ?>" class="btn btn-primary login__btn" style="max-width: 150px;text-align: center;"><?php echo $button_new_address; ?></a></div>
    </div>
    <?php echo $content_bottom; ?></div>
</section>


</div>

<?=$footer?>