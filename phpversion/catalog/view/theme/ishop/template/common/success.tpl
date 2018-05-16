<?=$header?>
  <section class="breadcrumbs">
    <div class="container">
      <div class="breadcrumbs__inner">
        <h1 class="breadcrumbs__title">Выход</h1>
        <ul class="breadcrumbs__list">
          <li class="breadcrumbs__item">
            <a href="my-account/" class="breadcrumbs__link">Мой аккаунт</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="/logout" class="breadcrumbs__link breadcrumbs__link--active">Выход</a>
          </li>
        </ul>
      </div>
    </div>
  </section>

<section class="account">
  <div id="content" class="container">
    <div class="account__inner account__inner--center">
      <div class="account__column">
      <h1 class="account__title"><?php echo $heading_title; ?></h1>
      <p class="account__text">
        <?php echo $text_message; ?>
      </p>
        <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary account__btn"><?php echo $button_continue; ?></a></div>
      </div>
    </div>
  </div>
</section>

