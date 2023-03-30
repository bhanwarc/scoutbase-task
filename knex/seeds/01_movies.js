
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('movies').del()
    .then(function () {
      // Inserts seed entries
      return knex('movies').insert(
        [
          {
              id: '1',
              title: "Movie-one",
              year: "2019",
              rating: "9.0"
          },
          {
              id: '2',
              title: "Movie-two",
              year: "2019",
              rating: "8.0"
          },
          {
              id: '3',
              title: "Movie-three",
              year: "2019",
              rating: "8.5"
          }
        ]
      );
    });
};
