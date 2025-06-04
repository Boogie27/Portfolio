import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'






const StarForm = ({ rating, toggleForm, setRating}) => {
   





    return (
        <div className="review-form star-form-container">
            <CancelButton toggleForm={toggleForm}/>
            <TitleHeader/>
            <Stars rating={rating} setRating={setRating}/>
            <ActionButton rating={rating} toggleForm={toggleForm}/>
        </div>
    )
}


export default StarForm



const CancelButton = ({toggleForm }) => {
    return (
        <div className="cancel-button">
           <FontAwesomeIcon onClick={() => toggleForm(0)} className="icon" icon={faArrowLeft} />
        </div>
    )
}



const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>STAR RATINGS</h3>
            <p>Please kindly rate your experience with us?</p>
        </div>
    )
}


const Stars = ({ rating, setRating}) => {
    return (
        <div className="stars-container">
            <span className="rating">
                {
                [...Array(5)].map((current, index) => (
                    <FontAwesomeIcon key={index}  onClick={(e) => setRating(index + 1)} className={`star ${index <= rating - 1 ? 'active' : ''}`} icon={faStar} /> 
                ))
                }
                <span>{rating}/5</span> 
            </span>
        </div>
    )
}




const ActionButton = ({ rating, toggleForm}) => {
    return (
        <div className="action-button">
           <button disabled={rating === 0} onClick={() => toggleForm(2)} type="button">
                NEXT
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
            </button>
        </div>
    )
}


