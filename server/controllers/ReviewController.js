

const TestimonialModel = require('../models/TestimonialModel')
const { SendMail } = require('../mailer/Mailer')
const HtmlMessage = require('../mailer/TestimonialThankYouMailTemplate')
const AsyncHandler = require('express-async-handler')
const { today } = require('../data')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const env = process.env
const path = require('path');
const fs = require('fs');
const { UploadCropImage, RemoveFile } = require('../helper/Image')
const { Validate } = require('../helper/Validation')






const SubmitReview = AsyncHandler(async (request, response) => {
        console.log('yes')
})








module.exports = { 
    SubmitReview,
}

