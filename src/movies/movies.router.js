const router = require('express').Router({ mergeParams: true })
const cors = require('cors')
const controller = require('./movies.controller')
const reviewsRouter = require('../reviews/reviews.router')
const theatersRouter = require('../theaters/theaters.router')


router
    .route('/:movieId/theaters')

router
    .route('/:movieId/reviews')

router
    .route('/:movieId')
    .get()
    .all()

router
    .route('/')
    .get()
    .all()