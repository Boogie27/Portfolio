import StarRating from './StarRating'
import ReviewForm from './ReviewForm'
import ReviewImage from './ReviewImage'







const ReviewBody = ({page, togglePages, toggleForm}) => {
  return (
    <div className="review-body">
        { page === 1 ? (<StarRating toggleForm={toggleForm}/>) : null }
        { page === 2 ? (<ReviewForm togglePages={togglePages}/>) : null }
        { page === 3 ? (<ReviewImage togglePages={togglePages}/>) : null }
    </div>
  )
}

export default ReviewBody
