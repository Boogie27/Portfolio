import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState, Fragment } from 'react'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { url } from '../../../File'
import { useDispatch } from 'react-redux'
import { deleteUserSkill } from '../../redux/admin/SkillSlice'










const DeleteSkillsForm = ({deleteFormState, setDeleteFormState, alertNotification}) => {
    // react hooks
    const dispatch = useDispatch()

    let token = Cookies.get('Eloquent_token')
    const [button, setButton] = useState(false)

    // toggle close action modal
    const toggleActionModal = () => {
        if(button === false){
            setDeleteFormState({ state: false, _id: ''})
        }
    }

    // delete user service
    const deleteContact = (_id) => {
        if(token){
            const content = {
                _id: _id,
                token: token
            }
            setButton(false)
            Axios.post(url('/api/admin/delete-user-skills'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(deleteUserSkill(data.deleteSkill))
                    alertNotification('success', 'Skill Deleted successfully!')
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
            { deleteFormState.state ? (<DeleteModal button={button} deleteFormState={deleteFormState} deleteContact={deleteContact} toggleActionModal={toggleActionModal}/>) : null }
        </Fragment>
    )
}

export default DeleteSkillsForm




const DeleteModal = ({toggleActionModal, button, deleteContact, deleteFormState}) => {
    return (
        <div className="form-action-modal">
            <div className="inner-form-action">
                <div className="title-header">
                    <h3>Delete User Skill</h3>
                    <FontAwesomeIcon onClick={() => toggleActionModal()} className="icon" icon={faTimes} />
                </div>
                <div className="body">
                    Do you wish to delete this skill?
                </div>
                <div className="button">
                    {
                        button ? (
                            <button type="button">Please wait...</button>
                        ) : (
                            <button onClick={() => deleteContact(deleteFormState._id)} type="button">Delete skill</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}