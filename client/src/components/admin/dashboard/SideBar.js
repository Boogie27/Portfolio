import React from 'react'
import { user_image } from '../../../File'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHome,
    faGear,
    faFile,
    faUser,
    faCircle,
    faBriefcase,
    faAddressCard,
    faPuzzlePiece,
    faLayerGroup,
    faGraduationCap,
    faMagnifyingGlass,
    faRightToBracket,
    faAddressBook,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { faStar } from '@fortawesome/free-regular-svg-icons'




const SideBar = () => {
  return (
    <div className="dashboard-sidebar">
        <div className="dashboard-sidebar-inner">
            <DashBoardTop/>
            <DashBoardNavigation/>
        </div>
    </div>
  )
}

export default SideBar








const DashBoardTop = () => {
  return (
        <div className="dashboard-top">
            <div className="image">
                <img src={user_image()} alt="user"/>
            </div>
            <div className="title-header">
                <h3>admin</h3>
            </div>
        </div>
  )
}





const DashBoardNavigation = () => {
  return (
    <div className="dashboard-navigation">
        <ul>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faHome} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faFile} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">My CV</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faCircle} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Banner</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faUser} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">About</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faPuzzlePiece} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Skills</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faBriefcase} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Portfolio</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faGraduationCap} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Qualifications</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faLayerGroup} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Services</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Review Request</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faStar} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Testimonial</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faAddressCard} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Contact Header</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faAddressBook} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Contacts</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faGear} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Settings</NavLink>
                </div>
            </li>
            <li className="dashboard-navi-content">
                <div className="dashboard-nav-icons">
                    <FontAwesomeIcon className="icon" icon={faRightToBracket} />
                </div>
                <div className="link">
                    <NavLink to="/dashboard">Logout</NavLink>
                </div>
            </li>
        </ul>
    </div>
  )
}

