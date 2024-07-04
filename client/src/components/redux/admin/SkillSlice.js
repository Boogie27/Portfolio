import { createSlice } from '@reduxjs/toolkit'



const skillSlice = createSlice({
    name: 'skills',
    initialState: {
        skills: []
    },
    reducers: {
        getUserSkills: (state, action) => {
            state.skills = action.payload.map(content => {
                return {
                    _id: content._id,
                    user_id: content.user_id,
                    title: content.title,
                    image: content.image,
                    rating: content.rating,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserSkill: (state, action) => {
            state.skills.push(action.payload)
        },
        deleteUserSkill: (state, action) => {
            const _id = action.payload._id
            state.skills = state.skills.filter(skill => skill._id !== _id)
        },
    }
})





export const {
    getUserSkills,
    AddUserSkill,
    deleteUserSkill,
} = skillSlice.actions
export default skillSlice.reducer







