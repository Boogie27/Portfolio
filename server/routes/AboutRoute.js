
const express = require('express')
const router = express.Router()
const {
    FetchUserAbout,
    UpdateUserAbout,
    FetchClientAbout,
    UpLoadUserImage,
} = require('../controllers/AboutController')





// admin services route
router.get('/api/admin/fetch-user-about/:token', FetchUserAbout)
router.post('/api/admin/update-user-about', UpdateUserAbout)
router.post('/api/admin/upload-about-user-image', UpLoadUserImage)





//  client services route
router.get('/api/cleint/fetch-client-about', FetchClientAbout)




module.exports = router






