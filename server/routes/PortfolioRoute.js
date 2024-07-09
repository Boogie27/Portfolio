


const express = require('express')
const router = express.Router()
const {
    UpdatePortfolioHeader,
    FetchPortfolioHeader,
} = require('../controllers/PortfolioController')





// admin portifolio route
router.get('/api/admin/fetchportifolio-header/:token', FetchPortfolioHeader)
router.post('/api/admin/update-portfolio-header', UpdatePortfolioHeader)






module.exports = router


