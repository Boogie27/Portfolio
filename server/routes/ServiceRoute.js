
const express = require('express')
const router = express.Router()
const {
    AddNewService,
    FetchUserServices,
    FetchServiceHeader,
    UpdateServiceHeader,
    DeleteUserServices,
    FetchClientServices,
    UpdateUserServices,
    FetchClientServiceHeader,
    ToggleUserServicesFeature,
} = require('../controllers/ServiceController')





// admin services route
router.get('/api/admin/fetch-services-header', FetchServiceHeader)
router.post('/api/admin/update-services-header', UpdateServiceHeader)
router.post('/api/admin/add-new-service', AddNewService)
router.get('/api/admin/fetch-user-services/:token', FetchUserServices)
router.post('/api/admin/toggle-user-services-feature', ToggleUserServicesFeature)
router.post('/api/admin/edit-user-services', UpdateUserServices)
router.post('/api/admin/delete-user-services', DeleteUserServices)





//  client services route
router.get('/api/cleint/fetch-services', FetchClientServices)
router.get('/api/cleint/fetch-services-header', FetchClientServiceHeader)




module.exports = router






