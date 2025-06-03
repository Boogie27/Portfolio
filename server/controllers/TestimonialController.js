

const TestimonialModel = require('../models/TestimonialModel')
const TestimonialHeaderModel = require('../models/TestimonialHeaderModel')
const RequestReviewModel = require('../models/RequestReviewModel')
const SettingsModel = require('../models/SettingsModel')
const { SendMail } = require('../mailer/Mailer')
const HtmlMessage = require('../mailer/TestimonialThankYouMailTemplate')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { UploadCropImage, RemoveFile } = require('../helper/Image')
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




// add new testimonial
const AddNewTestimonial = AsyncHandler(async (request, response) => {
    try{
        let imageName = ''
        const input = request.body
        const validation = validate_add_testimonial_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }

        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }

        const name = input.name.toLowerCase()
        const email = input.email.toLowerCase()
        let exists = await TestimonialModel.findOne({email: email}).exec()
        if(exists){
            return response.send({status: 'error', message: 'Testimonial already exist!'})
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
                return response.send({status: 'ok', testimonial: testimonial})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    
    }catch(error){
        return response.send({status: 'catch-error', catchError: error})
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



// update user testimonial
const UpdateUserTestimonial = AsyncHandler(async (request, response) => {
    try{
        let imageName = ''
        const input = request.body
        const validation = validate_add_testimonial_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }

        const user_id = userToken.string._id;
        let exists = await TestimonialModel.findOne({ _id: input._id, user_id: user_id }).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Testimonial deos not exist or Login!'})
        }else{
            if(!input.image || input.image === null){
                imageName =  exists.image
            }else{
                const imageExists = input.image.split(':')
                if(imageExists[0] == 'http' || imageExists[0] == 'https'){   
                    imageName = exists.image
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
                        if(exists.image){
                            const destination = path.join(__dirname, '../public/asset/image/users/');
                            const filePath = destination + exists.image
                            RemoveFile(filePath) // delete old existing image from image folder
                        }
                    }
                }
            }
            
           
            const updateContent = {
                name: input.name,
                email: input.email,
                rating: parseInt(input.rating),
                job_title: input.job_title,
                description: input.description,
                image: imageName,
                updated_at: today(),
            }
            const update = await TestimonialModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if(update){
                const updatedContent = await TestimonialModel.findOne({_id: exists._id}).exec()
                return response.send({status: 'ok', updateTestimonial: updatedContent})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    
    }catch(error){
        return response.send({status: 'catch-error', catchError: error})
    }
})




// fetch all testimonials
const FetchTestimonials = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id;
        const testimonials = await TestimonialModel.find({ user_id: user_id }).exec()

        if (testimonials) {
            return response.send({ status: 'ok', testimonials: testimonials })
        }

        return response.send({ status: 'ok', testimonials: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
})




// toggle user testimonial featured
const ToggleUserTestimonialFeature = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await TestimonialModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Testimonial does not exist or you need to login'})
    }
    const featured = exists.is_featured == 1 ? 0 : 1
    const update = await TestimonialModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
    if(update){
        const testimonial = await TestimonialModel.findOne({ _id: _id })
        return response.send({status: 'ok', testimonialFeature: testimonial})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})




// delete user testimonial
const DeleteTestimonial = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await TestimonialModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Testimonial does not exist or you need to login'})
    }
    if(exists.image){
        const destination = path.join(__dirname, '../public/asset/image/users/');
        const filePath = destination + exists.image
        RemoveFile(filePath) // delete old existing image from image folder
    }

    const deletedTestimonial = await TestimonialModel.findByIdAndDelete({_id, _id})
    if(deletedTestimonial){
        return response.send({status: 'ok', deletedTestimonial: deletedTestimonial})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})



























// ******************** CLIENT SECTION *****************************************************************************
// *****************************************************************************************************************

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




//   fetch client testimonial 
const FetchClientTestimonials = AsyncHandler(async (request, response) => {
    try{
        const testimonials = await TestimonialModel.find({is_featured: 1}).exec()
        if(testimonials.length){
            return response.send({status: 'ok', testimonials: testimonials})
        }
        return response.send({status: 'ok', testimonials: {}})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})






//   add new  client testimonial 
const AddNewClientTestimonial = AsyncHandler(async (request, response) => {
    try{
        let imageName = ''
        const input = request.body
        const validation = validate_add_testimonial_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
       
        const name = input.name.toLowerCase()
        const email = input.email.toLowerCase()
        let exists = await TestimonialModel.findOne({email: email}).exec()
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
                const requestReview = await RequestReviewModel.findOneAndUpdate({email: input.email}, {$set: update}).exec()
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






//   check if review token exists
const FetchClientReviewToken = AsyncHandler(async (request, response) => {
    try{
        const { token } = request.params
        const clientToken = await RequestReviewModel.findOne({ token: token }).exec()
        if(clientToken){
            return response.send({status: 'ok'})
        }
        return response.send({status: 'failed'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})






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
    FetchTestimonials,
    AddNewTestimonial,
    DeleteTestimonial,
    FetchClientReviewToken,
    UpdateTestimonialHeader,
    FetchTestimonialHeader,
    UpdateUserTestimonial,
    AddNewClientTestimonial,
    FetchClientTestimonials,
    ToggleUserTestimonialFeature,
    FetchClientTestimonialHeader,
}

