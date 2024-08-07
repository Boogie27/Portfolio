import QualificationBody from './QualificationBody'





const Qualification = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
      <QualificationBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Qualification
