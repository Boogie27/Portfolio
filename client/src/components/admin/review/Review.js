import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewRequest } from '../../redux/admin/ReviewRequestSlice'
import  DeleteContent  from './DeleteContent'
import AddContent from './AddContent'
import EditContent from './EditContent'






const TestimonialBody = ({preloader, alertNotification}) => {
    const FetchReviewRequestsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [addFormState, setAddFormState] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, content: {}})

    // redux 
    const dispatch = useDispatch()
    const reviewRequests = useSelector(state => state.reviewRequests.reviewRequests)


    // toggle delete message modal
    const toggleDeleteForm = (state=false, _id='') => {
        setDeleteFormState({ state: state, _id: _id})
    }

    // toggle add form modal
    const toggleAddForm = (state) => {
        setAddFormState(state)
    }


    // toggle edit form modal
    const toggleEditForm = (state=false, content='') => {
        setEditFormState({state: state, content})
    }



    // fetch  user portfolio
    const FetchReviewRequests = () => {
        if(token){
            preloader(true, 'Fetching requests, Please wait...')
            Axios.get(url(`/api/admin/fetch-user-review-requests/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getReviewRequest(data.reviewRequests))
                }
                preloader(false)
            }).catch(error => {
                preloader(false)
                console.log(error)
            })
        }
    }



    
    FetchReviewRequestsRef.current = FetchReviewRequests

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchReviewRequestsRef.current()
    }, [])


    // const reviewRequests = [
    //     {
    //         _id: 1,
    //         name: "charles anonye",
    //         email: "example.com",
    //         is_completed: 0,
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 2,
    //         is_featured: 1,
    //         completed_at: '2024-08-07T20:33:09.687Z',
    //         created_at: '2024-08-07T20:33:09.687Z',
    //     },
    //     {
    //         _id: 1,
    //         name: "charles anonye",
    //         email: "example.com",
    //         is_completed: 1,
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 3,
    //         is_featured: 1,
    //         completed_at: '2024-08-07T20:33:09.687Z',
    //         created_at: '2024-08-07T20:33:09.687Z',
    //     },
    //     {
    //         _id: 3,
    //         name: "charles anonye",
    //         email: "example.com",
    //         is_completed: 0,
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 4,
    //         is_featured: 1,
    //         completed_at: '2024-08-07T20:33:09.687Z',
    //         created_at: '2024-08-07T20:33:09.687Z',
    //     },
    //     {
    //         _id: 4,
    //         name: "charles anonye",
    //         email: "example.com",
    //         is_completed: 1,
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 5,
    //         is_featured: 1,
    //         completed_at: '2024-08-07T20:33:09.687Z',
    //         created_at: '2024-08-07T20:33:09.687Z',
    //     },
    //     {
    //         _id: 5,
    //         name: "charles anonye",
    //         email: "example.com",
    //         is_completed: 1,
    //         description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //         ratings: 3,
    //         is_featured: 1,
    //         completed_at: '2024-08-07T20:33:09.687Z',
    //         created_at: '2024-08-07T20:33:09.687Z',
    //     },
    // ]


    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable reviewRequests={reviewRequests} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddContent addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditContent editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteContent deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}


export default TestimonialBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>REVIEW REQUEST</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Send request</button>
            </div>
        </div>
    )
}


const ContentTable = ({reviewRequests, toggleDeleteForm, toggleEditForm}) => {
    return (
        <div className="table-content-container table-responsive">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Project</th>
                        <th scope="col">Completed</th>
                        <th scope="col">Sent on</th>
                        <th scope="col">Completed on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { reviewRequests.map((reviewRequests, index) => (<ContentItem key={index} reviewRequests={reviewRequests} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { reviewRequests.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no Review Request yets!</div>
        </div>
    )
}



const ContentItem = ({reviewRequests, toggleEditForm, toggleDeleteForm}) => {
    return (
        <tr>
            <td >
                <div className="name">
                    {reviewRequests.name}
                </div>
            </td>
            <td>{reviewRequests.email}</td>
            <td>{reviewRequests.project}</td>
            <td>
                <div className={reviewRequests.is_completed ? 'completed' : 'pending'}>{reviewRequests.is_completed ? 'completed' : 'pending' }</div>
            </td>
            <td>{DateTime(reviewRequests.created_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>{ reviewRequests.completed_at ? DateTime(reviewRequests.completed_at, 'Do MMMM YYYY | h:mma') : '- - -'}</td>
            <td>
                <FontAwesomeIcon title="Edit Review Request" onClick={() => toggleEditForm(true, reviewRequests)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  title="Delete Review Requests" onClick={() => toggleDeleteForm(true, reviewRequests._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}




