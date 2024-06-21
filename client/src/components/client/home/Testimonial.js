import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { user_image } from '../../../File'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faStar,
  faLayerGroup,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons'





const Testimonial = () => {

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


    const header = {
        title: "CLIENTS REVIEW",
        text: "My Testimonial",
    }


    const myTestimonial = [
        {
            name: "charles anonye",
            image: "",
            job_title: "Software Developer",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            ratings: 2
        },
        {
            name: "charles anonye",
            image: "4.png",
            job_title: "Software Developer",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            ratings: 3
        },{
            name: "charles anonye",
            image: "5.png",
            job_title: "Software Developer",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            ratings: 4
        },
        {
            name: "charles anonye",
            image: "6.jpg",
            job_title: "Content Developer",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            ratings: 5
        },
        {
            name: "charles anonye",
            image: "7.jpg",
            job_title: "Software Developer",
            text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
            ratings: 3
        },
    ]




  return (
    <div className="testimonial-container">
        <div className="inner-testimonial">
            <TitleHeader header={header}/>
            <TestimonialContent myTestimonial={myTestimonial} responsive={responsive}/>
        </div>
    </div>
  )
}

export default Testimonial




const TitleHeader = ({header}) => {
    return (
        <div className="title-header">
            <h3>{header.title}</h3>
            <div className="title">
                <h1>{header.text}</h1>
            </div>
        </div>
    )
}




const TestimonialContent = ({ myTestimonial, responsive}) => {
    return (
        <div className="testimonial-slider-frame">
            <Carousel 
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            responsive={responsive}>
                { myTestimonial.map((item, index) => (<SliderContentItem key={index} item={item}/>)) }
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
                    <span className="rate">Ratings: </span>
                    <span>
                        {
                           [...Array(5)].map((current, index) => (
                            <FontAwesomeIcon key={index} className={`star ${ index < item.ratings ? 'active' : '' }`} icon={faStar} /> 
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
                    { item.text ? (item.text) : null }
                    <FontAwesomeIcon className="icon" icon={faQuoteRight} />
                </li>
            </ul>
        </div>
    )
}











