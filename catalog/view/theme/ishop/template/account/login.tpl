<?=$header?>
<section class="login">
    <div class="container">
      <div class="login__inner">
        <h2 class="login__title">Авторизация</h2>
        <form action="index.php?route=account/login" class="login__field">
          <label for="login" class="login__label">Имя пользователя или e-mail <span>*</span></label>
          <input type="text" class="login__input" name="login" id="login">
          <label for="pass" class="login__label">Пароль<span>*</span></label>
          <input type="password" class="login__input" id="pass">
          <div class="login__btns">
            <button class="login__btn" type="submit">Войти</button>
            <input type="checkbox" class="login__checkbox" name="remember" id="remember">
            <label for="remember" class="login__label login__label--nopadding">Запомнить меня</label>
          </div>
        </form>
        <div class="login__links">
          <a href="#" class="login__link">Забыли пароль?</a>
          <a href="<?=$register?>" class="login__link">Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </section>
  <?=$footer?>