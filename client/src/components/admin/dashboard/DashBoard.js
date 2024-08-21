import SideBar from './SideBar'
import DashBoardContent from './DashBoardContent'



const DashBoard = ({dashboardSideBar, setDashboardSideBar}) => {

  return (
    <div className={`admin-dashboard-container ${dashboardSideBar ? 'active' : ''}`}>
        <div className="admin-content-left">
          <SideBar setDashboardSideBar={setDashboardSideBar} dashboardSideBar={dashboardSideBar}/>
        </div>
        <div className="admin-content-right">
          <DashBoardContent/>
        </div>
    </div>
  )
}

export default DashBoard
