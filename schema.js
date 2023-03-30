const typeDefs = `
    type Movie {
        id:ID
        title: String
        year: String
        rating: String
        scoutbase_rating: String
        actors: [Actor]
    }
    type Actor {
        id:ID
        name: String
        birthday: String
        country: String
        type: String
        directors: [Actor]
    }
    type User {
        id:ID!
        name: String!
    }
    type AuthData {
        token: String !
        user: User!
    }
    type Query {
        movies: [Movie]
        actors: [Actor]
        login(username: String!, password: String!): AuthData!
    }
    type Mutation {
        createUser(username: String!, password: String!, name:String!): AuthData!
    }
`;

module.exports = typeDefs;