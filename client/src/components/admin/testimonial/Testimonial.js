import React from 'react'
import TestimonialHeader from './TestimonialHeader'
import TestimonialBody from './TestimonialBody'








const Testimonial = ({preloader, alertNotification }) => {
  return (
    <div>
      <TestimonialHeader preloader={preloader} alertNotification={alertNotification}/>
      <TestimonialBody preloader={preloader} alertNotification={alertNotification}/>
    </div>
  )
}

export default Testimonial
