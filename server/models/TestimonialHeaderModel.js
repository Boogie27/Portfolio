const mongoose = require('mongoose')



const TestimonialHeaderSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    header: {
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



const TestimonialHeaderModel = mongoose.model("testimonial_headers", TestimonialHeaderSchema)

module.exports =  TestimonialHeaderModel