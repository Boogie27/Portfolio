import Footer from './Footer'







const Settings = ({alertNotification, preloader}) => {
  return (
    <div className="settings-container">
        <Footer alertNotification={alertNotification} preloader={preloader}/>
        
    </div>
  )
}

export default Settings



