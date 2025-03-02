import { preloader } from '../../../File'




const Preloader = ({text}) => {
  return (
    <div className="content-preloader">
        <div className="loading">
            <img src={preloader('1.gif')} alt="preloader"/>
            <h3>{text}</h3>
        </div>
    </div>
  )
}

export default Preloader
