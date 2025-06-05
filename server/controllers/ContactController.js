
const fs = require('fs');
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const { SendMail } = require('../mailer/Mailer')
const UserModel = require('../models/UserModel')
const SettingsModel = require('../models/SettingsModel')
const ContactModel = require('../models/ContactModel')
const HtmlMessage = require('../mailer/ContactUsMailTemplate')
const ContactHeaderModel = require('../models/ContactHeaderModel')
require('dotenv').config()
const env = process.env







const UpdateContactHeader = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }
    const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const user_id = userToken.string._id
    const userExists = await UserModel.findOne({_id: user_id}).exec()
    if(!userExists){
        return response.send({status: 'error', error: 'Login user to perform this action'})
    }
    let exists = await ContactHeaderModel.findOne({user_id: user_id}).exec()
    if(exists){
        const updateContent = {
            title: input.title,
            span: input.span,
            text: input.text,
            header: input.header,
            form_text: input.formText,
            review_count: input.reviewCount,
            project_count: input.projectCount,
            is_featured: input.featured == true ? 1 : 0,
            updated_at: today()
        }
        const update = await ContactHeaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await ContactHeaderModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', contactHeader: updatedContent})
        }
    }else{
        const content = {
            user_id: user_id,
            title: input.title,
            span: input.span,
            text: input.text,
            header: input.header,
            form_text: input.formText,
            review_count: input.reviewCount,
            project_count: input.projectCount,
            is_featured: input.featured == true ? 1 : 0,
            created_at: today(),
            updated_at: today()
        }
        const contactHeader = await ContactHeaderModel.create(content)
        if(contactHeader){
            return response.send({status: 'ok', contactHeader: contactHeader})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})




const validate_input = (input) => {
    let titleAlert = ''
    let headerAlert = ''
    let spanAlert = ''
    let textAlert = ''
    let formTextAlert = ''
    let failed = false;

    if(input.title.length === 0){
        failed = true
        titleAlert = "*Title field is required"
    } else if(input.title.length < 3){
        failed = true
        titleAlert = "*Must be minimum of 3 characters"
    }else if(input.title.length > 50){
        failed = true
        titleAlert = "*Must be maximum of 50 characters"
    }
    if(input.header.length === 0){
        failed = true
        headerAlert = "*Header field is required"
    } else if(input.header.length < 3){
        failed = true
        headerAlert = "*Must be minimum of 3 characters"
    }else if(input.header.length > 50){
        failed = true
        headerAlert = "*Must be maximum of 50 characters"
    }
    if(input.span.length === 0){
        failed = true
        spanAlert = "*Span field is required"
    } else if(input.span.length < 3){
        failed = true
        spanAlert = "*Must be minimum of 3 characters"
    }else if(input.span.length > 50){
        failed = true
        spanAlert = "*Must be maximum of 50 characters"
    }
    if(input.formText.length === 0){
        failed = true
        formTextAlert = "*Form Text field is required"
    } else if(input.formText.length < 3){
        failed = true
        formTextAlert = "*Must be minimum of 3 characters"
    }else if(input.formText.length > 1000){
        failed = true
        formTextAlert = "*Must be maximum of 1000 characters"
    }
    if(input.text.length === 0){
        failed = true
        textAlert = "*Text field is required"
    } else if(input.span.length < 3){
        failed = true
        textAlert = "*Must be minimum of 3 characters"
    }else if(input.span.length > 1000){
        failed = true
        textAlert = "*Must be maximum of 1000 characters"
    }

    if(failed === true){
        return {
            title: titleAlert, header: headerAlert, 
            span: spanAlert, text: textAlert, formText: formTextAlert
        }
    }else{
        return false
    }
}




const FetchContactHeader = AsyncHandler(async (request, response) => {
    const { token } = request.params
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to view user about'})
    }
    const user_id = userToken.string._id
    const contactHeader = await ContactHeaderModel.findOne({user_id: user_id}).exec()
    if(contactHeader){
        return response.send({status: 'ok', contactHeader: contactHeader})
    }
    return response.send({status: 'empty', contactHeader: {}})
})



const FetchContactMessages = AsyncHandler(async (request, response) => {
    const { token } = request.params
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login to view contact messages'})
    }
    const contactMessages = await ContactModel.find().exec()
    if(contactMessages.length){
        return response.send({status: 'ok', contacts: contactMessages})
    }
    return response.send({status: 'empty', contacts: {}})
})




const DeleteContactMessage = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login to delete contact messages'})
        }
        const exists = await ContactModel.findOne({ _id: _id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Message does not exist or you need to login'})
        }
        const deleteMessage = await ContactModel.findByIdAndDelete(_id)
        if(deleteMessage){
            return response.send({status: 'ok', deleteMessage: deleteMessage})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({error: error})
    }
})




const OpenContactMessage = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login to see contact message'})
        }
        const exists = await ContactModel.findOne({ _id: _id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Message does not exist or you need to login'})
        }
        const updateContent = {
            is_seen: 1,
            updated_at: exists.is_seeen == 0 ? today() : exists.updated_at
        }
        const update = await ContactModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const message = await ContactModel.findOne({ _id: exists._id}).exec()
            return response.send({status: 'ok', updatedMessage: message})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({error: error})
    }
})





// ************* CLIENT SIDE ************

const FetchClientContactMe = AsyncHandler(async (request, response) => {
    try{
        const contactMe = await ContactHeaderModel.findOne({is_featured: 1}).exec()
        if(!contactMe){
            return response.send({status: 'ok', contactMe: null})
        }else{
            return response.send({status: 'ok', contactMe: contactMe})
        }
        
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})



const SendClientContactMessage = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const validation = validate_contact_input(input)
        if(validation){
            return response.send({status: 'input-error', validationError: validation})
        }
        const content = {
            is_seen: 0,
            name: input.name,
            email: input.email,
            phone: input.phone,
            country: input.country,
            message: input.message,
            created_at: today(),
            updated_at: today()
        }
        const contact = await ContactModel.create(content)
        if(contact){
            const settings = await SettingsModel.findOne({user_id: user_id}).exec()
            if(settings){
                if(settings.email && settings.app_name && settings.phone_one){
                    const sendEmail = sendMailToClient(request.body, settings)
                }
            }
            return response.send({status: 'ok'})
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})



const validate_contact_input = (input) => {
    let nameAlert = ''
    let emailAlert = ''
    let phoneAlert = ''
    let messageAlert = ''
    let countryAlert = ''
    let failed = false;
    const phoneRegex = /^[+]?[\s./0-9]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g // Regular expression for digits with optional + ( ) sign
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Regular expression for validating email

    if(input.name.length === 0){
        failed = true
        nameAlert = "*Name field is required"
    } else if(input.name.length < 3){
        failed = true
        nameAlert = "*Must be minimum of 3 characters"
    }else if(input.name.length > 50){
        failed = true
        nameAlert = "*Must be maximum of 50 characters"
    }

    if(input.email.length === 0){
        failed = true
        emailAlert = "*Email field is required"
    } else if(!emailRegex.test(input.email)){
        failed = true
        emailAlert = "*Invalid email format"
    }

    if(input.phone.length === 0){
        failed = true
        phoneAlert = "*Phone field is required"
    } else if(input.phone.length < 11){
        failed = true
        phoneAlert = "*Must be minimum of 11 characters"
    }else if(input.phone.length > 15){
        failed = true
        phoneAlert = "*Must be maximum of 15 characters"
    }else if(!phoneRegex.test(input.phone)){
        failed = true
        phoneAlert = "*Phone number is invalid"
    }
    if(input.country.length === 0){
        failed = true
        countryAlert = "*Country field is required"
    } else if(input.country.length < 3){
        failed = true
        countryAlert = "*Must be minimum of 3 characters"
    }else if(input.country.length > 50){
        failed = true
        countryAlert = "*Must be maximum of 50 characters"
    }
    if(input.message.length === 0){
        failed = true
        messageAlert = "*Message field is required"
    } else if(input.message.length < 3){
        failed = true
        messageAlert = "*Must be minimum of 3 characters"
    }else if(input.message.length > 5000){
        failed = true
        messageAlert = "*Must be maximum of 5000 characters"
    }

    
    if(failed === true){
        return {
            name: nameAlert, email: emailAlert, 
            phone: phoneAlert, message: messageAlert, country: countryAlert
        }
    }else{
        return false
    }
}




//  send email function
const sendMailToClient = (input, settings) => {
    string = {
        from: settings.email,
        to: input.email,
        subject: 'Contact Us',
        message: HtmlMessage(input.name, settings)
    }
    return SendMail(string)
}



module.exports = { 
    UpdateContactHeader,
    FetchContactHeader,
    FetchClientContactMe,
    FetchContactMessages,
    DeleteContactMessage,
    OpenContactMessage,
    SendClientContactMessage,
}






