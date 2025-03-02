import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import userReducer from './admin/UserSlice'
import contactReducer from './admin/ContactSlice'
import serviceReducer from './admin/ServiceSlice'
import slillReducer from './admin/SkillSlice'
import qualificationReducer from './admin/QualificationSlice'
import portfolioReducer from './admin/PortfolioSlice'










const store = configureStore({
    reducer: {
        userReducer: userReducer,
        homeBanners: bannerReducer,
        services: serviceReducer,
        contacts: contactReducer,
        skills: slillReducer,
        portfolios: portfolioReducer,
        qualifications: qualificationReducer,
    }
})


export default store






