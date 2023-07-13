// Imports
const router = require('express').Router({ mergeParams: true })
const controller = require('./reviews.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

// Specific review route
router
    .route('/:reviewId')
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

// General review route
router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed)

// Exports
module.exports = router