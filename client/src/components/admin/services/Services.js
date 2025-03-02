import React from 'react'
import  ServiceHeader from './ServiceHeader'
import  ServiceBody from './ServiceBody'



const Services = ({preloader, alertNotification }) => {
  return (
    <div className="services-container">
        <TitleHeader/>
        <ServiceHeader preloader={preloader} alertNotification={alertNotification}/>
        <ServiceBody alertNotification={alertNotification} preloader={preloader}/>
    </div>
  )
}

export default Services




const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>SERVICES</h3>
            </div>
        </div>
    )
}










