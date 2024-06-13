const UserModel = require('../models/UserModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')





const LoginAdminUser = AsyncHandler(async (request, response) => {
    console.log('yes')
})



module.exports = { 
    LoginAdminUser,
}