
exports.up = function(knex, Promise) {
  return knex.schema.createTable('workshops', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('date');
    table.string('max_attendees');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('workshops');
};
