const knex = require('../db/connection')

function list() {
    return knex('movies').select('*')
}

function read(movieId) {
    return knex('movies')
        .select('*')
        .where({ movie_id: movieId})
}

module.exports = {
    list,
    read
}