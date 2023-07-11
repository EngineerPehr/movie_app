const service = require('./movies.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const movieExists = async (req, res, next) => {
    const { movieId } = req.params
    const movie = await service.read(movieId)
    movie ? (
        res.locals.movie = movie,
        next()
    ) : (
        next({
            status: 404,
            message: `Movie ${movieId} not found`
        })
    )
}

async function list (req, res, _next) {
    const query = req.query.is_showing
    const response = await service.list()
    const data = response.filter((query === 'true') ? ((item) => item.is_showing === true) : (() => true))
    res.json({ data })
}

function read (_req, res, _next) {
    const { movie: data } = res.locals
    res.json({ data })
}

module.exports = {
    list: [asyncErrorHandler(list)],
    read: [
        asyncErrorHandler(movieExists),
        read,
    ]
}