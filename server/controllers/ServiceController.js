const ServiceModel = require('../models/ServiceModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')








const UpdateServiceHeader = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_input(input)
    if(validation){
        return response.send({status: 'input-error', validationError: validation})
    }
    let exists = await ServiceModel.findOne().exec()
    if(exists){
        const updateContent = {
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            updated_at: today()
        }
        const update = await ServiceModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await ServiceModel.findOne({_id: exists._id}).exec()
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
        const serviceHeader = await ServiceModel.create(content)
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
    const content = await ServiceModel.findOne().exec()
    if(content){
        return response.send({status: 'ok', serviceHeader: content})
    }
    return response.send({status: 'empty', serviceHeader: []})
})






// ****************************** CLEITN SECTION*********************************

//   fetch admin services
const FetchClientServiceHeader = AsyncHandler(async (request, response) => {
    const content = await ServiceModel.findOne({is_featured: 1}).exec()
    if(content){
        return response.send({status: 'ok', serviceHeader: content})
    }
    return response.send({status: 'empty', serviceHeader: null })
})











module.exports = { 
    FetchServiceHeader,
    UpdateServiceHeader,
    FetchClientServiceHeader,
}

