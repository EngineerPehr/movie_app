const knex = require('../db/connection')

function list () {
    return knex('reviews as r')
        .join('movies as m', 'm.movie_id', 'r.movie_id')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('*')
}

function read (reviewId) {
    return knex('reviews')
        .select('*')
        .where({ review_id: reviewId})
        .first()
}

function update (updatedReview) {
    return knex('reviews as r')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
}

function destroy (reviewId) {
    return knex('reviews')
        .where({ review_id: reviewId })
        .del()
}

module.exports = {
    list, 
    read, 
    update, 
    destroy, 
}