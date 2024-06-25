import { useState } from 'react'
// import Axios from 'axios'
// import { url } from '../../../File'





const DashBoard = () => {
  const [ image, setImage ] = useState(null)


  const fileUpload = (e) => {
    const file = e.target.files[0]
    const extension = file.name.split('.').pop().toLowerCase()
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'svg', 'ico']
    if(allowedExtensions.includes(extension)){
      setImage(file)
    }
  }


  const uploadImage = () => {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('name', 'charles')

  
  }

  return (
    <div className="">
       DashBoard
      <br/><br/><br/>
       <div>
        <input onChange={(e) => fileUpload(e)} type="file" className=""/>
        <button onClick={() => uploadImage()}>Upload..</button>
       </div>
    </div>
  )
}

export default DashBoard
