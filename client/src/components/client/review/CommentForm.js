import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'






const CommentForm = ({ button, submitComment, toggleForm, comment, name, setName, setJobTitle, commentAlert, jobTitle, nameAlert, jobTitleAlert, setComment}) => {

    return (
        <div className="review-form star-form-container">
            <CancelButton toggleForm={toggleForm}/>
            <TitleHeader/>
            <CommentSection name={name} setName={setName} nameAlert={nameAlert} jobTitle={jobTitle} setJobTitle={setJobTitle} commentAlert={commentAlert} jobTitleAlert={jobTitleAlert} comment={comment} setComment={setComment}/>
            <ActionButton button={button} submitComment={submitComment}/>
        </div>
    )
}


export default CommentForm



const CancelButton = ({ toggleForm }) => {
    return (
        <div className="cancel-button">
           <FontAwesomeIcon  onClick={() => toggleForm(1)} className="icon" icon={faArrowLeft} />
        </div>
    )
}



const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>REVIEW COMMENT</h3>
            <p>Please make a comment</p>
        </div>
    )
}


const CommentSection = ({ name, setName, comment, commentAlert, jobTitle, setJobTitle, nameAlert, jobTitleAlert, setComment}) => {
    return (
        <div className="comment-section-container">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter name"/>
                        <FormInputAlert alert={nameAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="form-group">
                        <label>Job Title:</label>
                        <input type="text" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} className="form-control" placeholder="Job title"/>
                        <FormInputAlert alert={jobTitleAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea className="form-control" onChange={(e) => setComment(e.target.value)}  value={comment} rows="4" cols="50" placeholder="Write comment..."></textarea>
                        <FormInputAlert alert={commentAlert}/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}



const ActionButton = ({ button, submitComment}) => {
    return (
        <div className="action-button">
            <button disabled={button} onClick={(e) => submitComment()}  type="button">
                {
                    button === true ? <>PLEASE WAIT...</> : (
                        <>
                            NEXT
                            <FontAwesomeIcon className="icon" icon={faArrowRight} />
                        </>
                    )
                }
            </button>
        </div>
    )
}


