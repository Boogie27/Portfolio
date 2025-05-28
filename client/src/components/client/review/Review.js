import { useState, useEffect } from 'react'
import StarForm from './StarForm'
import ImageForm from './ImageForm'
import CommentForm from './CommentForm'





const Review = () => {
    const [rating, setRating] = useState(4)
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [jobTitle, setJobTitle] = useState('')

    const [ratingAlert, setRatingAlert] = useState(4)
    const [nameAlert, setNameAlert] = useState('')
    const [commentAlert, setCommentAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')

    const toggleForm = (state) => {
        
    }



    return (
        <div className="review-container">
            <div className="dark-skin"></div>
            {/* <StarForm rating={rating} setRating={setRating} ratingAlert={ratingAlert}/> */}
            {/* <CommentForm nameAlert={nameAlert} commentAlert={commentAlert} jobTitleAlert={jobTitleAlert} comment={comment} setComment={setComment} name={name} setName={setName} setJobTitle={setJobTitle} jobTitle={jobTitle}/> */}
            <ImageForm/>
        </div>
    )
}


export default Review