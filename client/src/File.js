
import Moment from "moment";

const state = process.env.NODE_ENV






// data base url link
const clientURI = 'http://localhost:3000'
const serverURL = 'http://localhost:3001'
let productionClientURL = 'https://elotechsolutions.com'
let productionServerURL = 'https://server.elotechsolutions.com'



const userDemoImage = 'demo.png' // demo user image


// server url 
const url = (string = null) => { 
    if(state === 'development'){
        return serverURL + string
    }
    return productionServerURL + string
}
// const url = (string = null) => { 
//     const url = window.location.href.split('/')[2]
//     const url_name = url.split(':')[0]
//     if(url_name === 'localhost'){
//         return serverURL + string
//     }
//     return productionServerURL + string
// }




// client url
const ClientUrl = (string = null) => { 
    if(state === 'development'){
        return clientURI + string
    }
    return productionClientURL + string
}
// const ClientUrl = (string = null) => { 
//     const url = window.location.href.split('/')[2]
//     const url_name = url.split(':')[0]
//     if(url_name === 'localhost'){
//         return clientURI + string
//     }
//     return productionClientURL + string
// }



const DateTime = (time, format) => {
    // example of format "dddd h:mma D MMM YYYY"
    let x = ''
    if(time && format){
        x =  Moment(time).format(format)
    }
    return x
}



const user_image = (string='') => {
    const image = string ? string : userDemoImage
    // return ClientUrl('/asset/image/users/' + image)
    return url('/public/asset/image/users/' + image)
}


const userImage = (string='') => {
    const image = string ? string : userDemoImage
    return url('/public/asset/image/users/' + image)
}



const icon = (string='') => {
    return url('/public/asset/image/icon/' + string)
}


const portfolio_img = (string) => {
    return url('/public/asset/image/portfolio/' + string)
    // return ClientUrl('/asset/image/portfolio/' + string)
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


 // generate years
 const generate_years = () => {
    const years = [];
    const stopYear = 1990
    const currentYear = new Date().getFullYear();
    const startYear = currentYear || 2024; // Default start year if not provided
    for (let i = startYear; i >= stopYear; i--) {
        years.push(i)
    }
    return years
}



const get_months = () => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    return month
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
    get_months,
    user_image,
    userDemoImage,
    portfolio_img,
    generate_years,
}