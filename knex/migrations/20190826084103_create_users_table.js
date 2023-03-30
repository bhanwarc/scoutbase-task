exports.up = async knex => {
    await knex.schema.createTable('movies', function(table) {
        table.increments('id').unsigned().primary();
        table.string('username').notNull();
        table.string('password').notNull();
        table.string('name').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('movies');
};