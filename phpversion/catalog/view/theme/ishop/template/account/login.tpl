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
    <div class="container">
    <?php if ($success) { ?>
  <div class="alert alert-success"><?php echo $success; ?></div>
  <?php } ?>
  <?php if ($error_warning) { ?>
  <div class="alert alert-danger"><?php echo $error_warning; ?></div>
  <?php } ?>
      <div class="login__inner">
        <h2 class="login__title">Авторизация</h2>
        <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" class="login__field">
              <div class="form-group">
                <label class="control-label login__label" for="input-email">E-mail:<span>*</span></label>
                <input type="text" name="email" value="<?php echo $email; ?>" placeholder="<?php echo $entry_email; ?>" id="input-email" class="form-control login__input" required/>
              </div>
              <div class="form-group">
                <label class="control-label login__label" for="input-password">Пароль:<span>*</span></label>
                <input type="password" name="password" value="<?php echo $password; ?>" placeholder="<?php echo $entry_password; ?>" id="input-password" class="form-control login__input" required/>
                </div>
              <input type="submit" value="<?php echo $button_login; ?>" class="btn btn-primary login__btn" />
              <?php if ($redirect) { ?>
              <input type="hidden" name="redirect" value="<?php echo $redirect; ?>" />
              <?php } ?>
            </form>
        <div class="login__links">
          <a href="<?php echo $forgotten; ?>" class="login__link">Забыли пароль?</a>
          <a href="<?=$register?>" class="login__link">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </section>
  <?=$footer?>