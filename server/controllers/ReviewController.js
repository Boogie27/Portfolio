

const TestimonialModel = require('../models/TestimonialModel')
const { SendMail } = require('../mailer/Mailer')
const HtmlMessage = require('../mailer/TestimonialThankYouMailTemplate')
const AsyncHandler = require('express-async-handler')
const SettingsModel = require('../models/SettingsModel')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { UploadCropImage, RemoveFile } = require('../helper/Image')
const { Validate } = require('../helper/Validation')






const SubmitReview = AsyncHandler(async (request, response) => {
   try{
        let imageName = ''
        const input = request.body
        const validation = validate_add_testimonial_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
        const name = input.name.toLowerCase()
        const email = input.email.toLowerCase()
        let exists = await TestimonialModel.findOne({ email: email }).exec()
        if(exists){
            return response.send({status: 'input-error', validationError: { email: 'Portfolio has already been rated by this email!'}})
        }else{
            const uploades = await UploadCropImage({
                base64: input.image,
                extension: 'png',
                name: 'testimonial-image',
                destination:  path.join(__dirname, '../public/asset/image/users/')
            })
            if(uploades.status == 'error'){
                return response.send({status: 'error', message: uploades.error})
            }else if(uploades.status == 'ok'){
                imageName = uploades.imageName
            }
            const content = {
                name: name,
                email: email,
                rating: parseInt(input.rating),
                job_title: input.job_title,
                description: input.description,
                image: imageName,
                is_featured: 0,
                updated_at: today(),
                created_at: today(),
            }
            
            const testimonial = await TestimonialModel.create(content)
            if(testimonial){
                // send  mail to the user to thank them
                 const settings = await SettingsModel.findOne({email: 'anonyecharles@gmail.com'}).exec()
                if(settings){
                    const sendEmail = sendMailToClient(request.body, settings) // send out email  here
                }
                return response.send({status: 'ok'})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
   
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})







 // validate input
 const validate_add_testimonial_input = (input) => {
    let nameAlert = ''
    let jobTitleAlert = ''
    let emailAlert = ''
    let ratingAlert = ''
    let descriptionAlert = ''
    const content = [
        { field: 'name', input: input.name, maxLength: 50, minLength: 3, required: true },
        { field: 'job title', input: input.job_title, maxLength: 100, minLength: 3, required: true },
        { field: 'rating', input: input.rating, required: true },
        { field: 'email', input: input.email, email: true,  required: true },
        { field: 'description', input: input.description, maxLength: 2000, minLength: 3,  required: true }
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'name'){ nameAlert = validate.error }
            if(validate.field === 'email'){ emailAlert = validate.error}
            if(validate.field === 'job title'){ jobTitleAlert = validate.error}
            if(validate.field === 'rating'){  ratingAlert = validate.error }
            if(validate.field === 'description'){ descriptionAlert = validate.error }
            return false
        })
        return {
            name: nameAlert, jobTitle: jobTitleAlert,  rating: ratingAlert, description: descriptionAlert, email: emailAlert
        }
    }else{
        return 'success'
    }
}






//  send email function
const sendMailToClient = (input, settings) => {
    string = {
        from: settings.email,
        to: input.email,
        subject: 'Portfolio Revied',
        message: HtmlMessage(input, settings)
    }
    return SendMail(string)
}





module.exports = { 
    SubmitReview,
}

