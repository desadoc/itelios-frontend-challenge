
function _cross_sell_render(data, templates) {
  var groupSize = 2;
  var groupCount = Math.ceil(data.recommendation.length/groupSize);

  data.item.className = 'cross-sell__item--viewed';

  for (var i=0; i<data.recommendation.length; i++) {
    data.recommendation[i].className = 'cross-sell__item--suggestion';
  }

  data.buttons = [];

  for (var i=0; i<groupCount; i++) {
    data.buttons.push({index: i});
  }

  return {
    html: Mustache.render(templates.main, data, {item: templates.item}),
    groupCount: groupCount,
    currIndex: 0
  };
}

function __cross_sell_mount(el, data, templates) {
  var crossSell = _cross_sell_render(data, templates);
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

var _crossSellTemplates = null;

function _cross_sell_mount(el, data) {

  if (_crossSellTemplates) {
    return __cross_sell_mount(el, data, _crossSellTemplates);
  }

  var mainTemplatePromise = xhr.get(
    '/templates/cross-sell.mst'
  );

  var itemTemplatePromise = xhr.get(
    '/templates/cross-sell-item.mst'
  );

  Promise.all([mainTemplatePromise, itemTemplatePromise])
  .then(function(templates) {
    _crossSellTemplates = {
      main: templates[0],
      item: templates[1]
    };

    __cross_sell_mount(el, data, _crossSellTemplates);
  })
  .catch(function(err) {
    console.log(err);
  });
}

modules.register('cross-sell', {
    mount: _cross_sell_mount
});
