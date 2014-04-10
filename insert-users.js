var Bookshelf = require('bookshelf'),
    Q = require('q'),
    uuid = require('node-uuid'),
    Mailgun = require('mailgun').Mailgun;


var conf = require('./config');
var DB = Bookshelf.initialize(conf.database);

var Participant = DB.Model.extend({
  tableName: 'participants'
});

var model = new Participant({email: process.argv[2], name: process.argv[3], hash: uuid.v4()});
model.save().then(function() {
  if (process.env.MAILGUN_API_KEY) {
    var mg = new Mailgun(process.env.MAILGUN_API_KEY);
    mg.sendText('Turku Agile Day <info@turkuagileday.fi>', model.get('email'), 'Choose your workshops', 'Hi there!\nYou can choose in which workshops to participate by following the following link: http://localhost:1337/' + model.get('hash') + '\n\nBest regards,\nTurku Agile Day Organizers', function() {
      console.log('Check your email for instructions');
      process.exit(0);
    });
  } else {
    console.log('Login at http://localhost:1337/%s', model.get('hash'));
    process.exit(0);
  }
});
