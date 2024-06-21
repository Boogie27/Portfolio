import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { useEffect } from 'react'
import { url } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceHeader } from '../../redux/admin/ServiceSlice'
import HTMLReactParser from 'html-react-parser'






const Services = () => {
   // redux store
   const dispatch = useDispatch()
   const serviceHeaders = useSelector(state => state.serviceHeaders.serviceHeaders)

   const services = [
    {
        title: "Web design",
        text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
    },
    {
        title: "Web Development",
        text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
    },
    {
        title: "Mentoship",
        text: "Nemo design enim ipsam voluptatem quim voluptas sit aspernatur aut odit auting fugit sed thisnquia consequuntur magni dolores eos designer heresm qu"
    },
   ]



        useEffect(() => {
            window.scrollTo(0, 0) // page scroll to top

            const FetchServiceHeader = () => {
                Axios.get(url('/api/cleint/fetch-services-header')).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        let content = data.serviceHeader
                        dispatch(getServiceHeader(content))
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
                FetchServiceHeader()
            }, [dispatch])

  return (
    <div className="services-container">
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