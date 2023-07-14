const knex = require('../db/connection')

function list (query) {
    if (query == 'true') {
        return knex('movies as m')
            .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
            .select('m.*')
            .where({ 'mt.is_showing': 1 })
            .groupBy('m.movie_id')
    } else {
        return knex('movies as m')
            .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
            .select('m.*')
            .groupBy('m.movie_id')
    }
}

function read (movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId })
        .first()
}

module.exports = {
    list,
    read
}