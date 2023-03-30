exports.up = async knex => {
    await knex.schema.createTable('crew_members', function(table) {
        table.increments('id').unsigned().primary();
        table.string('name').notNull();
        table.string('birthday').notNull();
        table.string('country').notNull();
        table.string('job').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('crew_members');
};