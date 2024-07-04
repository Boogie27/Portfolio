const express = require('express')
const router = express.Router()
const {
    AddNewSkills,
    FetchSkillsHeader,
    FetchUserSkills,
    DeleteUserSkills,
    UpdateUserSkillsHeader
} = require('../controllers/SkillsController')





// admin skills routes
router.get('/api/admin/fetch-skills-header/:token', FetchSkillsHeader)
router.post('/api/admin/update-skills-header', UpdateUserSkillsHeader)
router.get('/api/admin/fetch-user-skills/:token', FetchUserSkills)
router.post('/api/admin/add-new-skills', AddNewSkills)
router.post('/api/admin/delete-user-skills', DeleteUserSkills)




module.exports = router


















