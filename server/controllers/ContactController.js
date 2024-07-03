
const fs = require('fs');
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const ContactHeaderModel = require('../models/ContactHeaderModel')
require('dotenv').config()
const env = process.env






const UpdateContactHeader = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)
    // if(validation){
    //     return response.send({status: 'input-error', validationError: validation})
    // }
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







module.exports = { 
    UpdateContactHeader,
    FetchContactHeader,
    FetchClientContactMe,
}






