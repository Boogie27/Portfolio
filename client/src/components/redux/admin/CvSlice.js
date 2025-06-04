import { createSlice } from '@reduxjs/toolkit'



const CvSlice = createSlice({
    name: 'cvs',
    initialState: {
        cvs: []
    },
    reducers: {
        getUserCv: (state, action) => {
            state.cvs = action.payload.map(content => {
                return {
                    _id: content._id,
                    cv_title: content.cv_title,
                    cv: content.cv,
                    download_count: content.download_count,
                    is_featured: content.is_featured,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserCv: (state, action) => {
            state.cvs.push(action.payload)
        },
         toggleCvFeature: (state, action) => {
                if(state.cvs !== undefined){    
                const index = state.cvs.findIndex(cv => cv._id === action.payload._id)
                state.cvs[index] = action.payload
            }
        },
        deleteCv: (state, action) => {
            const _id = action.payload._id
            state.cvs = state.cvs.filter(cv => cv._id !== _id)
        },
        UpdateCv: (state, action) => {
            if(state.cvs !== undefined){    
                const index = state.cvs.findIndex(cv => cv._id === action.payload._id)
                state.cvs[index] = action.payload
            }
        },
    }
})





export const {
   AddUserCv,
   getUserCv,
   deleteCv,
   UpdateCv,
   toggleCvFeature,
} = CvSlice.actions
export default CvSlice.reducer







