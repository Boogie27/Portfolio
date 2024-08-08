import { useState } from 'react'
import { 
    faUser,
    faArrowLeft,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const ReviewImage = ({togglePages}) => {
  return (
    <div className="review-image-rating">
        <div className="title-header">
            <FontAwesomeIcon onClick={() => togglePages(2)} className="icon" icon={faArrowLeft} />
            <FontAwesomeIcon className="icon-upload" icon={faCamera} />
        </div>
        <div className="review-image-body">
            <div className="image">
                <FontAwesomeIcon className="icon" icon={faUser} />
            </div>
        </div>
        <div className="button">
            <button type="button">SUBMIT REVIEW</button>
        </div>
    </div>
  )
}

export default ReviewImage
