import Axios from 'axios'
import { useParams } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTimes,
    faCamera,
    faToggleOff,
    faToggleOn,
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormInputAlert from '../alert/FormInputAlert'
import { url, generate_years, portfolio_img, get_months } from '../../../File'
import { Validate } from '../../../helper/Validation'
import  DeletePortfolioImage  from './DeletePortfolioImage'









const PortfolioDetail = ({preloader, alertNotification}) => {
  const { _id } = useParams()
  const FetchUserPortfoliosRef = useRef(null)

  const imageRef = useRef(null)
  const editImageRef = useRef(null)
  let token = Cookies.get('Eloquent_token')
  const [title, setTitle] = useState('')
  const [fromMonth, setFromMonth] = useState('')
  const [fromYear, setFromYear] = useState('')
  const [toMonth, setToMonth] = useState('')
  const [toYear, setToYear] = useState('')
  const [images, setImages] = useState('')
  const [index, setIndex] = useState('')
  const [featured, setFeatured] = useState(false)
  const [technology, setTechnology] = useState('')
  const [techs, setTechs] = useState([])
  const [description, setDescription] = useState('')
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

  const [deleteFormState, setDeleteFormState] = useState({state: false, index: ''})


  const UpdatePortfolio = () => {
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
         
          // setButton(true)
          const formData = new FormData()
          formData.append('_id', _id)
          formData.append('image', images)
          formData.append('title', title)
          formData.append('token', token)
          formData.append('fromMonth', fromMonth)
          formData.append('fromYear', fromYear)
          formData.append('toMonth', toMonth)
          formData.append('toYear', toYear)
          formData.append('technology', techs)
          formData.append('description', description)
          Axios.post(url('/api/admin/edit-user-portfolio'), formData).then((response) => {
              const data = response.data
              if(data.status === 'input-error'){
                  inputErrorForBackend(data.validationError)
              }else if(data.status === 'error'){
                  alertNotification('error', data.message)
              }else if(data.status === 'ok'){
                const portfolio = data.updatedPortfolio
                setTitle(portfolio.title)
                setImages(portfolio.image)
                setFromMonth(portfolio.from_month)
                setFromYear(portfolio.from_year)
                setToMonth(portfolio.to_month)
                setToYear(portfolio.to_year)
                setFeatured(portfolio.is_featured)
                setDescription(portfolio.description)
                setTechs(portfolio.technologies)
                alertNotification('success', 'Portfolio updated successfully!')
              }
              return setButton(false)
          }).catch(error => {
              setButton(false)
              console.log(error)
          })
      }
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

  
    // toggle delete  modal
    const toggleDeleteForm = (state=false, index='') => {
      setDeleteFormState({ state: state, index: index})
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

  // toggle image input  field
  const toggleImageInput = () => {
    return imageRef.current.click()
  }
  
  // clear image input field
  const clearFileInput = () => {
    editImageRef.current.value = ''
    return imageRef.current.value = '';
  }

   // fetch image from input
   const addPortfolioImage = (e) => {
    const file = e.target.files
      if(file && file.length > 0){
        const formData = new FormData()
        formData.append('_id', _id)
        formData.append('token', token)
        formData.append('image', file[0])
        preloader(true, 'Uploading image, Please wait...')
        Axios.post(url('/api/admin/add-user-portfolio-image'), formData).then((response) => {
          const data = response.data
          if(data.status === 'input-error'){
              inputErrorForBackend(data.validationError)
          }else if(data.status === 'error'){
              alertNotification('error', data.message)
          }else if(data.status === 'ok'){
            const portfolio = data.updatedPortfolio
            clearFileInput()
            setImages(portfolio.image)
            alertNotification('success', 'Portfolio image added successfully!')
          }
          return preloader(false)
      }).catch(error => {
        preloader(false)
          console.log(error)
      })
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




     // fetch  user portfolio
     const FetchUserPortfolios = () => {
      if(token){
          preloader(true, 'Fetching details, Please wait...')
          Axios.get(url(`/api/admin/fetch-user-portfolios/${token}`)).then((response) => {
              const data = response.data
              if(data.status === 'ok'){
                const portfolio = data.portfolios.find(portfolio => portfolio._id === _id)
                setTitle(portfolio.title)
                setImages(portfolio.image)
                setFromMonth(portfolio.from_month)
                setFromYear(portfolio.from_year)
                setToMonth(portfolio.to_month)
                setToYear(portfolio.to_year)
                setDescription(portfolio.description)
                setTechs(portfolio.technologies)
                setFeatured(portfolio.is_featured)
              }
              preloader(false)
          }).catch(error => {
            preloader(false)
              console.log(error)
          })
      }
    }


        // toggle features
        const toggleFeature = (_id) => {
            if(token){
                const content = {
                    _id: _id,
                    token: token
                }
                preloader(true, 'Please wait...')
                Axios.post(url('/api/admin/toggle-portfolio-feature'), content).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        const featured = data.updatedPortfolio
                        setFeatured(featured.is_featured)
                    }else if(data.status === 'error'){
                        alertNotification('error', data.message)
                    }else if(data.status === 'catch-error'){
                        console.log(data.catchError)
                    }
                    preloader(false)
                }).catch(error => {
                    preloader(false)
                    console.log(error)
                })
            }
        }

    // edit portfolio image
    const editPortfolioImage = (e) => {
        const file = e.target.files
        if(token){
            if(file && file.length > 0){
                const formData = new FormData()
                formData.append('_id', _id)
                formData.append('index', index)
                formData.append('token', token)
                formData.append('image', file[0])
                preloader(true, 'Editing image, Please wait...')
                Axios.post(url('/api/admin/edit-user-portfolio-image'), formData).then((response) => {
                  const data = response.data
                  if(data.status === 'input-error'){
                      inputErrorForBackend(data.validationError)
                  }else if(data.status === 'error'){
                      alertNotification('error', data.message)
                  }else if(data.status === 'ok'){
                    const updatedImage = data.updatedImage
                    setIndex('')
                    clearFileInput()
                    setImages(images.map((image, index) => index === parseInt(updatedImage.index) ? updatedImage.imageName : image))
                    alertNotification('success', 'Portfolio image edited successfully!')
                  }
                  return preloader(false)
              }).catch(error => {
                setIndex('')
                preloader(false)
                  console.log(error)
              })
            }
        }
    }

    // toggle edit image input field
    const toggleEditImage = (imageIndex) => {
        setIndex(imageIndex)
        return editImageRef.current.click()
    }

  
  FetchUserPortfoliosRef.current = FetchUserPortfolios

  useEffect(() => {
      window.scrollTo(0, 0) // page scroll to top
      FetchUserPortfoliosRef.current()

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
  }, [_id])



  return (
    <div className="dashboard-form-container">
      <div className="">
        <TitleHeader title={title} _id={_id} featured={featured} toggleFeature={toggleFeature}/>
        <div className="content-form">
            <div className="form">
                <Row className="show-grid">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="form-group">
                            <label>Title:</label>
                            <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} className="form-control" placeholder="Enter title"/>
                            <FormInputAlert alert={titleAlert}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <label>From Month:</label>
                        <select value={fromMonth} onChange={(e) => setFromMonth(e.target.value)} className="form-control">
                            <option value="">Select Month</option>
                            {months.map(month => ( <option key={month} value={month} >{month}</option> ))}
                        </select>
                        <FormInputAlert alert={fromMonthAlert}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <label>From Year:</label>
                        <select onChange={(e) => setFromYear(e.target.value)} value={fromYear} className="form-control">
                            <option value="">Select Year</option>
                            {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                        </select>
                        <FormInputAlert alert={fromYearAlert}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <label>To Month:</label>
                        <select onChange={(e) => setToMonth(e.target.value)} value={toMonth} className="form-control">
                            <option value="">Select Month</option>
                            {months.map(month => (<option key={month} value={month}>{month}</option> ))}
                        </select>
                        <FormInputAlert alert={toMonthAlert}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <label>To Year:</label>
                        <select onChange={(e) => setToYear(e.target.value)} value={toYear} className="form-control">
                                <option value="">Select Year</option>
                                {years.map(year => (<option key={year} value={year}>{year}</option> ))}
                            </select>
                        <FormInputAlert alert={toYearAlert}/>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <label>Description:</label>
                        <div className="form-group">
                            <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}  value={description} rows="4" cols="50" placeholder="Write Message..."></textarea>
                            <FormInputAlert alert={descriptionAlert}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="form-group">
                            {
                                techs.length ? techs.map((tech, index) => (
                                <div key={index} className="technology">
                                    {tech}<FontAwesomeIcon onClick={() => toggleTechnology(index)} className="icon" icon={faTimes} />
                                </div>)) : null
                            }
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <label>Technologies:</label>
                        <div className="form-group">
                            <input type="text" className="form-control"   onKeyDown={handleKeyDown}  onChange={(e) => setTechnology(e.target.value)}  value={technology} placeholder="Enter Technologies"/>
                            <FormInputAlert alert={technologyAlert}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="form-button">
                            { 
                                button ? (
                                    <button type="button">PLEASE WAIT...</button>
                                ) : (
                                    <button onClick={() => UpdatePortfolio()} type="button">UPDATE PORTFOLIO</button>
                                )
                            }
                            
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
        <PortfolioImages imageRef={imageRef} title={title} images={images} editImageRef={editImageRef} toggleEditImage={toggleEditImage} editPortfolioImage={editPortfolioImage} toggleDeleteForm={toggleDeleteForm} toggleImageInput={toggleImageInput} addPortfolioImage={addPortfolioImage}/>
        <DeletePortfolioImage images={images} setImages={setImages} deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
      </div>
    </div>
  )
}

export default PortfolioDetail






const TitleHeader = ({title, _id, featured, toggleFeature}) => {
  return (
      <div className="top-title-content">
          <div className="title-header">
              <h3>{title} PORFOLIO</h3>
          </div>
          <div className="button">
                <button onClick={() => toggleFeature(_id)} type="button">
                    Feature Portfolio 
                    <FontAwesomeIcon  className={`icon ${featured ? 'active' : ''}`} icon={featured ? faToggleOn : faToggleOff}/>
                </button>
            </div>
      </div>
  )
}





const PortfolioImages= ({ title, imageRef, images, addPortfolioImage, editImageRef, editPortfolioImage, toggleEditImage, toggleImageInput, toggleDeleteForm}) => {
  return (
   <div className="portfolio-form-container">
      <div className="top-title-content">
          <div className="title-header">
              <h3>{title} IMAGES</h3>
          </div>
      </div>
     <div className="portfolio-form-images">
       <Row className="show-grid">
        { images.length ?  images.map((image, index) => (<ContentImage key={index} image={image} index={index} editImageRef={editImageRef} toggleEditImage={toggleEditImage} editPortfolioImage={editPortfolioImage} toggleDeleteForm={toggleDeleteForm}/>)) : null }
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <div className="image-icon">
              <FontAwesomeIcon className="icon" onClick={() => toggleImageInput()} icon={faCamera} />
              <input type="file" className="form-control" ref={imageRef} style={{ display: 'none'}} onChange={addPortfolioImage}   placeholder="Upload Image"/>
            </div>
          </Col>
        </Row>
      </div>
   </div>
  )
}



const ContentImage = ({image, index, toggleDeleteForm, editImageRef, toggleEditImage, editPortfolioImage}) => {
  return (
    <Col xs={12} sm={12} md={6} lg={6} xl={4}>
      <div className="image">
        <img src={portfolio_img(image)} alt={image}/>
        <div className="action-botton">
          <FontAwesomeIcon onClick={() => toggleEditImage(index)} className="icon edit" icon={faPen} />
          <FontAwesomeIcon onClick={() => toggleDeleteForm(true, index)} className="icon delete" icon={faTimes} />
          <input type="file" className="form-control" ref={editImageRef} style={{ display: 'none'}} onChange={editPortfolioImage}   placeholder="Upload Image"/>
        </div>
      </div>
    </Col>
  )
}



