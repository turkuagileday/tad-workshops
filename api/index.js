var express = require('express'),
_ = require('underscore'),
uuid = require('node-uuid');

app = express();
app.use(require('body-parser')());

module.exports = app;



app.post('/participants', function(req, res, next) {
  var data = _.extend({hash: uuid.v4()}, req.body);
  var model = new req.app.parent.models.Participant(data);
  model.save().then(function(model) {
    res.send(201, model.toJSON());
  }, next);
});

app.get('/participants/:hash/:email', function(req, res, next) {
});
