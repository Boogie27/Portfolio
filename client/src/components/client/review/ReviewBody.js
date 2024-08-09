import StarRating from './StarRating'
import ReviewForm from './ReviewForm'
import ReviewImage from './ReviewImage'
import ReviewFormTwo from './ReviewFormTwo'
import Success from './Success'







const ReviewBody = ({
    page, togglePages, toggleForm, setRating, rating, SubmitRating, ratingAlert={ratingAlert},
    name, nameAlert, email, emailAlert, description, descriptionAlert, jobTitle, jobTitleAlert,
    setName, setJobTitle, setEmail, SubmitForm, setDescription={setDescription}
}) => {
  return (
    <div className="review-body">
        { page === 1 ? (<StarRating toggleForm={toggleForm} ratingAlert={ratingAlert} SubmitRating={SubmitRating} setRating={setRating} rating={rating}/>) : null }
        { page === 2 ? (<ReviewForm togglePages={togglePages}  SubmitForm={SubmitForm} name={name} email={email} setName={setName} setEmail={setEmail} nameAlert={nameAlert} emailAlert={emailAlert}/>) : null }
        { page === 3 ? (<ReviewFormTwo togglePages={togglePages} SubmitForm={SubmitForm} jobTitle={jobTitle} description={description} setJobTitle={setJobTitle} setDescription={setDescription} jobTitleAlert={jobTitleAlert} descriptionAlert={descriptionAlert} />) : null }
        { page === 4 ? (<ReviewImage togglePages={togglePages}/>) : null }
        { page === 5 ? (<Success/>) : null }
    </div>
  )
}

export default ReviewBody
