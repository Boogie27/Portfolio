import Axios from 'axios'
import Cookies from 'js-cookie'
import { useParams } from 'react-router-dom'
import { useState, Fragment } from 'react'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { url } from '../../../File'










const DeletePortfolioImage = ({ images, setImages, deleteFormState, setDeleteFormState, alertNotification}) => {
    const { _id } = useParams()
    let token = Cookies.get('Eloquent_token')
    const [button, setButton] = useState(false)

    // toggle close action modal
    const toggleActionModal = () => {
        if(button === false){
            setDeleteFormState({ state: false, index: ''})
        }
    }

    // delete user service
    const deleteImage = (index) => {
        if(token){
            const content = {
                _id: _id,
                index: deleteFormState.index,
                token: token
              }
              setButton(true)
              Axios.post(url('/api/admin/delete-user-portfolio-image'), content).then((response) => {
                const data = response.data
                if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'ok'){
                  let imageItems = [...images]
                  console.log(index)
                  imageItems.splice(index, 1)
                  setImages(imageItems)
                  toggleActionModal()
                  alertNotification('success', 'Portfolio image deleted successfully!')
                }
                setButton(false)
              }).catch(error => {
                    setButton(false)
                  console.log(error)
              })
        }
    }

    return (
        <Fragment>
            { deleteFormState.state ? (<DeleteModal button={button} deleteFormState={deleteFormState} deleteImage={deleteImage} toggleActionModal={toggleActionModal}/>) : null }
        </Fragment>
    )
}

export default DeletePortfolioImage




const DeleteModal = ({toggleActionModal, button, deleteImage, deleteFormState}) => {
    return (
        <div className="form-action-modal">
            <div className="inner-form-action">
                <div className="title-header">
                    <h3>Delete Image</h3>
                    <FontAwesomeIcon onClick={() => toggleActionModal()} className="icon" icon={faTimes} />
                </div>
                <div className="body">
                    Do you wish to delete this Portfolio image?
                </div>
                <div className="button">
                    {
                        button ? (
                            <button type="button">Please wait...</button>
                        ) : (
                            <button onClick={() => deleteImage(deleteFormState.index)} type="button">Delete Image</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}