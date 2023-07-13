// Imports
const service = require('./movies.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

// Helper function that checks that given movie exists
const movieExists = async (req, res, next) => {
    // Id from request parameters
    const movieId = Number(req.params.movieId)
    // Service called to check id
    const movie = await service.read(movieId)
    if (movie) {
        // If movie exists, it is set to the response locals
        res.locals.movie = movie
        next()
    } else {
        // If movie doesn't exist, 404 error passed to error handler
        next({
            status: 404,
            message: `Cannot be found ${req.originalUrl}`
        })
    }
}

// Gets all movies according to query state
async function list (req, res, _next) {
    // Query from request
    const is_showing = req.query.is_showing
    // Service called with query as argument
    const response = await service.list(is_showing)
    res.json({ data: response })
}

// Gets specific movie data from response locals
function read (_req, res, _next) {
    const { movie } = res.locals
    res.json({ data: movie })
}

// Exports with error handling
module.exports = {
    list: [asyncErrorHandler(list)],
    read: [
        asyncErrorHandler(movieExists),
        read,
    ],
    movieExists
}