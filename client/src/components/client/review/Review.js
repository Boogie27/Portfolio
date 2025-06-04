import { useState, useEffect, Fragment } from 'react'
import StarForm from './StarForm'
import ImageForm from './ImageForm'
import CommentForm from './CommentForm'
import SuccessAlert from './SuccessAlert'
import { Validate } from '../../../helper/Validation'
import { useLocation } from 'react-router-dom'
import { url } from '../../../File'
import Axios from 'axios'
import Cookies from 'js-cookie'





const Review = ({ alertNotification }) => {
  const [rating, setRating] = useState(0)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [comment, setComment] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [base64, setBase64] = useState(null)
  const [formCounter, setFormCounter] = useState(0)
  const [button, setButton] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const [emailAlert, setEmailAlert] = useState('')
  const [ratingAlert, setRatingAlert] = useState('')
  const [nameAlert, setNameAlert] = useState('')
  const [imageAlert, setImageAlert] = useState('')
  const [commentAlert, setCommentAlert] = useState('')
  const [jobTitleAlert, setJobTitleAlert] = useState('')

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const string = params.get('review')

  useEffect(() => {
    const reviewToken = Cookies.get('Elotech_review_token')
    if (!reviewToken && string === 'true') {
      setFormCounter(1)
      setShowForm(true)
    }
  }, [string])

  const toggleForm = (state) => {
    setButton(true)
    if (state === 'submit') {
      if (!base64) {
        setImageAlert('Please upload a photo!')
      } else {
        submitReview()
      }
    } else if (state === 'validate') {
      ValidateForm()
    } else if (typeof state === 'number') {
      setFormCounter(state)
    } else {
      setFormCounter(0)
      setShowForm(false)
      initialiseForm()
      initErrorAlert()
    }
    setButton(false)
  }

  const initialiseForm = () => {
    setName('')
    setBase64('')
    setRating(0)
    setEmail('')
    setComment('')
    setJobTitle('')
  }

  const initErrorAlert = () => {
    setRatingAlert('')
    setNameAlert('')
    setEmailAlert('')
    setCommentAlert('')
    setJobTitleAlert('')
    setImageAlert('')
  }

  const inputErrorForBackend = (error) => {
    setNameAlert(error.name)
    setImageAlert(error.image)
    setEmailAlert(error.email)
    setRatingAlert(error.rating)
    setJobTitleAlert(error.jobTitle)
    setCommentAlert(error.description)
  }

  const validate_input = (input) => {
    const content = [
      { field: 'name', input: input.name, maxLength: 50, minLength: 3, required: true },
      { field: 'job title', input: input.job_title, maxLength: 50, minLength: 3, required: true },
      { field: 'email', input: input.email, email: true, required: true },
      { field: 'rating', input: input.rating, required: true },
      { field: 'comment', input: input.comment, maxLength: 2000, minLength: 3, required: true }
    ]
    const validation = Validate(content)
    if (validation !== 'success') {
      validation.map((validate) => {
        if (validate.field === 'name') setNameAlert(validate.error)
        if (validate.field === 'job title') setJobTitleAlert(validate.error)
        if (validate.field === 'email') setEmailAlert(validate.error)
        if (validate.field === 'rating') setRatingAlert(validate.error)
        if (validate.field === 'comment') setCommentAlert(validate.error)
        return false
      })
      return false
    }
    return 'success'
  }

  const ValidateForm = () => {
    initErrorAlert()
    const content = { name, rating, email, job_title: jobTitle, comment }
    const validate = validate_input(content)
    if (validate !== 'success') return
    setButton(false)
    setFormCounter(3)
  }

  const submitReview = () => {
    setButton(true)
    initErrorAlert()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('rating', rating)
    formData.append('email', email)
    formData.append('job_title', jobTitle)
    formData.append('image', base64)
    formData.append('description', comment)

    Axios.post(url('/api/client/submit-review'), formData).then((response) => {
      const data = response.data
      if (data.status === 'input-error') {
        const error = data.validationError
        if (error.email || error.jobTitle || error.name || error.description) {
          setFormCounter(2)
        } else if (error.rating) {
          setFormCounter(1)
        }
        setBase64('')
        inputErrorForBackend(error)
      } else if (data.status === 'error') {
        alertNotification('error', data.message)
      } else if (data.status === 'ok') {
        setFormCounter(4)
        Cookies.set('Elotech_review_token', 'review-token-set', { expires: 1825 })
      }
      setButton(false)
    }).catch(error => {
      setButton(false)
      console.log(error)
    })
  }

  return (
    <Fragment>
      {
        showForm && formCounter !== 0 && (
          <div className="review-container">
            <div className="dark-skin"></div>
            {formCounter === 1 && <StarForm toggleForm={toggleForm} rating={rating} setRating={setRating} ratingAlert={ratingAlert} />}
            {formCounter === 2 && <CommentForm button={button} setEmail={setEmail} email={email} emailAlert={emailAlert} toggleForm={toggleForm} nameAlert={nameAlert} commentAlert={commentAlert} jobTitleAlert={jobTitleAlert} comment={comment} setComment={setComment} name={name} setName={setName} setJobTitle={setJobTitle} jobTitle={jobTitle} />}
            {formCounter === 3 && <ImageForm button={button} imageAlert={imageAlert} setBase64={setBase64} toggleForm={toggleForm} submitReview={submitReview} />}
            {formCounter === 4 && <SuccessAlert toggleForm={toggleForm} />}
          </div>
        )
      }
    </Fragment>
  )
}

export default Review
