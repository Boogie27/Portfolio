const mongoose = require('mongoose')



const SettingsSchema  = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    app_name: {
        type: String,
        required: true
    },
    email_title: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_title: {
        type: String,
        required: true
    },
    phone_one: {
        type: String,
        required: true
    },
    phone_two: {
        type: String,
    },
    address: {
        type: String,
        required: true
    },
    address_title: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    state: {
        type: String,
    },
    country: {
        type: String,
        required: true
    },
    all_rights: {
        type: String,
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



const SettingsModel = mongoose.model("settings", SettingsSchema)

module.exports =  SettingsModel