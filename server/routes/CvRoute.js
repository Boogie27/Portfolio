


const express = require('express')
const router = express.Router()
const {
   AddNewCV,
   DeleteCv,
   UpdateCV,
   FetchUserCv,
   FetchClientUserCv,
   ToggleUserCvFeature,
   DownLoadClientUserCv,
} = require('../controllers/CVController')






// admin cv routers
router.post('/api/admin/add-new-cv', AddNewCV)
router.post('/api/admin/update-user-cv', UpdateCV)
router.post('/api/admin/delete-user-cv', DeleteCv)
router.get('/api/admin/fetch-user-cv/:token', FetchUserCv)
router.post('/api/admin/toggle-cv-feature', ToggleUserCvFeature)





// ************** CLIENT SECTION **************
router.get('/api/client/fetch-user-cv', FetchClientUserCv)
router.post('/api/client/download-user-cv', DownLoadClientUserCv)


module.exports = router






















