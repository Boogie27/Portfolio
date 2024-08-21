const express = require('express')
const router = express.Router()
const {
    SendReviewRequest,
    FetchUserReviewRequest,
    UpdateReviewRequest,
    DeleteReviewRequest,
} = require('../controllers/ReviewRequestController')





// admin review request routes***************************************************
router.get('/api/admin/fetch-user-review-requests/:token', FetchUserReviewRequest)
router.post('/api/admin/send-review-request', SendReviewRequest)
router.post('/api/admin/update-review-request', UpdateReviewRequest)
router.post('/api/admin/delete-review-request', DeleteReviewRequest)








module.exports = router





























