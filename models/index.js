module.exports = function(app) {
  var ret = {};
  ret.Participant = require('./participant')(app);
  return ret;
};
