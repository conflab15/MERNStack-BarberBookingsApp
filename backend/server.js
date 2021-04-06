const express = require('express')
const dotenv = require('dotenv')
const app = express()

const connectDB = require('./config/db')

//obtaining error handler middleware
const {notFound, errorHandler} = require('./middleware/errorMiddleware')

//obtaining auth middleware
const protect = require('./middleware/authMiddleware')

//obtaining token generation for login and registering
const createToken = require('./utils/generateToken')

dotenv.config()
connectDB()

app.use(express.json)

//database models
const Booking = require('./models/BookingModel')
const Category = require('./models/CategoryModel')
const Customer = require('./models/CustomerModel')
const Haircut = require('./models/HaircutModel')
const Review = require('./models/ReviewModel')

const PORT = process.env.PORT || 5000

app.listen(PORT, (req, res) => {
    console.log('Server Active on port 5000...');
})

app.get('/', (req, res)=>{
    res.send('Api is active...')
})

//Haircut Routes
//This app.get functions gets all the availabe haircuts within the db using an await and find function, and returning as a json object...
app.get('/api/haircuts', async (req, res) => {
    const haircuts = await Haircut.find()
    res.json(haircuts)
})

//Here, we're retrieving a singular haircut object...
app.get('/api/haircuts/:id', async (req, res) => {
    
})
