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
    const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }

    const user_id = userToken.string._id
    let exists = await ServiceheaderModel.findOne({user_id: user_id}).exec()
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
            user_id: user_id,
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
        return response.send({status: 'error', message: 'Login to perform this action'})
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
    }else if(input.text.length > 1000){
        failed = true
        textAlert = "*Must be maximum of 1000 characters"
    }

    if(failed === true){
        return {
            title: titleAlert, text: textAlert, 
        }
    }else{
        return false
    }
}


// update user services
const UpdateUserServices = AsyncHandler(async (request, response) => {
    const input = request.body
    const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const validation = validate_service_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }
    const userExists = await UserModel.findOne({ _id: userToken.string._id })
    if(!userExists){
        return response.send({status: 'error', message: 'Login to perform this action'})
    }
    const exists = await ServiceModel.findOne({_id: input._id, user_id: userToken.string._id }).exec()
    if(!exists){
        return response.send({status: 'error', message: 'User Service does not exist'})
    }
    const service = {
        title: input.title,
        text: input.text,
        updated_at: today()
    }
    const update = await ServiceModel.findOneAndUpdate({_id: exists._id}, {$set: service}).exec()
    if(update){

        const service = await ServiceModel.findOne({ _id: exists._id })
        return response.send({status: 'ok', service: service})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})



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
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await ServiceModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Service does not exist or you need to login'})
    }
    const featured = exists.is_featured == 1 ? 0 : 1
    const update = await ServiceModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
    if(update){
        const service = await ServiceModel.findOne({ _id: _id })
        return response.send({status: 'ok', service: service})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})







// delete user services
const DeleteUserServices = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await ServiceModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Service does not exist or you need to login'})
    }
    const deleteService = await ServiceModel.findByIdAndDelete({_id, _id})
    if(deleteService){
        return response.send({status: 'ok', deleteService: deleteService})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})







// ****************************** CLEITN SECTION*********************************

//   fetch client services header
const FetchClientServiceHeader = AsyncHandler(async (request, response) => {
    const content = await ServiceheaderModel.findOne({is_featured: 1}).exec()
    if(content){
        return response.send({status: 'ok', serviceHeader: content})
    }
    return response.send({status: 'empty', serviceHeader: null })
})



//   fetch client services
const FetchClientServices = AsyncHandler(async (request, response) => {
    const services = await ServiceModel.find({is_featured: 1}).exec()
    if(services.length){
        return response.send({status: 'ok', services: services})
    }
    return response.send({status: 'empty', services: [] })
})







module.exports = { 
    AddNewService,
    FetchUserServices,
    FetchServiceHeader,
    UpdateServiceHeader,
    DeleteUserServices,
    UpdateUserServices,
    FetchClientServices,
    FetchClientServiceHeader,
    ToggleUserServicesFeature,
}

