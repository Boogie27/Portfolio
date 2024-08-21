import QualificationBody from './QualificationBody'
import QaulificationHeader from './QaulificationHeader'



const Qualification = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
       <QaulificationHeader preloader={preloader} alertNotification={alertNotification}/>
      <QualificationBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Qualification
