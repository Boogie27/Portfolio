import Axios from 'axios'
import { url } from '../../../File'
import { useState, useEffect, useRef } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import HTMLReactParser from 'html-react-parser'









const Qualifications = () => {

    
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
    const [qualifications, setQualifications] = useState([])


    // fetch skills 
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




    FetchQualificationsRef.current = FetchQualifications

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchQualificationsRef.current()
    }, [])



    return (
        <div className="education-skills">
            <Row className="show-grid">
                { qualifications.map((qualification, index) => (<QualificationItems key={index} qualification={qualification}/>))}
            </Row>
        </div>
    )
}


export default Qualifications







const QualificationItems = ({qualification}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
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
