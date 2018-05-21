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
  <?php if ($error_warning) { ?>
  <div class="alert alert-danger"> <?php echo $error_warning; ?></div>
  <?php } ?>

<section class="login">
  <div id="content" class="container">
    <h1 class="login__title"><?php echo $heading_title; ?></h1>
    <p><?php echo $text_email; ?></p>
    <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" class="form-horizontal">
      <fieldset>
        <legend><?php echo $text_your_email; ?></legend>
        <div class="form-group required">
          <label class="col-sm-2 control-label login__label" for="input-email"><?php echo $entry_email; ?></label>
          <div class="col-sm-10">
            <input type="text" name="email" value="<?php echo $email; ?>" placeholder="<?php echo $entry_email; ?>" id="input-email" class="form-control login__input" />
          </div>
        </div>
      </fieldset>
      <div class="buttons">
        <div class="pull-right">
          <input type="submit" value="<?php echo $button_continue; ?>" class="login__btn btn btn-primary" />
        </div>
      </div>
    </form>
    <?php echo $content_bottom; ?></div>
</section>


</div>
<?=$footer?>