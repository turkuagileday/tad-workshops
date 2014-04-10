
module.exports = function(app) {
  var ret = {};
  var Participant = ret.Participant = require('./participant')(app);
  var Participants = ret.Participants = app.db.Collection.extend({
    model: Participant
  });
  var Workshop = ret.Workshop = require('./workshop')(app);
  var Workshops = ret.Workshops = app.db.Collection.extend({
    model: Workshop
  });
  return ret;
};
