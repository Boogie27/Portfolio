import { useState, useEffect, useRef, Fragment } from 'react'
import Axios from 'axios'
import { url } from '../../../File'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { user_image } from '../../../File'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faLayerGroup,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'
import { 
    faStar,
  } from '@fortawesome/free-regular-svg-icons'
import AOS from 'aos'




const Testimonial = ({testimonialRef}) => {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 768 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 768, min: 568 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 567, min: 0 },
          items: 1
        }
    }


    // const testimonialHeader = {
    //     title: "CLIENTS REVIEW",
    //     text: "My Testimonial",
    // }


    // const testimonials = [
    //     {
    //         name: "charles anonye",
    //         image: "",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         rating: 2
    //     },
    //     {
    //         name: "charles anonye",
    //         image: "4.png",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         rating: 3
    //     },{
    //         name: "charles anonye",
    //         image: "5.png",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         rating: 4
    //     },
    //     {
    //         name: "charles anonye",
    //         image: "6.jpg",
    //         job_title: "Content Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         rating: 5
    //     },
    //     {
    //         name: "charles anonye",
    //         image: "7.jpg",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         rating: 3
    //     },
    // ]


    const FetchTestimonialsRef = useRef(null)
    const FetchTestimonialHeaderRef = useRef(null)
    const [testimonials, setTestimonials] = useState([])
    const [testimonialHeader, setTestimonialHeader] = useState([])


    // fetch testimonial header
    const FetchTestimonialHeader = () => {
        Axios.get(url(`/api/client/fetch-client-user-testimonial-header`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setTestimonialHeader(data.testimonialHeader)
            }
        }).catch(error => {
            console.log(error)
        })
    }



     // fetch testimonial s
     const FetchTestimonials = () => {
        Axios.get(url(`/api/client/fetch-client-user-testimonials`)).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                setTestimonials(data.testimonials)
            }
        }).catch(error => {
            console.log(error)
        })
    }



    FetchTestimonialsRef.current = FetchTestimonials
    FetchTestimonialHeaderRef.current = FetchTestimonialHeader

    useEffect(() => {
        AOS.init({ duration: 1000 })
        window.scrollTo(0, 0) // page scroll to top
        FetchTestimonialsRef.current()
        FetchTestimonialHeaderRef.current()
    }, [])

  return (
    <Fragment>
       {
            testimonialHeader && testimonialHeader.is_featured ? (
                <div ref={testimonialRef} className="testimonial-container">
                    <div className="inner-testimonial">
                        <TitleHeader testimonialHeader={testimonialHeader}/>
                        <TestimonialContent testimonials={testimonials} responsive={responsive}/>
                    </div>
                </div>
            ) : null
       }
    </Fragment>
  )
}

export default Testimonial




const TitleHeader = ({testimonialHeader}) => {
    return (
        <div data-aos={'zoom-out'} className="title-header">
            <h3>{testimonialHeader.title}</h3>
            <div className="title">
                <h1>{testimonialHeader.header}</h1>
            </div>
        </div>
    )
}




const TestimonialContent = ({ testimonials, responsive}) => {
    return (
        <div data-aos={'slide-right'} className="testimonial-slider-frame">
            <Carousel 
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            responsive={responsive}>
                { testimonials.map((item, index) => (<SliderContentItem key={index} item={item}/>)) }
            </Carousel>
        </div>
    )
}





const SliderContentItem = ({item}) => {
    const image = item.image ? item.image : 'demo.png'

    return (
        <div className="testimoni-content-item">
            <ul className="inner-testimonial-content-item">
                <li className="image">
                    <img src={user_image(image)} alt={image}/>
                </li>
                <li className="ratings">
                    <span className="rate">Rating: </span>
                    <span>
                        {
                           [...Array(5)].map((current, index) => (
                            <FontAwesomeIcon key={index} className={`star ${ index < item.rating ? 'active' : '' }`} icon={faStar} /> 
                        ))
                        }
                    </span>
                </li>
                <li className="title-header">
                    { item.name ? (<h3>{item.name}</h3>) : null }
                    <h4>
                        <FontAwesomeIcon className="icon" icon={faLayerGroup} />
                        { item.job_title ? (<span>{item.job_title}</span>) : null }
                    </h4>
                </li>
                <li className="description">
                    { item.description ? (item.description) : null }
                    <FontAwesomeIcon className="icon" icon={faQuoteRight} />
                </li>
            </ul>
        </div>
    )
}











