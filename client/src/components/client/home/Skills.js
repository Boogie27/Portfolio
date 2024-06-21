import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { icon } from '../../../File'
import HTMLReactParser from 'html-react-parser'




const Skills = () => {
    const header = {
        title: "MY SKILLS & RATINGS",
        header_one: "Showcasing talent",
        header_two: "amplifying your impact",
    }

    const mySkils = [
        {
            title: "HTML",
            image: "html.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 90,
        },
        {
            title: "CSS",
            image: "css.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 80,
        },
        {
            title: "JAVASCRIPT",
            image: "html.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 100,
        },
        {
            title: "Jquery",
            image: "jquery.webp",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 100,
        },
        {
            title: "PHP",
            image: "php.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 100,
        },
        {
            title: "LARAVEL",
            image: "laravel.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 80,
        },
        {
            title: "REACT",
            image: "react.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 70,
        },
        {
            title: "NodeJS",
            image: "nodejs.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 100,
        },
        {
            title: "MongoDB",
            image: "mongo-db.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 70,
        },
        {
            title: "RESTAPI",
            image: "rest-api.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 50,
        },
        {
            title: "Redux",
            image: "redux.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 60,
        },
        {
            title: "Git",
            image: "git.png",
            duration: "2021 - 2024",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            rating: 80,
        },
    ] 


  return (
    <div className="skills-container">
        <div className="inner-skills">
            <TitleHeader header={header}/>
            <Content mySkils={mySkils}/>
            <ContentRatings/>
        </div>
    </div>
  )
}

export default Skills





const TitleHeader = ({header}) => {
    return (
        <div className="title-header">
            { header.title ? (<h3>{header.title}</h3>) : null }
            <div className="title">
                { header.header_one ? (<h1>{header.header_one}</h1>) : null }
                { header.header_two ? (<h1>{header.header_two}</h1>) : null }
            </div>
        </div>
    )
}



const Content = ({mySkils}) => {
    return (
        <div className="content">
            <Row className="show-grid">
                {
                    mySkils.map((skill, index) => (
                        <ContentItem  key={index} text={skill.text} rate={skill.rating} title={skill.title} image={skill.image} date={skill.duration}/>
                    ))
                }
            </Row>
        </div>
    )
}





const ContentItem = ({title, text, image, date, rate}) => {
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
                    <div className="description">{ text ? (HTMLReactParser(text)) : null }</div>
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














