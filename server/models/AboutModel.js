const mongoose = require('mongoose')



const AboutSchema  = new mongoose.Schema({
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
        required: true
    },
    span: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    text: {
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



const AboutModel = mongoose.model("abouts", AboutSchema)

module.exports =  AboutModel