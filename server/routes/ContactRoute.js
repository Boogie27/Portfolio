
const express = require('express')
const router = express.Router()
const {
    UpdateContactHeader,
    FetchContactHeader,
    FetchClientContactMe,
} = require('../controllers/ContactController')





// admin services route
router.get('/api/admin/fetch-user-contact-header/:token', FetchContactHeader)
router.post('/api/admin/update-contact-header', UpdateContactHeader)





//  client services route
router.get('/api/cleint/fetch-client-contact-me', FetchClientContactMe)




module.exports = router






