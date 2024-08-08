import { useState } from 'react'
import { Fragment } from 'react'
import ReviewBody from './ReviewBody'




const Review = () => {
    const [page, setPage] = useState(0)
    const [formState, setFormState] = useState(false)

    // toggle show form or off
    const toggleForm = (state) => {
        setFormState(state)
    }
    // display different form pages
    const togglePages = (state) => {
        setPage(state)
    }

    return (
        <Fragment>
            {
                formState ? (
                    <div className="app-review-container">
                        <div className="dark-skin"></div>
                        <ReviewBody page={page} toggleForm={toggleForm} togglePages ={togglePages}/>
                    </div>
                ) : null
            }
            
        </Fragment>
    )
}

export default Review
