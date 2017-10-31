
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
          '<div class="baseline-trick"></div>' +
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

  var groupSize = 2;

  var viewedItemHtml = _cross_sell_render_product(
    data.item, 'cross-sell__item--viewed'
  );
  var suggestionsHtml = '';
  var controlBtnsHtml = '';

  for (var i=0; i<data.recommendation.length; i++) {
    suggestionsHtml += _cross_sell_render_product(
      data.recommendation[i], 'cross-sell__item--suggestion'
    );
  }

  var controlBtnsCount = Math.ceil(data.recommendation.length/groupSize);

  for (var i=0; i<controlBtnsCount; i++) {
    controlBtnsHtml += '' +
      '<li id="cross-sell__btn' + i.toString() + '">' +
        '<i class="material-icons">lens</i>' +
      '</li>';
  }

  var htmlValue = '' +
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
        '</div>' +
      '</div>' +
      '<div class="cross-sell__controls">' +
        '<ul class="cross-sell__controls__btnlist">' +
          controlBtnsHtml +
        '</ul>' +
      '</div>' +
    '</div>';

  return {
    html: htmlValue,
    groupCount: controlBtnsCount,
    currIndex: 0
  };
}

function _cross_sell_mount(el, data) {
  var crossSell = _cross_sell_render(data);
  el.innerHTML = crossSell.html;
  var timeToTransition = 5000;

  var transitionToFn = null;
  var transitionTimerFn = function() {
    if (crossSell.currIndex < (crossSell.groupCount-1)) {
      transitionToFn(crossSell.currIndex+1);
    } else {
      transitionToFn(0);
    }
  }

  transitionToFn = function(i) {
    var itemEls = document.getElementsByClassName(
      'cross-sell__item--suggestion'
    );

    for (var j=0; j<itemEls.length; j++) {
      itemEls[j].style.top = (i * -20).toString() + 'em';
    }

    document.getElementById(
      'cross-sell__btn' + crossSell.currIndex.toString()
    ).classList.remove(
      'cross-sell__controls__btn--active'
    );
    document.getElementById(
      'cross-sell__btn' + i.toString()
    ).classList.add(
      'cross-sell__controls__btn--active'
    );

    crossSell.currIndex = i;
    clearTimeout(crossSell.timer);
    crossSell.timer = setTimeout(transitionTimerFn, timeToTransition);
  }

  document.getElementById('cross-sell__btn0')
  .classList.add('cross-sell__controls__btn--active');

  for (var i=0; i<crossSell.groupCount; i++) {
    document.getElementById(
      'cross-sell__btn' + i.toString()
    ).addEventListener('click', (function() {
      transitionToFn(this.index);
    }).bind({index: i}));
  }

  crossSell.timer = setTimeout(
    transitionTimerFn, timeToTransition
  );
}

modules.register('cross-sell', {
    mount: _cross_sell_mount
});
