import Axios from 'axios'
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPen,
    faTrash,
    faFolderOpen,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime, portfolio_img } from '../../../File'
import { useDispatch, useSelector } from 'react-redux'
import { getUserPortfolios, UpdateUserPortfolio } from '../../redux/admin/PortfolioSlice'
import  DeleteContent  from './DeleteContent'
import AddPortfolio from './AddPortfolio'
import EditPortfolio from './EditPortfolio'






const PortfolioBody = ({preloader, alertNotification}) => {
    const FetchUserPortfoliosRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [addFormState, setAddFormState] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})
    const [editFormState, setEditFormState] = useState({state: false, service: []})

    // redux 
    const dispatch = useDispatch()
    const portfolios = useSelector(state => state.portfolios.portfolios)


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
            Axios.post(url('/api/admin/toggle-portfolio-feature'), content).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(UpdateUserPortfolio(data.updatedPortfolio))
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
    const FetchUserPortfolios = () => {
        if(token){
            Axios.get(url(`/api/admin/fetch-user-portfolios/${token}`)).then((response) => {
                const data = response.data
                if(data.status === 'ok'){
                    dispatch(getUserPortfolios(data.portfolios))
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }



    
    FetchUserPortfoliosRef.current = FetchUserPortfolios

    useEffect(() => {
        window.scrollTo(0, 0) // page scroll to top
        FetchUserPortfoliosRef.current()
    }, [])



//     const portfolios_static = [
//       {
//           _id: 1,
//           title: "Payizzy Website",
//           image: [
//               "1.png", "2.png", "3.png", "5.jpg"
//           ],
//           description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
//           technologies: [
//               "React", "HTML", "CSS", "NodeJs"
//           ],
//           order: 1,
//           from: "march 2021",
//           to: "june 2024",
//           link: "/",
//           position: 1,
//           is_featured: 1,
//       },
//       {
//           _id: 2,
//           title: "Payizzy Website",
//           image: [
//               "2.png", "4.png", "1.png", "5.jpg", "3.png"
//           ],
//           description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
//           technologies: [
//               "React", "HTML", "CSS", "NodeJs"
//           ],
//           order: 2,
//           from: "march 2021",
//           to: "june 2024",
//           link: "/",
//           position: 2,
//           is_featured: 1,
//       },
//       {
//           _id: 3,
//           title: "Payizzy Website",
//           image: [
//               "3.png", "4.png", "2.png"
//           ],
//           description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
//           technologies: [
//               "React", "HTML", "CSS", "NodeJs"
//           ],
//           order: 3,
//           from: "march 2021",
//           to: "june 2024",
//           link: "/",
//           position: 3,
//           is_featured: 1,
//       },
//       {
//           _id: 4,
//           title: "Payizzy Website",
//           image: [
//               "4.png", "5.jpg", "2.png", "1.png", "3.png"
//           ],
//           description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
//           technologies: [
//               "React", "HTML", "CSS", "NodeJs"
//           ],
//           order: 4,
//           from: "march 2021",
//           to: "june 2024",
//           link: "/",
//           position: 4,
//           is_featured: 1,
//       },
//       {
//           _id: 5,
//           title: "Payizzy Website",
//           image: [
//               "5.jpg", "4.png", "3.png", "2.png", "1.png"
//           ],
//           from: "march 2021",
//           to: "june 2024",
//           description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed thisnquia consequuntur magni dolores eos qui ratione voluptatem",
//           technologies: [
//               "React", "HTML", "CSS", "NodeJs"
//           ],
//           order: 5,
//           link: "/",
//           position: 5,
//           is_featured: 1,
//       },
//   ] 
    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader toggleAddForm={toggleAddForm}/>
            <ContentTable portfolios={portfolios}  toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>
            <AddPortfolio addFormState={addFormState} toggleAddForm={toggleAddForm} alertNotification={alertNotification}/>
            {editFormState.state ? (<EditPortfolio editFormState={editFormState} toggleEditForm={toggleEditForm} alertNotification={alertNotification}/>) : null }
            <DeleteContent deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}


export default PortfolioBody





const TitleHeader = ({toggleAddForm}) => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>MY PORFOLIO</h3>
            </div>
            <div className="button">
                <button onClick={() => toggleAddForm(true) } type="button">Add Portfolio</button>
            </div>
        </div>
    )
}


const ContentTable = ({portfolios, toggleDeleteForm, toggleFeature, toggleEditForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Featured</th>
                        <th scope="col">Order</th>
                        <th scope="col">Updated on</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { portfolios.map((portfolio, index) => (<ContentItem key={index} portfolio={portfolio} toggleFeature={toggleFeature} toggleEditForm={toggleEditForm} toggleDeleteForm={toggleDeleteForm}/>)) }
                </tbody>
            </table>
            { portfolios.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no Portfolios yets!</div>
        </div>
    )
}



const ContentItem = ({portfolio, toggleEditForm, toggleFeature, toggleDeleteForm}) => {
    const [order, setOrder] = useState('')
    
    return (
        <tr>
            <td>
                <NavLink to={`/dashboard/portfolio/detail/${portfolio._id}`}>{portfolio.title}</NavLink>
            </td>
            <td>
                <NavLink to={`/dashboard/portfolio/detail/${portfolio._id}`}>
                    <div className="image">
                        <img src={portfolio_img(portfolio.image[0])} alt={portfolio.image[0]}/>
                    </div>
                </NavLink>
            </td>
            <td className="table-data-icon">
                <FontAwesomeIcon onClick={() => toggleFeature(portfolio._id)} className={`icon ${portfolio.is_featured ? 'active' : ''}`} icon={portfolio.is_featured ? faToggleOn : faToggleOff}/>
            </td>
            <td>
                <div className="order">
                    <input type="number" min="1" onChange={(e) => setOrder(e.target.value)} value={portfolio.order}/>
                </div>
            </td>
            <td>{DateTime(portfolio.updated_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <FontAwesomeIcon onClick={() => toggleEditForm(true, portfolio._id)} className="icon" icon={faPen} />
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleDeleteForm(true, portfolio._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}



