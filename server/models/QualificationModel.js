const mongoose = require('mongoose')



const QualificationSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    title: {
        type: String,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
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



const QualificationModel = mongoose.model("qualificatons", QualificationSchema)

module.exports =  QualificationModel