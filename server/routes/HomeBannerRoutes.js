
const express = require('express')
const router = express.Router()
const {
    AddHomeBanner,
    FetchHomeBanner,
    UploadHomeBanner,
    FetchClientHomeBanner,
    CheckIfServerIsReady,
    UploadImageFile,
} = require('../controllers/HomeBannerController')





// admin home route
router.get('/api/admin/fetch-home-banners/:token', FetchHomeBanner)
router.post('/api/admin/upload-home-banner-image', UploadHomeBanner)
router.post('/api/admin/add-home-client-banner', AddHomeBanner)

// example file upload
router.post('/api/admin/upload-image-link', UploadImageFile)




//  client routes
router.get('/api/client/fetch-home-banners', FetchClientHomeBanner)



// check if server is ready and remove preloader
router.get('/api/client/check-server-ready', CheckIfServerIsReady)





module.exports = router






