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


// serve static image from folders in the server to frontend
app.use('/public/asset/image/icon/', express.static(path.join(__dirname, '/public/asset/image/icon')));
app.use('/public/asset/image/users/', express.static(path.join(__dirname, '/public/asset/image/users')));
app.use('/public/asset/image/portfolio/', express.static(path.join(__dirname, '/public/asset/image/portfolio')));


//  port
const PORT = env.PORT || 3001

// ************** running the server*********
app.listen(PORT, () => {
    console.log("Server running on port: " + PORT)
})