
const SkillsModel = require('../models/SkillsModel')
const SkillsHeaderModel = require('../models/SkillsHeaderModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { FileUpload, RemoveFile } = require('../helper/Image')









const UpdateUserSkillsHeader = AsyncHandler(async (request, response) => {
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
    let exists = await SkillsHeaderModel.findOne({user_id: user_id}).exec()
    if(exists){
        const updateContent = {
            title: input.title,
            first_header: input.firstHeader,
            second_header: input.secondHeader,
            updated_at: today()
        }
        const update = await SkillsHeaderModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedContent = await SkillsHeaderModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', skillsHeader: updatedContent})
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
        const skillsHeader = await SkillsHeaderModel.create(content)
        if(skillsHeader){
            return response.send({status: 'ok', skillsHeader: skillsHeader})
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










//   fetch admin skills header
const FetchSkillsHeader = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'not-login', message: 'Login user to perform this action'})
    }
    const exists = await SkillsHeaderModel.findOne({ user_id: userToken.string._id }).exec()
    if(exists){
        return response.send({status: 'ok', skillsHeader: exists})
    }
    return response.send({status: 'ok', skillsHeader: {}})
})



//   fetch admin skills header
const AddNewSkills = AsyncHandler(async (request, response) => {
    try{
        const size = 500  
        let imageName = ''
        const input = request.body
        const imageFile = request.files != null ? request.files.image : ''
        const types = ['jpg', 'png', 'jpeg', 'svg', 'webp']
        const destination = path.join(__dirname, '../public/asset/image/icon/');
       
        const validation = validate_add_skill_input(input)
        if(validation){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const title = input.title.toLowerCase()
        const exists = await SkillsModel.findOne({ user_id: user_id, title: title}).exec()
        if(exists && exists.title == title){
            return response.send({status: 'error', message: 'Skill already exist'})
        }
       
        if(imageFile){
            const upload = FileUpload({
                size: size,
                types: types,
                file: imageFile,
                name: 'skill-icon',
                destination: destination
            })
            if(upload.status == true){ 
                imageName = upload.newName
            }
            if(upload.error){
                return response.send({status: 'error', message: upload.error})
            }
        }
        
        const content = {
            user_id: user_id,
            title: title,
            rating: input.rating,
            image: imageName,
            created_at: today(),
            updated_at: today()
        }
        console.log('ues')
        const newSkill = await SkillsModel.create(content)
        if(newSkill){
            return response.send({status: 'ok', newSkill: newSkill})
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})





const validate_add_skill_input = (input) => {
    let titleAlert = ''
    let ratingAlert = ''
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
    if(input.rating === ''){
        failed = true
        ratingAlert = "*Rating field is required"
    }else if(input.rating > 100){
        failed = true
        ratingAlert = "*Must be maximum of 100 percent"
    }

    if(failed === true){
        return {
            title: titleAlert, rating: ratingAlert, 
        }
    }else{
        return false
    }
}







// fetch user skills
const FetchUserSkills = AsyncHandler(async (request, response) => {
    const token = request.params.token
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await SkillsModel.find({ user_id: userToken.string._id }).exec()
    if(exists.length){
        return response.send({status: 'ok', skills: exists})
    }
    return response.send({status: 'ok', skills: []})
})




//  delete user skills
const DeleteUserSkills = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login to delete user skill'})
        }
        const exists = await SkillsModel.findOne({ _id: _id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Skill does not exist or you need to login'})
        }
        const deleteSkill = await SkillsModel.findByIdAndDelete({_id, _id})
        if(deleteSkill){
            return response.send({status: 'ok', deleteSkill: deleteSkill})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({error: error})
    }
})








module.exports = { 
    AddNewSkills,
    FetchUserSkills,
    DeleteUserSkills,
    FetchSkillsHeader,
    UpdateUserSkillsHeader,
}

