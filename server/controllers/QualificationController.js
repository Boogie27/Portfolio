
const QualificationModel = require('../models/QualificationModel')
const QualificationHeaderModel = require('../models/QualificationHeaderModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const { Validate } = require('../helper/Validation')








// update qualification header
const UpdateQualificationHeader = AsyncHandler(async (request, response) => {
    try{
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
        let exists = await QualificationHeaderModel.findOne({user_id: user_id}).exec()

        if(exists){
            const updateContent = {
                title: input.title,
                first_header: input.firstHeader,
                second_header: input.secondHeader,
                is_featured: input.featured ? 1 : 0,
                updated_at: today()
            }
            const update = await QualificationHeaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if(update){
                const updatedContent = await QualificationHeaderModel.findOne({_id: exists._id}).exec()
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
            const newHeader = await QualificationHeaderModel.create(content)
            if(newHeader){
                return response.send({status: 'ok', portfolioHeader: newHeader})
            }
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})





 // validate input
 const validate_header_input = (input) => {
    let titleAlert = ''
    let firstHeaderAlert = ''
    
    const content = [
        {  field: 'title', input: input.title,  maxLength: 50,  minLength: 3,   required: true, },
        {  field: 'first header', input: input.firstHeader,  maxLength: 100, minLength: 3, required: true },
        { field: 'second header', input: input.secondHeader, maxLength: 100, minLength: 3}
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){  titleAlert = validate.error }
            if(validate.field === 'first header'){  firstHeaderAlert = validate.error }
            return false
        })
        return {
            title: titleAlert, firstHeader: firstHeaderAlert, 
        }
    }else{
        return 'success'
    }
}





//   fetch admin qualification header
const FetchQualificationHeader = AsyncHandler(async (request, response) => {
    try{
        const token = request.params.token
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }
        const exists = await QualificationHeaderModel.findOne({ user_id: userToken.string._id }).exec()
        if(exists){
            return response.send({status: 'ok', qualificationHeader: exists})
        }
        return response.send({status: 'ok', qualificationHeader: {}})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})



const AddNewQualification = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const validation = validate_input(input)
        if(validation){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const content = {
            user_id: user_id,
            title: input.title,
            from: input.from,
            to: input.to,
            text: input.text,
            is_featured: input.featured ? 1 : 0,
            created_at: today(),
            updated_at: today()
        }
        const newQualification = await QualificationModel.create(content)
        if(newQualification){
            return response.send({status: 'ok', qualification: newQualification})
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})





const validate_input = (input) => {
    let titleAlert = ''
    let fromAlert = ''
    let toAlert = ''
    let textAlert = ''
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
    if(input.from === ''){
        failed = true
        fromAlert = "*From Year field is required"
    }else if(input.from > input.to){
        failed = true
        fromAlert = "*From Year must not be greater than To Year"
    }
    if(input.to === ''){
        failed = true
        toAlert = "*To Year field is required"
    }
    if(input.text.length === 0){
        failed = true
        textAlert = "*Text field is required"
    } else if(input.text.length < 3){
        failed = true
        textAlert = "*Must be minimum of 3 characters"
    }else if(input.text.length > 1000){
        failed = true
        textAlert = "*Must be maximum of 1000 characters"
    }

    if(failed === true){
        return {
            title: titleAlert, from: fromAlert, 
            to: toAlert, text: textAlert,
        }
    }else{
        return false
    }
}






// fetch user qualification
const FetchUserQualifications = AsyncHandler(async (request, response) => {
   try{
        const token = request.params.token
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const exists = await QualificationModel.find({ user_id: userToken.string._id }).exec()
        if(exists.length){
            return response.send({status: 'ok', qualifications: exists})
        }
        return response.send({status: 'ok', qualifications: []})
   }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
   }
})










// toggle user qualification featured
const ToggleUserQualificationFeature = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const exists = await QualificationModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Qualification does not exist or you need to login'})
        }
        const featured = exists.is_featured == 1 ? 0 : 1
        const update = await QualificationModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
        if(update){
            const qualification = await QualificationModel.findOne({ _id: _id })
            return response.send({status: 'ok', qualification: qualification})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})








//  delete user qualification
const DeleteUserQualification = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login to perform this action'})
        }
        const exists = await QualificationModel.findOne({ _id: _id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Quailification does not exist or you need to login'})
        }
        const deleteQualification = await QualificationModel.findByIdAndDelete({_id, _id})
        if(deleteQualification){
            return response.send({status: 'ok', qualification: deleteQualification})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({status: 'catch-error', catchError: error})
    }
})







// update user qualification
const UpdateUserQualification = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const validation = validate_input(input)
        if(validation){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userExists = await UserModel.findOne({ _id: user_id })
        if(!userExists){
            return response.send({status: 'error', message: 'Login to perform this action'})
        }
        const exists = await QualificationModel.findOne({_id: input._id, user_id: user_id }).exec()
        if(!exists){
            return response.send({status: 'error', message: 'User Qualification does not exist'})
        }
        const content = {
            user_id: user_id,
            title: input.title,
            from: parseInt(input.from),
            to: parseInt(input.to),
            text: input.text,
            is_featured: input.featured ? 1 : 0,
            updated_at: today()
        }
        const update = await QualificationModel.findOneAndUpdate({_id: exists._id}, {$set: content}).exec()
        if(update){
            const updatedQualification = await QualificationModel.findOne({ _id: exists._id })
            return response.send({status: 'ok', qualification: updatedQualification})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({status: 'catch-error', catchError: error})
    }
})








// ******************* CLIENT SECTION *********************************************
//   fetch client qualifications
const FetchClientQualifications = AsyncHandler(async (request, response) => {
    try{
        const qualifications = await QualificationModel.find({is_featured: 1}).exec()
        if(qualifications){
            return response.send({status: 'ok', qualifications: qualifications})
        }
        return response.send({status: 'ok', qualifications: {}})
    }catch(error){
        return response.send({status: 'catch-error', catchError: error})
    }
})




//   fetch client qualification header
const FetchClientQualificationHeader = AsyncHandler(async (request, response) => {
    try{
        const qualificationHeader = await QualificationHeaderModel.findOne({is_featured: 1}).exec()
        if(qualificationHeader){
            return response.send({status: 'ok', qualificationHeader: qualificationHeader})
        }
        return response.send({status: 'ok', qualificationHeader: {}})
    }catch(error){
        return response.send({status: 'catch-error', catchError: error})
    }
})





module.exports = { 
    AddNewQualification,
    DeleteUserQualification,
    FetchUserQualifications,
    UpdateUserQualification,
    FetchQualificationHeader,
    UpdateQualificationHeader,
    FetchClientQualifications,
    FetchClientQualificationHeader,
    ToggleUserQualificationFeature,
}