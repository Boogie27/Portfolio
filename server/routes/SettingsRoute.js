



const express = require('express')
const router = express.Router()
const {
    UpdateAppUserSettings,
    FetchAppUserSettings,
    FetchAppClientSettings,
} = require('../controllers/SettingsController')





// admin user route

router.post('/api/admin/update-app-settings', UpdateAppUserSettings)
router.get('/api/admin/fetch-user-footer-settings/:token', FetchAppUserSettings)




// ************** CLIENT SECTION **************
router.get('/api/cleint/fetch-client-footer', FetchAppClientSettings)




module.exports = router


