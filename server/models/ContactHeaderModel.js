const mongoose = require('mongoose')



const ContactHeaderSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    form_text: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    span: {
        type: String,
        required: true
    },
    project_count: {
        type: Number,
        required: true
    },
    review_count: {
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



const ContactHeaderModel = mongoose.model("contact_headers", ContactHeaderSchema)

module.exports =  ContactHeaderModel