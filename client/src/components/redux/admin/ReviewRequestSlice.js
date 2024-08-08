import { createSlice } from '@reduxjs/toolkit'



const reviewRequestSlice = createSlice({
    name: 'reviewRequests',
    initialState: {
        reviewRequests: []
    },
    reducers: {
        getReviewRequest: (state, action) => {
            state.reviewRequests = action.payload.map(content => {
                return {
                    _id: content._id,
                    name: content.name,
                    email: content.email,
                    project: content.project,
                    completed_at: content.completed_at,
                    is_completed: content.is_completed,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddReviewRequest: (state, action) => {
            state.reviewRequests.push(action.payload)
        },
        deleteReviewRequest: (state, action) => {
            const _id = action.payload._id
            state.reviewRequests = state.reviewRequests.filter(reviewRequest => reviewRequest._id !== _id)
        },
        UpdateReviewRequest: (state, action) => {
            if(state.reviewRequests !== undefined){    
                const index = state.reviewRequests.findIndex(reviewRequest => reviewRequest._id === action.payload._id)
                state.reviewRequests[index] = action.payload
            }
        }
    }
})





export const {
    getReviewRequest,
    AddReviewRequest,
    deleteReviewRequest,
    UpdateReviewRequest,
} = reviewRequestSlice.actions
export default reviewRequestSlice.reducer







