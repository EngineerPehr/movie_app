const service = require('./theaters.service')
const reduceProperties = require('../utils/reduce-properties')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

async function list (_req, res, _next) {
    const response = await service.list()
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
    const data = formattedTheaters(response)
    res.json({ data })
}

module.exports = {
    list: [asyncErrorHandler(list)],
}