import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'






const StarRating = ({toggleForm}) => {
  return (
    <div className="review-star-rating">
        <div className="title-header">
            <h3>RATE OUR SERVICE</h3>
            <FontAwesomeIcon onClick={() => toggleForm(false)} className="icon" icon={faTimes} />
        </div>
        <div className="review-star-body">
            <p>
                Your review would help to showcase our work to the target audience and also promot our work to future clients.
            </p>
            <div className="stars">
                <FontAwesomeIcon className="star active" icon={faStar} />
                <FontAwesomeIcon className="star active" icon={faStar} />
                <FontAwesomeIcon className="star active" icon={faStar} />
                <FontAwesomeIcon className="star" icon={faStar} />
                <FontAwesomeIcon className="star" icon={faStar} />
            </div>
        </div>
        <div className="button">
            <button type="button">SUBMIT</button>
        </div>
    </div>
  )
}

export default StarRating
