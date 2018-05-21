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
    <h1 class="login__title"><?php echo $heading_title; ?></h1>
    <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" class="form-horizontal">
      <fieldset>
        <div class="form-group">
          <label class="col-sm-2 control-label login__label"><?php echo $entry_newsletter; ?></label>
          <div class="col-sm-10">
            <?php if ($newsletter) { ?>
            <label class="radio-inline login__label">
              <input type="radio" name="newsletter" value="1" checked="checked" />
              <?php echo $text_yes; ?> </label>
            <label class="radio-inline login__label">
              <input type="radio" name="newsletter" value="0" />
              <?php echo $text_no; ?></label>
            <?php } else { ?>
            <label class="radio-inline login__label">
              <input type="radio" name="newsletter" value="1" />
              <?php echo $text_yes; ?> </label>
            <label class="radio-inline login__label">
              <input type="radio" name="newsletter" value="0" checked="checked" />
              <?php echo $text_no; ?></label>
            <?php } ?>
          </div>
        </div>
      </fieldset>
      <div class="buttons clearfix">
        <div class="pull-right">
          <input type="submit" value="<?php echo $button_continue; ?>" class="btn btn-primary login__btn" />
        </div>
      </div>
    </form>
</section>
</div>
<?=$footer?>
