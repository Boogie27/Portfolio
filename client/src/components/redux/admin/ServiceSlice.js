import { createSlice } from '@reduxjs/toolkit'



const serviceSlice = createSlice({
    name: 'services',
    initialState: {
        services: []
    },
    reducers: {
        fetchUserServices: (state, action) => {
            state.services = action.payload.map(content => {
                return {
                    _id: content._id,
                    user_id: content.user_id,
                    title: content.title,
                    text: content.text,
                    is_featured: content._id,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserServices: (state, action) => {
            state.services.push(action.payload)
        },
    }
})





export const {
    fetchUserServices,
    AddUserServices,
} = serviceSlice.actions
export default serviceSlice.reducer







