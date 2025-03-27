
const PortfolioModel = require('../models/PortfolioModel')
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
        {  field: 'title', input: input.title,  maxLength: 50,  minLength: 3,   required: true, },
        {  field: 'first-header', input: input.firstHeader,  maxLength: 100, minLength: 3,required: true,}
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){  titleAlert = validate.error }
            if(validate.field === 'first-header'){  firstHeaderAlert = validate.error }
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





//   add new portfolio
const AddNewPortfolio = AsyncHandler(async (request, response) => {
    try {
        const size = 1000;
        let imageName = '';
        const input = request.body;
        
        const imageFile = request.files ? request.files.image : null;
        const types = ['jpg', 'png', 'jpeg', 'svg', 'webp'];
        const destination = path.join(__dirname, '../public/asset/image/portfolio/')

        const validation = validate_input(input);
        if (validation !== 'success') {
            return response.send({ status: 'input-error', validationError: validation })
        }

        const userToken = jwt.verify(input.token, env.SECRET_KEY)
        if (!userToken) {
            return response.send({ status: 'error', message: 'Login user to perform this action' })
        }
        const user_id = userToken.string._id
        const title = input.title.toLowerCase()

        const exists = await PortfolioModel.findOne({ user_id: user_id, title: title }).exec()

        if (exists && exists.title === title) {
            return response.send({ status: 'error', message: 'Portfolio already exists' })
        }

        const order = await PortfolioModel.findOne({ user_id: user_id }).sort({order: -1}).exec()

        if (imageFile) {
            const upload = FileUpload({
                size: size,
                types: types,
                file: imageFile,
                name: 'portfolio-image-',
                destination: destination
            })

            if (upload.status) {
                imageName = upload.newName;
            } else if(upload.error){
                return response.send({ status: 'error', message: upload.error })
            }
        }

        let technology = [];
        if (input.technology) {
            technology = input.technology.split(',')
        }

        const content = {
            user_id: user_id,
            title: title,
            link: input.link,
            image: imageName ? Array(imageName) : [],
            order: order ? order.order + 1 : 1,
            description: input.description,
            from_month: input.fromMonth,
            from_year: parseInt(input.fromYear),
            to_month: input.toMonth,
            to_year: parseInt(input.toYear),
            technologies: technology,
            is_featured: 0,
            created_at: today(),
            updated_at: today()
        };

        const newPortfolio = await PortfolioModel.create(content);
        
        if (newPortfolio) {
            
            return response.send({ status: 'ok', newPortfolio: newPortfolio });
        } else {
            return response.send({ status: 'error', message: 'Something went wrong, try again!' });
        }
    } catch (error) {
        return response.send({ status: 'error', error: error.message });
    }
})




// validate input
const validate_input = (input) => {
    let titleAlert = ''
    let descriptionAlert = ''
    const content = [
        { field: 'title', input: input.title, maxLength: 50,  minLength: 3, required: true},
        { field: 'description', input: input.description, maxLength: 2000, minLength: 3, required: true}
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){ titleAlert = validate.error}
            if(validate.field === 'description'){firstHeaderAlert = validate.error}
            return false
        })
        return {
            title: titleAlert, description: descriptionAlert, 
        }
    }else{
        return 'success'
    }
}









//   fetch admin portfolio
const FetchUserPortfolios = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id;
        const portfolios = await PortfolioModel.find({ user_id: user_id }).exec()

        if (portfolios) {
            return response.send({ status: 'ok', portfolios: portfolios })
        }

        return response.send({ status: 'ok', portfolios: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
});










//   update user portfolio
const UpdateUserPortfolio = AsyncHandler(async (request, response) => {
    try {
        const size = 1000;
        let imageName = '';
        const input = request.body;
        const imageFile = request.files ? request.files.image : null;
        const types = ['jpg', 'png', 'jpeg', 'svg', 'webp'];
        const destination = path.join(__dirname, '../public/asset/image/portfolio/')

        const validation = validate_input(input);
        if (validation !== 'success') {
            return response.send({ status: 'input-error', validationError: validation })
        }

        const userToken = jwt.verify(input.token, env.SECRET_KEY)
        if (!userToken) {
            return response.send({ status: 'error', message: 'Login user to perform this action' })
        }
        const user_id = userToken.string._id
        const title = input.title.toLowerCase()

        const portfolio = await PortfolioModel.findOne({ _id: input._id, user_id: user_id }).exec()
        if(!portfolio){
            return response.send({ status: 'error', message: 'Either Portfolio does not exist or you need to login!' })
        }

        if (imageFile) {
            const upload = FileUpload({
                size: size,
                types: types,
                file: imageFile,
                name: 'portfolio-image-',
                destination: destination
            })

            if (upload.status) {
                imageName = upload.newName;
                portfolio.image.push(imageName)
            } else if(upload.error){
                return response.send({ status: 'error', message: upload.error })
            }
        }

        let technology = ''
        if (input.technology.length) {
            technology = input.technology.split(',')
        }else{
            technology = portfolio.technologies
        }

        // check if image is present then add to array of images
        if(imageName){
            portfolio.image.push(imageName)
        }

        const updateContent = {
            user_id: user_id,
            title: title,
            link: input.link,
            description: input.description,
            from_month: input.fromMonth,
            from_year: parseInt(input.fromYear),
            to_month: input.toMonth,
            to_year: parseInt(input.toYear),
            technologies: technology,
            is_featured: portfolio.is_featured ? 1 : 0,
            updated_at: today(),
            image: portfolio.image,
        };

        const update = await PortfolioModel.findOneAndUpdate({_id: portfolio._id}, {$set: updateContent}).exec()
        
        if (update) {
            const updatedPortfolio = await PortfolioModel.findOne({ _id: portfolio._id, user_id: user_id }).exec()
            return response.send({ status: 'ok', updatedPortfolio: updatedPortfolio });
        } else {
            return response.send({ status: 'error', message: 'Something went wrong, try again!' });
        }
    } catch (error) {
        return response.send({ status: 'error', error: error.message });
    }
})




//  delete user portfolio
const DeleteUserPortfolio = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login to delete user Portfolio'})
        }
        const exists = await PortfolioModel.findOne({ _id: _id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }
        const deletedPortfolio = await PortfolioModel.findByIdAndDelete({_id, _id})
        if(deletedPortfolio){
            if(deletedPortfolio.image.length){
                const destination = path.join(__dirname, '../public/asset/image/portfolio/');
                for(let i=0; i < deletedPortfolio.image.length; i++){
                    const filePath = destination + deletedPortfolio.image[i]
                    RemoveFile(filePath) // delete old existing image from image folder
                }
            }
            return response.send({status: 'ok', deletedPortfolio: deletedPortfolio})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        console.log(error)
        return response.send({error: error})
    }
})





// toggle user qualification featured
const ToggleFeaturedUserPortfolio = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const exists = await PortfolioModel.findOne({ _id: _id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }
        const featured = exists.is_featured ? 0 : 1
        const update = await PortfolioModel.findOneAndUpdate({_id: exists._id}, {$set: {is_featured: featured}}).exec()
        if(update){
            const updatedPortfolio = await PortfolioModel.findOne({ _id: _id })
            console.log(updatedPortfolio)
            return response.send({status: 'ok', updatedPortfolio: updatedPortfolio})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})




// add user portfolio image
const AddUserPortfolioImage = AsyncHandler(async (request, response) => {
    try{
        const { _id, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const exists = await PortfolioModel.findOne({ _id: _id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }

        const size = 1000;
        let imageName = '';
        const imageFile = request.files ? request.files.image : null;
        const types = ['jpg', 'png', 'jpeg', 'svg', 'webp'];
        const destination = path.join(__dirname, '../public/asset/image/portfolio/')

        if (imageFile) {
            const upload = FileUpload({
                size: size,
                types: types,
                file: imageFile,
                name: 'portfolio-image-',
                destination: destination
            })

            if (upload.status) {
                imageName = upload.newName;
            } else if(upload.error){
                return response.send({ status: 'error', message: upload.error })
            }
            exists.image.push(imageName)

            const updateContent = {
                image: exists.image
            }
            const update = await PortfolioModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if (update) {
                const updatedPortfolio = await PortfolioModel.findOne({ _id: exists._id, user_id: user_id }).exec()
                return response.send({ status: 'ok', updatedPortfolio: updatedPortfolio });
            } else {
                return response.send({ status: 'error', message: 'Something went wrong, try again!' });
            }
        }

        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})




// edit portfolio image
const EditUserPortfolioImage = AsyncHandler(async (request, response) => {
    try{
        const { _id, index, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const exists = await PortfolioModel.findOne({ _id: _id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }

        const old_image = exists.image[index]
        if(old_image){
            const size = 1000;
            let imageName = '';
            const imageFile = request.files ? request.files.image : null;
            const types = ['jpg', 'png', 'jpeg', 'svg', 'webp'];
            const destination = path.join(__dirname, '../public/asset/image/portfolio/')
            if (imageFile) {
                const upload = FileUpload({
                    size: size,
                    types: types,
                    file: imageFile,
                    name: 'portfolio-image-',
                    destination: destination
                })
    
                if (upload.status) {
                    imageName = upload.newName;
                    const filePath = destination + old_image
                    RemoveFile(filePath) // delete  existing old image from image portfolio folder
                } else if(upload.error){
                    return response.send({ status: 'error', message: upload.error })
                }
                exists.image[index] = imageName
                const updateContent = {
                    image: exists.image
                }
                const update = await PortfolioModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
                if (update) {
                    const updatedImage = {index: index, imageName: imageName}
                    return response.send({ status: 'ok', updatedImage: updatedImage });
                } else {
                    return response.send({ status: 'error', message: 'Something went wrong, try again!' });
                }
            }
        }

        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})





// delete portfolio image
const DeleteUserPortfolioImage = AsyncHandler(async (request, response) => {
    try{
        const { _id, index, token } = request.body
        const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'error', message: 'Login user to perform this action'})
        }
        const user_id = userToken.string._id
        const exists = await PortfolioModel.findOne({ _id: _id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }

        if(exists && exists.image.length){
            const image = exists.image[index]
            const destination = path.join(__dirname, '../public/asset/image/portfolio/');
            const filePath = destination + image
            RemoveFile(filePath) // delete  existing image from image folder
            
            exists.image.splice(index, 1)
            const updateContent = {
                image: exists.image
            }
            const update = await PortfolioModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
            if(update){
                return response.send({ status: 'ok'});
            }
            return response.send({ status: 'error', message: 'Something went wrong, try again!' });
        }
        
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})





// update user portifolio orer
const UpdateUserPortfolioOrder = AsyncHandler(async (request, response) => {
    try{
        const input = request.body
        const userToken = jwt.verify(input.token, env.SECRET_KEY) //check if user token exists
        if(!userToken){
            return response.send({status: 'not-login', message: 'Login user to perform this action'})
        }

        const user_id = userToken.string._id
        const exists = await PortfolioModel.findOne({ _id: input._id, user_id:  user_id}).exec()
        if(!exists){
            return response.send({status: 'error', message: 'Either Portfolio does not exist or you need to login'})
        }
        const updateContent = {
            order: input.order,
            updated_at: today(), 
        }
        const update = await PortfolioModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            const updatedPortfolio = await PortfolioModel.findOne({ _id: exists._id })
            return response.send({status: 'ok', updatedPortfolio: updatedPortfolio})
        }
        return response.send({status: 'error', message: 'Something went wrong, try again!'})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})











// ****************** CLIENT SECTION *****************

//   fetch client portfolios
const FetchClientUserPortfolios = AsyncHandler(async (request, response) => {
    try{
        const portfolios = await PortfolioModel.find({is_featured: 1}).sort({ order: 1 }).exec()
        if(portfolios){
            return response.send({status: 'ok', portfolios: portfolios})
        }
        return response.send({status: 'ok', portfolios: {}})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})








//   fetch client portfolio header
const FetchClientUserPortfolioHeader = AsyncHandler(async (request, response) => {
    try{
        const portfolioHeader = await PortfolioHeaderModel.findOne({is_featured: 1}).exec()
        if(portfolioHeader){
            return response.send({status: 'ok', portfolioHeader: portfolioHeader})
        }
        return response.send({status: 'ok', portfolioHeader: {}})
    }catch(error){
        return response.send({ status: 'catch-error', catchError: error })
    }
})







module.exports = { 
    AddNewPortfolio,
    UpdateUserPortfolio,
    DeleteUserPortfolio,
    FetchPortfolioHeader,
    UpdatePortfolioHeader,
    FetchUserPortfolios,
    EditUserPortfolioImage,
    AddUserPortfolioImage,
    UpdateUserPortfolioOrder,
    DeleteUserPortfolioImage,
    FetchClientUserPortfolios,
    ToggleFeaturedUserPortfolio,
    FetchClientUserPortfolioHeader,
}
