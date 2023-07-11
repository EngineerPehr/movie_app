const service = require('./reviews.service')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const reviewExists = async (req, res, next) => {
    const { reviewId } = req.params
    const review = await service.read(reviewId)
    if (review) {
        res.locals.review = review
        next()
    } else {
        next({
            status: 404,
            message: `Review ${reviewId} not found`
        })
    }
}

async function update (req, res, _next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: res.locals.review.review_id,
    }
    const data = await service.update(updatedReview)
    res.json({ data })
}

async function destroy (_req, res, _next) {
    const id = res.locals.review.review_id
    const response = await service.destroy(id)
    if (response) res.sendStatus(204)
}

module.exports = {
    update: [
        asyncErrorHandler(reviewExists),
        update
    ],
    delete: [
        asyncErrorHandler(reviewExists),
        destroy
    ],
}