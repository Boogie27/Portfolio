import Axios from 'axios'
import JoditEditor from 'jodit-react'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef, createRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faEye,
    faTimes,
    faTrash,
    faEllipsis,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { fetchHomeBanners } from '../../redux/admin/BannerSlice'









const Banner = ({alertNotification}) => {
    const descriptionRef = useRef(null)
    const [formState, setFormState] = useState(false)
    const [name, setName] = useState('')
    const [cvLink, setCvLink] = useState('')
    const [firstHeader, setFirstHeader] = useState('')
    const [secondHeader, setSecondHeader] = useState('')
    const [description, setDescription] = useState('')
    const [button, setButton] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [cvLinkAlert, setCvLinkAlert] = useState('')
    const [firstHeaderAlert, setFirstHeaderAlert] = useState('')
    const [secondHeaderAlert, setSecondHeaderAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')

    // redux store
    const dispatch = useDispatch()
    const homeBanners = useSelector(state => state.homeBanners.homeBanners)

    // toggle add banner for
    const toggleForm = (state) => {
        setFormState(state)
        initFormInput()
    }

    // add new banner
    const addNewBanner = () => {
        initErrorAlert() //initialize form input error alert
        const validate = validate_input(name, firstHeader, secondHeader, cvLink, description)
        if(validate === false) return 
        const content = {
            name: name,
            cvLink: cvLink,
            firstHeader: firstHeader,
            secondHeader: secondHeader,
            description: description
        }
        setButton(true)
        Axios.post(url('/api/admin/add-home-client-banner'), content).then((response) => {
            const data = response.data
            if(data.status === 'input-error'){
                inputErrorForBackend(data.validationError)
            }else if(data.status === 'error'){
                alertNotification('error', data.message)
            }else if(data.status === 'ok'){
                console.log(data.newBanner)
                // initFormInput() //init fields
            }
            return setButton(false)
        }).catch(error => {
            setButton(false)
            console.log(error)
        })
    }


    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top

        const getHomeBanners = () => {
            Axios.get(url('/api/admin/fetch-home-banners')).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    console.log(data.content)
                    dispatch(fetchHomeBanners(data.content))
                }
            }).catch(error => {
                console.log(error)
            })
        }
        getHomeBanners()
    }, [])


    const initErrorAlert = () => {
        setNameAlert('')
        setCvLinkAlert('')
        setFirstHeaderAlert('')
        setSecondHeaderAlert('')
        setDescriptionAlert('')
    }
    const initFormInput = () => {
        setName('')
        setCvLink('')
        setFirstHeader('')
        setSecondHeader('')
        setDescription('')
    }
    
    const validate_input = (name='', firstHeader='', secondHeader='', cvLink= '', description='') => {
        let failed = false;
        initErrorAlert()

        if(name.length === 0){
            failed = true
            setNameAlert(`*Name field is required`)
        } else if(name.length < 3){
            failed = true
            setNameAlert(`*Must be minimum of 3 characters`)
        }else if(name.length > 100){
            failed = true
            setNameAlert(`*Must be maximum of 100 characters`)
        }
        if(cvLink.length === 0){
            failed = true
            setCvLinkAlert(`*CV Link field is required`)
        } else if(cvLink.length < 3){
            failed = true
            setCvLinkAlert(`*Must be minimum of 3 characters`)
        }else if(cvLink.length > 100){
            failed = true
            setCvLinkAlert(`*Must be maximum of 100 characters`)
        }
        if(firstHeader.length === 0){
            failed = true
            setFirstHeaderAlert(`*First Header field is required`)
        } else if(firstHeader.length < 3){
            failed = true
            setFirstHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(firstHeader.length > 100){
            failed = true
            setFirstHeaderAlert(`*Must be maximum of 100 characters`)
        }
        if(secondHeader.length === 0){
            failed = true
            setSecondHeaderAlert(`*Second Header field is required`)
        } else if(secondHeader.length < 3){
            failed = true
            setSecondHeaderAlert(`*Must be minimum of 3 characters`)
        }else if(secondHeader.length > 100){
            failed = true
            setSecondHeaderAlert(`*Must be maximum of 100 characters`)
        }
        if(description.length === 0){
            failed = true
            setDescriptionAlert(`*Description field is required`)
        } else if(description.length < 20){
            failed = true
            setDescriptionAlert(`*Must be minimum of 20 characters`)
        }else if(description.length > 200){
            failed = true
            setDescriptionAlert(`*Must be maximum of 200 characters`)
        }
        console.log(description)
        if(failed === true){
            return false
        }else{
            return true
        }
    }



    const inputErrorForBackend = (error) => {
        setNameAlert(error.name)
        setCvLinkAlert(error.cvLink)
        setFirstHeaderAlert(error.firstHeader)
        setSecondHeaderAlert(error.secondHeader)
        setDescriptionAlert(error.description)
    }

    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleForm={toggleForm}/>
            <ContentTable/>
            <AddBannerForm formState={formState} setName={setName} name={name}  button={button} cvLinkAlert={cvLinkAlert}
                            setDescription={setDescription} description={description} descriptionRef={descriptionRef} 
                            firstHeader={firstHeader} setFirstHeader={setFirstHeader} toggleForm={toggleForm}
                            secondHeader={secondHeader} setSecondHeader={setSecondHeader} addNewBanner={addNewBanner}
                            nameAlert={nameAlert} descriptionAlert={descriptionAlert} firstHeaderAlert={firstHeaderAlert}
                            secondHeaderAlert={secondHeaderAlert} cvLink={cvLink} setCvLink={setCvLink}/> 
        </div>
    )
}

export default Banner




const TitleHeader = ({toggleForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>HOME BANNER</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleForm(true) } type="button">Add Banner</button>
            </div>
        </div>
    )
}


const ContentTable = () => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col">Button</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ContentItem/>
                    <ContentItem/>
                    <ContentItem/>
                    <ContentItem/>
                    <ContentItem/>
                </tbody>
            </table>
        </div>
    )
}



const ContentItem = () => {
    return (
        <tr>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td><ContentDropDown/></td>
        </tr>
    )
}





const ContentDropDown = () => {
    let optionRef = useRef()
    const [state, setState] = useState (false)

    const toggleOptions = () => {
        setState(true)
    }

    const handler = (e) => {
        if(optionRef.current && !e.composedPath().includes(optionRef.current)){
            setState(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handler)
        return () => {
            document.removeEventListener('click', handler) // clears document.addEventListener('click', handler) from browser
        }
    }, [])
    return (
        <div ref={optionRef} className="table-drop-down">
            <FontAwesomeIcon  onClick={() => toggleOptions()} className="icon" icon={faEllipsis} />
            <div className={`drop-down ${state ? 'active' : ''}`}>
                <ul>
                    <li>
                        <FontAwesomeIcon  className="icon" icon={faPen} />
                        <span>Edit</span>
                    </li>
                    <li>
                        <FontAwesomeIcon  className="icon" icon={faEye} />
                        <span>View</span>
                    </li>
                    <li>
                        <FontAwesomeIcon  className="icon" icon={faTrash} />
                        <span>Delete</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}








const AddBannerForm = ({
    descriptionRef, name, nameAlert, setName, firstHeader, setFirstHeader, 
    secondHeader, setSecondHeader, button, addNewBanner, cvLinkAlert,
    description, setDescription, toggleForm, formState, cvLink, setCvLink,
    firstHeaderAlert, secondHeaderAlert, descriptionAlert,}) => {
    return (
        <div className={`app-content-form ${formState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>ADD HOME BANNER</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    
                    <div className="form-group">
                        <Row className="show-grid">
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <div className="form-group">
                                    <label>Name:</label>
                                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} className="form-control" placeholder="Enter Name"/>
                                    <FormInputAlert alert={nameAlert}/>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                                <label>CV Link:</label>
                                <input type="text" onChange={(e) => setCvLink(e.target.value)} value={cvLink} className="form-control" placeholder="Enter CV Link"/>
                                <FormInputAlert alert={cvLinkAlert}/>
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
                    <div className="form-group">
                        <label>Description:</label>
                        <JoditEditor ref={descriptionRef} value={description} onChange={(description) => setDescription(description)}/>
                        <FormInputAlert alert={descriptionAlert}/>
                    </div>
                    <div className="form-button">
                        { 
                            button ? (
                                <button type="button">PLEASE WAIT...</button>
                            ) : (
                                <button onClick={() => addNewBanner()} type="button">ADD BANNER</button>
                            )
                        }
                        
                    </div>
               </div>
            </div>
        </div>
    )
}












// const ContentDropDown = ({service, deleteService}) => {
//     return (
//         <div className="table-drop-down">
//             <FontAwesomeIcon className="icon" icon={faEllipsis} />
//             <div className="drop-down">
//                 <ul>
//                     <li>
//                         <FontAwesomeIcon  className="icon" icon={faPen} />
//                         <span>Edit</span>
//                     </li>
//                     <li>
//                         <FontAwesomeIcon  className="icon" icon={faEye} />
//                         <span>View</span>
//                     </li>
//                     <li onClick={() => deleteService(service._id)}>
//                         <FontAwesomeIcon  className="icon" icon={faTrash} />
//                         <span>Delete</span>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }
