
function _cross_sell_render_product(product, className) {
  return '' +
    '<div class="cross-sell__item ' + className + '">' +
      '<div class="cross-sell__item__overlay">' +
        '<a href="#product" class="cross-sell__item__overlay__link"></a>' +
        '<a href="#addtocart" class="cross-sell__item__cart-btn">' +
         '<i class="material-icons">add_shopping_cart</i>' +
        '</a>' +
      '</div>' +
      '<span class="cross-sell__item__image">' +
        '<img src="' + product.imageName + '">' +
      '</span>' +
      '<span class="cross-sell__item__description">' +
        '<div class="cross-sell__item__description__name">' +
          '<div class="baseline-trick" />' +
          '<div>' + product.name + '</div>' +
        '</div>' +
        '<div class="cross-sell__item__description__price">' +
          'Por: ' +
          '<span class="cross-sell__item__description__price_tag">' +
            product.price +
          '</span>' +
          '<br />' +
          'ou até: ' +
          '<span class="cross-sell__item__description__price_options">' +
            product.productInfo.paymentConditions +
          '</span>' +
        '</div>' +
      '</span>' +
    '</div>';
}

function _cross_sell_render(data) {

  var viewedItemHtml = _cross_sell_render_product(
    data.item, 'cross-sell__item--first'
  );
  var suggestionsHtml = '';

  for (var i=0; i<data.recommendation.length; i++) {
    var extraClass = '';
    if (i == 0) {
      extraClass = 'cross-sell__item--first';
    }
    suggestionsHtml += _cross_sell_render_product(
      data.recommendation[i], extraClass
    );
  }

  return '' +
    '<div class="cross-sell">' +
      '<div class="cross-sell__viewed">' +
        '<div class="cross-sell__header">' +
          '<h3>Você visitou:</h3>' +
        '</div>' +
        viewedItemHtml +
      '</div>' +
      '<div class="cross-sell__suggestions">' +
        '<div class="cross-sell__header">' +
          '<h3>e talvez se interesse por:</h3>' +
        '</div>' +
        '<div class="cross-sell__suggestions__items">' +
          suggestionsHtml +
        '</div>'
      '</div>' +
    '</div>';
}

function _cross_sell_mount(els, data) {
  els.html(_cross_sell_render(data));
}

modules.register('cross-sell', {
    mount: _cross_sell_mount
});
