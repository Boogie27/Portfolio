
import Moment from "moment";



// data base url link
const clientURI = 'http://localhost:3000'
const serverURL = 'http://localhost:3001'
let productionClientURL = 'https://eloquent.com'
let productionServerURL = 'https://server.eloquent.com'



const userDemoImage = 'demo.png' // demo user image


// server url 
const url = (string = null) => { 
    const url = window.location.href.split('/')[2]
    const url_name = url.split(':')[0]
    if(url_name === 'localhost'){
        return serverURL + string
    }
    return productionServerURL + string
}




// client url
const ClientUrl = (string = null) => { 
    const url = window.location.href.split('/')[2]
    const url_name = url.split(':')[0]
    if(url_name === 'localhost'){
        return clientURI + string
    }
    return productionClientURL + string
}



const DateTime = (time, format) => {
    // example of format "dddd h:mma D MMM YYYY"
    let x = ''
    if(time && format){
        x =  Moment(time).format(format)
    }
    return x
}



const user_image = (string) => {
    return ClientUrl('/asset/image/users/' + string)
}


const userImage = (string) => {
    return url('/public/asset/image/users/' + string)
}



const icon = (string) => {
    return ClientUrl('/asset/image/icon/' + string)
}


const portfolio_img = (string) => {
    return ClientUrl('/asset/image/portfolio/' + string)
}

const preloader = (string) => {
    return ClientUrl('/asset/image/preloader/' + string)
}

const auth_image = (string) => {
    return ClientUrl('/asset/image/auth/' + string)
}


const curentURL = (string) => {
    return window.location.href
}




const page = (string) => {
    let state = false
    const url = window.location.href.split('/')
    for(let i = 0; i < url.length; i++){
        if(url[i] === string){
            state = true
        }
    }
    return state
}


export {
    url,
    icon,
    page,
    DateTime,
    curentURL,
    auth_image,
    userImage,
    preloader,
    user_image,
    userDemoImage,
    portfolio_img,
}