const mongoose = require('mongoose')



const userSchema  = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: true
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
        required: true
    },
    phone_one: {
        type: String,
        required: true
    },
    phone_two: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    country: {
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



const UserModel = mongoose.model("users", userSchema)

module.exports =  UserModel