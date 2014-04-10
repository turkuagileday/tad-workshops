var React = require('react'),
    Api = require('../api'),
    _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    var workshops = _.groupBy(this.props.workshops, 'date');
    var createWorkshopRowCell = function(ws) {
      var inputName = ws.date + '_' + ws.slot;
      return <td><label><input type="radio" name={inputName} /> {ws.name}</label></td>;
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
