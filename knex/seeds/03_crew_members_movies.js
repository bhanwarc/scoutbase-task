
exports.seed = function(knex) {
  return knex('crew_members_movies').del()
    .then(function () {
      return knex('crew_members_movies').insert([
        {
          id:1,
          movieid:1,
          memberid:1
        },
        {
            id:2,
            movieid:1,
            memberid:2
        },
        {
            id:3,
            movieid:2,
            memberid:2
        },
        {
          id:4,
          movieid:2,
          memberid:3
        },
        {
          id:5,
          movieid:3,
          memberid:1
        },
        {
          id:6,
          movieid:3,
          memberid:3
        },
        {
          id:7,
          movieid:1,
          memberid:4
        },
        {
          id:8,
          movieid:2,
          memberid:5
        },
        {
          id:9,
          movieid:3,
          memberid:6
        }
      ]);
    });
};
