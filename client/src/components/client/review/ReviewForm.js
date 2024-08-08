import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react'
import { 
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormInputAlert from '../alert/FormInputAlert'







const ReviewForm = ({togglePages}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [description, setDescription] = useState('')

    const [nameAlert, setNameAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [jobTitleAlert, setJobTitleAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


  return (
    <div className="review-form-rating">
        <div className="title-header">
            <h3>RATE OUR SERVICE</h3>
            <FontAwesomeIcon onClick={() => togglePages(1)} className="icon" icon={faArrowLeft} />
        </div>
        <div className="form">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter name"/>
                        <FormInputAlert alert={nameAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
                        <FormInputAlert alert={emailAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div className="form-group">
                        <label>Job Title:</label>
                        <input type="text" onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} className="form-control" placeholder="Job Title"/>
                        <FormInputAlert alert={jobTitleAlert}/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <label>Description:</label>
                    <div className="form-group">
                        <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}  value={description} rows="4" cols="50" placeholder="Write Message..."></textarea>
                    </div>
                    <FormInputAlert alert={descriptionAlert}/>
                </Col>
            </Row>
        </div>
        <div className="button">
            <button type="button">SUBMIT</button>
        </div>
    </div>
  )
}

export default ReviewForm
