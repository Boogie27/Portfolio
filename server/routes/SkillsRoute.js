const express = require('express')
const router = express.Router()
const {
    AddNewSkills,
    FetchSkillsHeader,
    FetchUserSkills,
    DeleteUserSkills,
    EditUserSkills,
    FetchClientSkills,
    UpdateUserSkillsHeader,
    FetchClientSkillsHeader,
    ToggleUserSkillsFeature,
} = require('../controllers/SkillsController')





// admin skills routes***************************************************
router.get('/api/admin/fetch-skills-header/:token', FetchSkillsHeader)
router.post('/api/admin/update-skills-header', UpdateUserSkillsHeader)
router.get('/api/admin/fetch-user-skills/:token', FetchUserSkills)
router.post('/api/admin/add-new-skills', AddNewSkills)
router.post('/api/admin/delete-user-skills', DeleteUserSkills)
router.post('/api/admin/edit-user-skill', EditUserSkills)
router.post('/api/admin/toggle-skills-feature', ToggleUserSkillsFeature)





// client skills route***************************************************
router.get('/api/admin/fetch-client-user-skills', FetchClientSkills)
router.get('/api/admin/fetch-client-user-skills-header', FetchClientSkillsHeader)








module.exports = router


















