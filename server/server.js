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
const AboutRoute = require('./routes/AboutRoute') 
const ContactRoute = require('./routes/ContactRoute') 
const SkillsRoute = require('./routes/SkillsRoute') 
const QualificationRoute = require('./routes/QualificationRoute')
const PortfolioRoute = require('./routes/PortfolioRoute')
const TestimonialRoute = require('./routes/TestimonialRoute')
const SettingsRoute = require('./routes/SettingsRoute')
const ReviewRequestRoute = require('./routes/ReviewRequestRoute')
const ReviewRoute = require('./routes/ReviewRoute')
const CvRoute = require('./routes/CvRoute')




// CORS Middleware Setup
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "https://elotechsolutions.com");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific methods
    next()
})



app.use(fileUpload())
app.use(express.json())
app.use(cors())





// ********** connect to database **********
mongoose.connect(env.MONGOOSE_URI)
.then(() => console.log('Connected to MongoDB.....'))
.catch((e) => console.log("Error: " + e))





// ******** routes *************
app.use(HomeBannerRoutes)
app.use(ServiceRoute)
app.use(UserRoute)
app.use(AboutRoute)
app.use(ContactRoute)
app.use(SkillsRoute)
app.use(QualificationRoute)
app.use(PortfolioRoute)
app.use(TestimonialRoute)
app.use(SettingsRoute)
app.use(ReviewRoute)
app.use(CvRoute)
app.use(ReviewRequestRoute)






// serve static image from folders in the server to frontend
app.use('/public/asset/files/cv/', express.static(path.join(__dirname, '/public/asset/files/cv')));
app.use('/public/asset/image/icon/', express.static(path.join(__dirname, '/public/asset/image/icon')));
app.use('/public/asset/image/users/', express.static(path.join(__dirname, '/public/asset/image/users')));
app.use('/public/asset/image/portfolio/', express.static(path.join(__dirname, '/public/asset/image/portfolio')));



//   example to test if server is working
app.get("/example", (reguest, response) => {
    console.log('Server is running!')
    return response.send("Server is working!")
})



//  port
const PORT = env.PORT || 3001

// ************** running the server*********
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})