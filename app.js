var express = require('express'),
    Bookshelf = require('bookshelf'),
    http = require('http'),
    browserify = require('browserify-middleware'),
    nunjucks = require('nunjucks');



var app = express();

var conf = require('./config');
app.db = Bookshelf.initialize(conf.database);
app.models = require('./models')(app);

nunjucks.configure(__dirname + '/views', {
  autoescape: true,
  express   : app
});


app.get('/application.js', browserify('./client/index.js', {transform: ['reactify']}));
app.use('/api', require('./api'));
app.get('/:hash', function(req, res, next) {
  var hash = req.param('hash');
  new app.models.Participant({hash: hash}).fetch().then(function(model) {
    if (!model) return next();
    res.render('app.html', model.toJSON());
  });

});
app.get('/', function(req, res) {
  res.render('index.html');
});


var server = http.createServer(app);
server.listen(process.env.PORT || 1337, function() {
  console.log('Listening on http://localhost:%d', server.address().port);
});
