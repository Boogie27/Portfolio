import PortfolioHeader from './PortfolioHeader'
import PortfolioBody from './PortfolioBody'







const Portfolio = ({preloader, alertNotification}) => {
  return (
    <div className="dashboard-banner-container">
      <PortfolioHeader preloader={preloader} alertNotification={alertNotification}/>
      <PortfolioBody preloader={preloader} alertNotification={alertNotification}/>
  </div>
  )
}

export default Portfolio
