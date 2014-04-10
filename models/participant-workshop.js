module.exports = function(app) {
  return app.db.Model.extend({
    tableName: 'participant_workshops'
  });
};
