
var crossSell = modules.require('cross-sell');

$(window).on('load', function() {
  $.ajax('/api/products')
  .done(function(res) {
    crossSell.mount($('.cross-sell-wrapper'), res[0].data);
  });
});
