import { createSlice } from '@reduxjs/toolkit'



const testimonialSlice = createSlice({
    name: 'testimonials',
    initialState: {
        testimonials: []
    },
    reducers: {
        fetchTestimonial: (state, action) => {
            state.testimonials = action.payload.map(content => {
                return {
                    _id: content._id,
                    user_id: content.user_id,
                    name: content.name,
                    image: content.image,
                    email: content.email,
                    rating: content.rating,
                    job_title: content.job_title,
                    description: content.description,
                    is_featured: content.is_featured,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserTestimonial: (state, action) => {
            state.testimonials.push(action.payload)
        },
        toggleTestimonialFeature: (state, action) => {
            if(state.testimonials !== undefined){    
                const index = state.testimonials.findIndex(testimonial => testimonial._id === action.payload._id)
                state.testimonials[index] = action.payload
            }
        },
        deleteTestimonial: (state, action) => {
            const _id = action.payload._id
            state.testimonials = state.testimonials.filter(testimonial => testimonial._id !== _id)
        },
        UpdateTestimonial: (state, action) => {
            if(state.testimonials !== undefined){    
                const index = state.testimonials.findIndex(testimonial => testimonial._id === action.payload._id)
                state.testimonials[index] = action.payload
            }
        }
    }
})





export const {
    fetchTestimonial,
    AddUserTestimonial,
    deleteTestimonial,
    UpdateTestimonial,
    toggleTestimonialFeature,
} = testimonialSlice.actions
export default testimonialSlice.reducer







