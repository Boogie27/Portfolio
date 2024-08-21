import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { Fragment } from 'react'
import ReviewBody from './ReviewBody'
import { url } from '../../../File'
import { useLocation, useNavigate  } from 'react-router-dom';
import { Validate } from '../../../helper/Validation'







const Review = ({loader, isAppReady}) => {
    const [page, setPage] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search)
    const params = queryParams.has('review-service') // check if url parameter exists

    const FetchReviewRequestsRef= useRef(null)
    const [formState, setFormState] = useState(false)
    const [rating, setRating] = useState('')
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [wordCount, setWordCount] = useState(0)
    const [jobTitle, setJobTitle] = useState('')
    const [description, setDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [ratingAlert, setRatingAlert] = useState(0)
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    // toggle show form or off
    const toggleForm = (state) => {
        if(state === false){
            setPage(0)
            setFormState(false)
            navigate('/'); // Navigates to the home page
        }
        setFormState(state)
    }
    // display different form pages
    const togglePages = (state) => {
        setPage(state)
    }
    // star rating
    const SubmitRating = () => {
        if(rating === 0 || rating === ''){
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
                { field: 'description', input: description, wordCount: 50, minLength: 3,  required: true },
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


    const SubmitReview = () => {
        if(image === ''){
            return setErrorMessage('Image field is required!')
        }
        setErrorMessage('')
        if(!params){
            setFormState(false)
            navigate('/') // Navigates to the home page
        }else{
            loader(true, 'Please waiting....')
            const token = queryParams.get('review-service')
            const formData = new FormData()
            formData.append('image', image)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('token', token)
            formData.append('job_title', jobTitle)
            formData.append('rating', rating)
            formData.append('description', description)
            Axios.post(url('/api/client/client-add-new-testimonnial'), formData).then((response) => {
                const data = response.data
                if(data.status === 'token-error' || data.status === 'completed'){
                    setFormState(false)
                    navigate('/'); // Navigates to the home page
                }else if(data.status === 'input-error'){
                    const error = data.validationError
                    if(error.rating){
                        setPage(1) 
                    }else if(error.name || error.email){ 
                        setPage(2) 
                    }else if(error.jobtitle || error.description){
                        setPage(3) 
                    }
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    setErrorMessage('error', data.message)
                }else if(data.status === 'ok'){
                    setPage(5)
                    initFormInput() //init fields
                }else{
                    console.log(data.catchError)
                }
                console.log(data)
                return loader(false)
            }).catch(error => {
                loader(false)
                console.log(error)
            })
        }
    }

     //  initialize form input
     const initFormInput = () => {
        setName('')
        setJobTitle('')
        setRating('')
        setImage('')
        setDescription('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setEmailAlert(error.email)
        setRatingAlert(error.rating)
        setJobTitleAlert(error.jobTitle)
        setDescriptionAlert(error.description)
        setErrorMessage(error.message)
    }

     // handle word count
     const handleTextChange = (string) => {
        const words = string.trim().split(/\s+/)
        const filterWords = words.filter((word) => word.length > 0)
        if(filterWords.length <= 50){
            setDescription(string)
            setWordCount(filterWords.length)
        }
    }

     // fetch token from database
     const FetchReviewRequests = () => {
        if(params){
            const token = queryParams.get('review-service')
            Axios.get(url(`/api/client/check-token-review-requests/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    setPage(1)
                    setFormState(true)
                }else if(data.status === 'failed'){
                    setPage(0)
                    setFormState(false)
                    navigate('/'); // Navigates to the home page
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }


    FetchReviewRequestsRef.current = FetchReviewRequests

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchReviewRequestsRef.current()
    }, [])

    return (
        <Fragment>
            {
                isAppReady && formState ? (
                    <div className="app-review-container">
                        <div className="dark-skin"></div>
                        <ReviewBody 
                            page={page} toggleForm={toggleForm} togglePages ={togglePages} setRating={setRating} rating={rating} image={image} setImage={setImage}
                            SubmitRating={SubmitRating} ratingAlert={ratingAlert} name={name} jobTitle={jobTitle} email={email} description={description}
                            nameAlert={nameAlert} jobTitleAlert={jobTitleAlert} emailAlert={emailAlert} descriptionAlert={descriptionAlert}
                            setName={setName} setEmail={setEmail} setJobTitle={setJobTitle} handleTextChange={handleTextChange} SubmitForm={SubmitForm}
                            errorMessage={errorMessage} setErrorMessage={setErrorMessage} SubmitReview={SubmitReview} wordCount={wordCount}
                        />
                    </div>
                ) : null
            }
            
        </Fragment>
    )
}

export default Review
