


const express = require('express')
const router = express.Router()
const {
    AddNewPortfolio,
    DeleteUserPortfolio,
    FetchUserPortfolios,
    UpdatePortfolioHeader,
    FetchPortfolioHeader,
    UpdateUserPortfolio,
    AddUserPortfolioImage,
    EditUserPortfolioImage,
    DeleteUserPortfolioImage,
    FetchClientUserPortfolios,
    ToggleFeaturedUserPortfolio,
    FetchClientUserPortfolioHeader,
} = require('../controllers/PortfolioController')





// admin portifolio route
router.get('/api/admin/fetch-user-portfolios/:token', FetchUserPortfolios)
router.get('/api/admin/fetchportifolio-header/:token', FetchPortfolioHeader)
router.post('/api/admin/update-portfolio-header', UpdatePortfolioHeader)
router.post('/api/admin/add-new-portfolio', AddNewPortfolio)
router.post('/api/admin/delete-user-portfolio', DeleteUserPortfolio)
router.post('/api/admin/edit-user-portfolio', UpdateUserPortfolio)
router.post('/api/admin/toggle-portfolio-feature', ToggleFeaturedUserPortfolio)
router.post('/api/admin/add-user-portfolio-image', AddUserPortfolioImage)
router.post('/api/admin/edit-user-portfolio-image', EditUserPortfolioImage)
router.post('/api/admin/delete-user-portfolio-image', DeleteUserPortfolioImage)











// **************** CLIENT ROUTER *****************
router.get('/api/fetch-client-user-portfolio', FetchClientUserPortfolios)
router.get('/api/fetch-client-user-portfolio-header', FetchClientUserPortfolioHeader)









module.exports = router


