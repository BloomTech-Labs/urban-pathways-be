/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
  .createTable('documents', function(table){
    table.string('url');
    table.string('document');
    table.string('doucment_link');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};



/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists('documents');

};
