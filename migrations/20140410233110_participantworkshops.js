
exports.up = function(knex, Promise) {
  return knex.schema.createTable('participant_workshops', function(table) {
    table.string('slot');
    table.integer('workshop_id');
    table.integer('participant_id');
    table.increments('id').primary();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('participant_workshops');
};
