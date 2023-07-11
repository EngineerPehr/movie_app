const service = require('./movies.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const movieExists = async (req, res, next) => {
    const movieId = Number(req.params.movieId)
    const movie = await service.read(movieId)
    if (movie) {
        res.locals.movie = movie
        next()
    } else {
        next({
            status: 404,
            message: `Movie ${movieId} not found`
        })
    }
}

async function list (req, res, _next) {
    const is_showing = req.query.is_showing
    const response = await service.list(is_showing)
    res.json({ data: response })
}

function read (_req, res, _next) {
    const { movie } = res.locals
    res.json({ data: movie[0] })
}

module.exports = {
    list: [asyncErrorHandler(list)],
    read: [
        asyncErrorHandler(movieExists),
        read,
    ],
    movieExists
}