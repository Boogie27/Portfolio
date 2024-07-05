import QualificationBody from './QualificationBody'
import DeleteContent from './DeleteContent'
import AddContent from './AddContent'
import EditContent from './EditContent'





const Qualification = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
      <QualificationBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Qualification
