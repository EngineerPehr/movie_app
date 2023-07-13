const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

const addCritic = mapProperties({
    'critic_id': 'critic.critic_id', 
    'preferred_name': 'critic.preferred_name', 
    'surname': 'critic.surname', 
    'organization_name': 'critic.organization_name', 
    'created_at': 'critic.created_at', 
    'updated_at': 'critic.updated_at', 
    }
)

const readCritic = async (critic_id) => {
    return knex('critics')
    .where({ critic_id })
    .first()
}

const setCritic = async (review) => {
    review.critic = await readCritic(review.critic_id)
    return review
}

function list () {
    return knex('reviews as r')
        .join('movies as m', 'm.movie_id', 'r.movie_id')
        .join('critics as c', 'c.critic_id', 'r.critic_id')
        .select('*')
        .then((data) => data.map(addCritic))
}

function read (reviewId) {
    return knex('reviews as r')
        .select('*')
        .where({ review_id: reviewId})
        .first()
    }
    
    function update (updatedReview) {
        return knex('reviews as r')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
        .then(() => read(updatedReview.review_id))
        .then(setCritic)
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