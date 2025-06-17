import { get_cv } from '../../../File'
import { 
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'






// 
const CvViewer = ({toggleCvViewer}) => {
    return (
        <div className="cv-viewer-container">
            <div className="dark-skin"></div>
            <div className="cv-viewer-frame">
                <iframe src={get_cv('etyjetyyje-1749153851206.pdf')} title="CV Preview" width="100%" height="100%" style={{ border: 'none' }}/>
            </div>
             <div className="float-button">
                <FontAwesomeIcon  onClick={() => toggleCvViewer('close')} className="icon" icon={faTimes} />
             </div>
        </div>
    )
}




export default CvViewer