var Q = require('q'),
    superagent = require('superagent');

var Api = module.exports = function(email, hash) {
  this.email = email;
  this.hash = hash;
};

Api.prototype.request = function(url, meth, data) {
  var defer = Q.defer(), req;
  if (!meth) req = superagent.get('/api' + url);
  if (meth === 'PUT') {
    req = superagent.put('/api' + url)
                    .send(data);
  }
  req.set('X-API-Email', this.email);
  req.set('X-API-Hash', this.hash);
  req.end(function(error, resp) {
    if (error) return defer.reject(error);
    if (resp.clientError || resp.serverError) return defer.reject(new Error("Unable to request"));
    defer.resolve(resp.body);
  });
  return defer.promise;
};

Api.prototype.me = function() {
  return this.request('/participants/me');
};

Api.prototype.workshops = function() {
  return this.request('/workshops');
};

Api.prototype.participantWorkshops = function() {
  return this.request('/participants/me/workshops');
};

Api.prototype.saveParticipantWorkshops = function(data) {
  return this.request('/participants/me/workshops', 'PUT', data);
};

