import { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faList,
  faAngleLeft,
  faAngleRight,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons'
import { portfolio_img } from '../../../File'






const Portfolio = () => {
    const [image, setImage] = useState('')
    const [counter, setCounter] = useState(0)
    const [totalImages, setTotalImages] = useState([])
    const [popupState, setPopupState] = useState(false)
    const [portfolioState, setPortfolioState] = useState('grid')

    const togglePortfolioGrid = () => {
        let state = portfolioState === 'grid' ? 'list' : 'grid'
        setPortfolioState(state)
    }

    const header = {
        title: "MY RECENT PORTFOLIO",
        header_one: "Elevate your brand to new",
        header_two: "heights with our portfolio expertise",
    }

    const myPortfolios = [
        {
            title: "Payizzy Website",
            image: [
                "1.png", "2.png", "3.png", "5.jpg"
            ],
            link: "/"
        },
        {
            title: "Payizzy Website",
            image: [
                "2.png", "4.png", "1.png", "5.jpg", "3.png"
            ],
            link: "/"
        },
        {
            title: "Payizzy Website",
            image: [
                "3.png", "4.png", "2.png"
            ],
            link: "/"
        },
        {
            title: "Payizzy Website",
            image: [
                "4.png", "5.jpg", "2.png", "1.png", "3.png"
            ],
            link: "/"
        },
        {
            title: "Payizzy Website",
            image: [
                "5.jpg", "4.png", "3.png", "2.png", "1.png"
            ],
            link: "/"
        },
    ]

    

    // open and close pupup
    const togglePupUp = (state='', images=[]) => {
        if(images.length){
            setImage(images[0])
            setTotalImages(images)
        }
        setCounter(0)
        setPopupState(state)
    }

    const toggleDirection = (direction) => {
        if(direction === 'right'){
            if(counter < totalImages.length - 1){
                setCounter(counter + 1)
                setImage(totalImages[counter + 1])
            }else{
                setCounter(0)
                setImage(totalImages[0])
            }
        }else{
            if(counter > 0){
                setCounter(counter - 1)
                setImage(totalImages[counter - 1])
            }else if(counter === 0){
                setCounter(totalImages.length - 1)
                setImage(totalImages[totalImages.length - 1])
            }
        }
    }

   
    return (
        <div className="portfolio-content-container">
            <div className="inner-portfolio-content">
                <TitleHeader header={header}/>
                <ShowMore portfolioState={portfolioState} togglePortfolioGrid={togglePortfolioGrid}/>
                <PortfolioContent myPortfolios={myPortfolios} portfolioState={portfolioState} togglePupUp={togglePupUp}/>
                <PortfolioPupUp image={image}  toggleDirection={toggleDirection} popupState={popupState} togglePupUp={togglePupUp}/>
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



const TitleHeader = ({header}) => {
    return (
        <div className="title-header">
            <h3>{header.title}</h3>
            <div className="title">
                { header.header_one ? (<h1>{header.header_one}</h1>) : null }
                { header.header_two ? (<h1>{header.header_two}</h1>) : null }
            </div>
        </div>
    )
}






const PortfolioContent = ({myPortfolios, portfolioState, togglePupUp}) => {
    return (
        <div className="portfolio-content">
            <Row className="show-grid">
                { myPortfolios.map((item, index) => (<ContentItem portfolioState={portfolioState} togglePupUp={togglePupUp} item={item}/>))}
            </Row>
        </div>
    )
}





const ContentItem = ({portfolioState, item, togglePupUp}) => {
    let state = portfolioState === 'grid' ? 6 : 12

    return (
        <Col xs={12} sm={12} md={12} lg={12} xl={state}>
            <div className={`portfolio-content-item ${state === 12 ? 'large' : ''}`}>
                <div className="image">
                    <img onClick={() => togglePupUp(true, item.image)} src={portfolio_img(item.image[0])} alt={item.image[0]}/>
                </div>
                <div className="image-bottom">
                    <ul>
                        <li className="title-header">
                            <h3>{item.title}</h3>
                        </li>
                        <li>
                            <NavLink to="/">Visit Website</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="item-count">
                    {`1/${item.image.length}`}
                </div>
            </div>
        </Col>
    )
}





const PortfolioPupUp = ({popupState, togglePupUp, image, toggleDirection}) => {
    return (
        <div className={`portfolio-pupup ${popupState ? 'active' : ''}`}>
            <div onClick={() => togglePupUp(false)} className="dark-skin"></div>
            <div className="image">
                <img src={portfolio_img(image)} alt={'1.png'}/>
                <div className="direction">
                    <FontAwesomeIcon onClick={() => toggleDirection('left')} className="icon" icon={faAngleLeft} />
                    <FontAwesomeIcon onClick={() => toggleDirection('right')} className="icon" icon={faAngleRight} />
                </div>
            </div>
        </div>
    )
}