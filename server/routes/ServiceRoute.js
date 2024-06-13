
const express = require('express')
const router = express.Router()
const {
    FetchServiceHeader,
    UpdateServiceHeader,
    FetchClientServiceHeader,
} = require('../controllers/ServiceController')





// admin services route
router.get('/api/admin/fetch-services-header', FetchServiceHeader)
router.post('/api/admin/update-services-header', UpdateServiceHeader)



//  client services route
router.get('/api/cleint/fetch-services-header', FetchClientServiceHeader)




module.exports = router






