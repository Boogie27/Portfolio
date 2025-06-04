import  CvBody from './CvBody'




const Cv = ({preloader, alertNotification }) => {
  return (
    <div className="cv-container">
        <CvBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
    )
}


export default Cv