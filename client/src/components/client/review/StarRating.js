import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import FormInputAlert from '../alert/FormInputAlert'





const StarRating = ({toggleForm, SubmitRating, ratingAlert, setRating, rating}) => {


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
            {[...Array(5)].map((current, index) => (<FontAwesomeIcon key={index} onClick={(e) => setRating(index + 1)} className={`star ${index <= rating - 1 ? 'active' : ''}`} icon={faStar} /> ))}
             <FormInputAlert alert={ratingAlert}/>
            </div>
        </div>
        
        <div className="button">
            <button onClick={() => SubmitRating()} type="button">NEXT</button>
        </div>
    </div>
  )
}

export default StarRating
