const path = require('path');
const fs = require('fs');
const About = require('../models/AboutModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const { FileUpload, RemoveFile } = require('../helper/Image')






const UpdateUserAbout = AsyncHandler(async (request, response) => {
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
    let exists = await About.findOne({user_id: user_id}).exec()
    if(exists){
        const updateContent = {
            title: input.title,
            header: input.header,
            span: input.span,
            text: input.text,
            activity: input.activity,
            is_featured: input.featured == true ? 1 : 0,
            updated_at: today()
        }
        const update = await About.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await About.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', about: updatedContent})
        }
    }else{
        const content = {
            user_id: user_id,
            title: input.title,
            header: input.header,
            span: input.span,
            text: input.text,
            image: '',
            activity: input.activity,
            is_featured: input.featured == true ? 1 : 0,
            created_at: today(),
            updated_at: today()
        }
        const aboutUser = await About.create(content)
        if(aboutUser){
            return response.send({status: 'ok', about: aboutUser})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})



const validate_input = (input) => {
    let titleAlert = ''
    let headerAlert = ''
    let spanAlert = ''
    let textAlert = ''
    let activityAlert = ''
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
    if(input.activity.length === 0){
        failed = true
        activityAlert = "*Activity field is required"
    } else if(input.activity.length < 3){
        failed = true
        activityAlert = "*Must be minimum of 3 characters"
    }else if(input.activity.length > 500){
        failed = true
        activityAlert = "*Must be maximum of 500 characters"
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
            span: spanAlert, text: textAlert, activity: activityAlert
        }
    }else{
        return false
    }
}



const FetchUserAbout = AsyncHandler(async (request, response) => {
    const { token } = request.params
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to view user about'})
    }
    const user_id = userToken.string._id
    const userAbout = await About.findOne({user_id: user_id}).exec()
    if(userAbout){
        return response.send({status: 'ok', about: userAbout})
    }
    return response.send({status: 'empty', about: []})
})




const UpLoadUserImage = AsyncHandler(async (request, response) => {
    try{
        const size = 1000  
        const token = request.body.token
        const imageFile = request.files.image
        const types = ['jpg', 'png', 'jpeg', 'svg']
        const destination = path.join(__dirname, '../public/asset/image/users/');

        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', error: 'Login user to view user about'})
        }
        const user_id = userToken.string._id
        const userExists = await UserModel.findOne({_id: user_id}).exec()
        if(!userExists){
                return response.send({status: 'error', error: 'Login user to perform this action'})
        }
        const aboutExists = await About.findOne({user_id: user_id}).exec()
        if(!aboutExists){
            return response.send({status: 'error', error: 'Either user does not exists or you need to login'})
        }
        const upload = FileUpload({
            size: size,
            types: types,
            file: imageFile,
            name: 'user-image-',
            destination: destination
        })
        if(upload.status == true){ 
            const filePath = destination + aboutExists.image
            RemoveFile(filePath) // delete old existing image from image folder

            const update = await About.findOneAndUpdate({user_id: userExists._id}, {$set: {image: upload.newName}}).exec()
            return response.send({status: 'ok', imageName: upload.newName})
        }
        return response.send({status: 'error', error: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})



// ************* CLIENT SIDE ************

const FetchClientAbout = AsyncHandler(async (request, response) => {
    try{
        const about = await About.findOne({is_featured: 1}).exec()
        return response.send({status: 'ok', about: about})
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})




module.exports = { 
    FetchUserAbout,
    UpdateUserAbout,
    FetchClientAbout,
    UpLoadUserImage,
}