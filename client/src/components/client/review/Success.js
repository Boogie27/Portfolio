import { 
    faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





const Success = ({toggleForm}) => {
  return (
    <div className="success-page">
        <div className="icon-parent">
            <FontAwesomeIcon  className="icon" icon={faCheck} />
        </div>
        <div className="text">
            <h3>Thank you!</h3>
            <p>Your review has been registered successfully, We appreciate the time you have taken to rate our service</p>
        </div>
        <div className="button">
            <button onClick={() => toggleForm(false)} type="button">CLOSE</button>
        </div>
    </div>
  )
}

export default Success
