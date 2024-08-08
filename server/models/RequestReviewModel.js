const mongoose = require('mongoose')



const RequestReviewSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    is_completed: {
        type: Number,
        required: true
    },
    completed_at: {
        type: Date,
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
})



const RequestReviewModel = mongoose.model("request_reviews", RequestReviewSchema)

module.exports =  RequestReviewModel