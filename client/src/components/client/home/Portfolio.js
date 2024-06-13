import { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faList,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons'
import { portfolio_img } from '../../../File'




const Portfolio = () => {
    const [portfolioState, setPortfolioState] = useState('grid')

    const togglePortfolioGrid = () => {
        let state = portfolioState === 'grid' ? 'list' : 'grid'
        setPortfolioState(state)
    }

    return (
        <div className="portfolio-content-container">
            <div className="inner-portfolio-content">
                <TitleHeader/>
                <ShowMore portfolioState={portfolioState} togglePortfolioGrid={togglePortfolioGrid}/>
                <PortfolioContent portfolioState={portfolioState}/>
            </div>
        </div>
  )
}

export default Portfolio



const ShowMore = ({portfolioState, togglePortfolioGrid}) => {
    let stateIcon = portfolioState === 'grid' ?  faList : faGripVertical
    let iconTitle = portfolioState === 'grid' ? 'Change to Grid' : 'Change to Vertical'

    
    return (
        <div className="show-more">
            <div className="link">
                <NavLink to="/">SHOW MORE</NavLink>
            </div>
            <div className="button">
                <FontAwesomeIcon title={iconTitle} onClick={() => togglePortfolioGrid()} className="icon" icon={stateIcon} />
            </div>
        </div>
    )
}



const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>MY RECENT PORTFOLIO</h3>
            <div className="title">
                <h1>Elevate your brand to new</h1>
                <h1>heights with our portfolio expertise</h1>
            </div>
        </div>
    )
}






const PortfolioContent = ({portfolioState}) => {
    return (
        <div className="portfolio-content">
            <Row className="show-grid">
               <ContentItem portfolioState={portfolioState} image={'1.png'}/>
               <ContentItem portfolioState={portfolioState} image={'3.png'}/>
               <ContentItem portfolioState={portfolioState} image={'2.png'}/>
               <ContentItem portfolioState={portfolioState} image={'4.png'}/>
            </Row>
        </div>
    )
}





const ContentItem = ({portfolioState, image}) => {
    let state = portfolioState === 'grid' ? 6 : 12

    return (
        <Col xs={12} sm={12} md={12} lg={12} xl={state}>
            <div className={`portfolio-content-item ${state === 12 ? 'large' : ''}`}>
                <div className="image">
                    <img src={portfolio_img(image)} alt="1.png"/>
                </div>
                <div className="image-bottom">
                    <ul>
                        <li className="title-header">
                            <h3>Payizzy website</h3>
                        </li>
                        <li>
                            <NavLink to="/">Visit Website</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </Col>
    )
}