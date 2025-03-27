
const express = require('express')
const router = express.Router()
const {
    DeleteTestimonial,
    FetchTestimonials,
    AddNewTestimonial,
    FetchClientReviewToken,
    UpdateTestimonialHeader,
    FetchTestimonialHeader,
    UpdateUserTestimonial,
    FetchClientTestimonials,
    AddNewClientTestimonial,
    FetchClientTestimonialHeader,
    ToggleUserTestimonialFeature,
} = require('../controllers/TestimonialController')





// admin testimonial routes***************************************************
router.post('/api/admin/update-testimonial-header', UpdateTestimonialHeader)
router.get('/api/admin/fetch-testimonial-header/:token', FetchTestimonialHeader)
router.get('/api/admin/fetch-user-testimonials/:token', FetchTestimonials)
router.post('/api/admin/add-new-testimonnial', AddNewTestimonial)
router.post('/api/admin/toggle-testimonial-feature', ToggleUserTestimonialFeature)
router.post('/api/admin/delete-user-testimonial', DeleteTestimonial)
router.post('/api/admin/edit-user-testimonnial', UpdateUserTestimonial)





// client testimonial route***************************************************
router.get('/api/client/fetch-client-user-testimonial-header', FetchClientTestimonialHeader)
router.get('/api/client/fetch-client-user-testimonials', FetchClientTestimonials)
router.post('/api/client/client-add-new-testimonnial', AddNewClientTestimonial)
router.get('/api/client/check-token-review-requests/:token', FetchClientReviewToken)






module.exports = router






























