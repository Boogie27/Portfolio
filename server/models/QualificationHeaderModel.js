const mongoose = require('mongoose')



const QualificationHeaderSchema  = new mongoose.Schema({
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



const QualificationHeaderModel = mongoose.model("qualification_headers", QualificationHeaderSchema)

module.exports =  QualificationHeaderModel