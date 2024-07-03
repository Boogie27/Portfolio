import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'








const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>CONTACT ME</h3>
            </div>
            <div className="right-button">
                <NavLink to="/dashboard/contacts">
                    <FontAwesomeIcon className="icon" icon={faEye} />View Contacts
                </NavLink>
            </div>
        </div>
    )
  }


  export default TitleHeader