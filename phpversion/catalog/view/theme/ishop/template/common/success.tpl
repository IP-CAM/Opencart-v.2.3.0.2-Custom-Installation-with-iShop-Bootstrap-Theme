<?=$header?>


<section class="account" style="height: 70vh;margin-top: 10%">
  <div id="content" class="container">
    <div class="account__inner account__inner--center">
      <div class="account__column">
      <h1 class="account__title"><?php echo $heading_title; ?></h1>
      <p class="account__text">
        <?php echo $text_message; ?>
      </p>
        <div class="pull-right"><a href="<?php echo $continue; ?>" class="btn btn-primary account__btn" style="margin: 0 auto"><?php echo $button_continue; ?></a></div>
      </div>
    </div>
  </div>
</section>

<?=$footer?>

