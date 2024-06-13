import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { icon } from '../../../File'





const Skills = () => {
  return (
    <div className="skills-container">
        <div className="inner-skills">
            <TitleHeader/>
            <Content/>
            <ContentRatings/>
        </div>
    </div>
  )
}

export default Skills





const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>MY SKILLS & RATINGS</h3>
            <div className="title">
                <h1>Showcasing talent</h1>
                <h1>amplifying your impact</h1>
            </div>
        </div>
    )
}



const Content = () => {
    return (
        <div className="content">
            <Row className="show-grid">
                <ContentItem  rate={85} title={'html'} image={'html.png'} date={'2021-2024'}/>
                <ContentItem  rate={95} title={'css'} image={'css.png'} date={'2021-2024'}/>
                <ContentItem  rate={70} title={'Javascript'} image={'js.webp'} date={'2021-2024'}/>
                <ContentItem  rate={40} title={'Jquery'} image={'jquery.webp'} date={'2021-2024'}/>
                <ContentItem  rate={60} title={'Php'} image={'php.png'} date={'2021-2024'}/>
                <ContentItem  rate={85} title={'Laravel'} image={'laravel.png'} date={'2021-2024'}/>
                <ContentItem  rate={70} title={'NodeJs'} image={'nodejs.png'} date={'2021-2024'}/>
                <ContentItem  rate={20} title={'MongoDB'} image={'mongo-db.png'} date={'2021-2024'}/>
                <ContentItem  rate={85} title={'RestAPI'} image={'rest-api.png'} date={'2021-2024'}/>
                <ContentItem  rate={90} title={'Redux'} image={'redux.png'} date={'2021-2024'}/>
                <ContentItem  rate={85} title={'Git'} image={'git.png'} date={'2021-2024'}/>
            </Row>
        </div>
    )
}





const ContentItem = ({title, image, date, rate}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="content-item">
                <div className="inner-content-item">
                    <div className="date">
                        <span>{date}</span>
                    </div>
                    <div className="icon">
                        <img src={icon(image)} alt={title}/>
                    </div>
                    <div className="title">
                        <h3>{title}</h3>
                    </div>
                    <div className="description">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
                        aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem
                    </div>
                    <div className="ratings">
                       <div style={{ width: `${rate}%` }} className="bar"></div> 
                    </div>
                </div>
            </div>
        </Col>
    )
}




const ContentRatings = () => {
    return (
        <div className="content">
           
        </div>
    )
}














