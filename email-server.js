var express = require('express');
var app = express();

app.engine('ejs', engine);

app.configure(function () {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
});


app.listen(app.get('port'));