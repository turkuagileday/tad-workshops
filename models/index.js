
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
  var ParticipantWorkshop = ret.ParticipantWorkshop = require('./participant-workshop')(app);
  var ParticipantWorkshops = ret.ParticipantWorkshops = app.db.Collection.extend({
    model: ParticipantWorkshop
  });
  return ret;
};
