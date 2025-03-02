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
                    is_featured: content.is_featured,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserServices: (state, action) => {
            state.services.push(action.payload)
        },
        toggleUserServicesFeature: (state, action) => {
            if(state.services !== undefined){    
                const index = state.services.findIndex(service => service._id === action.payload._id)
                state.services[index] = action.payload
            }
        },
        deleteUserServices: (state, action) => {
            const _id = action.payload._id
            state.services = state.services.filter(service => service._id !== _id)
        },
        UpdateUserServices: (state, action) => {
            if(state.services !== undefined){    
                const index = state.services.findIndex(service => service._id === action.payload._id)
                state.services[index] = action.payload
            }
        }
    }
})





export const {
    fetchUserServices,
    AddUserServices,
    deleteUserServices,
    UpdateUserServices,
    toggleUserServicesFeature,
} = serviceSlice.actions
export default serviceSlice.reducer







