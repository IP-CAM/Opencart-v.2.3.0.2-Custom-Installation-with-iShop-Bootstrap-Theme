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
        <legend><?php echo $text_password; ?></legend>
        <div class="form-group required">
          <label class="col-sm-2 control-label login__label" for="input-password"><?php echo $entry_password; ?></label>
          <div class="col-sm-10">
            <input type="password" name="password" value="<?php echo $password; ?>" placeholder="<?php echo $entry_password; ?>" id="input-password" class="form-control login__input" />
            <?php if ($error_password) { ?>
            <div class="text-danger"><?php echo $error_password; ?></div>
            <?php } ?>
          </div>
        </div>
        <div class="form-group required">
          <label class="col-sm-2 control-label login__label" for="input-confirm"><?php echo $entry_confirm; ?></label>
          <div class="col-sm-10">
            <input type="password" name="confirm" value="<?php echo $confirm; ?>" placeholder="<?php echo $entry_confirm; ?>" id="input-confirm" class="form-control login__input" />
            <?php if ($error_confirm) { ?>
            <div class="text-danger"><?php echo $error_confirm; ?></div>
            <?php } ?>
          </div>
        </div>
      </fieldset>
      <div class="buttons">
        <div class="pull-right">
          <input type="submit" value="<?php echo $button_continue; ?>" class="btn btn-primary login__btn" />
        </div>
      </div>
    </form>

</section>
<?=$footer?>