import { createSlice } from '@reduxjs/toolkit'



const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: []
    },
    reducers: {
        getContacts: (state, action) => {
            state.contacts = action.payload.map(contact => {
                return {
                    _id: contact._id,
                    is_seen: contact.is_seen,
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    country: contact.country,
                    message: contact.message,
                    created_at: contact.created_at,
                    updated_at: contact.updated_at
                }
            })
        },
        deleteContactMessage: (state, action) => {
            const _id = action.payload._id
            state.contacts = state.contacts.filter(contact => contact._id !== _id)
        },
        UpdateContactMessage: (state, action) => {
            if(state.contacts !== undefined){    
                const index = state.contacts.findIndex(contact => contact._id === action.payload._id)
                state.contacts[index] = action.payload
            }
        }
    }
})





export const {
    getContacts,
    deleteContactMessage,
    UpdateContactMessage,
} = contactSlice.actions
export default contactSlice.reducer







