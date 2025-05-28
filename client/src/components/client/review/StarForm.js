import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'






const StarForm = ({rating, setRating}) => {
   





    return (
        <div className="review-form star-form-container">
            <CancelButton/>
            <TitleHeader/>
            <Stars rating={rating} setRating={setRating}/>
            <ActionButton/>
        </div>
    )
}


export default StarForm



const CancelButton = () => {
    return (
        <div className="cancel-button">
           <FontAwesomeIcon className="icon" icon={faArrowLeft} />
        </div>
    )
}



const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>STAR RATINGS</h3>
            <p>Please kindly tell us how was your experience with us?</p>
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
                0/5
            </span>
        </div>
    )
}




const ActionButton = () => {
    return (
        <div className="action-button">
            <button type="button">
                NEXT
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
            </button>
        </div>
    )
}


