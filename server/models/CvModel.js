const mongoose = require('mongoose')



const CvSchema  = new mongoose.Schema({
    cv_title: {
        type: String,
        required: true
    },
    cv: {
        type: String,
        required: true
    },
    download_count: {
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



const CvModel = mongoose.model("cv", CvSchema)

module.exports =  CvModel