const mongoose = require('mongoose')



const PortfolioHeaderSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    first_header: {
        type: String,
        required: true
    },
    second_header: {
        type: String,
    },
    is_featured: {
        type: Number,
        required: true
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



const PortfolioHeaderModel = mongoose.model("portfolio_headers", PortfolioHeaderSchema)

module.exports =  PortfolioHeaderModel