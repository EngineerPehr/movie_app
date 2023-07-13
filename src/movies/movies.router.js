// Imports
const router = require('express').Router({ mergeParams: true })
const controller = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const reviewsRouter = require('../reviews/reviews.router')
const theatersRouter = require('../theaters/theaters.router')

// Nested routes for theaters and reviews
router.use('/:movieId/theaters', controller.movieExists, theatersRouter)
router.use('/:movieId/reviews', controller.movieExists, reviewsRouter)

// Movie-specific route
router
    .route('/:movieId')
    .get(controller.read)
    .all(methodNotAllowed)

// General movies route
router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router