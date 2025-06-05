


const express = require('express')
const router = express.Router()
const {
   AddNewCV,
   DeleteCv,
   UpdateCV,
   FetchUserCv,
   ToggleUserCvFeature,
} = require('../controllers/CVController')






// admin cv routers
router.post('/api/admin/add-new-cv', AddNewCV)
router.post('/api/admin/update-user-cv', UpdateCV)
router.post('/api/admin/delete-user-cv', DeleteCv)
router.get('/api/admin/fetch-user-cv/:token', FetchUserCv)
router.post('/api/admin/toggle-cv-feature', ToggleUserCvFeature)






module.exports = router






















