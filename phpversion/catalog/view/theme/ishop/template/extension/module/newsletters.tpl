<script>
	function regNewsletter()
	{
		var emailpattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		var email = $('#txtemail').val();
		
		if(email != "")
		{
			if(!emailpattern.test(email))
			{
				$("#text-danger-newsletter").remove();
				$("#form-newsletter-error").removeClass("has-error");
				$("#newsletter-email").append('<div class="text-danger" id="text-danger-newsletter"><?php echo $error_news_email_invalid; ?></div>');
				$("#form-newsletter-error").addClass("has-error");

				return false;
			}
			else
			{
				$.ajax({
					url: 'index.php?route=extension/module/newsletters/add',
					type: 'post',
					data: 'email=' + $('#txtemail').val(),
					dataType: 'json',
					async:false,

					success: function(json) {

						if (json.message == true) {
							alert('<?php echo $error_newsletter_sent; ?>');
							document.getElementById("form-newsletter").reset();
							return true;						
						}
						else {
							$("#text-danger-newsletter").remove();
							$("#form-newsletter-error").removeClass("has-error");
							$("#newsletter-email").append(json.message);
							$("#form-newsletter-error").addClass("has-error");
						}
					}
				});
				return false;
			}
		}
		else
		{

			$("#text-danger-newsletter").remove();
			$("#form-newsletter-error").removeClass("has-error");
			$("#newsletter-email").append('<div class="text-danger" id="text-danger-newsletter"><?php echo $error_news_email_required; ?></div>');
			$("#form-newsletter-error").addClass("has-error");

			return false;
		}
	}
</script>



<section class="subscribe">
	<div class="container">
		<div class="subscribe__inner">
			<div class="subscribe__text">
				<h3 class="subscribe__title">Подписка на новостную рассылку</h3>
				<p class="subscribe__desc">Подпишитесь прямо сейчас и получите скидку 25% на один товар на Ваш выбор +
					бесплатную доставку.</p>
			</div>
			<div class="subscribe__inputs">
				<form action="" method="post" class="subscribe__form" id="form-newsletter">
					<input type="email" name="txtemail" id="txtemail" value="" class="subscribe__input" placeholder="Ваш e-mail" aria-label="Введите e-mail">
					<button class="subscribe__btn" type="submit" onclick="return regNewsletter();">Подписаться!</button>
				</form>
			</div>
		</div>
	</div>
</section>