const service = require('./reviews.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const reviewExists = async (req, res, next) => {
    const reviewId = Number(req.params.reviewId)
    const review = await service.read(reviewId)
    if (review) {
        res.locals.review = review
        next()
    } else {
        next({
            status: 404,
            message: `Cannot be found: ${req.originalUrl}`
        })
    }
}

async function list (req, res, _next) {
    const movieId = Number(req.params.movieId)
    const response = await service.list()
    const data = response.filter((movieId) ? ((item) => item.movie_id === movieId) : (() => true))
    res.json({ data })
}

async function update (req, res, _next) {
    const { review } = res.locals
    const { data } = req.body
    const updatedReview = {
        ...review,
        ...data,
        review_id: review.review_id,
    }
    const response = await service.update(updatedReview)
    res.json({ data: response })
}

async function destroy (_req, res, _next) {
    const reviewId = res.locals.review.review_id
    const response = await service.destroy(reviewId)
    if (response) res.sendStatus(204)
}

module.exports = {
    list: [
        asyncErrorHandler(list)
    ], 
    update: [
        asyncErrorHandler(reviewExists),
        update
    ], 
    delete: [
        asyncErrorHandler(reviewExists),
        destroy
    ], 
}