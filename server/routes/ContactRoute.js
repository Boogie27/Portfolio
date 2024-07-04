
const express = require('express')
const router = express.Router()
const {
    UpdateContactHeader,
    FetchContactHeader,
    FetchClientContactMe,
    SendClientContactMessage,
    FetchContactMessages,
    DeleteContactMessage,
    OpenContactMessage,
} = require('../controllers/ContactController')





// admin services route
router.get('/api/admin/fetch-user-contact-header/:token', FetchContactHeader)
router.get('/api/admin/fetch-contacts-messages/:token', FetchContactMessages)
router.post('/api/admin/update-contact-header', UpdateContactHeader)
router.post('/api/admin/delete-contact-messages', DeleteContactMessage)
router.post('/api/admin/open-contacts-messages', OpenContactMessage)




//  client services route
router.get('/api/cleint/fetch-client-contact-me', FetchClientContactMe)
router.post('/api/admin/send-client-contact-message', SendClientContactMessage)



module.exports = router






