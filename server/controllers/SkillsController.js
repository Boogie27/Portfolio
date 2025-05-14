
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
            is_featured: 0,
            created_at: today(),
            updated_at: today()
        }
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
            if(deleteSkill.image){
                const destination = path.join(__dirname, '../public/asset/image/icon/');
                const filePath = destination + deleteSkill.image
                RemoveFile(filePath) // delete old existing image from image folder
            }
            return response.send({status: 'ok', deleteSkill: deleteSkill})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({error: error})
    }
})








//   fetch admin skills header
const EditUserSkills = AsyncHandler(async (request, response) => {
    try{
        const size = 500  
        let imageName = ''
        const input = request.body
        const imageFile = request.files != null ? request.files.image : ''
        const types = ['jpg', 'png', 'jpeg', 'svg', 'webp']
        const destination = path.join(__dirname, '../public/asset/image/icon/');
       
        const validation = validate_edit_skill_input(input)
        if(validation){
            return response.send({status: 'input-error', validationError: validation})
        }
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const title = input.title.toLowerCase()
        const existName = await SkillsModel.findOne({ user_id: user_id, title: title}).exec()
        if(existName && existName._id != input._id && existName.title == title){
            return response.send({status: 'error', message: 'Skill already exist'})
        }
       
        const exists = await SkillsModel.findOne({ _id: input._id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Skill does not exist!'})
        }
        if(imageFile != ''){
            const upload = FileUpload({
                size: size,
                types: types,
                file: imageFile,
                name: 'skill-icon-',
                destination: destination
            })
            if(upload.status == true){ 
                imageName = upload.newName
                if(exists.image){
                    const filePath = destination + exists.image
                    RemoveFile(filePath) // delete old existing image from image folder
                }
            }
            if(upload.error){
                return response.send({status: 'error', message: upload.error})
            }
        }
        
        const updateContent = {
            title: title,
            rating: input.rating,
            image: imageName ? imageName : exists.image,
            updated_at: today()
        }
        const updatedSkill = await SkillsModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(updatedSkill){
            const skill = await await SkillsModel.findOne({ _id: input._id}).exec()
            return response.send({status: 'ok', skill: skill})
        }
        return response.send({status: 'error', message: 'Something went wront, try again!'})
    }catch(error){
        return response.send({ status: 'error', error: error })
    }
})





const validate_edit_skill_input = (input) => {
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










// toggle user skill featured
const ToggleUserSkillsFeature = AsyncHandler(async (request, response) => {
    try{
        
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const exists = await SkillsModel.findOne({ _id: _id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Skill does not exist or you need to login'})
        }
        const featured = exists.is_featured ? 0 : 1
        const update = await SkillsModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
        if(update){
            const updatedSkill = await SkillsModel.findOne({ _id: exists._id })
            return response.send({status: 'ok', updatedSkill: updatedSkill})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})











// ****************** CLIENT SKILL SECTION *********************
//   fetch client skills header
const FetchClientSkillsHeader = AsyncHandler(async (request, response) => {
    try{
        const skillsHeader = await SkillsHeaderModel.findOne().exec()
        if(skillsHeader){
            return response.send({status: 'ok', skillsHeader: skillsHeader})
        }
        return response.send({status: 'ok', skillsHeader: {}})
    }catch(error){
        return response.send({status: 'error', message: error})
    }
})


//   fetch client skills
const FetchClientSkills = AsyncHandler(async (request, response) => {
    try{
        const skills = await SkillsModel.find().exec()
        if(skills){
            return response.send({status: 'ok', skills: skills})
        }
        return response.send({status: 'ok', skills: {}})
    }catch(error){
        return response.send({status: 'error', message: error})
    }
})








module.exports = { 
    AddNewSkills,
    EditUserSkills,
    FetchUserSkills,
    DeleteUserSkills,
    FetchSkillsHeader,
    FetchClientSkills,
    UpdateUserSkillsHeader,
    FetchClientSkillsHeader,
    ToggleUserSkillsFeature,
}

