

const express = require('express')
const router = express.Router()
const {
    LoginAdminUser,
    FetchLoginAdminUser,
} = require('../controllers/UserController')





// admin user route

router.post('/api/admin/login-user', LoginAdminUser)
router.get('/api/admin/fetch-active-user/:token', FetchLoginAdminUser)





module.exports = router


















