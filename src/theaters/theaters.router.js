const router = require('express').Router({ mergeParams: true })
const cors = require('cors')
const controller = require('./theaters.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')
const corsGet = cors({ methods: 'GET' })

router
    .route('/')
    .get(corsGet, controller.list)
    .options(corsGet)
    .all(methodNotAllowed)

module.exports = router