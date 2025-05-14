import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faToggleOff,
    faFolderOpen,
    faToggleOn,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime, icon } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getUserSkills, toggleSKillsFeature } from '../../redux/admin/SkillSlice'
import  DeleteSkillsForm  from './DeleteSkillsForm'
import AddSkills from './AddSkills'
import EditSkills from './EditSkills'






const SkillsBody = ({preloader, alertNotification}) => {
    const FetchUserSkillsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [addFormState, setAddFormState] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, service: []})

    // redux 
    const dispatch = useDispatch()
    const skills = useSelector(state => state.skills.skills)


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


    const FetchUserSkills = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-skills/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getUserSkills(data.skills))
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }

    // feature skills on or off
    const toggleFeatured = (_id) => {
        if(token){
            const content = {
                _id: _id,
                token: token
            }
            Axios.post(url(`/api/admin/toggle-skills-feature`), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(toggleSKillsFeature(data.updatedSkill))
                }else if(data.status === 'error'){
                    alertNotification('error', data.message)
                }
            }).catch(error => {
                console.log(error)
                alertNotification('error', 'Oops!, an error has occured, check the server!')
            })
        }
    }

    
    FetchUserSkillsRef.current = FetchUserSkills

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserSkillsRef.current()
    }, [])



    // const skills = [
    //     {
    //         _id: 1,
    //         title: "HTML",
    //         image: "html.png",
    //         rating: 90,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 2,
    //         title: "CSS",
    //         image: "css.png",
    //         rating: 80,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 3,
    //         title: "JAVASCRIPT",
    //         image: "html.png",
    //         rating: 100,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 4,
    //         title: "Jquery",
    //         image: "jquery.webp",
    //         rating: 100,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 5,
    //         title: "PHP",
    //         image: "php.png",
    //         rating: 100,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 6,
    //         title: "LARAVEL",
    //         image: "laravel.png",
    //         rating: 80,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 7,
    //         title: "REACT",
    //         image: "react.png",
    //         rating: 70,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 8,
    //         title: "NodeJS",
    //         image: "nodejs.png",
    //         rating: 100,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 9,
    //         title: "MongoDB",
    //         image: "mongo-db.png",
    //         rating: 70,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 10,
    //         title: "RESTAPI",
    //         image: "rest-api.png",
    //         rating: 50,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 11,
    //         title: "Redux",
    //         image: "redux.png",
    //         rating: 60,
    //         created_at: "",
    //         updated_at: ""
    //     },
    //     {
    //         _id: 12,
    //         title: "Git",
    //         image: "git.png",
    //         rating: 80,
    //         created_at: "",
    //         updated_at: ""
    //     },
    // ] 
    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable skills={skills}  toggleFeatured={toggleFeatured} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddSkills addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditSkills editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteSkillsForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}


export default SkillsBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY SKILLS</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Services</button>
            </div>
        </div>
    )
  }


const ContentTable = ({skills, toggleDeleteForm, toggleFeatured, toggleEditForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">rating</th>
                        <th scope="col">Featured</th>
                        <th scope="col">Added on</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { skills.map((skill, index) => (<ContentItem key={index} skill={skill} toggleFeatured={toggleFeatured} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { skills.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no skills yets!</div>
        </div>
    )
}



const ContentItem = ({skill, toggleEditForm, toggleFeatured, toggleDeleteForm}) => {
    return (
        <tr>
            <td>{skill.title}</td>
            <td>
                <div className="image">
                    <img src={icon(skill.image)} alt={skill.image}/>
                </div>
            </td>
            <td>{skill.rating}%</td>
            <td className="table-data-icon">
                <FontAwesomeIcon  onClick={() => toggleFeatured(skill._id)}  className={`icon ${skill.is_featured ? 'active' : ''}`} icon={skill.is_featured ? faToggleOn : faToggleOff} />
            </td>
            <td>{DateTime(skill.created_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>{DateTime(skill.updated_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <FontAwesomeIcon onClick={() => toggleEditForm(true, skill._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleDeleteForm(true, skill._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}



