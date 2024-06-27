import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import userReducer from './admin/UserSlice'
import serviceReducer from './admin/ServiceSlice'











const store = configureStore({
    reducer: {
        userReducer: userReducer,
        homeBanners: bannerReducer,
        services: serviceReducer
    }
})


export default store






