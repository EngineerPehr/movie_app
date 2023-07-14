// Imports
const service = require('./theaters.service')
const reduceProperties = require('../utils/reduce-properties')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

// Gets all theaters and formats it with movies
async function list (_req, res, _next) {
    // Calls service to get theaters
    const response = await service.list()
    // Format via reduceProperties
    const formattedTheaters = reduceProperties('theater_id', {
        'movie_id': ['movies', null, 'movie_id'],
        'title': ['movies', null, 'title'],
        'runtime_in_minutes': ['movies', null, 'runtime_in_minutes'],
        'rating': ['movies', null, 'rating'],
        'description': ['movies', null, 'description'],
        'image_id': ['movies', null, 'image_id'],
        'created_at': ['movies', null, 'created_at'],
        'updated_at': ['movies', null, 'updated_at'],
        'is_showing': ['movies_theaters', null, 'is_showing'],
        'theater_id': ['theaters', null, 'theater_id']
    })
    // Format applied to theaters
    const data = formattedTheaters(response)
    res.json({ data })
}

// Exports
module.exports = {
    list: [asyncErrorHandler(list)]
}