import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react'
import { 
    faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FormInputAlert from '../alert/FormInputAlert'







const ReviewForm = ({togglePages, name, email, setName, setEmail, nameAlert, emailAlert, SubmitForm}) => {
    


  return (
    <div className="review-form-rating">
        <div className="title-header">
            <h3>NAME & EMAIL</h3>
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
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Enter email"/>
                        <FormInputAlert alert={emailAlert}/>
                    </div>
                </Col>
            </Row>
        </div>
        <div className="button">
        <button onClick={() => SubmitForm('form-one')} type="button">NEXT</button>
        </div>
    </div>
  )
}

export default ReviewForm
