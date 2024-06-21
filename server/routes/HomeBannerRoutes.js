
const express = require('express')
const router = express.Router()
const {
    AddHomeBanner,
    FetchHomeBanner,
    UploadHomeBanner,
    FetchClientHomeBanner,
} = require('../controllers/HomeBannerController')





// admin home route
router.get('/api/admin/fetch-home-banners/:token', FetchHomeBanner)
router.post('/api/admin/upload-home-banner-image', UploadHomeBanner)
router.post('/api/admin/add-home-client-banner', AddHomeBanner)



//  client routes
router.get('/api/client/fetch-home-banners', FetchClientHomeBanner)

module.exports = router






