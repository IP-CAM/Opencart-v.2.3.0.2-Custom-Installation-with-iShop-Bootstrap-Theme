<?php if (!isset($redirect)) { ?>
<div class="table-responsive">
  <table class="table table-bordered table-hover" style="color:#101010;font-size: 20px;font-family: "Roboto Condensed", Arial, Helvetica, "Nimbus Sans L", sans-serif">
    <thead>
      <tr>
        <td class="text-left" style="text-align: center; padding: 10px 0;border: 1px solid #dbdbdb"><?php echo $column_name; ?></td>
        <td class="text-left" style="text-align: center;padding: 10px 0;border: 1px solid #dbdbdb"><?php echo $column_model; ?></td>
        <td class="text-right" style="text-align: center;padding: 10px 0;border: 1px solid #dbdbdb"><?php echo $column_quantity; ?></td>
        <td class="text-right" style="text-align: center;padding: 10px 0;border: 1px solid #dbdbdb"><?php echo $column_price; ?></td>
        <td class="text-right" style="text-align: center;padding: 10px 0;border: 1px solid #dbdbdb"><?php echo $column_total; ?></td>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($products as $product) { ?>
      <tr>
        <td class="text-left" style="text-align: center;border: 1px solid #dbdbdb"><a href="<?php echo $product['href']; ?>" class="login__link"><?php echo $product['name']; ?></a>
          <?php foreach ($product['option'] as $option) { ?>
          <br />
          &nbsp;<small> - <?php echo $option['name']; ?>: <?php echo $option['value']; ?></small>
          <?php } ?>
          <?php if($product['recurring']) { ?>
          <br />
          <span class="label label-info"><?php echo $text_recurring_item; ?></span> <small><?php echo $product['recurring']; ?></small>
          <?php } ?></td>
        <td class="text-left" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $product['model']; ?></td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $product['quantity']; ?></td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $product['price']; ?></td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $product['total']; ?></td>
      </tr>
      <?php } ?>
      <?php foreach ($vouchers as $voucher) { ?>
      <tr>
        <td class="text-left" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $voucher['description']; ?></td>
        <td class="text-left" style="text-align: center;border: 1px solid #dbdbdb"></td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb">1</td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $voucher['amount']; ?></td>
        <td class="text-right" style="text-align: center;border: 1px solid #dbdbdb"><?php echo $voucher['amount']; ?></td>
      </tr>
      <?php } ?>
    </tbody>
    <tfoot>
      <?php foreach ($totals as $total) { ?>
      <tr>
        <td colspan="4" class="text-right" style="text-align: left;border: 1px solid #dbdbdb"><strong><?php echo $total['title']; ?>:</strong></td>
        <td class="text-right" style="text-align: left;border: 1px solid #dbdbdb"> <?php echo $total['text']; ?></td>
      </tr>
      <?php } ?>
    </tfoot>
  </table>
</div>

<?php echo $payment; ?>

<?php } else { ?>
<script type="text/javascript"><!--
location = '<?php echo $redirect; ?>';
//--></script>
<?php } ?>
