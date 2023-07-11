const router = require('express').Router({ mergeParams: true })
const cors = require('cors')
const controller = require('./reviews.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const corsAllowed = cors({ methods: [ 'PUT', 'DELETE' ] })

router
    .route('/:reviewId')
    .put(corsAllowed, controller.update)
    .delete(corsAllowed, controller.delete)
    .options(corsAllowed)
    .all(methodNotAllowed)

router
    .route('/')
    .all(methodNotAllowed)

module.exports = router