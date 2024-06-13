import { createSlice } from '@reduxjs/toolkit'



const serviceSlice = createSlice({
    name: 'serviceHeaders',
    initialState: {
        serviceHeaders: []
    },
    reducers: {
        getServiceHeader: (state, action) => {
                state.serviceHeaders = action.payload
            }
    }
})





export const {
    getServiceHeader,
} = serviceSlice.actions
export default serviceSlice.reducer







