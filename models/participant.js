module.exports = function(app) {
  return app.db.Model.extend({
    tableName: 'participants',
    hasTimestamps: ['created_at', 'updated_at']
  });
};
