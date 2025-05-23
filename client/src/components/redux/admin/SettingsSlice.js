import { createSlice } from '@reduxjs/toolkit'



const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        settings: []
    },
    reducers: {
        fetchAppSettings: (state, action) => {
            if(state.settings !== undefined){   
                state.settings = action.payload
            }
        },
        UpdateAppSettings: (state, action) => {
            state.settings = action.payload
        }
    }
})





export const {
    fetchAppSettings,
    UpdateAppSettings,
} = settingsSlice.actions
export default settingsSlice.reducer







