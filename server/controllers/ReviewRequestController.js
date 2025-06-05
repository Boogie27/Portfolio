const RequestReviewModel = require('../models/RequestReviewModel')
const SettingsModel = require('../models/SettingsModel')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const { SendMail } = require('../mailer/Mailer')
const HtmlMessage = require('../mailer/ReviewRequestMailTemplate')
require('dotenv').config()
const env = process.env
const { Validate } = require('../helper/Validation')
const crypto = require('crypto');





const generateToken = (length = 32) => {
    return crypto.randomBytes(length).toString('hex');
}





const SendReviewRequest = AsyncHandler(async (request, response) => {
    try {
        const input = request.body;
        const validation = validate_input(input);

        if (validation !== 'success') {
            return response.send({ status: 'input-error', validationError: validation });
        }

        const userToken = jwt.verify(input.token, env.SECRET_KEY); // check if user token exists

        if (!userToken) {
            return response.send({ status: 'error', message: 'Login user to perform this action' });
        }

        const user_id = userToken.string._id;
        let exists = await RequestReviewModel.findOne({ user_id: user_id, email: input.email }).exec();

        if (exists) {
            return response.send({ status: 'error', message: 'Email already exists, try another one!' });
        } else {
            const token = generateToken()
            const content = {
                user_id: user_id,
                name: input.name,
                email: input.email,
                project: input.project,
                token: token,
                is_completed: 0,
                completed_at: '',
                created_at: today(),
                updated_at: today(),
            };

            const requestReview = await RequestReviewModel.create(content);

            if (requestReview) {
                // send out email  here
                const settings = await SettingsModel.findOne({user_id: user_id}).exec()
                if(settings){
                    const link = input.link + '/?review-service=' + token
                    const sendEmail = sendMailToClient(request.body, link, settings) // send out email  here
                }
                return response.send({ status: 'ok', requestReview: requestReview });
            }
        }

        return response.send({ status: 'error', message: 'Something went wrong, try again!' });
    } catch (error) {
        console.error('Error', error);
        return response.send({ status: 'error', message: 'Something went wrong, try again!' });
    }
});





 // validate input
 const validate_input = (input) => {
    let nameAlert = ''
    let emailAlert = ''
    let projectAlert = ''

    const content = [
        { field: 'name', input: input.name,  maxLength: 50,  minLength: 3, required: true },
        { field: 'email', input: input.email,  email: true, required: true },
        { field: 'project', input: input.project, maxLength: 50, minLength: 3, required: true },
    ]
    const validation = Validate(content)
    if(validation != 'success'){
        validation.map((validate) => {
            if(validate.field === 'name'){ nameAlert = validate.error}
            if(validate.field === 'email'){ emailAlert = validate.error}
            if(validate.field === 'project'){ projectAlert = validate.error}
            return false
        })
        return {
            name: nameAlert, email: emailAlert,
        }
    }else{
        return 'success'
    }
}





//  update review request
const UpdateReviewRequest = AsyncHandler(async (request, response) => {
    try {
        const input = request.body;
        const validation = validate_input(input);
        if (validation !== 'success') {
            return response.send({ status: 'input-error', validationError: validation });
        }

        const userToken = jwt.verify(input.token, env.SECRET_KEY); // check if user token exists

        if (!userToken) {
            return response.send({ status: 'error', message: 'Login user to perform this action' });
        }

        const user_id = userToken.string._id;
        const emailCheck = await RequestReviewModel.findOne({ email: input.email}).exec();
        if(emailCheck && emailCheck._id != input._id){
            return response.send({ status: 'error', message: 'Email already exists, try another one!' });
        }
        
        const token = generateToken()
        let exists = await RequestReviewModel.findOne({ _id: input._id, user_id: user_id}).exec();
        const updateContent = {
            name: input.name,
            email: input.email,
            project: input.project,
            token: token,
            updated_at: today(),
        };
        const update = await RequestReviewModel.findOneAndUpdate({_id: exists._id}, {$set: updateContent}).exec()
        if(update){
            if(input.sendMail){
                const settings = await SettingsModel.findOne({user_id: user_id}).exec()
                if(settings){
                    const link = input.link + '/?review-service=' + token
                    const sendEmail = sendMailToClient(request.body, link, settings) // send out email  here
                }
            }
            const updatedContent = await RequestReviewModel.findOne({_id: exists._id}).exec()
            return response.send({status: 'ok', updatedReviewRequest: updatedContent})
        }

        return response.send({ status: 'error', message: 'Something went wrong, try again!' });
    } catch (error) {
        console.error('Error: ', error);
        return response.send({ status: 'error', message: 'Something went wrong, try again!' });
    }
});



// fetch all review request
const FetchUserReviewRequest = AsyncHandler(async (request, response) => {
    try {
        const token = request.params.token;
        const userToken = jwt.verify(token, env.SECRET_KEY) // check if user token exists

        if (!userToken) {
            return response.send({ status: 'not-login', message: 'Login user to perform this action' })
        }

        const user_id = userToken.string._id;
        const reviewRequests = await RequestReviewModel.find({ user_id: user_id }).exec()

        if (reviewRequests) {
            return response.send({ status: 'ok', reviewRequests: reviewRequests })
        }

        return response.send({ status: 'ok', reviewRequests: {} })
    } catch (error) {
        return response.status(500).send({ status: 'error', message: 'An error occurred', error: error.message })
    }
})






// Delete review request 
const DeleteReviewRequest = AsyncHandler(async (request, response) => {
    const { _id, token } = request.body
    const userToken = jwt.verify(token, env.SECRET_KEY) //check if user token exists
    if(!userToken){
        return response.send({status: 'error', message: 'Login user to perform this action'})
    }
    const exists = await RequestReviewModel.findOne({ _id: _id, user_id:  userToken.string._id}).exec()
    if(!exists){
        return response.send({status: 'error', message: 'Either Request does not exist or you need to login'})
    }

    const deletedRequest = await RequestReviewModel.findByIdAndDelete(_id)
    if(deletedRequest){
        return response.send({status: 'ok', deletedRequest: deletedRequest})
    }
    return response.send({status: 'error', message: 'Something went wrong, try again!'})
})




//  send email function
const sendMailToClient = (input, link, settings) => {
    string = {
        from: settings.email,
        to: input.email,
        subject: 'Review  request',
        message: HtmlMessage(input, link, settings)
    }
    return SendMail(string)
}




module.exports = { 
    SendReviewRequest,
    UpdateReviewRequest,
    DeleteReviewRequest,
    FetchUserReviewRequest,
}








