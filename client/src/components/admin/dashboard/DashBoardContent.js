import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faUsers,
    faMoneyBill,
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { faStar } from '@fortawesome/free-regular-svg-icons'








const DashBoardContent = () => {
  return (
    <div className="app-content-right">
      <Row className="show-grid">
        <TotalProject title="Total Ratings" icon={faStar} color="orange" text="Your current testimonial ratings" number="80%"/>
        <TotalProject title="Total Visitors" icon={faUsers} color="red" text="Total amount of visitors on your portfolio" number="80%"/>
        <TotalProject title="Total Projects" icon={faStar} color="blue" text="Total number of projects you have built and uploaded to the portfolio" number="50"/>
        <TotalProject title="Total Earnings" icon={faMoneyBill} color="green" text="The total amount you have earned in pounds" number="£10,000"/>
      </Row>
    </div>
  )
}

export default DashBoardContent



const TotalProject = ({title, text, icon, color, number}) => {
  return (
    <Col xs={12} sm={12} md={12} lg={4} xl={4}>
      <div className="app-content-item">
        <div className={`left ${color}`}>
          <FontAwesomeIcon className="icon" icon={icon} />
        </div>
        <div className="right">
          { title ? (<h3>{title}</h3>) : null }
          { text ? (<p>{text}</p>) : null }
          { number ? (<h1>{number}</h1>) : null }
        </div>
      </div>
    </Col>
  )
}