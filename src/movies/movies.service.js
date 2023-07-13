// Import
const knex = require('../db/connection')

// Queries database based on value of query parameter
function list (query) {
    // Movies that meet the query are returned
    if (query == 'true') {
        return knex('movies as m')
            .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
            .select('*')
            .where({ is_showing: 1 })
            .groupBy('m.movie_id')
    // All movies are returned
    } else {
        return knex('movies as m')
            .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
            .select('*')
            .groupBy('m.movie_id')
    }
}

// Returns movie that matches the given id
function read (movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId })
        .first()
}

// Exports
module.exports = {
    list,
    read
}