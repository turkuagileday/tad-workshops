/**
 * @jsx React.DOM
 */

var App = require('./components/app.jsx'),
    React = require('react');

window.startApplication = function(hash) {
  React.renderComponent(<App participantHash={hash} />, document.getElementById('application'));
};
