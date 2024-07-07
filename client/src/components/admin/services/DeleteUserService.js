import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState, Fragment } from 'react'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
import { deleteUserServices } from '../../redux/admin/ServiceSlice'










const DeleteUserService = ({deleteFormState, setDeleteFormState, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()

    let token = Cookies.get('Eloquent_token')
    const [button, setButton] = useState(false)

    // toggle close action modal
    const toggleActionModal = () => {
        if(button === false){
            return   setDeleteFormState({ state: false, _id: ''})
        }
        setButton(false)
    }

    // delete user service
    const deleteUserService = (_id) => {
        if(token){
            const content = {
                _id: _id,
                token: token
            }
            setButton(true)
            Axios.post(url('/api/admin/delete-user-services'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(deleteUserServices(data.deleteService))
                    alertNotification('success', 'Deleted successfully!')
                }else{
                    alertNotification('error', data.message)
                }
                setButton(false)
                toggleActionModal()
            }).catch(error => {
                setButton(false)
                console.log(error)
                toggleActionModal()
            })
        }
    }

    return (
        <Fragment>
            { deleteFormState.state ? (<DeleteModal button={button} deleteFormState={deleteFormState} deleteUserService={deleteUserService} toggleActionModal={toggleActionModal}/>) : null }
        </Fragment>
    )
}

export default DeleteUserService




const DeleteModal = ({toggleActionModal, button, deleteUserService, deleteFormState}) => {
    return (
        <div className="form-action-modal">
            <div className="inner-form-action">
                <div className="title-header">
                    <h3>Delete user Services</h3>
                    <FontAwesomeIcon onClick={() => toggleActionModal()} className="icon" icon={faTimes} />
                </div>
                <div className="body">
                    Do you wish to delete this user service?
                </div>
                <div className="button">
                    {
                        button ? (
                            <button type="button">Please wait...</button>
                        ) : (
                            <button onClick={() => deleteUserService(deleteFormState._id)} type="button">Delete Service</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}