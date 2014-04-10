var express = require('express'),
_ = require('underscore'),
uuid = require('node-uuid'),
Q = require('q');

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
  var model = new req.app.parent.models.Participant({hash: req.header('X-API-Hash'), email: req.header('X-API-Email')});
  model.fetch().then(function(model) {
    res.send(model.toJSON());
  });
});

var fetchParticipantWorkshops = function(col, model) {
  return col.query(function(qb) {
    qb.where({participant_id: model.id});
  }).fetch();
};

app.get('/participants/me/workshops', function(req, res, next) {
  var model = new req.app.parent.models.Participant({hash: req.header('X-API-Hash'), email: req.header('X-API-Email')});
  model.fetch().then(function(model) {
    var col = new req.app.parent.models.ParticipantWorkshops();
    fetchParticipantWorkshops(col, model).then(function(col) {
      var ret = {};
      col.forEach(function(model) {
        ret[model.get('slot')] = model.get('workshop_id');
      });
      res.send(ret);
    }, next);
  });
});

app.put('/participants/me/workshops', function(req, res, next) {
  var model = new req.app.parent.models.Participant({hash: req.header('X-API-Hash'), email: req.header('X-API-Email')});
  model.fetch().then(function(model) {
    var col = new req.app.parent.models.ParticipantWorkshops();
    fetchParticipantWorkshops(col, model).then(function(col) {
      return col.reduce(function(pr, model) {
        return pr.then(function() {
          return model.destroy();
        });
      }, Q()).then(function() {
        return _.keys(req.body).reduce(function(pr, key) {
          return pr.then(function() {
            var m = new req.app.parent.models.ParticipantWorkshop({participant_id: model.id, workshop_id: req.body[key], slot: key});
            return m.save();
          });
        }, Q()).then(function() {
          res.send(200);
        });
      });
    }, next);
  });
});

app.get('/workshops', function(req, res, next) {
  var col = new req.app.parent.models.Workshops();
  col.fetch().then(function() {
    res.send(col.toJSON());
  }, next);
});

