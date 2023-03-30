
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('crew_members').del()
    .then(function () {
      // Inserts seed entries
      return knex('crew_members').insert([
        {
          id: '1',
          name: 'Member-1',
          birthday: '10-10-1984',
          country: 'India',
          job: 'actor'
        },
        {
            id: '2',
            name: 'Member-2',
            birthday: '10-10-1989',
            country: 'India',
            job: 'actor'
        },
        {
            id: '3',
            name: 'Member-3',
            birthday: '10-10-1989',
            country: 'India',
            job: 'actor'
        },
        {
            id: '4',
            name: 'Member-4',
            birthday: '10-10-1979',
            country: 'India',
            job: 'director'
        },
        {
            id: '5',
            name: 'Member-5',
            birthday: '10-10-1979',
            country: 'India',
            job: 'director'
        },
        {
          id: '6',
          name: 'Member-6',
          birthday: '10-10-1979',
          country: 'India',
          job: 'director'
        }
      ]);
    });
};
