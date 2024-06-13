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
            }, [])

  return (
    <div className="services-container">
      <div className="inner-services">
        { serviceHeaders ? (<TitleHeader serviceHeaders={serviceHeaders}/>) : null }
        <ServicesBody/>
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





const ServicesBody = () => {
    return (
        <div className="services-body">
           <Row className="show-grid">
                <ContentItem/>
                <ContentItem/>
                <ContentItem/>
            </Row>
        </div>
    )
}




const ContentItem = () => {
    return (
        <Col xs={12} sm={12} md={6} lg={4} xl={4}>
            <div className="content-item">
                <div className="title">
                    <h3>WEB DESIGN</h3>
                </div>
                <div className="body">
                    Nemo design enim ipsam voluptatem quim 
                    voluptas sit aspernatur aut odit auting fugit sed thisnquia
                    consequuntur magni dolores eos designer heresm qui
                </div>
            </div>
        </Col>
    )
}