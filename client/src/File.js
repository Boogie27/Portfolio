
import Axios from 'axios'



// data base url link
const clientURI = 'http://localhost:3000'
const serverURL = 'http://localhost:3001'
let productionClientURL = 'https://eloquent.com'
let productionServerURL = 'https://server.eloquent.com'




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
    auth_image,
    userImage,
    preloader,
    user_image,
    portfolio_img,
}