var express    = require('express');

var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/api/products', (req, res) => {
  res.sendFile(__dirname + '/data/products.json');
});

app.listen(8080, () => {
  console.log("App listening on port 8080.");
});
