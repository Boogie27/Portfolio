import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import Axios from 'axios'
import { url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceHeader } from '../../redux/admin/ServiceSlice'





const ServiceHeader = ({preloader, alertNotification }) => {
     // redux store
     const dispatch = useDispatch()
     const serviceHeaders = useSelector(state => state.serviceHeaders.serviceHeaders)


    const [title, setTitle] = useState('')
    const [firstHeader, setFirstHeader] = useState('')
    const [secondHeader, setSecondHeader] = useState('')
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [firstHeaderAlert, setFirstHeaderAlert] = useState('')
    const [secondHeaderAlert, setSecondHeaderAlert] = useState('')



    const addNewBanner = () => {
        initErrorAlert() //initialize form input error alert
        const validate = validate_input(title, firstHeader, secondHeader)
        if(validate === false) return 
        const content = {
            title: title,
            firstHeader: firstHeader,
            secondHeader: secondHeader,
        }
        setButton(true)
        preloader(true, 'Please wait...')
        Axios.post(url('/api/admin/update-services-header'), content).then((response) => {
            const data = response.data
            if(data.status === 'input-error'){
                inputErrorForBackend(data.validationError)
            }else if(data.status === 'error'){
                alertNotification('error', data.message)
            }else if(data.status === 'ok'){
                alertNotification('success', 'Updated sucessfully!')
                dispatch(getServiceHeader(data.newBanner))
                preloader(false)
            }
            preloader(false)
            return setButton(false)
        }).catch(error => {
            setButton(false)
            console.log(error)
        })
    }


    // validate input
    const validate_input = (title='', firstHeader='', secondHeader='') => {
        let failed = false;
        initErrorAlert()

        if(title.length === 0){
            failed = true
            setTitleAlert(`*Title field is required`)
        } else if(title.length < 3){
            failed = true
            setTitleAlert(`*Must be minimum of 3 characters`)
        }else if(title.length > 50){
            failed = true
            setTitleAlert(`*Must be maximum of 50 characters`)
        }
        if(firstHeader.length === 0){
            failed = true
            setFirstHeaderAlert(`*First Header field is required`)
        } else if(firstHeader.length < 3){
            failed = true
            setFirstHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(firstHeader.length > 50){
            failed = true
            setFirstHeaderAlert(`*Must be maximum of 50 characters`)
        }
        if(secondHeader.length === 0){
            failed = true
            setSecondHeaderAlert(`*Second Header field is required`)
        } else if(secondHeader.length < 3){
            failed = true
            setSecondHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(secondHeader.length > 50){
            failed = true
            setSecondHeaderAlert(`*Must be maximum of 50 characters`)
        }
        if(failed === true){
            return false
        }else{
            return true
        }
    }


    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
        setFirstHeaderAlert(error.firstHeader)
        setSecondHeaderAlert(error.secondHeader)
    }

    const initErrorAlert = () => {
        setTitleAlert('')
        setFirstHeaderAlert('')
        setSecondHeaderAlert('')
    }


    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top

        const FetchServiceHeader = () => {
            preloader(true, 'Loading, please wait...')
            Axios.get(url('/api/admin/fetch-services-header')).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    let content = data.serviceHeader
                    setTitle(content.title)
                    setFirstHeader(content.first_header)
                    setSecondHeader(content.second_header)
                    dispatch(getServiceHeader(content))
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
        FetchServiceHeader()
    }, [])

    return (
        <div className="main-content-container">
            <div className="content-form">
               <div className="form">
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className="form-group">
                                    <label>Title:</label>
                                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter Title"/>
                                    <FormInputAlert alert={titleAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>First Header:</label>
                                <input type="text" onChange={(e) => setFirstHeader(e.target.value)} value={firstHeader} className="form-control" placeholder="Enter First Header"/>
                                <FormInputAlert alert={firstHeaderAlert}/>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>Second Header:</label>
                                <input type="text" onChange={(e) => setSecondHeader(e.target.value)} value={secondHeader} className="form-control" placeholder="Enter Second Header"/>
                                <FormInputAlert alert={secondHeaderAlert}/>
                            </Col>
                        </Row>
                    </div>
                    <div className="form-button">
                        { 
                            button ? (
                                <button type="button">PLEASE WAIT...</button>
                            ) : (
                                <button onClick={() => addNewBanner()} type="button">UPDATE SERVICES HEADER</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}


export default ServiceHeader