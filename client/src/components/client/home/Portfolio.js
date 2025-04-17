import Axios from 'axios'
import { url } from '../../../File'
import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faList,
  faGears,
  faTimes,
  faAngleLeft,
  faAngleRight,
  faGripVertical,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'
import { portfolio_img } from '../../../File'
import HTMLReactParser from 'html-react-parser'








const Portfolio = () => {
    const FetchPortfoliosRef = useRef(null)
    const FetchPortfolioHeaderRef = useRef(null)

    const [image, setImage] = useState('')
    const [counter, setCounter] = useState(0)
    const [technology, setTechnology] = useState({state: false, portfolio: ''})
    const [totalImages, setTotalImages] = useState([])
    const [popupState, setPopupState] = useState(false)
    const [portfolioState, setPortfolioState] = useState('grid')
    const [portfolios, setPortfolios] = useState([])
    const [portfolioHeader, setPortfolioHeader] = useState('')


    const togglePortfolioGrid = () => {
        let state = portfolioState === 'grid' ? 'list' : 'grid'
        setPortfolioState(state)
    }

    // const header = {
    //     title: "MY RECENT PORTFOLIO",
    //     header_one: "Elevate your brand to new",
    //     header_two: "heights with our portfolio expertise",
    // }

    // const portfolios = [
    //     {
    //         title: "Payizzy Website",
    //         image: [
    //             "1.png", "2.png", "3.png", "5.jpg"
    //         ],
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         technologies: [
    //             "React", "HTML", "CSS", "NodeJs"
    //         ],
    //         from: "march 2021",
    //         to: "june 2024",
    //         link: ""
    //     },
    //     {
    //         title: "Payizzy Website",
    //         image: [
    //             "2.png", "4.png", "1.png", "5.jpg", "3.png"
    //         ],
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         technologies: [
    //             "React", "HTML", "CSS", "NodeJs"
    //         ],
    //         from: "march 2021",
    //         to: "june 2024",
    //         link: "/"
    //     },
    //     {
    //         title: "Payizzy Website",
    //         image: [
    //             "3.png", "4.png", "2.png"
    //         ],
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         technologies: [
    //             "React", "HTML", "CSS", "NodeJs"
    //         ],
    //         from: "march 2021",
    //         to: "june 2024",
    //         link: "/"
    //     },
    //     {
    //         title: "Payizzy Website",
    //         image: [
    //             "4.png", "5.jpg", "2.png", "1.png", "3.png"
    //         ],
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         technologies: [
    //             "React", "HTML", "CSS", "NodeJs"
    //         ],
    //         from: "march 2021",
    //         to: "june 2024",
    //         link: "/"
    //     },
    //     {
    //         title: "Payizzy Website",
    //         image: [
    //             "5.jpg", "4.png", "3.png", "2.png", "1.png"
    //         ],
    //         from: "march 2021",
    //         to: "june 2024",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         technologies: [
    //             "React", "HTML", "CSS", "NodeJs"
    //         ],
    //         link: "/"
    //     },
    // ]

    
    


    // fetch portfolios  header
    const FetchPortfolioHeader = () => {
        Axios.get(url(`/api/fetch-client-user-portfolio-header`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setPortfolioHeader(data.portfolioHeader)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // fetch portfolios 
    const FetchPortfolios = () => {
        Axios.get(url(`/api/fetch-client-user-portfolio`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setPortfolios(data.portfolios)
            }
        }).catch(error => {
            console.log(error)
        })
    }




    FetchPortfoliosRef.current = FetchPortfolios
    FetchPortfolioHeaderRef.current = FetchPortfolioHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchPortfoliosRef.current()
        FetchPortfolioHeaderRef.current()
    }, [])


    

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


    const toggleTechnology = (state=false, portfolio='') => {
        if(state && portfolio !== ''){
           return setTechnology({state: state, portfolio: portfolio})
        }
        return setTechnology({state: false, portfolio: ''})
    }


   
    return (
        <div className="portfolio-content-container">
            <div className="inner-portfolio-content">
                <TitleHeader portfolioHeader={portfolioHeader}/>
                <ShowMore portfolioState={portfolioState} togglePortfolioGrid={togglePortfolioGrid}/>
                <PortfolioContent portfolios={portfolios} toggleTechnology={toggleTechnology} portfolioState={portfolioState} togglePupUp={togglePupUp}/>
                <PortfolioPupUp image={image}  toggleDirection={toggleDirection} popupState={popupState} togglePupUp={togglePupUp}/>
                { technology.state && technology.portfolio ? (<Technology technology={technology} toggleTechnology={toggleTechnology}/>) : null }
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



const TitleHeader = ({portfolioHeader}) => {
    return (
        <div className="title-header">
            <h3>{portfolioHeader.title}</h3>
            <div className="title">
                { portfolioHeader.first_header ? (<h1>{portfolioHeader.first_header}</h1>) : null }
                { portfolioHeader.second_header ? (<h1>{portfolioHeader.second_header}</h1>) : null }
            </div>
        </div>
    )
}






const PortfolioContent = ({portfolios, portfolioState, togglePupUp, toggleTechnology}) => {
    return (
        <div className="portfolio-content">
            <Row className="show-grid">
                { portfolios.map((item, index) => (<ContentItem key={index}  item={item} portfolioState={portfolioState} toggleTechnology={toggleTechnology} togglePupUp={togglePupUp}/>))}
            </Row>
        </div>
    )
}





const ContentItem = ({portfolioState, item, togglePupUp, toggleTechnology}) => {
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
                        <li className="technology-button">
                            <button onClick={() => toggleTechnology(true, item)}>
                                <FontAwesomeIcon className="icon" icon={faGears} />
                                Technologies
                            </button>
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
                <img src={portfolio_img(image)} alt={image}/>
                <div className="direction">
                    <FontAwesomeIcon onClick={() => toggleDirection('left')} className="icon" icon={faAngleLeft} />
                    <FontAwesomeIcon onClick={() => toggleDirection('right')} className="icon" icon={faAngleRight} />
                </div>
            </div>
        </div>
    )
}












const Technology = ({technology, toggleTechnology}) => {
    const portfolio = technology.portfolio

    return (
        <div className="technologies-container">
            <div className="dark-skin"></div>
            <div className="technoloy-inner">
                <div className="title-header">
                    <h3>TECHNOLOGIES</h3>
                    <FontAwesomeIcon onClick={() => toggleTechnology(false)} className="icon" icon={faTimes} />
                </div>
                <div className="body">
                    <ul>
                        <li><span>Title: </span>{portfolio.title}</li>
                        <li className="description">
                            <span>Description: </span>{portfolio.description ? HTMLReactParser(portfolio.description) : null }
                        </li>
                        <li>
                            <span>Technologies: </span>
                            <div className="tech">
                                {
                                    portfolio.technologies.map((tech, index) => (
                                        <div key={index}>
                                            <FontAwesomeIcon className="icon" icon={faPuzzlePiece} /> {tech}
                                        </div>
                                    ))
                                }
                            </div>
                        </li>
                        {
                            portfolio.link ? (
                                <li className="button">
                                    <NavLink to={portfolio.link}>
                                        <button>Visit website</button>
                                    </NavLink>
                                </li>
                            ) : null
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}