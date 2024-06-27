import { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { url } from '../../../File'




import React from 'react'

const Preloader = () => {
    const serverREaderRef = useRef()
    const [preloader, setPreloader] = useState(true)

    const CheckIFServerIsReady = () => {
        Axios.get(url('/api/client/check-server-ready')).then((response) => {
            const data = response.data
            if(data.status === 'ok'){
                removerPreloader()
            }
        }).catch(error => {
            console.log(error)
        })
    }

    // remove preloader
    const removerPreloader = () => {
        setTimeout(() => {
            setPreloader(false)
        }, 1000)
    }

    serverREaderRef.current = CheckIFServerIsReady
    
    useEffect(() => {
        serverREaderRef.current()
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

