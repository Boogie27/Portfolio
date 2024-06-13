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




  return (
    <div className="testimonial-container">
        <div className="inner-testimonial">
            <TitleHeader/>
            <TestimonialContent responsive={responsive}/>
        </div>
    </div>
  )
}

export default Testimonial




const TitleHeader = () => {
    return (
        <div className="title-header">
            <h3>Clients Review</h3>
            <div className="title">
                <h1>My Testimonial</h1>
            </div>
        </div>
    )
}




const TestimonialContent = ({responsive}) => {
    return (
        <div className="testimonial-slider-frame">
            <Carousel 
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            responsive={responsive}>
                <SliderContentItem image={'3.png'}/>
                <SliderContentItem image={'4.png'}/>
                <SliderContentItem image={'5.png'}/>
                <SliderContentItem image={'6.jpg'}/>
                <SliderContentItem image={'7.jpg'}/>
            </Carousel>
        </div>
    )
}





const SliderContentItem = ({image}) => {
    return (
        <div className="testimoni-content-item">
            <ul className="inner-testimonial-content-item">
                <li className="image">
                    <img src={user_image(image)} alt="testimonial"/>
                </li>
                <li className="ratings">
                    <span className="rate">Ratings: </span>
                    <span>
                        <FontAwesomeIcon className="star active" icon={faStar} />
                        <FontAwesomeIcon className="star active" icon={faStar} />
                        <FontAwesomeIcon className="star active" icon={faStar} />
                        <FontAwesomeIcon className="star" icon={faStar} />
                        <FontAwesomeIcon className="star" icon={faStar} />
                    </span>
                </li>
                <li className="title-header">
                    <h3>Charles Anonye</h3>
                    <h4>
                        <FontAwesomeIcon className="icon" icon={faLayerGroup} />
                        <span>Software Developer</span>
                    </h4>
                </li>
                <li className="description">
                    Nemo enim ipsam voluptatem quia voluptas sit 
                    aspernatur aut odit aut fugit sed thisnquia consequuntur
                    magni dolores eos qui ratione voluptatem
                    <FontAwesomeIcon className="icon" icon={faQuoteRight} />
                </li>
            </ul>
        </div>
    )
}











