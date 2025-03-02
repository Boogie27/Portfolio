import { createSlice } from '@reduxjs/toolkit'



const qualificationSlice = createSlice({
    name: 'qualifications',
    initialState: {
        qualifications: []
    },
    reducers: {
        getUserQualifications: (state, action) => {
            state.qualifications = action.payload.map(content => {
                return {
                    _id: content._id,
                    user_id: content.user_id,
                    title: content.title,
                    from: content.from,
                    to: content.to,
                    text: content.text,
                    is_featured: content.is_featured,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserQualification: (state, action) => {
            state.qualifications.push(action.payload)
        },
        deleteUserQualification: (state, action) => {
            const _id = action.payload._id
            state.qualifications = state.qualifications.filter(qualification => qualification._id !== _id)
        },
        UpdateUserQualification: (state, action) => {
            if(state.qualifications !== undefined){    
                const index = state.qualifications.findIndex(qualification => qualification._id === action.payload._id)
                state.qualifications[index] = action.payload
            }
        },
        toggleUserQualificationFeature: (state, action) => {
            if(state.qualifications !== undefined){    
                const index = state.qualifications.findIndex(qualification => qualification._id === action.payload._id)
                state.qualifications[index] = action.payload
            }
        },
    }
})





export const {
    getUserQualifications,
    AddUserQualification,
    deleteUserQualification,
    UpdateUserQualification,
    toggleUserQualificationFeature,
} = qualificationSlice.actions
export default qualificationSlice.reducer







