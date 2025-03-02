import { createSlice } from '@reduxjs/toolkit'



const bannerSlice = createSlice({
    name: 'homeBanners',
    initialState: {
        homeBanners: []
    },
    reducers: {
        fetchHomeBanners: (state, action) => {
                state.homeBanners = action.payload
            }
    }
})





export const {
    fetchHomeBanners,
} = bannerSlice.actions
export default bannerSlice.reducer







