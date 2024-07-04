

const express = require('express')
const router = express.Router()
const {
    LoginAdminUser,
    FetchLoginAdminUser,
    ToggleAdminUserAppTheme,
} = require('../controllers/UserController')





// admin user route

router.post('/api/admin/login-user', LoginAdminUser)
router.post('/api/admin/toggle-admin-app-theme', ToggleAdminUserAppTheme)
router.get('/api/admin/fetch-active-user/:token', FetchLoginAdminUser)





module.exports = router


















