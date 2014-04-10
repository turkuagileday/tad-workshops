
exports.up = function(knex, Promise) {
  return knex.schema.table('workshops', function(table) {
    table.integer('slot');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.table('workshops', function(table) {
    table.dropColumn('slot');
  });
};
