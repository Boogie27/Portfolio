const UserModel = require('../models/UserModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const bcrypt = require('bcrypt')
const cookies = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env








const LoginAdminUser = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)

    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }else{
        const exists = await UserModel.findOne({ email: input.email })
        if(!exists){
            return response.send({status: 'input-error', validationError: {email: '*Email does not exists'}})
        }
        // compare password
        const comparePassword = await bcrypt.compare(input.password, exists.password)
        if(!comparePassword){
            return response.send({status: 'error', message: '*Wrong email or password!'})
        }
        const loginUser = await UserModel.findOneAndUpdate({_id: exists._id}, {$set: { is_active: 1}}).exec()
        if(loginUser){
            let duration = input.rememberMe ? 365 : 1
            const token = generate_token(loginUser._id, env.SECRET_KEY, duration) // generate and sign a token
            return response.send({ status: 'ok', token: token, duration: duration})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})




// validate input fields
const validate_input = (input) => {
    let failed = false;
    let emailAlert = ''
    let passwordAlert = ''
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(input.email.length === 0){
        failed = true;
        emailAlert = `*Email field is required`
    } else if(!input.email.match(validRegex)){
        failed = true;
        emailAlert =`*Invalid email address`
    }
    if(input.password.length === 0){
        failed = true;
        passwordAlert = `*password field is required`
    }else if(input.password.length < 12){
        failed = true;
        passwordAlert = `Must be minimum of 12 characters`
    }else if(input.password.length > 20){
        failed = true;
        passwordAlert = `Must be maximum of 20 characters`
    }

    if(failed === true){
        return {
            email: emailAlert, password: passwordAlert, 
        }
    }else{
        return false
    }
}






const hashPassword = (password) => {
    const salt =  bcrypt.genSaltSync(5)
    const hash =  bcrypt.hashSync(password, salt)
    return hash
}




const generate_token = (string ='', secret_key='', duration='') => {
    const time = duration + 'd'
    return jwt.sign({string}, secret_key, { expiresIn: time})
}









module.exports = { 
    LoginAdminUser,
}