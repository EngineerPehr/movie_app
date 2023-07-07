const service = require('./movies.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const movieExists = (req, res, next) => {

}

async function list (req, res, _next) {
    const query = req.query.is_showing
    const response = await service.list()
    const data = response.filter((query === 'true') ? ((item) => item.is_showing === true) : (() => true))
    res.json({ data })
}

function read(movieId) {

}

module.exports = {
    list: [asyncErrorHandler(list)],

}