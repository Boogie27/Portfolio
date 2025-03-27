const path = require('path');
const fs = require('fs');
require('dotenv').config()
const env = process.env
const formidable = require('formidable');
const jwt = require('jsonwebtoken')
const HomeBannerModel = require('../models/HomeBannerModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const { FileUpload, RemoveFile } = require('../helper/Image')










const AddHomeBanner = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }
    
    let exists = await HomeBannerModel.findOne({user_id: input.user_id}).exec()
    if(exists){
        const updateContent = {
            name: input.name,
            span_header: input.spanHeader,
            cv_link: input.cvLink,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            description: input.description,
            updated_at: today()
        }
        const update = await HomeBannerModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await HomeBannerModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', newBanner: updatedContent})
        }
    }else{
        const content = {
            image: '',
            name: input.name,
            user_id: input.user_id,
            span_header: input.spanHeader,
            cv_link: input.cvLink,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            description: input.description,
            is_featured: 0,
            created_at: today(),
            updated_at: today()
        }
        const newBanner = await HomeBannerModel.create(content)
        if(newBanner){
            return response.send({status: 'ok', newBanner: newBanner})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})
})






const validate_input = (input) => {
    let nameAlert = ''
    let cvLinkAlert = ''
    let firstHeaderAlert = ''
    let secondHeaderAlert = ''
    let spanHeaderAlert = ''
    let descriptionAlert = ''
    let failed = false;

    if(input.cvLink.length === 0){
        failed = true
        cvLinkAlert = "*CV Link field is required"
    } else if(input.cvLink.length < 3){
        failed = true
        cvLinkAlert = "*Must be minimum of 3 characters"
    }else if(input.cvLink.length > 100){
        failed = true
        cvLinkAlert = "*Must be maximum of 100 characters"
    }
    if(input.name.length === 0){
        failed = true
        nameAlert = "*Name field is required"
    } else if(input.name.length < 3){
        failed = true
        nameAlert = "*Must be minimum of 3 characters"
    }else if(input.name.length > 100){
        failed = true
        nameAlert = "*Must be maximum of 100 characters"
    }
    if(input.firstHeader.length === 0){
        failed = true
        firstHeaderAlert = "*First Header field is required"
    } else if(input.firstHeader.length < 3){
        failed = true
        firstHeaderAlert = "*Must be minimum of 3 characters"
    }else if(input.firstHeader.length > 100){
        failed = true
        firstHeaderAlert = "*Must be maximum of 100 characters"
    }
    if(input.secondHeader.length === 0){
        failed = true
        secondHeaderAlert = "*Second Header field is required"
    } else if(input.secondHeader.length < 3){
        failed = true
        secondHeaderAlert = "*Must be minimum of 3 characters"
    }else if(input.secondHeader.length > 100){
        failed = true
        secondHeaderAlert = "*Must be maximum of 100 characters"
    }
    if(input.spanHeader.length === 0){
        failed = true
        spanHeaderAlert = "*Span  header field is required"
    }else if(input.spanHeader.length > 100){
        failed = true
        spanHeaderAlert = "*Must be maximum of 100 characters"
    }
    if(input.description.length === 0){
        failed = true
        descriptionAlert = "*Description field is required"
    } else if(input.description.length < 20){
        failed = true
        descriptionAlert = "*Must be minimum of 20 characters"
    }else if(input.description.length > 1000){
        failed = true
        descriptionAlert = "*Must be maximum of 200 characters"
    }

    if(failed === true){
        return {
            name: nameAlert, firstHeader: firstHeaderAlert, cvLink: cvLinkAlert,
            secondHeader: secondHeaderAlert, description: descriptionAlert, spanHeader: spanHeaderAlert
        }
    }else{
        return false
    }
}





//   fetch admin home banner
const FetchHomeBanner = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const user = jwt.verify(token, env.SECRET_KEY)
    if(user){
        const content = await HomeBannerModel.findOne({user_id: user.string._id}).exec()
        if(content){
            return response.send({status: 'ok', content: content})
        }
    }
    return response.send({status: 'empty', content: []})
})



//   fetch client home banner
const FetchClientHomeBanner = AsyncHandler(async (request, response) => {
    const content = await HomeBannerModel.find().exec()
    if(content.length){
        return response.send({status: 'ok', content: content[0]})
    }
    return response.send({status: 'empty', content: []})
})




const UploadHomeBanner = AsyncHandler(async (request, response) => {
    try {
        const size = 1000;
        let imageName = '';
        const input = request.body;
        
        const userToken = jwt.verify(input.token, env.SECRET_KEY)
        if (!userToken) {
            return response.send({ status: 'error', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id
        let exists = await HomeBannerModel.findOne({ user_id: user_id}).exec()
        const imageFile = request.files ? request.files.image : null;
        if(exists){
            const types = ['jpg', 'png', 'jpeg', 'svg', 'webp'];
            const destination = path.join(__dirname, '../public/asset/image/users/')
            if (imageFile) {
                const upload = FileUpload({
                    size: size,
                    types: types,
                    file: imageFile,
                    name: 'banner-image-',
                    destination: destination
                })
                if (upload.status) {
                    imageName = upload.newName;
                    const filePath = destination + exists.image
                    RemoveFile(filePath) // delete old existing image from user folder
                } else if(upload.error){
                    return response.send({ status: 'error', message: upload.error })
                }
                const updatedContent = {
                    image: imageName,
                }
                await HomeBannerModel.findOneAndUpdate({_id: exists._id, user_id: user_id}, {$set: updatedContent}).exec()
                return response.send({ status: 'ok', imageName: imageName});
            }
        }
        
    } catch (error) {
        return response.send({ status: 'error', error: error.message });
    }
})









const CheckIfServerIsReady = AsyncHandler(async (request, response) => {
    if(true){
        setTimeout(() => {
            return response.send({status: 'ok'})
        }, 5000)
    }
})






const UploadImageFile = AsyncHandler(async (request, response) => {
    const size = 1000  
    const imageFile = request.files.image
    const types = ['jpg', 'png', 'jpeg', 'svg']
    const destination = path.join(__dirname, '../public/asset/image/users/');

    const upload = FileUpload({
        size: size,
        types: types,
        file: imageFile,
        name: 'user-image',
        destination: destination
    })
    if(upload.status == true){
        return response.send({status: true})
    }
    return response.send({error: 'Something went wrong, try again!'})
})













module.exports = { 
    UploadImageFile,
    AddHomeBanner,
    FetchHomeBanner,
    UploadHomeBanner,
    FetchClientHomeBanner,
    CheckIfServerIsReady,
}


















  // const form = new formidable.IncomingForm();
    // form.parse(request, (err, fields, files) => {
    //     if (err) {
    //       console.error('Error', err);
    //     }
    //     console.log(fields)
    // })