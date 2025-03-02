

const TestimonialModel = require('../models/TestimonialHeaderModel')
const TestimonialHeaderModel = require('../models/TestimonialHeaderModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { FileUpload, RemoveFile } = require('../helper/Image')
const { Validate } = require('../helper/Validation')






const UpdateTestimonialHeader = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const validation = validate_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }
    
        const user_id = userToken.string._id
        let exists = await TestimonialHeaderModel.findOne({user_id: user_id}).exec()
        if(exists){
            const updateContent = {
                title: input.title,
                header: input.header,
                is_featured: input.featured ? 1 : 0,
                updated_at: today()
            }
            const update = await TestimonialHeaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if(update){
                const updatedContent = await TestimonialHeaderModel.findOne({_id: exists._id}).exec()
                return response.send({status: 'ok', testimonialHeader: updatedContent})
            }
        }else{
            const content = {
                user_id: user_id,
                title: input.title,
                header: input.header,
                is_featured: input.featured ? 1 : 0,
                updated_at: today(),
                created_at: today(),
            }
            const newHeader = await TestimonialHeaderModel.create(content)
            if(newHeader){
                return response.send({status: 'ok', testimonialHeader: newHeader})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({status: 'catch-error', catchError: error})
    }
})





 // validate input
 const validate_input = (input) => {
    let titleAlert = ''
    let headerAlert = ''
    const content = [
        {
            field: 'title',
            input: input.title,
            maxLength: 50,
            minLength: 3,
            required: true,
        },
        {
            field: 'header',
            input: input.header,
            maxLength: 50,
            minLength: 3,
            required: true,
        }
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){
                titleAlert = validate.error
            }
            if(validate.field === 'header'){
                headerAlert = validate.error
            }
            return false
        })
        return {
            title: titleAlert, header: headerAlert, 
        }
    }else{
        return 'success'
    }
}






// fetch testimonial headert
const FetchTestimonialHeader = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id;
        const testimonialHeader = await TestimonialHeaderModel.findOne({ user_id: user_id }).exec()

        if (testimonialHeader) {
            return response.send({ status: 'ok', testimonialHeader: testimonialHeader })
        }

        return response.send({ status: 'ok', testimonialHeader: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
});










// ******************** CLIENT SECTION ******************
//   fetch client testimonial header
const FetchClientTestimonialHeader = AsyncHandler(async (request, response) => {
    try{
        const testimonialHeader = await TestimonialHeaderModel.findOne({is_featured: 1}).exec()
        if(testimonialHeader){
            return response.send({status: 'ok', testimonialHeader: testimonialHeader})
        }
        return response.send({status: 'ok', testimonialHeader: {}})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})





module.exports = { 
    UpdateTestimonialHeader,
    FetchTestimonialHeader,
    FetchClientTestimonialHeader,
}

