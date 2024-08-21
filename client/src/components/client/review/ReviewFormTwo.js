import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { 
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormInputAlert from '../alert/FormInputAlert'







const ReviewFormTwo = ({togglePages, wordCount, description, jobTitle, setJobTitle, handleTextChange, descriptionAlert, jobTitleAlert, SubmitForm}) => {


  return (
    <div className="review-form-rating">
        <div className="title-header">
            <h3>JOB TITLE & DESCRIPTION</h3>
            <FontAwesomeIcon onClick={() => togglePages(2)} className="icon" icon={faArrowLeft} />
        </div>
        <div className="form">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="form-group">
                        <label>Job Title:</label>
                        <input type="text" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} className="form-control" placeholder="Job Title"/>
                        <FormInputAlert alert={jobTitleAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label>Description:</label>
                    <div className="form-group">
                        <textarea className="form-control" onChange={(e) => handleTextChange(e.target.value)}  value={description} rows="4" cols="50" placeholder="What can you say about our service..."></textarea>
                    </div>
                    <div className="word-count"><b>Max words:</b> {wordCount} / 50</div>
                    <FormInputAlert alert={descriptionAlert}/>
                </Col>
            </Row>
        </div>
        <div className="button">
            <button  onClick={() => SubmitForm('form-two')} type="button">NEXT</button>
        </div>
    </div>
  )
}

export default ReviewFormTwo
