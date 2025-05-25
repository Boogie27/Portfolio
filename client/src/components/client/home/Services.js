import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { url } from '../../../File'
import HTMLReactParser from 'html-react-parser'






const Services = ({servicesRef}) => {
    const FetchUserServicesRef = useRef(null)
    const FetchServiceHeaderRef = useRef(null)
    const [services, setServices] = useState([])
    const [serviceHeaders, setServiceHeaders] = useState([])

//    const services = [
//     {
//         title: "Web design",
//         text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
//     },
//     {
//         title: "Web Development",
//         text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
//     },
//     {
//         title: "Mentoship",
//         text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
//     },
//    ]


    // fetch user service header
    const FetchServiceHeader = () => {
        Axios.get(url('/api/cleint/fetch-services-header')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setServiceHeaders(data.serviceHeader)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // fetch user services
    const FetchUserServices = () => {
        Axios.get(url('/api/cleint/fetch-services')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setServices(data.services)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    FetchUserServicesRef.current = FetchUserServices
    FetchServiceHeaderRef.current = FetchServiceHeader

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserServicesRef.current()
        FetchServiceHeaderRef.current()
    }, [])

  return (
    <div ref={servicesRef} className="services-container">
      <div className="inner-services">
        { serviceHeaders ? (<TitleHeader serviceHeaders={serviceHeaders}/>) : null }
        <ServicesBody services={services}/>
      </div>
    </div>
  )
}

export default Services





const TitleHeader = ({serviceHeaders}) => {
    return (
        <div className="title-header">
            <div className="title">{serviceHeaders.title}</div>
            <h1>{serviceHeaders.first_header}</h1>
            <h1>{serviceHeaders.second_header}</h1>
      </div>
    )
}





const ServicesBody = ({services}) => {
    return (
        <div className="services-body">
           <Row className="show-grid">
                { services.map((service, index) => (<ContentItem key={index} service={service}/>)) }
            </Row>
        </div>
    )
}




const ContentItem = ({service}) => {
    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="content-item">
                <div className="title">
                    <h3>{service.title}</h3>
                </div>
                <div className="body">{HTMLReactParser(service.text)}</div>
            </div>
        </Col>
    )
}