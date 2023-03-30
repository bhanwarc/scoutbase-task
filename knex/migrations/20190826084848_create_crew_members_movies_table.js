exports.up = async knex => {
    await knex.schema.createTable('crew_members_movies', function(table) {
        table.increments('id').unsigned().primary();
        table.integer('movieid').unsigned();
        table.integer('memberid').unsigned();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('crew_members_movies');
};