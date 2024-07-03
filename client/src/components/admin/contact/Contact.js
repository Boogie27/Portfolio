import TitleHeader from './TitleHeader'
import ContactHeader from './ContactHeader'






const Contact = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
      <TitleHeader preloader={preloader} alertNotification={alertNotification}/>
      <ContactHeader preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Contact






