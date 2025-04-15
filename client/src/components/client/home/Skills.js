import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { icon, url } from '../../../File'
import Qualifications from './Qualifications'











const Skills = () => {

    // const header = {
    //     title: "MY SKILLS & RATINGS",
    //     first_header: "Showcasing talent",
    //     second_header: "amplifying your impact",
    // }

    // const skills = [
    //     {
    //         title: "HTML",
    //         image: "html.png",
    //         rating: 90,
    //     },
    //     {
    //         title: "CSS",
    //         image: "css.png",
    //         rating: 80,
    //     },
    //     {
    //         title: "JAVASCRIPT",
    //         image: "html.png",
    //         rating: 100,
    //     },
    //     {
    //         title: "Jquery",
    //         image: "jquery.webp",
    //         rating: 100,
    //     },
    //     {
    //         title: "PHP",
    //         image: "php.png",
    //         rating: 100,
    //     },
    //     {
    //         title: "LARAVEL",
    //         image: "laravel.png",
    //         rating: 80,
    //     },
    //     {
    //         title: "REACT",
    //         image: "react.png",
    //         rating: 70,
    //     },
    //     {
    //         title: "NodeJS",
    //         image: "nodejs.png",
    //         rating: 100,
    //     },
    //     {
    //         title: "MongoDB",
    //         image: "mongo-db.png",
    //         rating: 70,
    //     },
    //     {
    //         title: "RESTAPI",
    //         image: "rest-api.png",
    //         rating: 50,
    //     },
    //     {
    //         title: "Redux",
    //         image: "redux.png",
    //         rating: 60,
    //     },
    //     {
    //         title: "Git",
    //         image: "git.png",
    //         rating: 80,
    //     },
    // ] 

    const FetchSkillsRef = useRef(null)
    const FetchSkillsHeaderRef = useRef(null)
    const [skills, setSkills] = useState([])
    const [header, setHeader] = useState('')

    // fetch skills header
    const FetchSkillsHeader = () => {
        Axios.get(url(`/api/admin/fetch-client-user-skills-header`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setHeader(data.skillsHeader)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // fetch skills 
    const FetchSkills = () => {
        Axios.get(url(`/api/admin/fetch-client-user-skills`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setSkills(data.skills)
            }
        }).catch(error => {
            console.log(error)
        })
    }



    
    FetchSkillsRef.current = FetchSkills
    FetchSkillsHeaderRef.current = FetchSkillsHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchSkillsRef.current()
        FetchSkillsHeaderRef.current()
    }, [])

  return (
    <div className="skills-container">
        <div className="inner-skills">
            <TitleHeader header={header}/>
            <Qualifications/>
            <Content skills={skills}/>
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
                { header.first_header ? (<h1>{header.first_header}</h1>) : null }
                { header.second_header ? (<h1>{header.second_header}</h1>) : null }
            </div>
        </div>
    )
}



const Content = ({skills}) => {
    return (
        <div className="content">
            <Row className="show-grid">
                {
                    skills.map((skill, index) => (
                        <ContentItem  key={index} rate={skill.rating} title={skill.title} image={skill.image}/>
                    ))
                }
            </Row>
        </div>
    )
}





const ContentItem = ({title, image, rate}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="content-item">
                <div className="inner-content-item">
                   <div className="top">
                        <div className="icon">
                            <img src={icon(image)} alt={title}/>
                        </div>
                        <div className="title">
                            <h3>{title}</h3>
                        </div>
                        <div className="percentage">
                            <ul>
                                <li className="percentage-count">{rate}</li>
                                <li className="percentage-icon">%</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ratings">
                       <div style={{ width: `${rate}%` }} className="bar"></div> 
                    </div>
                </div>
            </div>
        </Col>
    )
}
















