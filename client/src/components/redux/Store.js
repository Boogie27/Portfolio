import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import userReducer from './admin/UserSlice'
import contactReducer from './admin/ContactSlice'
import serviceReducer from './admin/ServiceSlice'
import slillReducer from './admin/SkillSlice'











const store = configureStore({
    reducer: {
        userReducer: userReducer,
        homeBanners: bannerReducer,
        services: serviceReducer,
        contacts: contactReducer,
        skills: slillReducer,
    }
})


export default store






