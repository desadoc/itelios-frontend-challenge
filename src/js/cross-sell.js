
function _cross_sell_hello() {
  alert('Hello, from cross-sell.js');
}

modules.register('cross-sell', {
    hello: _cross_sell_hello
});
