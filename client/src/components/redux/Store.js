import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import userReducer from './admin/UserSlice'
import contactReducer from './admin/ContactSlice'
import serviceReducer from './admin/ServiceSlice'
import slillReducer from './admin/SkillSlice'
import qualificationReducer from './admin/QualificationSlice'
import portfolioReducer from './admin/PortfolioSlice'
import testimonialReducer from './admin/TestimonialSlice'
import reviewRequestReducer from './admin/ReviewRequestSlice'










const store = configureStore({
    reducer: {
        userReducer: userReducer,
        homeBanners: bannerReducer,
        services: serviceReducer,
        contacts: contactReducer,
        skills: slillReducer,
        portfolios: portfolioReducer,
        qualifications: qualificationReducer,
        testimonials: testimonialReducer,
        reviewRequests: reviewRequestReducer,
    }
})


export default store






