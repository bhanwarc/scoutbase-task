exports.up = async knex => {
    await knex.schema.createTable('movies', function(table) {
        table.increments('id').unsigned().primary();
        table.string('title').notNull();
        table.string('year').notNull();
        table.string('rating').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('movies');
};