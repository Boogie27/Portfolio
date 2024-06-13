import { configureStore } from '@reduxjs/toolkit'
import bannerReducer from './admin/BannerSlice'
import serviceReducer from './admin/ServiceSlice'












const store = configureStore({
    reducer: {
       homeBanners: bannerReducer,
       serviceHeaders: serviceReducer,
    }
})


export default store






