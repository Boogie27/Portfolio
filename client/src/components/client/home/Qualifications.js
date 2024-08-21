import Axios from 'axios'
import { url } from '../../../File'
import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HTMLReactParser from 'html-react-parser'
import AOS from 'aos'








const Qualifications = ({qualificationRef}) => {

    
    // const qualifications = [
    //     {
    //         title: "Teesside University",
    //         from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         title: "Yaba College of Technology",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         title: "Frontend Developer",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         title: "Backend Developer",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    // ]


    const FetchQualificationsRef = useRef(null)
    const FetchQualificationsHeaderRef = useRef(null)
    const [header, setHeader] = useState([])
    const [qualifications, setQualifications] = useState([])


    // fetch qualifications 
    const FetchQualifications = () => {
        Axios.get(url(`/api/admin/fetch-client-user-qualification`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setQualifications(data.qualifications)
            }
        }).catch(error => {
            console.log(error)
        })
    }


     // fetch qualifications header 
     const FetchQualificationsHeader = () => {
        Axios.get(url(`/api/client/fetch-client-qualification-header`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setHeader(data.qualificationHeader)
            }
        }).catch(error => {
            console.log(error)
        })
    }




    FetchQualificationsRef.current = FetchQualifications
    FetchQualificationsHeaderRef.current = FetchQualificationsHeader

    useEffect(() => {
        AOS.init({ duration: 1000 })
        window.scrollTo(0, 0) // page scroll to top
        FetchQualificationsRef.current()
        FetchQualificationsHeaderRef.current()
    }, [])



    return (
        <div ref={qualificationRef} className="skills-container">
            <div className="inner-skills">
                <TitleHeader header={header}/>
                <QualificationContent qualifications={qualifications}/>
            </div>
        </div>
    )
}


export default Qualifications




const TitleHeader = ({header}) => {
    return (
        <div data-aos={'zoom-out'} className="title-header">
            { header.title ? (<h3>{header.title}</h3>) : null }
            <div className="title">
                { header.first_header ? (<h1>{header.first_header}</h1>) : null }
                { header.second_header ? (<h1>{header.second_header}</h1>) : null }
            </div>
        </div>
    )
}



const QualificationContent = ({qualifications}) => {
    return (
        <div className="education-skills">
        <Row className="show-grid">
            { qualifications.map((qualification, index) => (<QualificationItems key={index} number={index+1} qualification={qualification}/>))}
        </Row>
    </div>
    )
} 




const QualificationItems = ({number, qualification}) => {
    return (
        <Col data-aos={number % 2 === 0 ? 'fade-up-left' : 'fade-down-right'} xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="content">
                { qualification.from ? (<div className="date">{`${qualification.from} - ${qualification.to}` }</div>) : null }
                {
                    qualification.title ? (
                        <div className="title">
                            <h3>{qualification.title}</h3>
                        </div>
                    ) : null
                }
                { qualification.text ? (<div className="body">{HTMLReactParser(qualification.text)}</div> ) : null }
            </div>
        </Col>
    )
}
