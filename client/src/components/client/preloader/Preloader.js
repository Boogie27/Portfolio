import { useState, useEffect } from 'react'
import Axios from 'axios'
import { url } from '../../../File'




import React from 'react'

const Preloader = () => {
    const [preloader, setPreloader] = useState(true)


    useEffect(() => {
        Axios.get(url('/api/client/check-server-ready')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                removerPreloader()
            }
        }).catch(error => {
            console.log(error)
        })

        // remove preloader
        const removerPreloader = () => {
            setTimeout(() => {
                setPreloader(false)
            }, 3000)
        }
    }, [])


  return (
    <div className={`preloader-conatiner ${preloader ? 'active' : '' }`}>
        <div className="inner-preloader">
            <div className="title-header">
                <h3>PORTF<span>OLIO</span></h3>
            </div>
            <div className="line">
                <div className="bar"></div>
            </div>
        </div>
    </div>
  )
}

export default Preloader

