
var crossSell = modules.require('cross-sell');

function _xhr(method, url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.responseText);
        } else {
          reject(
            "Couldn't GET /api/products, status was: " + req.status.toString()
          );
        }
      }
    };
    req.open('GET', '/api/products');
    req.send();
  });
}

var xhr = {
  get: function(url) {
    return _xhr('GET', url)
  }
};

window.onload = function() {
  xhr.get('/api/products')
  .then(function(response) {
    var json = JSON.parse(response);
    crossSell.mount(
      document.getElementsByClassName('cross-sell-wrapper')[0],
      json[0].data
    );
  })
  .catch(function(err) {
    console.log(err);
  });
};
