

const express = require('express')
const router = express.Router()
const {
    LoginAdminUser,
} = require('../controllers/UserController')





// admin user route

router.post('/api/admin/login-user', LoginAdminUser)





module.exports = router


















