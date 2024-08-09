import { useState } from 'react'
import { Fragment } from 'react'
import ReviewBody from './ReviewBody'
import { Validate } from '../../../helper/Validation'







const Review = () => {
    const [page, setPage] = useState(5)
    const [formState, setFormState] = useState(true)
    const [rating, setRating] = useState(0)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [description, setDescription] = useState('')

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    // toggle show form or off
    const toggleForm = (state) => {
        setFormState(state)
    }
    // display different form pages
    const togglePages = (state) => {
        setPage(state)
    }
    // star rating
    const SubmitRating = () => {
        if(rating === 0){
           return setRatingAlert('Star Rating is required!')
        }
        setRatingAlert('')
        return setPage(2)
    }

    // submit review form 
    const SubmitForm = (form) => {
        let content = ''
        if(form === 'form-one'){
            content = [
                { field: 'name', input: name, maxLength: 50, minLength: 3, required: true },
                { field: 'email', input: email, email: true, required: true },
            ]
        }else if(form === 'form-two'){
            content = [
                { field: 'job title', input: jobTitle, maxLength: 50, minLength: 3, required: true },
                { field: 'description', input: description, maxLength: 1000, minLength: 3, required: true },
            ]
        }
        
        const validation = Validate(content)
        if(validation !== 'success'){
            validation.map((validate) => {
                if(validate.field === 'name'){setNameAlert(validate.error) }
                if(validate.field === 'email'){setEmailAlert(validate.error)}
                if(validate.field === 'job title'){setJobTitleAlert(validate.error) }
                if(validate.field === 'description'){setDescriptionAlert(validate.error)}
                return false
            })
            return false
        }else{
            if(form === 'form-one' && validation === 'success'){
                return setPage(3)
            }
            if(form === 'form-two' && validation === 'success'){
                return setPage(4)
            }
            return 'success'
        }
    }



    return (
        <Fragment>
            {
                formState ? (
                    <div className="app-review-container">
                        <div className="dark-skin"></div>
                        <ReviewBody 
                            page={page} toggleForm={toggleForm} togglePages ={togglePages} setRating={setRating} rating={rating}
                            SubmitRating={SubmitRating} ratingAlert={ratingAlert} name={name} jobTitle={jobTitle} email={email} description={description}
                            nameAlert={nameAlert} jobTitleAlert={jobTitleAlert} emailAlert={emailAlert} descriptionAlert={descriptionAlert}
                            setName={setName} setEmail={setEmail} setJobTitle={setJobTitle} setDescription={setDescription} SubmitForm={SubmitForm}
                        />
                    </div>
                ) : null
            }
            
        </Fragment>
    )
}

export default Review
