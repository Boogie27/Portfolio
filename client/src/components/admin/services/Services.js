import React from 'react'
import  ServiceHeader from './ServiceHeader'



const Services = ({preloader, alertNotification }) => {
  return (
    <div className="services-container">
        <TitleHeader/>
        <ServiceHeader preloader={preloader} alertNotification={alertNotification}/>
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










