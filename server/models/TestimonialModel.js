const mongoose = require('mongoose')



const TestimonialSchema  = new mongoose.Schema({
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
    job_title: {
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
    rating: {
        type: Number,
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



const TestimonialModel = mongoose.model("testimonials", TestimonialSchema)

module.exports =  TestimonialModel