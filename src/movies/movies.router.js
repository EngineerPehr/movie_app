const router = require('express').Router({ mergeParams: true })
const controller = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const reviewsRouter = require('../reviews/reviews.router')
const theatersRouter = require('../theaters/theaters.router')

router.use('/:movieId/theaters', theatersRouter)
router.use('/:movieId/reviews', controller.movieExists, reviewsRouter)
router
    .route('/:movieId')
    .get(controller.read)
    .all(methodNotAllowed)

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router