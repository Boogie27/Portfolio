import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faEye,
    faTrash,
    faEllipsis,
    faToggleOn,
    faToggleOff
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserServices } from '../../redux/admin/ServiceSlice'
import AddService from './AddService'








const ServiceBody = ({alertNotification, preloader}) => {
    // react hooks
    const dispatch = useDispatch()
    const services = useSelector(state => state.services.services)

    const FetchServicesRef = useRef(null)
    const [addFormState, setAddFormState] = useState(false)

    const toggleAddForm = (state) => {
        setAddFormState(state)
    }


    const FetchServices = () => {
        let token = Cookies.get('Eloquent_token')
        if(token){
            Axios.get(url(`/api/admin/fetch-user-services/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    preloader(false)
                    dispatch(fetchUserServices(data.services))
                }else{
                    alertNotification('error', data.message)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }

    FetchServicesRef.current = FetchServices

    useEffect(() => {
        FetchServicesRef.current()
    }, [])

    return (
        <div>
        <TitleHeader toggleAddForm={toggleAddForm}/>
        <ContentTable services={services}/>
        <AddService addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
        </div>
    )
}

export default ServiceBody












const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>OUR SERVICES</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Services</button>
            </div>
        </div>
    )
}


const ContentTable = ({services}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Fetaured</th>
                        <th scope="col">Update at</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (<ContentItem key={index} service={service}/>))}
                </tbody>
            </table>
        </div>
    )
}



const ContentItem = ({service}) => {
    return (
        <tr>
            <td>{service.title}</td>
            <td>{HTMLReactParser(service.text)}</td>
            <td className="table-data-icon">
                <FontAwesomeIcon className={` icon ${service.is_featured ? 'active' : ''}`} icon={service.is_featured ? faToggleOn : faToggleOff} />
            </td>
            <td>
                <div>
                    <b>Created at:</b> {DateTime(service.created_at, 'Do MMMM YYYY | h:mma')}
                </div>
                <div>
                    Updated at: {DateTime(service.updated_at, 'Do MMMM YYYY | h:mma')}
                </div>
            </td>
            <td><ContentDropDown/></td>
        </tr>
    )
}





const ContentDropDown = () => {
    return (
        <div className="table-drop-down">
            <FontAwesomeIcon className="icon" icon={faEllipsis} />
            <div className="drop-down">
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
