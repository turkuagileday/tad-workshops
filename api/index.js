var express = require('express'),
_ = require('underscore'),
uuid = require('node-uuid');

app = express();
app.use(require('body-parser')());

module.exports = app;

app.use(function(req, res, next) {
  if (!req.header('X-API-Hash') || !req.header('X-API-Email')) return res.send(401);
  var model = new req.app.parent.models.Participant({hash: req.header('X-API-Hash'), email: req.header('X-API-Email')});
  model.fetch().then(function(model) {
    if (!model) return res.send(403);
    next();
  }, next);
});

app.post('/participants', function(req, res, next) {
  var data = _.extend({hash: uuid.v4()}, req.body);
  var model = new req.app.parent.models.Participant(data);
  model.save().then(function(model) {
    res.send(201, model.toJSON());
  }, next);
});

app.get('/participants/me', function(req, res, next) {
  res.send({message: 'foo'});
});

app.get('/participants/:hash/:email', function(req, res, next) {
});
