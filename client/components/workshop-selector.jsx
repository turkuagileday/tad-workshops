var React = require('react'),
    Api = require('../api'),
    _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  onWorkshopChange: function(ev) {
    var obj = {};
    obj[ev.target.name] = ev.target.value;
    this.setState({
      workshopAttends: _.extend({},this.state.workshopAttends, obj)
    });
  },
  save: function(ev) {
    console.log(this.state.workshopAttends);
  },
  render: function() {
    var comp = this;
    var workshops = _.groupBy(this.props.workshops, 'date');
    var createWorkshopRowCell = function(ws) {
      var inputName = ws.date + '_' + ws.slot;
      return <td><label><input type="radio" name={inputName} value={ws.id} onChange={comp.onWorkshopChange} /> <a target="_blank" href={ws.url}>{ws.name}</a></label></td>;
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
      <button onClick={this.save}>Save</button>
    </div>;
  }
});
