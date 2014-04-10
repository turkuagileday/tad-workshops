
module.exports = function(app) {
  var ret = {};
  var Participant = ret.Participant = require('./participant')(app);
  var Participants = ret.Participants = app.db.Collection.extend({
    model: Participant
  });
  return ret;
};
