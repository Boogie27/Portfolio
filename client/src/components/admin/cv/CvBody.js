import Axios from 'axios'
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faEye,
    faFilePdf,
    faFolderOpen,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCv, toggleCvFeature } from '../../redux/admin/CvSlice'
import  DeleteContent  from './DeleteContent'
import AddContent from './AddContent'
import EditContent from './EditContent'
import CvViewer from './CvViewer'









const CvBody = ({preloader, alertNotification}) => {
    const FetchCvRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [isViewed, setIsViewed] = useState(false)
    const [addFormState, setAddFormState] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, service: []})

    // redux 
    const dispatch = useDispatch()
    const cvs = useSelector(state => state.cvs.cvs)


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
            Axios.post(url('/api/admin/toggle-cv-feature'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(toggleCvFeature(data.cvFeature))
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
    const FetchCv = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-cv/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getUserCv(data.cvs))
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }



    // cb viewer
    const toggleCvViewer = (cv) => {
        if(cv === 'close'){
            return setIsViewed(false)
        }
        return setIsViewed({state: cv.state, cv: cv.cv})
    }

    
    FetchCvRef.current = FetchCv

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchCvRef.current()
    }, [])


    // const cvs = [
    //     {
    //         _id: 1,
    //         cv: "charles-react-cv.pdf",
    //         cv_title: "Software Developer",
    //         download_count: 5,
    //         is_featured: 1,
    //         updated_at: "03/2/2023",
    //     },
    //      {
    //         _id: 2,
    //         cv: "charles-react-cv.pdf",
    //         cv_title: "Software Developer",
    //         download_count: 5,
    //         is_featured: 1,
    //         updated_at: "03/2/2023",
    //     },
    //      {
    //         _id: 3,
    //         cv: "charles-react-cv.pdf",
    //         cv_title: "Software Developer",
    //         download_count: 5,
    //         is_featured: 1,
    //         updated_at: "03/2/2023",
    //     },
    // ]


    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable cvs={cvs}  toggleCvViewer={toggleCvViewer} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddContent addFormState={addFormState}  toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditContent editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteContent deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
            {isViewed !== false ? (<CvViewer toggleCvViewer={toggleCvViewer}/>) : null }
        </div>
    )
}




export default CvBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY CV</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add CV</button>
            </div>
        </div>
    )
}


const ContentTable = ({cvs, toggleCvViewer, toggleDeleteForm, toggleFeature, toggleEditForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Cv Title</th>
                        <th scope="col">Cv</th>
                        <th scope="col">View Cv</th>
                        <th scope="col">Download Count</th>
                        <th scope="col">Featured</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { cvs.map((cv, index) => (<ContentItem key={index} toggleCvViewer={toggleCvViewer} cv={cv} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { cvs.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no CV yet!</div>
        </div>
    )
}



const ContentItem = ({cv, toggleCvViewer, toggleEditForm, toggleFeature, toggleDeleteForm}) => {
    return (
        <tr>
            <td>
                <FontAwesomeIcon className="file-icon" icon={faFilePdf} />
            </td>
            <td>
                {cv.cv_title}
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleCvViewer({state: true, cv: cv.cv})} className="icon" icon={faEye} />
            </td>
             <td>
                {cv.download_count}
            </td>
            <td className="table-data-icon">
                <FontAwesomeIcon onClick={() => toggleFeature(cv._id)} className={`icon ${cv.is_featured ? 'active' : ''}`} icon={cv.is_featured ? faToggleOn : faToggleOff}/>
            </td>
            <td>{DateTime(cv.updated_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <FontAwesomeIcon onClick={() => toggleEditForm(true, cv._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleDeleteForm(true, cv._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}



