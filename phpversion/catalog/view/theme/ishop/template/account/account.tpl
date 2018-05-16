<?=$header?>
<section class="breadcrumbs">
    <div class="container">
        <div class="breadcrumbs__inner">
            <h1 class="breadcrumbs__title">Личный кабинет</h1>
            <ul class="breadcrumbs__list">
                <li class="breadcrumbs__item">
                    <a href="/" class="breadcrumbs__link">Главная</a>
                </li>
                <li class="breadcrumbs__item">
                    <a href="/my-account" class="breadcrumbs__link breadcrumbs__link--active">Личный кабинет</a>
                </li>
            </ul>
        </div>
    </div>
</section>

<section class="account">
    <div class="container">

        <div class="account__inner">
            <div class="account__column">
                <h2 class="account__title">
                    <?php echo $text_my_account; ?>
                </h2>
                <ul class="account__list">
                    <li class="account__item">
                        <a href="<?php echo $edit; ?>">
                            <?php echo $text_edit; ?>
                        </a>
                    </li>
                    <li class="account__item">
                        <a href="<?php echo $password; ?>">
                            <?php echo $text_password; ?>
                        </a>
                    </li>
                    <li class="account__item">
                        <a href="<?php echo $address; ?>">
                            <?php echo $text_address; ?>
                        </a>
                    </li>
                    <li class="account__item">
                        <a href="<?php echo $wishlist; ?>">
                            <?php echo $text_wishlist; ?>
                        </a>
                    </li>
                </ul>
            </div>


            <div class="account__column">
                <h2 class="account__title">
                    <?php echo $text_my_orders; ?>
                </h2>
                <ul class="list-unstyled">
                    <li class="account__item">
                        <a href="<?php echo $order; ?>">
                            <?php echo $text_order; ?>
                        </a>
                    </li>
                    <li class="account__item">
                        <a href="<?php echo $return; ?>">
                            <?php echo $text_return; ?>
                        </a>
                    </li>
                    <li class="account__item">
                        <a href="<?php echo $transaction; ?>">
                            <?php echo $text_transaction; ?>
                        </a>
                    </li>
                </ul>
            </div>

            <div class="account__column">
                <h2 class="account__title">
                    <?php echo $text_my_newsletter; ?>
                </h2>
                <ul>
                    <li class="account__item">
                        <a href="<?php echo $newsletter; ?>">
                            <?php echo $text_newsletter; ?>
                        </a>
                    </li>
                </ul>
            </div>


            <div class="account__column">
                <?php if ($credit_cards) { ?>
                <h2 class="account__title">
                    <?php echo $text_credit_card; ?>
                </h2>
                <ul>
                    <?php foreach ($credit_cards as $credit_card) { ?>
                    <li class="account__item">
                        <a href="<?php echo $credit_card['href']; ?>">
                            <?php echo $credit_card['name']; ?>
                        </a>
                    </li>
                    <?php } ?>
                </ul>
                <?php } ?>
            </div>

            <div class="account__column">
                <a href="http://ishop/logout/" class="account__btn">Выйти</a>
            </div>
        </div>

    </div>
</section>

<?=$footer?>