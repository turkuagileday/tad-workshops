
exports.up = function(knex, Promise) {
  return knex.schema.createTable('participants', function(table) {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('hash');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('participants');
};
