var Bookshelf = require('bookshelf'),
    Q = require('q');

var conf = require('./config');
var DB = Bookshelf.initialize(conf.database);

var Workshop = DB.Model.extend({
  tableName: 'workshops'
});

var workshops = [
  {name: 'Listening++', slot: 1, url: 'http://turkuagileday.fi/topics/#listening', date: '2014-05-12', max_attendees: 30},
  {name: 'The Agile-ish Github Flow', slot: 1, url: 'http://turkuagileday.fi/topics/#github-flow', date: '2014-05-12', max_attendees: 30},
  {name: 'Introduction to Retrospective Facilitation', slot: 1, url: 'http://turkuagileday.fi/topics/#retrospective-facilitation', date: '2014-05-12', max_attendees: 30},
  {name: 'Pitching Agile', slot: 2, url: 'http://turkuagileday.fi/topics/#pitching-agile', date: '2014-05-12', max_attendees: 30},
  {name: 'The Mikado Method', slot: 2, url: 'http://turkuagileday.fi/topics/#mikado-method', date: '2014-05-12', max_attendees: 30},
  {name: 'Test-driven development with Lego Robots', slot: 2, url: 'http://turkuagileday.fi/topics/#lego-robots', date: '2014-05-12', max_attendees: 30},
];

workshops.reduce(function(pr, ws) {
  return pr.then(function() {
    var model = new Workshop(ws);
    return model.save();
  });
}, Q()).then(function() {
  console.log('All workshops inserted');
  process.exit(0);
}, function(err) {
  console.error('Failed to insert', err);
  process.exit(1);
});
