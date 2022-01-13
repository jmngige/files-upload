const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/db')
const fileUpload = require('express-fileupload')

const errorHandler = require('./middlewares/error')
require('morgan')

dotenv.config({ path : './config/.env' })
const userRoute = require('./routes/user')
const app = express()

//body parser
app.use(express.json())
app.use(fileUpload())

//db connection
dbConnect()

//api routes
app.use('/api/v1', userRoute)


//error handler
app.use(errorHandler)


port = process.env.PORT


const server = app.listen(process.env.PORT, 
    console.log(`Server up and running on port ${port}`)
)

server.on('unhandledRejection', (err, promise)=>{
    console.log(`Error ${err.message}`)
    server.close(process.exit)
})


