import { useState, useRef} from 'react'
import { user_image } from '../../../File'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { centerCrop, makeAspectCrop} from 'react-image-crop'









const ImageCropper = ({toggeleImageWindow}) => {

    const ImageRef= useRef(null)
    const CanvasRef= useRef(null)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [complete, setComplete] = useState(false)
    const [crop, setCrop] = useState({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 50,
    })




    return (
        <div className="image-cropper-container">
            <div className="image-cropper-inner">
                <div className="image-container">
                    <img src={user_image('4.png')} alt={'our'}/>
                </div>
                <div className="image-cropper-btn">
                    <button onClick={() => toggeleImageWindow('close')} type="button" className="cancel">Cancel</button>
                    <button type="button" className="crop">Crop</button>
                </div>
            </div>
        </div>
    )
}


export default ImageCropper