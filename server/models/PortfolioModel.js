const mongoose = require('mongoose')



const PortfolioSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    
    image: {
        type: Array,
        default: [],
    },
    technologies: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        required: true
    },
    from_month: {
        type: String,
    },
    from_year: {
        type: Number,
    },
    to_month: {
        type: String,
    },
    to_year: {
        type: Number,
    },
    order: {
        type: Number,
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



const PortfolioModel = mongoose.model("portfolios", PortfolioSchema)

module.exports =  PortfolioModel




