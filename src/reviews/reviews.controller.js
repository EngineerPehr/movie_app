const service = require('./reviews.service')
const reduceProperties = require('../utils/reduce-properties')
const asyncErrorHandler = require('../errors/asyncErrorHandler')

const formattedReviews = reduceProperties('review_id', {
    'review_id': ['reviews', null, 'review_id'], 
    'content': ['reviews', null, 'content'], 
    'score': ['reviews', null, 'score'], 
    'created_at': ['reviews', null, 'created_at'], 
    'updated_at': ['reviews', null, 'updated_at'], 
    'critic_id': ['reviews', null, 'critic_id'], 
    'movie_id': ['reviews', null, 'movie_id'], 
    'critic': {
        'critic_id': ['critics', null, 'critic_id'], 
        'preferred_name': ['critics', null, 'preferred_name'], 
        'surname': ['critics', null, 'surname'], 
        'organization_name': ['critics', null, 'organization_name'], 
        'created_at': ['critics', null, 'created_at'], 
        'updated_at': ['critics', null, 'updated_at'], 
    }
})

const reviewExists = async (req, res, next) => {
    const reviewId = Number(req.params.reviewId)
    const review = await service.read(reviewId)
    if (review[0]) {
        res.locals.review = review[0]
        next()
    } else {
        next({
            status: 404,
            message: `Review ${reviewId} not found`
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
    const { data } = req.body
    const { review } = res.locals
    const updatedReview = {
        ...review,
        ...data,
        review_id: res.locals.review.review_id,
    }
    const response = await service.update(updatedReview)
    const finalData = formattedReviews(response)
    res.json({ finalData })
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