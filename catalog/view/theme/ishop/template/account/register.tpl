<?=$header?>
<section class="login">
    <div class="container">
      <div class="login__inner">
        <h2 class="login__title">Регистрация</h2>
        <form action="<?php echo $action; ?>" method="post" enctype="multipart/form-data" class="login__field">
          <label for="login" class="login__label">E-mail <span>*</span></label>
          <input type="text" class="login__input" name="login" id="login">
          <label for="pass" class="login__label">Пароль<span>*</span></label>
          <input type="password" class="login__input" id="pass">
          <div class="login__btns">
            <button class="login__btn" type="submit">Зарегистрироваться</button>
            <input type="checkbox" class="login__checkbox" name="remember" id="remember">
            <label for="remember" class="login__label login__label--nopadding">Подписаться на новостную рассылку</label>
          </div>
        </form>
      </div>
    </div>
  </section>
  <?=$footer?>