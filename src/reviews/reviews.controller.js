// Imports
const service = require('./reviews.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

// Helper function that checks that a specific review exists
const reviewExists = async (req, res, next) => {
    // ID from request parameters
    const reviewId = Number(req.params.reviewId)
    // Service called to check for review
    const review = await service.read(reviewId)
    if (review) {
        // If review exists, response locals are updated
        res.locals.review = review
        next()
    } else {
        // If review doesn't exist, error is passed to error handler
        next({
            status: 404,
            message: `Cannot be found: ${req.originalUrl}`
        })
    }
}

// Gets all reviews, then filters them based on movie ID
async function list (req, res, _next) {
    // Movie ID from request parameters
    const movieId = Number(req.params.movieId)
    // Service called for complete data
    const response = await service.list()
    // Data filtered by movie ID if it exists
    const data = response.filter((movieId) ? ((item) => item.movie_id === movieId) : (() => true))
    res.json({ data })
}

// Updates the given review
async function update (req, res, _next) {
    // Review from response locals
    const { review } = res.locals
    // New data from request body
    const { data } = req.body
    // Object containing updated data
    const updatedReview = {
        ...review,
        ...data,
        review_id: review.review_id,
    }
    // Service called to update review
    const response = await service.update(updatedReview)
    res.json({ data: response })
}

// Deletes the specified review
async function destroy (_req, res, _next) {
    // Review ID from response locals
    const reviewId = res.locals.review.review_id
    // Service called to delete review
    const response = await service.destroy(reviewId)
    // 204 status returned if successful
    if (response) res.sendStatus(204)
}

// Exports
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