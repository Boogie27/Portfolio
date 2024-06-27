const mongoose = require('mongoose')



const ServiceHeaderSchema  = new mongoose.Schema({
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



const ServiceHeaderModel = mongoose.model("service_headers", ServiceHeaderSchema)

module.exports =  ServiceHeaderModel