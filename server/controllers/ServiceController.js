const ServiceModel = require('../models/ServiceModel')
const ServiceheaderModel = require('../models/ServiceheaderModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env











const UpdateServiceHeader = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }
    let exists = await ServiceheaderModel.findOne().exec()
    if(exists){
        const updateContent = {
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            updated_at: today()
        }
        const update = await ServiceheaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await ServiceheaderModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', serviceHeader: updatedContent})
        }
    }else{
        const content = {
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            is_featured: 0,
            created_at: today(),
            updated_at: today()
        }
        const serviceHeader = await ServiceheaderModel.create(content)
        if(serviceHeader){
            return response.send({status: 'ok', serviceHeader: serviceHeader})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})

})







const validate_input = (input) => {
    let titleAlert = ''
    let firstHeaderAlert = ''
    let secondHeaderAlert = ''
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
    if(input.firstHeader.length === 0){
        failed = true
        firstHeaderAlert = "*First Header field is required"
    } else if(input.firstHeader.length < 3){
        failed = true
        firstHeaderAlert = "*Must be minimum of 3 characters"
    }else if(input.firstHeader.length > 50){
        failed = true
        firstHeaderAlert = "*Must be maximum of 50 characters"
    }
    if(input.secondHeader.length === 0){
        failed = true
        secondHeaderAlert = "*Second Header field is required"
    } else if(input.secondHeader.length < 3){
        failed = true
        secondHeaderAlert = "*Must be minimum of 3 characters"
    }else if(input.secondHeader.length > 50){
        failed = true
        secondHeaderAlert = "*Must be maximum of 50 characters"
    }

    if(failed === true){
        return {
            title: titleAlert, firstHeader: firstHeaderAlert, 
            secondHeader: secondHeaderAlert,
        }
    }else{
        return false
    }
}






//   fetch admin services
const FetchServiceHeader = AsyncHandler(async (request, response) => {
    const content = await ServiceheaderModel.findOne().exec()
    if(content){
        return response.send({status: 'ok', serviceHeader: content})
    }
    return response.send({status: 'empty', serviceHeader: []})
})



//   fetch admin services
const AddNewService = AsyncHandler(async (request, response) => {
    const input = request.body
    const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }

    const validation = validate_service_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }

    const exists = await UserModel.findOne({ _id: userToken.string._id })
    if(!exists){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }

    const content = {
        user_id: exists._id,
        title: input.title,
        text: input.text,
        is_featured: 0,
        created_at: today(),
        updated_at: today()
    }
    const service = await ServiceModel.create(content)
    if(service){
        return response.send({status: 'ok', service: service})
    }
})




const validate_service_input = (input) => {
    let titleAlert = ''
    let textAlert = ''
    let failed = false;

    if(input.title.length === 0){
        failed = true
        titleAlert = "*Title field is required"
    } else if(input.title.length < 6){
        failed = true
        titleAlert = "*Must be minimum of 6 characters"
    }else if(input.title.length > 50){
        failed = true
        titleAlert = "*Must be maximum of 50 characters"
    }
    if(input.text.length === 0){
        failed = true
        textAlert = "*First Header field is required"
    } else if(input.text.length < 3){
        failed = true
        textAlert = "*Must be minimum of 3 characters"
    }else if(input.text.length > 100){
        failed = true
        textAlert = "*Must be maximum of 100 characters"
    }

    if(failed === true){
        return {
            title: titleAlert, text: textAlert, 
        }
    }else{
        return false
    }
}




// fetch user services
const FetchUserServices = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await ServiceModel.find({ user_id: userToken.string._id }).exec()
    if(exists.length){
        return response.send({status: 'ok', services: exists})
    }
    return response.send({status: 'ok', services: []})
})




// toggle user services featured
const ToggleUserServicesFeature = AsyncHandler(async (request, response) => {
    const _id = request.body._id
    const exists = await ServiceModel.findOne({ _id: _id })
    if(!exists){
        return response.send({status: 'error', message: 'Service does not exist'})
    }
    const featured = exists.is_featured == 1 ? 0 : 1
    const update = await ServiceModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
    if(update){
        const service = await ServiceModel.findOne({ _id: _id })
        return response.send({status: 'ok', service: service})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})













// ****************************** CLEITN SECTION*********************************

//   fetch admin services
const FetchClientServiceHeader = AsyncHandler(async (request, response) => {
    const content = await ServiceheaderModel.findOne({is_featured: 1}).exec()
    if(content){
        return response.send({status: 'ok', serviceHeader: content})
    }
    return response.send({status: 'empty', serviceHeader: null })
})











module.exports = { 
    AddNewService,
    FetchUserServices,
    FetchServiceHeader,
    UpdateServiceHeader,
    FetchClientServiceHeader,
    ToggleUserServicesFeature,
}

