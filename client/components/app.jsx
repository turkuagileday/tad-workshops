

var React = require('react'),
    WorkshopSelector = require('./workshop-selector.jsx'),
    Api = require('../api');

module.exports = React.createClass({
  getInitialState: function() {
    return {initialized: false};
  },
  onChangeEmail: function(ev) {
    this.setState({participantEmail: ev.target.value});
  },
  login: function() {
    var self = this;
    this.setState({loading: true, error: null});
    var api = new Api(this.state.participantEmail, this.props.participantHash);
    api.me().then(function(user) {
      return api.workshops().then(function(allWorkshops) {
        self.setState({loading: false, initialized: true, user: user, workshops: allWorkshops});
      });
    }).fail(function(err) {
      self.setState({error: err, loading: false});
    }).done();

  },

  render: function() {
    return !this.state.initialized ? (
      <div className="large-4 columns">
        {this.state.error ? <p>Failed to load information, did you give the correct e-mail address?</p> : null}
        <label>Please enter your e-mail address:</label>
        <input type="email" onChange={this.onChangeEmail} />
        <button disabled={this.state.loading} onClick={this.login}>Log in</button>
      </div>
      ) : (
      <WorkshopSelector workshops={this.state.workshops} participant={this.state.user} />
      );
  }
});
