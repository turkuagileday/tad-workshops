var React = require('react'),
    Api = require('../api'),
    _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {workshopAttends: this.props.participantWorkshops};
  },
  onWorkshopChange: function(ev) {
    var obj = {};
    obj[ev.target.name] = ev.target.value;
    this.setState({
      workshopAttends: _.extend({},this.state.workshopAttends, obj)
    });
  },
  save: function(ev) {
    var api = new Api(this.props.participant.email, this.props.participant.hash);
    this.setState({saving: true});
    var self = this;
    api.saveParticipantWorkshops(this.state.workshopAttends).then(function() {
      self.setState({saving: false});
    }).fail(function() {
      alert('Failed to persist');
      self.setState({saving: false});
    });
  },
  render: function() {
    var comp = this;
    var workshops = _.groupBy(this.props.workshops, 'date');
    var createWorkshopRowCell = function(ws) {
      var inputName = ws.date + '_' + ws.slot;
      return (
          <td>
            <label>
              <input checked={comp.state.workshopAttends[inputName] == ws.id} disabled={ws.attendees == ws.max_attendees} type="radio" name={inputName} value={ws.id} onChange={comp.onWorkshopChange} /> <a target="_blank" href={ws.url}>{ws.name}</a> ({ws.attendees}/{ws.max_attendees})
            </label>
          </td>);
    };
    var createWorkshopTable = function(date) {
      var workshopsBySlot = _.groupBy(workshops[date], 'slot');
      var createWorkshopRow = function(slot) {
        return (
          <tr>
            <th>{slot}</th>
            {workshopsBySlot[slot].map(createWorkshopRowCell)}
          </tr>
          );
      };
      return <div>
        <h4>{date}</h4>
        <table>
          <thead>
            <tr><th>Time slot</th></tr>
          </thead>
          <tbody>
            {_.keys(workshopsBySlot).map(createWorkshopRow)}
          </tbody>
        </table>
      </div>;
    };
    return <div className="row">
      <h3>Workshops</h3>
      {_.keys(workshops).map(createWorkshopTable)}
      <button disabled={this.state.saving} onClick={this.save}>Save</button>
    </div>;
  }
});
