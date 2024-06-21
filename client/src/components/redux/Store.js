import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import serviceReducer from './admin/ServiceSlice'
import userReducer from './admin/UserSlice'












const store = configureStore({
    reducer: {
        userReducer: userReducer,
        homeBanners: bannerReducer,
        serviceHeaders: serviceReducer,
    }
})


export default store






