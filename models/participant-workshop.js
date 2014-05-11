module.exports = function(app) {
  return app.db.Model.extend({
    tableName: 'participant_workshops',
    participant: function() {
      return this.belongsTo(app.models.Participant);
    }
  });
};
