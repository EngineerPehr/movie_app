const router = require('express').Router({ mergeParams: true })
const cors = require('cors')
const controller = require('./movies.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const reviewsRouter = require('../reviews/reviews.router')
const theatersRouter = require('../theaters/theaters.router')

const corsGet = cors({ methods: 'GET' })

router.use('/:movieId/theaters', theatersRouter)

router.use('/:movieId/reviews', reviewsRouter)

router
    .route('/:movieId')
    .get(corsGet, controller.read)
    .options(corsGet)
    .all(methodNotAllowed)

router
    .route('/')
    .get(corsGet, controller.list)
    .options(corsGet)
    .all(methodNotAllowed)

module.exports = router