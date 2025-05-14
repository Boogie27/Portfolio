
import TitleHeader from './TitleHeader'
import FooterBody from './FooterBody'





const Settings = ({ preloader, alertNotification }) => {
    return (
        <div className="dashboard-banner-container">
            <TitleHeader/>
            <FooterBody preloader={preloader} alertNotification={alertNotification}/>
        </div>
    )
}






export default Settings