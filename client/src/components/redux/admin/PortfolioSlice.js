import { createSlice } from '@reduxjs/toolkit'



const portfolioSlice = createSlice({
    name: 'portfolios',
    initialState: {
        portfolios: []
    },
    reducers: {
        getUserPortfolios: (state, action) => {
            state.portfolios = action.payload.map(content => {
                return {
                    _id: content._id,
                    user_id: content.user_id,
                    title: content.title,
                    image: content.image,
                    order: content.order,
                    description: content.description,
                    technologies: content.technologies,
                    from_month: content.from_month,
                    from_year: content.from_year,
                    to_month: content.to_month,
                    to_year: content.to_year,
                    is_featured: content.is_featured,
                    created_at: content.created_at,
                    updated_at: content.updated_at
                }
            })
        },
        AddUserPortfolio: (state, action) => {
            state.portfolios.push(action.payload)
        },
        deleteUserPortfolio: (state, action) => {
            const _id = action.payload._id
            state.portfolios = state.portfolios.filter(portfolio => portfolio._id !== _id)
        },
        UpdateUserPortfolio: (state, action) => {
            if(state.portfolios !== undefined){    
                const index = state.portfolios.findIndex(portfolio => portfolio._id === action.payload._id)
                state.portfolios[index] = action.payload
            }
        }
    }
})





export const {
    getUserPortfolios,
    AddUserPortfolio,
    deleteUserPortfolio,
    UpdateUserPortfolio,
} = portfolioSlice.actions
export default portfolioSlice.reducer







