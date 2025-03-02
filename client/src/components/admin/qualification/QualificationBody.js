import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faToggleOn,
    faToggleOff,
    faFolderOpen,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getUserQualifications, toggleUserQualificationFeature } from '../../redux/admin/QualificationSlice'
import  DeleteContactForm  from './DeleteContent'
import AddContent from './AddContent'
import EditSkills from './EditContent'






const QualificationBody = ({preloader, alertNotification}) => {
    const FetchUserQualificationRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [addFormState, setAddFormState] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, service: []})

    // redux 
    const dispatch = useDispatch()
    const qualifications = useSelector(state => state.qualifications.qualifications)


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


        // toggle features
        const toggleFeature = (_id) => {
            if(token){
                const content = {
                    _id: _id,
                    token: token
                }
                preloader(true, 'Please wait...')
                Axios.post(url('/api/admin/toggle-qualification-feature'), content).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        dispatch(toggleUserQualificationFeature(data.qualification))
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

    // fetch user qualifation
    const FetchUserQualification = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-qualification/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getUserQualifications(data.qualifications))
                }else if(data.status === 'catch-error'){
                    console.log(data.catchError)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }



    
    FetchUserQualificationRef.current = FetchUserQualification

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserQualificationRef.current()
    }, [])



    // const qualifications = [
    //     {
    //         _id: 1,
    //         title: "Teesside University",
    //         from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         _id: 2,
    //         title: "Yaba College of Technology",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         _id: 3,
    //         title: "Frontend Developer",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    //     {
    //         _id: 4,
    //         title: "Backend Developer",
    //        from: 2021,
    //         to: 2024,
    //         text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
    //     },
    // ]





    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable qualifications={qualifications}  toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddContent addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditSkills editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteContactForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}


export default QualificationBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY QUALIFICATIONS</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Qualification</button>
            </div>
        </div>
    )
  }


const ContentTable = ({qualifications, toggleDeleteForm, toggleFeature, toggleEditForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Text</th>
                        <th scope="col">Featured</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { qualifications.map((qualification, index) => (<ContentItem key={index} qualification={qualification} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { qualifications.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no qualifications yets!</div>
        </div>
    )
}



const ContentItem = ({qualification, toggleEditForm, toggleFeature, toggleDeleteForm}) => {
    return (
        <tr>
            <td>{qualification.title}</td>
            <td>{qualification.text ? HTMLReactParser(qualification.text) : null }</td>
            <td className="table-data-icon">
                <FontAwesomeIcon onClick={() => toggleFeature(qualification._id)} className={`icon ${qualification.is_featured ? 'active' : ''}`} icon={qualification.is_featured ? faToggleOn : faToggleOff} />
            </td>
            <td>{qualification.from}</td>
            <td>{qualification.to}</td>
            <td>{qualification.to - qualification.from}</td>
            <td>{DateTime(qualification.updated_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <FontAwesomeIcon onClick={() => toggleEditForm(true, qualification._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleDeleteForm(true, qualification._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}



