import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faTimes,
    faFolderOpen,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime, user_image } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getTestimonials, UpdateTestimonial } from '../../redux/admin/TestimonialSlice'
import  DeleteTestimonial  from './DeleteTestimonial'
import AddTestimonial from './AddTestimonial'
import EditTestimonial from './EditTestimonial'






const TestimonialBody = ({preloader, alertNotification}) => {
    const FetchTestimonialsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [addFormState, setAddFormState] = useState(false)
    const [testimonial, setTestimonial] = useState({})
    const [testimonialModal, setTestimonialModal] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, service: []})

    // redux 
    const dispatch = useDispatch()
    const testimonials = useSelector(state => state.testimonials.testimonials)


    // toggle delete message modal
    const toggleDeleteForm = (state=false, _id='') => {
        setDeleteFormState({ state: state, _id: _id})
    }

    // toggle add form modal
    const toggleAddForm = (state) => {
        setAddFormState(state)
    }


    // toggle edit form modal
    const toggleEditForm = (state=false, _id='') => {
        setEditFormState({state: state, _id: _id})
    }

    // populate testimonial modal
    const toggleModal = (state=false, testimonial={}) => {
        if(state === true){
            console.log('yess')
            setTestimonialModal(true)
            setTestimonial(testimonial)
        }else{
            setTestimonial({})
            setTestimonialModal(false)
        }
    }

    // toggle features
    const toggleFeature = (_id) => {
        if(token){
            const content = {
                _id: _id,
                token: token
            }
            preloader(true, 'Please wait...')
            Axios.post(url('/api/admin/toggle-testimonial-feature'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(UpdateTestimonial(data.testimonial))
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }

    // fetch  user portfolio
    const FetchTestimonials = () => {
        if(token){
            preloader(true, 'Please wait...')
            Axios.get(url(`/api/admin/fetch-user-testimonials/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getTestimonials(data.testimonials))
                }else {
                    console.log(data.error)
                }
                 preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }



    
    FetchTestimonialsRef.current = FetchTestimonials

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchTestimonialsRef.current()
    }, [])


    // const testimonials = [
    //     {
    //         _id: 1,
    //         name: "charles anonye",
    //         image: "",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 2,
    //         is_featured: 1,
    //     },
    //     {
    //         _id: 1,
    //         name: "charles anonye",
    //         image: "4.png",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 3,
    //         is_featured: 1,
    //     },
    //     {
    //         _id: 3,
    //         name: "charles anonye",
    //         image: "5.png",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 4,
    //         is_featured: 1,
    //     },
    //     {
    //         _id: 4,
    //         name: "charles anonye",
    //         image: "6.jpg",
    //         job_title: "Content Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 5,
    //         is_featured: 1,
    //     },
    //     {
    //         _id: 5,
    //         name: "charles anonye",
    //         image: "7.jpg",
    //         job_title: "Software Developer",
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 3,
    //         is_featured: 1,
    //     },
    // ]


    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable testimonials={testimonials}  toggleModal={toggleModal} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddTestimonial addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditTestimonial editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteTestimonial deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
            {testimonialModal ? (<TestimonialContent testimonial={testimonial} toggleModal={toggleModal}/>) : null }
        </div>
    )
}


export default TestimonialBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY TESTMONALS</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Testimonial</button>
            </div>
        </div>
    )
}


const ContentTable = ({testimonials, toggleDeleteForm, toggleModal, toggleFeature, toggleEditForm}) => {
    return (
        <div className="table-content-container table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                        <th scope="col">Job Title</th>
                        <th scope="col">Ratings</th>
                        <th scope="col">Featured</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { testimonials.map((testimonial, index) => (<ContentItem key={index} testimonial={testimonial} toggleModal={toggleModal} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { testimonials.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no Testimonials yets!</div>
        </div>
    )
}



const ContentItem = ({testimonial, toggleEditForm, toggleModal, toggleFeature, toggleDeleteForm}) => {
    return (
        <tr>
            <td >
                <div onClick={() => toggleModal(true, testimonial)} className="name">
                    {testimonial.name}
                </div>
            </td>
            <td>{testimonial.email}</td>
            <td>
                <div title="View Testimonial" onClick={() => toggleModal(true, testimonial)} className="image">
                    <img src={user_image(testimonial.image)} alt={testimonial.image}/>
                </div>
            </td>
            <td>{testimonial.job_title}</td>
            <td>{testimonial.rating}</td>
            <td className="table-data-icon">
                <FontAwesomeIcon title="Toggle Testimonial" onClick={() => toggleFeature(testimonial._id)} className={`icon ${testimonial.is_featured ? 'active' : ''}`} icon={testimonial.is_featured ? faToggleOn : faToggleOff}/>
            </td>
            <td>{DateTime(testimonial.updated_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <FontAwesomeIcon title="Edit Testimonial" onClick={() => toggleEditForm(true, testimonial._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  title="Delete Testimonial" onClick={() => toggleDeleteForm(true, testimonial._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}








const TestimonialContent = ({testimonial, toggleModal}) => {
    return (
        <div className="float-container-content">
            <div onClick={() => toggleModal(false)} className="dark-skin"></div>
            <div className="content-body">
                <div className="title-header">
                    <h3>Testimonial Detail</h3>
                    <FontAwesomeIcon onClick={() => toggleModal(false)}  className="icon cancel" icon={faTimes} />
                </div>
                <div className="message-content">
                    <ul>
                        <li>
                            <div className="image">
                                <img src={user_image(testimonial.image)} alt={testimonial.image}/>
                            </div>
                        </li>
                        <li><span>Name:</span> {testimonial.name}</li>
                        <li><span>Job Title:</span> {testimonial.job_title}</li>
                        <li><span>Added on:</span> {DateTime(testimonial.created_at, 'Do MMMM YYYY | h:mma')}</li>
                        <li><span>Updated on:</span> {DateTime(testimonial.updated_at, 'Do MMMM YYYY | h:mma')}</li>
                        <li>
                            <span>Featured:</span> 
                            <FontAwesomeIcon className={`featured-icon ${testimonial.is_featured ? 'active' : ''}`} icon={testimonial.is_featured ? faToggleOn : faToggleOff}/>
                        </li>
                        <li className="message">
                            <span>Description: </span>
                            {testimonial.description ? (HTMLReactParser(testimonial.description)) : 'Empty'}
                        </li>
                        <li className="button">
                            <button onClick={() => toggleModal(false)} className="delete">Close</button>
                        </li>
                   </ul>
                </div>
            </div>
        </div>
    )
}