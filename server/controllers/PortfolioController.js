
const PortfolioHeaderModel = require('../models/PortfolioHeaderModel')
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








const UpdatePortfolioHeader = AsyncHandler(async (request, response) => {
    const input = request.body
    const validation = validate_header_input(input)
    if(validation != 'success'){
        return response.send({status: 'input-error', validationError: validation})
    }
    const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'not-login', message: 'Login user to perform this action'})
    }

    const user_id = userToken.string._id
    let exists = await PortfolioHeaderModel.findOne({user_id: user_id}).exec()
    if(exists){
        const updateContent = {
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            is_featured: input.featured ? 1 : 0,
            updated_at: today()
        }
        const update = await PortfolioHeaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await PortfolioHeaderModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', portfolioHeader: updatedContent})
        }
    }else{
        const content = {
            user_id: user_id,
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            is_featured: input.featured ? 1 : 0,
            created_at: today(),
            updated_at: today()
        }
        const newHeader = await PortfolioHeaderModel.create(content)
        if(newHeader){
            return response.send({status: 'ok', portfolioHeader: newHeader})
        }
    }
    return response.send({status: 'error', message: 'Something went wront, try again!'})

})



 // validate input
 const validate_header_input = (input) => {
    let titleAlert = ''
    let firstHeaderAlert = ''
    const content = [
        {
            field: 'title',
            input: input.title,
            maxLength: 50,
            minLength: 3,
            required: true,
        },
        {
            field: 'first-header',
            input: input.firstHeader,
            maxLength: 100,
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
            if(validate.field === 'first-header'){
                firstHeaderAlert = validate.error
            }
            return false
        })
        return {
            title: titleAlert, firstHeader: firstHeaderAlert, 
        }
    }else{
        return 'success'
    }
}






//   fetch admin portfolio header
const FetchPortfolioHeader = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'not-login', message: 'Login user to perform this action'})
    }
    const exists = await PortfolioHeaderModel.findOne({ user_id: userToken.string._id }).exec()
    if(exists){
        return response.send({status: 'ok', portfolioHeader: exists})
    }
    return response.send({status: 'ok', portfolioHeader: {}})
})









module.exports = { 
    FetchPortfolioHeader,
    UpdatePortfolioHeader,
}
