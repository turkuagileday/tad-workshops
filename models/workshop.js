module.exports = function(app) {
  return app.db.Model.extend({
    tableName: 'workshops',
    hasTimestamps: ['created_at', 'updated_at']
  });
};
