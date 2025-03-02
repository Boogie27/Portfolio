import Axios from 'axios'
import Cookies from 'js-cookie'
import { url, userImage } from '../../../File'
import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faCamera,
} from '@fortawesome/free-solid-svg-icons'





const AboutImage = ({image, setImage, preloader, alertNotification}) => {
    
    const imageRef = useRef(null)
    let token = Cookies.get('Eloquent_token')

    const clearFileInput = () => {
        return imageRef.current.value = '';
    }

    const uploadAboutImage = () => {
        return imageRef.current.click()
    }


    const toggleImageInput = (e) => {
        const file = e.target.files
        if(token){
            if(file && file.length > 0){
                const formData = new FormData()
                formData.append('image', file[0])
                formData.append('token', token)
                preloader(true, 'Uploading image, please wait...')
                Axios.post(url('/api/admin/upload-about-user-image'), formData).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        setImage(data.imageName)
                        alertNotification('success', 'Image uploaded sucessfully!')
                    }else if(data.status === 'error'){
                        alertNotification('error', data.error)
                    }
                    preloader(false)
                    clearFileInput()
                }).catch(error => {
                    console.log(error)
                })
    
            }else{
                alertNotification('error', 'There are no image files')
            }
        }else{
            alertNotification('error', 'Login user to perform this action')
        }
    }
    
        return (
            <div className="banner-image-container">
                <div className="inner-banner-image">
                    {
                        image.length ? (
                            <div className="image">
                                <FontAwesomeIcon onClick={() => uploadAboutImage()} className="icon edit" icon={faPen} />
                                <img src={userImage(image)} alt={image}/>
                            </div>
                        ) : (
                            <div className="image-container">
                                <FontAwesomeIcon onClick={() => uploadAboutImage()} className="icon" icon={faCamera} />
                            </div>
                        )
                    }
                    <input ref={imageRef} type="file" onChange={toggleImageInput} className="filetype" />
                </div>
            </div>
        )
    }


export default AboutImage