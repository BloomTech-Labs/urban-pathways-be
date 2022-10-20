exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('profiles', table => {
      table.string('id').notNullable().unique().primary()
      table.string('email')
      table.string('name')
      table.string('avatarUrl')
      table.timestamps(true, true)
    })
    .createTable('files', table => {
      table.increments('file_id');
      table.string('file_name', 200).notNullable().unique()
      table.string('file', 200).notNullable().unique()
      table.integer('id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profiles')
    })
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('files')
    .dropTableIfExists('profiles');
};
