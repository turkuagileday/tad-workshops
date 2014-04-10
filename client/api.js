var Q = require('q'),
    superagent = require('superagent');

var Api = module.exports = function(email, hash) {
  this.email = email;
  this.hash = hash;
};

Api.prototype.request = function(url, meth) {
  var defer = Q.defer(), req;
  if (!meth) req = superagent.get('/api' + url);
  req.set('X-API-Email', this.email);
  req.set('X-API-Hash', this.hash);
  req.end(function(error, resp) {
    if (error) return defer.reject(error);
    if (resp.clientError) return defer.reject(new Error("Unable to request"));
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

