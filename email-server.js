var express = require('express');
var postmark = require("postmark")(process.env['POSTMARK_API_KEY']);
var path = require('path');
var ejs = require('ejs');
var engine = require('ejs-locals');
var fs = require('fs');
var app = express();

app.engine('ejs', engine);

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.logger());

app.use(express.bodyParser());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

var htmlTemplateData = fs.readFileSync(path.join(__dirname, '/views/email-template.ejs'), 'utf8');
var htmlTemplateFunction = ejs.compile(htmlTemplateData, {});

app.get('/confirm', function (req, res) {
  console.log(req.query);
  res.render('confirm', {
    email: decodeURIComponent(req.query.email),
    items: JSON.parse(req.query.items)
  });
});

app.post('/send', function (req, res) {
  var items = JSON.parse(req.body.items);
  var recipientEmail = decodeURIComponent(req.body.email);

  postmark.send({
    "From": "do-not-reply@email.appmaker.mozillalabs.com",
    "To": recipientEmail,
    "Subject": process.env['EMAIL_SUBJECT'],
    "HtmlBody": htmlTemplateFunction({
      email: recipientEmail,
      items: items,
      server: req.headers.host
    })
  }, function(error, success) {
    if(error) {
      console.error("Unable to send via postmark: " + error.message);
      return;
    }
    console.info("Sent to postmark for delivery");
  });

  res.json({}, 200);

});



app.listen(app.get('port'));