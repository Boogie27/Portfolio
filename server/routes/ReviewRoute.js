const express = require('express')
const router = express.Router()
const {
    SubmitReview,
} = require('../controllers/ReviewController')





// client review request routes***************************************************
router.post('/api/client/submit-review', SubmitReview)








module.exports = router





























