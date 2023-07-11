const knex = require('../db/connection')

function read (reviewId) {
    return knex('reviews')
        .select('*')
        .where({ review_id: reviewId})
}

function update (updatedReview) {
    return knex('reviews')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
}

function destroy (review_id) {
    return knex('reviews')
        .where({ review_id })
        .del()
}

module.exports = {
    read, 
    update, 
    destroy, 
}