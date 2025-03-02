
const express = require('express')
const router = express.Router()
const {
    UpdateTestimonialHeader,
    FetchTestimonialHeader,
    FetchClientTestimonialHeader,
} = require('../controllers/TestimonialController')





// admin testimonial routes***************************************************
router.post('/api/admin/update-testimonial-header', UpdateTestimonialHeader)
router.get('/api/admin/fetch-testimonial-header/:token', FetchTestimonialHeader)



// client testimonial route***************************************************
router.get('/api/client/fetch-client-user-testimonial-header', FetchClientTestimonialHeader)








module.exports = router






























