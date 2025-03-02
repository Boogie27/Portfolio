import Axios from 'axios'
import { useState, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faTimes,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, generate_years, get_months } from '../../../File'
import { useDispatch } from 'react-redux'
import { AddUserPortfolio } from '../../redux/admin/PortfolioSlice'
import { Validate } from '../../../helper/Validation'











const AddPortfolio = ({addFormState, toggleAddForm, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [title, setTitle] = useState('')
    const [fromMonth, setFromMonth] = useState('')
    const [fromYear, setFromYear] = useState('')
    const [toMonth, setToMonth] = useState('')
    const [toYear, setToYear] = useState('')
    const [image, setImage] = useState('')
    const [technology, setTechnology] = useState('')
    const [techs, setTechs] = useState([])
    const [description, setDescription] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [months, setMonths] = useState([])
    const [years, setYears] = useState([])
    const [button, setButton] = useState(false)

    const [titleAlert, setTitleAlert] = useState('')
    const [fromMonthAlert, setFromMonthAlert] = useState('')
    const [fromYearAlert, setFromYearAlert] = useState('')
    const [toMonthAlert, setToMonthAlert] = useState('')
    const [toYearAlert, setToYearAlert] = useState('')
    const [technologyAlert, setTechnologyAlert] = useState('')
    const [descriptionAlert, setDescriptionAlert] = useState('')


    const addNewPortfolio = () => {
        if(token){
            const content = {
                title: title,
                fromMonth: fromMonth,
                fromYear: fromYear,
                toMonth: toMonth,
                toYear: toYear,
                description: description,
            }
            const validate = validate_input(content)
            if(validate !== 'success') return
            initErrorAlert() //initialize form input error alert
           
            setButton(true)
            const formData = new FormData()
            formData.append('image', image)
            formData.append('title', title)
            formData.append('token', token)
            formData.append('fromMonth', fromMonth)
            formData.append('fromYear', fromYear)
            formData.append('toMonth', toMonth)
            formData.append('toYear', toYear)
            formData.append('technology', techs)
            formData.append('description', description)
            Axios.post(url('/api/admin/add-new-portfolio'), formData).then((response) => {
                const data = response.data
                if(data.status === 'input-error'){
                    inputErrorForBackend(data.validationError)
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                    dispatch(AddUserPortfolio(data.newPortfolio))
                    alertNotification('success', 'Portfolio added successfully!')
                    initFormInput() //init fields
                    toggleForm(false)
                }
                return setButton(false)
            }).catch(error => {
                setButton(false)
                console.log(error)
            })
        }
    }

    // fetch image from input
    const addRatingImage = (e) => {
        const file = e.target.files
        if(file && file.length > 0){
            setImage(file[0])
            setImagePreview(URL.createObjectURL(file[0]));
        }
    }

    // clear file input
    const clearFileInput = () => {
        return imageRef.current.value = '';
    }

    // close add form
    const toggleForm = (state) => {
        setImage('')
        toggleAddForm(state)
        initErrorAlert()
        initFormInput()
        clearFileInput()
        setButton(false)
        setImagePreview('')
    }

    //  initialize form input error
   const initErrorAlert = () => {
        setTitleAlert('')
        setDescriptionAlert('')
    }

    //  initialize form input
    const initFormInput = () => {
        setTitle('')
        setTechs([])
        setDescription('')
    }

    // backen error message
    const inputErrorForBackend = (error) => {
        setTitleAlert(error.title)
    }

    //  add or remove from technology
    const toggleTechnology = (index) => {
        let items = [...techs]
        items.splice(index, 1)
        setTechs(items)

    }
    // submit when enter key is pressed
    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            if(technology !== ''){
                let item = technology.trim() 
                setTechs([...techs, item])
            }
            setTechnology('')
        }
    }

 // validate input
 const validate_input = (input) => {
    const content = [
        {
            field: 'title',
            input: input.title,
            maxLength: 50,
            minLength: 3,
            required: true,
        },
        {
            field: 'description',
            input: input.description,
            maxLength: 2000,
            minLength: 3,
            required: true,
        }
    ]
    const validation = Validate(content)
    if(validation !== 'success'){
        validation.map((validate) => {
            if(validate.field === 'title'){
                setTitleAlert(validate.error)
            }
            if(validate.field === 'description'){
                setDescriptionAlert(validate.error)
            }
            return false
        })
        return false
    }else{
        return 'success'
    }
}


useEffect(() => {
    // populate months
    const getMonths = get_months()
    if(getMonths.length){
        setMonths(getMonths)
    }
    // populate years
    const getYear = generate_years()
    if(getYear.length){
        setYears(getYear)
    }
}, [])


    return (
        <div className={`app-content-form ${addFormState ? 'active' : ''}`}>
            <div className="content-form">
               <div className="form">
                    <div className="title-header">
                        <h3>ADD NEW PORTFOLIO</h3>
                        <FontAwesomeIcon onClick={() => toggleForm(false) } className="icon" icon={faTimes} />
                    </div>
                    
                    <div className="form-group">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <div className="form-group">
                                <label>Title:</label>
                                <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter title"/>
                                <FormInputAlert alert={titleAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <label>From Month:</label>
                            <select onChange={(e) => setFromMonth(e.target.value)} className="form-control">
                                <option value="">Select Month</option>
                                {months.map(month => (<option key={month} value={month}>{month}</option> ))}
                            </select>
                            <FormInputAlert alert={fromMonthAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <label>From Year:</label>
                            <select onChange={(e) => setFromYear(e.target.value)} className="form-control">
                                <option value="">Select Year</option>
                                {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                            </select>
                            <FormInputAlert alert={fromYearAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <label>To Month:</label>
                            <select onChange={(e) => setToMonth(e.target.value)} className="form-control">
                                <option value="">Select Month</option>
                                {months.map(month => (<option key={month} value={month}>{month}</option> ))}
                            </select>
                            <FormInputAlert alert={toMonthAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <label>To Year:</label>
                            <select onChange={(e) => setToYear(e.target.value)} className="form-control">
                                    <option value="">Select Year</option>
                                    {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                                </select>
                            <FormInputAlert alert={toYearAlert}/>
                        </Col>
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <label>Image:</label>
                            <input type="file" className="form-control" ref={imageRef} onChange={addRatingImage}   placeholder="Upload Image"/>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Image preview:</label>
                            <div className="image-preview">
                                {
                                    imagePreview ? (<img src={imagePreview} alt={'preview'}/>) : (<FontAwesomeIcon className="icon" icon={faCamera} />)
                                }
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Description:</label>
                            <div className="form-group">
                                <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}  value={description} rows="4" cols="50" placeholder="Write Message..."></textarea>
                                <FormInputAlert alert={descriptionAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <label>Technologies:</label>
                            <div className="form-group">
                                <input type="text" className="form-control"   onKeyDown={handleKeyDown}  onChange={(e) => setTechnology(e.target.value)}  value={technology} placeholder="Enter Technologies"/>
                                <FormInputAlert alert={technologyAlert}/>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div className="form-group">
                                {
                                    techs.length ? techs.map((tech, index) => (
                                    <div key={index} className="technology">
                                        {tech}<FontAwesomeIcon onClick={() => toggleTechnology('remove', index)} className="icon" icon={faTimes} />
                                    </div>)) : null
                                }
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <div className="form-button">
                                { 
                                    button ? (
                                        <button type="button">PLEASE WAIT...</button>
                                    ) : (
                                        <button onClick={() => addNewPortfolio()} type="button">ADD PORTFOLIO</button>
                                    )
                                }
                                
                            </div>
                        </Col>
                    </Row>
                </div>
               </div>
            </div>
        </div>
    )
}


export default AddPortfolio