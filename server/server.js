require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const app = express()
const env = process.env
const path = require('path');



const HomeBannerRoutes = require('./routes/HomeBannerRoutes') 
const ServiceRoute = require('./routes/ServiceRoute') 
const UserRoute = require('./routes/UserRoute') 



app.use(fileUpload())
app.use(express.json())
app.use(cors())



// ********** connect to database **********
mongoose.connect(env.MONGOOSE_URI)
.then(() => console.log('Connected to MongoDB.....'))
.catch((e) => console.log("Error: " + e))





// ******** admin routes *************
app.use(HomeBannerRoutes)
app.use(ServiceRoute)
app.use(UserRoute)


// serve static image from users folder in the server to frontend
app.use('/public/asset/image/users/', express.static(path.join(__dirname, '/public/asset/image/users')));


//  port
const PORT = env.PORT || 3001

// ************** running the server*********
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})