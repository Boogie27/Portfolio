const mongoose = require('mongoose')



const HomeBannerSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    name: {
        type: String,
        required: true
    },
    first_header: {
        type: String,
        required: true
    },
    second_header: {
        type: String,
        required: true
    },
    span_header: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    cv_link: {
        type: String,
        required: true
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



const HomeBannerModel = mongoose.model("home_banners", HomeBannerSchema)

module.exports =  HomeBannerModel