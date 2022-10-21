/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('files', table => {
      table.increments('file_id')
      table.string('fileName', 200).notNullable().unique()
      table.string('fileTitle', 200).notNullable().unique()
      table.string('s3URL', 200).notNullable().unique()
      table.integer('id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('files');
};
