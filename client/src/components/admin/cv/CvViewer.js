import { get_cv } from '../../../File'







// 
const CvViewer = () => {
    return (
        <div className="cv-viewer-container">
            <div className="dark-skin"></div>
            <div className="cv-viewer-frame">
                <iframe src={get_cv('etyjetyyje-1749153851206.pdf')} title="CV Preview" width="100%" height="100%" style={{ border: 'none' }}/>
            </div>
        </div>
    )
}




export default CvViewer