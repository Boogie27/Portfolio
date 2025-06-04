import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faToggleOn,
    faToggleOff,
    faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserServices, toggleUserServicesFeature } from '../../redux/admin/ServiceSlice'
import AddService from './AddService'
import EditService from './EditService'
import DeleteUserService from './DeleteUserService'







const ServiceBody = ({alertNotification, preloader}) => {
    // react hooks
    const dispatch = useDispatch()
    const services = useSelector(state => state.services.services)

    const FetchServicesRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [addFormState, setAddFormState] = useState(false)
    const [editFormState, setEditFormState] = useState({state: false, service: []})
    
    // toggle add form modal
    const toggleAddForm = (state) => {
        setAddFormState(state)
    }

    // toggle edit form modal
    const toggleEditForm = (state=false, _id='') => {
        setEditFormState({state: state, _id: _id})
    }


    const FetchServices = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-services/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
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


    // toggle features
    const toggleFeature = (_id) => {
        if(token){
            const content = {
                _id: _id,
                token: token
            }
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/toggle-user-services-feature'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(toggleUserServicesFeature(data.service))
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


    // open delete user service modal
    const deleteService = (_id) => {
        setDeleteFormState({state: true, _id: _id})
    }

    

    FetchServicesRef.current = FetchServices

    useEffect(() => {
        FetchServicesRef.current()
    }, [])

    return (
        <div>
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable services={services} toggleFeature={toggleFeature} deleteService={deleteService} toggleEditForm={toggleEditForm}/>
            <AddService addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditService editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteUserService deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}

export default ServiceBody












const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY SERVICES</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Services</button>
            </div>
        </div>
    )
}


const ContentTable = ({services, toggleFeature, deleteService, toggleEditForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Fetaured</th>
                        <th scope="col">Update at</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service, index) => (<ContentItem key={index} service={service} toggleEditForm={toggleEditForm} deleteService={deleteService} toggleFeature={toggleFeature}/>))}
                    
                </tbody>
            </table>
            { services.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no items yets!</div>
        </div>
    )
}



const ContentItem = ({service, toggleFeature, deleteService, toggleEditForm}) => {
    return (
        <tr>
            <td>{service.title}</td>
            <td>{HTMLReactParser(service.text)}</td>
            <td className="table-data-icon">
                <FontAwesomeIcon onClick={() => toggleFeature(service._id)} className={`icon ${service.is_featured ? 'active' : ''}`} icon={service.is_featured ? faToggleOn : faToggleOff} />
            </td>
            <td>
                <div>
                    <b>Updated at:</b> {DateTime(service.updated_at, 'Do MMMM YYYY | h:mma')}
                    
                </div>
                <div className="dim">
                    <b>Created at:</b> {DateTime(service.created_at, 'Do MMMM YYYY | h:mma')}
                </div>
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleEditForm(true, service._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon onClick={() => deleteService(service._id)} className="icon" icon={faTrash} />
            </td>
        </tr>
    )
}





