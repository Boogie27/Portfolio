import Axios from 'axios'
import Cookies from 'js-cookie'
import HTMLReactParser from 'html-react-parser'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEye,
    faTrash,
    faTimes,
    faEnvelope,
    faFolderOpen,
    faEnvelopeOpen,
} from '@fortawesome/free-solid-svg-icons'
import { url, DateTime } from '../../../File'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getContacts, UpdateContactMessage } from '../../redux/admin/ContactSlice'
import  DeleteContactForm  from './DeleteContactForm'








const Contacts = ({preloader, alertNotification}) => {
    const FetchContactsRef = useRef(null)
    let token = Cookies.get('Eloquent_token')
    const [message, setMessage] = useState('')
    const [messsageForm, setMesssageForm] = useState(false)
    const [deleteFormState, setDeleteFormState] = useState({state: false, _id: ''})

    // redux 
    const dispatch = useDispatch()
    const contacts = useSelector(state => state.contacts.contacts)


    // const contacts = [
    //         {
    //             name: 'example',
    //             email: 'example@gmail.com',
    //             message: 'example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf v v vexample iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf',
    //             phone: '080227898464',
    //             country: 'nigeria',
    //             is_seen: 0
    //         },
    //         {
    //             name: 'example',
    //             email: 'example@gmail.com',
    //             message: 'example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf example iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf v v vexample iohero8ofh ihfolfha iohd;oih weiohoihdfoiad oiho;ihgflaf',
    //             phone: '080227898464',
    //             country: 'nigeria',
    //             is_seen: 0
    //         },
    //     ]

        // toggle delete message modal
        const toggleDeleteForm = (state=false, _id='') => {
            setDeleteFormState({ state: state, _id: _id})
        }


        const FetchContacts = () => {
            preloader(true, 'Fetching messages, please wait...')
            if(token){
                Axios.get(url(`/api/admin/fetch-contacts-messages/${token}`)).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        dispatch(getContacts(data.contacts))
                    }
                    preloader(false)
                }).catch(error => {
                    preloader(false)
                    console.log(error)
                    alertNotification('error', 'Something went wrong!')
                })
            }
        }


        // display message
    const toggleMessageForm = (state = false, contact = '') => {
        if(state === false){
            setMessage('')
            setMesssageForm('')
        }else{
            preloader(true, 'Fetching message, please wait...')
            if(token){
                const content = {
                    token: token,
                    _id: contact._id,
                }
                Axios.post(url("/api/admin/open-contacts-messages"), content).then((response) => {
                    const data = response.data
                    if(data.status === 'ok'){
                        setMessage(contact)
                        setMesssageForm(state)
                        dispatch(UpdateContactMessage(data.updatedMessage))
                    }
                    preloader(false)
                }).catch(error => {
                    preloader(false)
                    console.log(error)
                    alertNotification('error', 'Something went wrong!')
                })
            }
        }
    }


       
        FetchContactsRef.current = FetchContacts

        useEffect(() => {
            window.scrollTo(0, 0) // page scroll to top
            FetchContactsRef.current()
        }, [])

    
    return (
        <div className="dashboard-banner-container">
            <TitleHeader/>
            <ContentTable contacts={contacts} toggleMessageForm={toggleMessageForm} toggleDeleteForm={toggleDeleteForm}/>
            { messsageForm ? (<MessageContent message={message} toggleDeleteForm={toggleDeleteForm} toggleMessageForm={toggleMessageForm}/>) : null }
            <DeleteContactForm deleteFormState={deleteFormState} setDeleteFormState={setDeleteFormState} alertNotification={alertNotification}/>
        </div>
    )
}


export default Contacts





const TitleHeader = () => {
    return (
        <div className="top-title-content">
            <div className="title-header">
                <h3>CLIENT CONTACS</h3>
            </div>
            <div className="right-button">
                <NavLink to="/dashboard/contact-header">
                    <FontAwesomeIcon className="icon" icon={faEye} />Contact Header
                </NavLink>
            </div>
        </div>
    )
  }


const ContentTable = ({contacts, toggleMessageForm, toggleDeleteForm}) => {
    return (
        <div className="table-content-container">
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Message</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Country</th>
                        <th scope="col">Sent on</th>
                        <th scope="col">Reply</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { contacts.map((contact, index) => (<ContentItem key={index} contact={contact} toggleDeleteForm={toggleDeleteForm} toggleMessageForm={toggleMessageForm}/>)) }
                </tbody>
            </table>
            { contacts.length === 0 ? (<TableEmpty/>) : null }
        </div>
    )
}



const TableEmpty = () => {
    return (
        <div className="empty-table">
            <div className="empty-icon">
                <FontAwesomeIcon  className="icon" icon={faFolderOpen} />
            </div>
            <div className="text">There are no contacts yets!</div>
        </div>
    )
}



const ContentItem = ({contact, toggleMessageForm, toggleDeleteForm}) => {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>
                <FontAwesomeIcon onClick={() => toggleMessageForm(true, contact)}  className="icon" icon={contact.is_seen ? faEnvelopeOpen : faEnvelope} />
            </td>
            <td>{contact.phone}</td>
            <td>{contact.country}</td>
            <td>{DateTime(contact.created_at, 'Do MMMM YYYY | h:mma')}</td>
            <td>
                <button className="reply-message" type="button">Reply</button>
            </td>
            <td>
                <FontAwesomeIcon  onClick={() => toggleDeleteForm(true, contact._id)} className="icon delete" icon={faTrash} />
            </td>
        </tr>
    )
}





const MessageContent = ({message, toggleDeleteForm, toggleMessageForm}) => {
    return (
        <div className="float-container-content">
            <div onClick={() => toggleMessageForm(false)} className="dark-skin"></div>
            <div className="content-body">
                <div className="title-header">
                    <h3>Contact Message</h3>
                    <FontAwesomeIcon onClick={() => toggleMessageForm(false)}  className="icon cancel" icon={faTimes} />
                </div>
                <div className="message-content">
                    <ul>
                        <li><span>Name:</span> {message.name}</li>
                        <li><span>Email:</span> {message.email}</li>
                        <li><span>Sent on:</span> {DateTime(message.created_at, 'Do MMMM YYYY | h:mma')}</li>
                        <li><span>Message seen on:</span> {DateTime(message.updated_at, 'Do MMMM YYYY | h:mma')}</li>
                        <li className="message">
                            <span>Message: </span>
                            {message.message ? (HTMLReactParser(message.message)) : 'Empty'}
                        </li>
                        <li className="button">
                            <button onClick={() => toggleDeleteForm(true, message._id)} className="delete">Delete</button>
                            <button className="reply">Reply</button>
                        </li>
                   </ul>
                </div>
            </div>
        </div>
    )
}
