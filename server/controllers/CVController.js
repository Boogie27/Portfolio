const path = require('path');
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const CvModel = require('../models/CvModel')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const { UploadCropImage, RemoveFile, GetExtension } = require('../helper/Image')
const { Validate } = require('../helper/Validation')






// ************** ADD NEW CV *************
const AddNewCV = AsyncHandler(async (request, response) => {
    try {
        let imageName = ''
        const input = request.body
        const validation = validate_CV_input(input)
        if(validation != 'success'){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }

        const fileExtention = GetExtension(input.cv)
        if(fileExtention !== 'pdf'){
            return response.send({status: 'input-error', validationError: {cvAlert: '*PDF file type is required!'}})
        }
        const uploades = await UploadCropImage({
            base64: input.cv,
            extension: 'pdf',
            name: input.cv_title,
            destination:  path.join(__dirname, '../public/asset/files/cv/')
        })
        
        if(uploades.status == 'error'){
            return response.send({status: 'error', message: uploades.error})
        }else if(uploades.status == 'ok'){
            cvNewName = uploades.imageName
            console.log(cvNewName)
        }
        const content = { 
            cv_title: input.cv_title, 
            cv: cvNewName, 
            download_count: 0,
            is_featured: 0,
            updated_at: today(),
            created_at: today(),
        }
        const createContent = await CvModel.create(content)
        if(createContent){
            return response.send({status: 'ok', createCv: createContent})
        }
        return response.send({status: 'error', message: 'Oops!, Something went wront, try again!'})
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'Oops!, An error occurred', error: error.message })
    }
})







 // validate input
 const validate_CV_input = (input) => {
    let cvTitleAlert = ''
    let cvAlert = ''
    const content = [
        { field: 'cv title', input: input.cv_title, maxLength: 50, minLength: 3, required: true },
        { field: 'Upload Cv', input: input.cv,  required: true },
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'cv title'){ cvTitleAlert = validate.error }
            if(validate.field === 'Upload Cv'){ cvAlert = validate.error}
            return false
        })
        return { cvTitleAlert: cvTitleAlert, cvAlert: cvAlert }
    }else{
        return 'success'
    }
}





// fetch all cvs
const FetchUserCv = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const cvs = await CvModel.find().exec()

        if (cvs) {
            return response.send({ status: 'ok', cvs: cvs })
        }

        return response.send({ status: 'ok', cvs: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
})





// toggle user cv featured
const ToggleUserCvFeature = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await CvModel.findOne({ _id: _id }).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Cv does not exist or you need to login'})
    }
    const featured = exists.is_featured == 1 ? 0 : 1
    const update = await CvModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
    if(update){
        const cvFeature = await CvModel.findOne({ _id: _id })
        return response.send({status: 'ok', cvFeature: cvFeature})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})









// delete user cv
const DeleteCv = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await CvModel.findOne({ _id: _id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Cv does not exist or you need to login'})
    }
    if(exists.image){
        const destination = path.join(__dirname, '../public/asset/files/cv/');
        const filePath = destination + exists.image
        RemoveFile(filePath) // delete old existing image from image folder
    }

    const deleteCv = await CvModel.findByIdAndDelete({_id: _id})
    if(deleteCv){
        return response.send({status: 'ok', deleteCv: deleteCv})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})










module.exports = { 
   AddNewCV,
   DeleteCv,
   FetchUserCv,
   ToggleUserCvFeature,
}
