const mongoose = require('mongoose')



const SkillsSchema  = new mongoose.Schema({
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
        type: String,
    },
    rating: {
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



const SkillsModel = mongoose.model("skills", SkillsSchema)

module.exports =  SkillsModel