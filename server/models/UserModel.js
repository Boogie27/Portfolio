const mongoose = require('mongoose')



const userSchema  = new mongoose.Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    middle_name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    phone_one: {
        type: String,
    },
    phone_two: {
        type: String,
    },
    address: {
        type: String,
    },
    postcode: {
        type: String,
    },
    town: {
        type: String,
    },
    country: {
        type: String,
    },
    admin_theme: {
        type: String,
    },
    client_theme: {
        type: String,
    },
    token: {
        type: String,
        required: true
    },
    is_active: {
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



const UserModel = mongoose.model("users", userSchema)

module.exports =  UserModel