var express = require('express'),
    Bookshelf = require('bookshelf'),
    http = require('http'),
    browserify = require('browserify-middleware'),
    nunjucks = require('nunjucks'),
    _ = require('underscore');



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

app.get('/admin/:pass', function(req, res,next) {
  if (process.env.NODE_ENV === 'production' && req.param('pass') !== process.env.ADMIN_KEY) return res.send(403);
  var col = new req.app.models.Workshops();
  var col2 = new req.app.models.ParticipantWorkshops();
  col2.fetch({
    withRelated: ['participant']
  }).then(function(workshopParticipants) {
    col.fetch().then(function(workshops) {
      res.render('admin.html', {
        workshops: workshops.toJSON().map(function(ws) {
                     var f = function(one) {
                       return one.get('workshop_id') == ws.id;
                     };
                     return _.extend({}, ws, {
                       participants: workshopParticipants.filter(f).map(function(one) {
                                       return _.extend({}, one.toJSON(), {name: one.related('participant').get('name') });
                                     })
                     });
                   })
      });
    }, next);
  }, next);
});

app.get('/:hash', function(req, res, next) {
  var hash = req.param('hash');
  new app.models.Participant({hash: hash}).fetch().then(function(model) {
    if (!model) return next();
    res.render('app.html', model.toJSON());
  }, next);

});
app.get('/', function(req, res) {
  res.render('index.html');
});


var server = http.createServer(app);
server.listen(process.env.PORT || 1337, function() {
  console.log('Listening on http://localhost:%d', server.address().port);
});
