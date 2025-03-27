const SettingsModel = require('../models/SettingsModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { Validate } = require('../helper/Validation')







const UpdateAppUserSettings = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const validation = validate_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
    
        const user_id = userToken.string._id
        let exists = await SettingsModel.findOne({user_id: user_id}).exec()
        if(exists){
            const updateContent = {
                town: input.town,
                state: input.state,
                user_id: user_id,
                app_name: input.appName,
                email: input.email,
                email_title: input.emailTitle,
                address_title: input.addressTitle,
                address: input.address,
                postcode: input.postCode,
                country: input.country,
                phone_title: input.phoneTitle,
                phone_one: input.phoneOne,
                phone_two: input.phoneTwo,
                all_rights: input.allRights,
                updated_at: today(),
            }
            const update = await SettingsModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if(update){
                const updatedContent = await SettingsModel.findOne({_id: exists._id}).exec()
                return response.send({status: 'ok', updatedSettings: updatedContent})
            }
        }else{
            const content = {
                town: input.town,
                state: input.state,
                user_id: user_id,
                app_name: input.appName,
                email: input.email,
                email_title: input.emailTitle,
                address_title: input.addressTitle,
                address: input.address,
                postcode: input.postCode,
                country: input.country,
                all_rights: input.allRights,
                phone_title: input.phoneTitle,
                phone_one: input.phoneOne,
                phone_two: input.phoneTwo,
                updated_at: today(),
                created_at: today(),
            }
            const settings = await SettingsModel.create(content)
            if(settings){
                return response.send({status: 'ok', settings: settings})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error) {
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }
})




 // validate input
 const validate_input = (input) => {
    let appNameAlert = ''
    let emailTitleAlert = ''
    let emailAlert = ''
    let addressTitleAlert = ''
    let addressAlert = ''
    let postcodeAlert = ''
    let townAlert = ''
    let stateAlert = ''
    let countryAlert = ''
    let phoneTitleAlert = ''
    let phoneOneAlert = ''
    let phoneTwoAlert = ''
    let allRightsAlert = ''

    const content = [
        { field: 'app name', input: input.appName,  maxLength: 50,  minLength: 3, required: true },
        { field: 'email', input: input.email,  email: true, required: true },
        { field: 'email title', input: input.emailTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'phone title', input: input.phoneTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'phone one', input: input.phoneOne, required: true },
        { field: 'address title', input: input.addressTitle,  maxLength: 50,  minLength: 3, required: true },
        { field: 'address', input: input.address,  maxLength: 100,  minLength: 3, required: true },
        { field: 'postcode', input: input.postCode,  maxLength: 30,  minLength: 3, required: true },
        { field: 'town', input: input.town,  maxLength: 100,  minLength: 3, required: true },
        { field: 'state', input: input.state,  maxLength: 100,  minLength: 3},
        { field: 'country', input: input.country,  maxLength: 50,  minLength: 3, required: true },
        { field: 'all rights', input: input.allRights,  maxLength: 50,  minLength: 3, required: true },
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'app name'){ appNameAlert = validate.error}
            if(validate.field === 'email'){ emailAlert = validate.error}
            if(validate.field === 'email title'){ emailTitleAlert = validate.error}
            if(validate.field === 'address title'){ addressTitleAlert = validate.error}
            if(validate.field === 'address'){ addressAlert = validate.error}
            if(validate.field === 'postcode'){ postcodeAlert = validate.error}
            if(validate.field === 'town'){ townAlert = validate.error}
            if(validate.field === 'state'){ stateAlert = validate.error}
            if(validate.field === 'country'){ countryAlert = validate.error}
            if(validate.field === 'phone title'){ phoneTitleAlert = validate.error}
            if(validate.field === 'phone one'){ phoneOneAlert = validate.error}
            if(validate.field === 'phone two'){ phoneTwoAlert = validate.error}
            if(validate.field === 'all rights'){ allRightsAlert = validate.error}
            return false
        })
        return {
            appName: appNameAlert, email: emailAlert, emailTitle: emailTitleAlert, addressTitle: addressTitleAlert,
            address: addressAlert, postcode: postcodeAlert, town: townAlert, country: countryAlert, phoneTitle: phoneTitleAlert,
            phoneOne: phoneOneAlert, phoneTwo: phoneTwoAlert, state: stateAlert, allRights: allRightsAlert,
        }
    }else{
        return 'success'
    }
}









//   fetch client testimonial 
const FetchAppUserSettings = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id;
        const settings = await SettingsModel.findOne({ user_id: user_id }).exec()

        if (settings) {
            return response.send({ status: 'ok', settings: settings })
        }

        return response.send({ status: 'ok', settings: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
})














// ****************** CLIENT FOOTER SECTION *********************
//   fetch client footer
const FetchAppClientSettings = AsyncHandler(async (request, response) => {
    try{
        const footerSettings = await SettingsModel.findOne().exec()
        if(footerSettings){
            return response.send({status: 'ok', footerSettings: footerSettings})
        }
        return response.send({status: 'ok', footerSettings: {}})
    }catch(error){
        return response.send({status: 'error', message: error})
    }
})







module.exports = { 
    UpdateAppUserSettings,
    FetchAppUserSettings,
    FetchAppClientSettings,
}