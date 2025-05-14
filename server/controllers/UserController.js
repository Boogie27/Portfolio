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
            return response.send({status: 'error', message: '*Wrong email or password credentials!'})
        }
        const loginUser = await UserModel.findOneAndUpdate({_id: exists._id}, {$set: { is_active: 1}}).exec()
        if(loginUser){
            const user = {
                _id: loginUser._id,
                first_name: loginUser.first_name,
                last_name: loginUser.last_name,
                middle_name: loginUser.middle_name,
                email: loginUser.email,
                address: loginUser.address,
                postcode: loginUser.postcode,
                town: loginUser.town,
                image: loginUser.image,
                phone_one: loginUser.phone_one,
                phone_two: loginUser.phone_two,
                country: loginUser.country,
                is_active: loginUser.is_active,
                admin_theme: loginUser.admin_theme,
                client_theme: loginUser.client_theme,
                created_at: loginUser.created_at,
                updated_at: loginUser.updated_at
            }
            let duration = input.rememberMe ? 365 : 1
            const token = generate_token(user, env.SECRET_KEY, duration) // generate and sign a token
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



const FetchLoginAdminUser = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const userToken = jwt.verify(token, env.SECRET_KEY)
    if(!userToken){
        return response.send({status: 'error', message: 'Login to access the admin dashboard!'})
    }
    const exists = await UserModel.findOne({ email: userToken.string.email, is_active: 1 })
    if(!exists){
        return response.send({status: 'error', message: 'Login admin to perform that action!'})
    }else{
        return response.send({status: 'ok', user: exists})
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})






const ToggleAdminUserAppTheme = AsyncHandler(async (request, response) => {
    const { token, theme } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY)
    if(!userToken){
        return response.send({status: 'error', message: 'Login to perform that action!'})
    }
    console.log(theme)
    const exists = await UserModel.findOne({ email: userToken.string.email, is_active: 1 })
    if(!exists){
        return response.send({status: 'error', message: 'Login admin to perform that action!'})
    }
    const update = await UserModel.findOneAndUpdate({_id: exists._id}, {$set: { admin_theme:  theme }}).exec()
   
    if(update){
        const user = await UserModel.findOne({ _id: exists._id, is_active: 1 })
        if(!user){
            return response.send({status: 'error', message: 'Login admin to perform that action!'})
        }
        return console.log(user.admin_theme)
        return response.send({status: 'ok', admin_theme: user.admin_theme})
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})




module.exports = { 
    LoginAdminUser,
    FetchLoginAdminUser,
    ToggleAdminUserAppTheme,
}