if (process.env.USER) require('dotenv').config()
const express = require('express')
const moviesRouter = require('./movies/movies.router')
const reviewsRouter = require('./reviews/reviews.router')
const theatersRouter = require('./theaters/theaters.router')
const app = express()

app.use('/movies', moviesRouter)

module.exports = app
