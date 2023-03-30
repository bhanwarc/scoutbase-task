const knex = require('./knex/knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = '3YbjWyBDzHusLXqD';

const resolvers = {
    Movie:{
        actors(parent) {
            return getMoviesActors(parent.id);
        }
    },
    Actor:{
        directors(parent) {
            return getActorDirectors(parent.id);
        }
    },
    Query: {
        movies(root,args, context){
            return getMovies(context);
        },
        actors(){
            return getActors();
        },
        async login({username, password}){
            let user = await knex('users').where({username:username});
            if(!user){
                throw new Error('User does not exist');
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                throw new Error('Password is incorrect');
            }
            return getToken(user);
        }
    },
    Mutation: {
        createUser: async (parent, { username, password, name }, { knex }, info) =>{
            let isAlreadyExist = await knex('users').where({username:username}).pluck('username');
            if(!isAlreadyExist){
                const hashedPassword = await bcrypt.hash(password, 12);
                let user = knex('users').insert({username: username, password:hashedPassword, name:name}, [id, name, username]);
                return getToken(user);
            }else{
                throw new Error("User already exist");
            }
        }
    }
}

function getToken(user){
    const token = jwt.sign(
        { id: user.id, username: user.username},
        key,
        {
            expiresIn: '1h'
        },
    );
    return {id: user.id, token: token, tokenExpiration: 1, name:user.name};
}

function getMoviesActors(id) {
    return knex.select('crew_members.id', 'crew_members.name', 'crew_members.birthday', 'crew_members.country')
            .from('movies')
            .leftJoin('crew_members_movies', 'movies.id', 'crew_members_movies.movieid')
            .leftJoin('crew_members', 'crew_members.id', 'crew_members_movies.memberid')
            .where({'crew_members.job':'actor','movies.id':id});
}

async function getActorDirectors(id) {
    var movieIdList = await knex.select('movies.id')
                    .from('movies')
                    .leftJoin('crew_members_movies', 'movies.id', 'crew_members_movies.movieid')
                    .leftJoin('crew_members', 'crew_members.id', 'crew_members_movies.memberid')
                    .where({'crew_members.id':id}).pluck('movies.id');

    return await knex.select('crew_members.id', 'crew_members.name', 'crew_members.birthday', 'crew_members.country')
                    .from('movies')
                    .leftJoin('crew_members_movies', 'movies.id', 'crew_members_movies.movieid')
                    .leftJoin('crew_members', 'crew_members.id', 'crew_members_movies.memberid')
                    .where({'crew_members.job':'director'})
                    .whereIn('movies.id',movieIdList);
                    
            
}

async function getMovies(header){
    if(header.token){
        jwt.verify(header.token, key, function(err, decoded) {
            if(err){
                throw new Error("Invalid Token");
            }
            let user = knex('users').where({username:decoded.username});
            if(!user){
                throw new Error("Unauthorized");
            }
        });
        return knex('movies').select('*', knex.raw('ROUND( CAST(float8 (RANDOM() * (9.0 - 5.0) + 5.0) AS numeric), 1) AS scoutbase_rating'))
    }else{
        return knex('movies').select('*');
    }
}

function getActors(){
    return knex('crew_members').select('*').where({
        'job':'actor',
    });
}

module.exports = resolvers;