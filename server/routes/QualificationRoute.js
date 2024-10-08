const express = require('express')
const router = express.Router()
const {
    AddNewQualification,
    FetchUserQualifications,
    DeleteUserQualification,
    UpdateUserQualification,
    FetchClientQualifications,
    UpdateQualificationHeader,
    FetchQualificationHeader,
    ToggleUserQualificationFeature,
    FetchClientQualificationHeader,
} = require('../controllers/QualificationController')





// admin qualifications routes***************************************************
router.get('/api/admin/fetch-qualification-header/:token', FetchQualificationHeader)
router.get('/api/admin/fetch-user-qualification/:token', FetchUserQualifications)
router.post('/api/admin/add-new-qualification', AddNewQualification)
router.post('/api/admin/toggle-qualification-feature', ToggleUserQualificationFeature)
router.post('/api/admin/delete-user-qualification', DeleteUserQualification)
router.post('/api/admin/edit-user-qualification', UpdateUserQualification)
router.post('/api/admin/update-qualification-header', UpdateQualificationHeader)








// client qualifications route***************************************************
router.get('/api/admin/fetch-client-user-qualification', FetchClientQualifications)
router.get('/api/client/fetch-client-qualification-header', FetchClientQualificationHeader)







module.exports = router























