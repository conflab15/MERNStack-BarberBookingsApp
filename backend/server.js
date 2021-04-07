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
//const Category = require('./models/CategoryModel')
const Customer = require('./models/CustomerModel')
const Haircut = require('./models/HaircutModel')
const Review = require('./models/ReviewModel')
const { default: userEvent } = require('@testing-library/react')

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

//Here, we're retrieving a singular haircut object. We search for the object using the id in the parameters...
app.get('/api/haircuts/:id', async (req, res) => {
    
    if(req.params.id.length === 24) {
        const haircut = await Haircut.findById(req.params.id)
        if(haircut){
            res.json(haircut)
        }
        else{
            res.status(404).json({message:"Oops, we couldn't find this product"})
        }
    }
    else{
        res.status(404).json({message:"Oops, we couldn't find this product"})
    }
})

//Review Routes
//Because we aren't fetching specific reviews, just collecting all of them and displaying will be enough for the application... 
app.get('/api/reviews', async (req,res) => {
    const reviews = await Review.find({})
    res.json(reviews)
})

//Booking Routes
//Finding all bookings for the user...
app.get('/api/bookings', async (req,res) => {
    //Obtaining the ID of the active user....
    const email = req.body

    //Finding the booking by the email of the users account...
    const bookings = await Booking.findOne({email})
    res.json(bookings)
})

//Finding a specific booking for the current user... 
app.get('/api/bookings/:id', async (req, res) => {
    
    //Obtaining the ID of the active user....
    const email = req.body

    //Finding the booking by the email of the users account...
    const booking = await Booking.findOne({email})

    console.log("User Email:")
    console.log(email)

    if(req.params.id.length === 24) {
        //const booking = await booking.findById(req.params.id)
        if(booking){
            res.json(booking)
        }
        else{
            res.status(404).json({message:"Oops, we couldn't find this booking"})
        }
    }
    else{
        res.status(404).json({message:"Oops, we couldn't find this booking"})
    }
})

//Creating a new booking...
app.post('api/bookings/add', async (req, res) => {
    //Obtaining the ID of the active user....
    const email = req.body

    console.log(email) //Logging email for testing purposes... 

    //Obtaining variables from the request body...
    const {haircutid, datetime, totalprice, customeremail} = req.body

    //Creating a new booking object...
    const booking = await Booking.create({
        haircutid,
        datetime,
        totalprice, 
        customeremail
    })

    //Checking Booking object is valid before posting to the db...
    if (booking) {
        res.status(201).json({
            _id: booking.id,
            haircutid: booking.haircutid,
            datetime: booking.datetime,
            totalprice: booking.totalprice,
            customeremail: booking.customeremail,
            token: createToken(booking._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Sorry, the object returned invalid, please try again")
    }

})

//Customer Routes
//Customer Login and Authorisation
app.post('/api/customers/login', async(req, res) => {
    const {email, password} = req.body

    const customer = await Customer.findOne({email})

    console.log(email, password)

    if (customer && (await customer.matchPassword(password))){
        res.json({
            _id: customer.id,
            forename: customer.forename,
            surname: customer.surname,
            addressline1: customer.addressline1,
            addressline2: customer.addressline2,
            town: customer.town,
            postcode: customer.postcode,
            email: customer.email,
            telephone: customer.telephone,
            token: createToken(customer._id)
        })
    }
    else {
        res.json({message: "Invalid Credentials provided"})
        throw new Error("Invalid Credentials provided")
    }
})

//Customer Register Route
app.post('/api/users/', async (req, res) => {

    const {forename, surname, addressline1, addressline2, town, postcode, email, telephone} = req.body

    const customerExists = await Customer.findOne({email})

    if (customerExists) {
        res.status(401)
        throw new Error("This Customer has already registered")
    }

    const customer = await Customer.create({
        forename,
        surname,
        addressline1,
        addressline2, 
        town,
        postcode,
        email, 
        telephone,
        password
    })

    if (customer) {
        res.status(201).json({
            _id: customer.id,
            forename: customer.forename,
            surname: customer.surname,
            addressline1: customer.addressline1,
            addressline2: customer.addressline2,
            town: customer.town,
            postcode: customer.postcode,
            email: customer.email,
            telephone: customer.telephone,
            token: createToken(customer._id)
        })
    }
    else {
        res.status(400)
        throw new Error ("Invalid Data Provided")
    }
})

//Customer Profile Route
app.get('/api/customers/profile', protect, async(req, res) => {
    
    const customer = await Customer.findById(req.customer.id)

    if (customer) {
        res.status(201).json({
            _id: customer.id,
            forename: customer.forename,
            surname: customer.surname,
            addressline1: customer.addressline1,
            addressline2: customer.addressline2,
            town: customer.town,
            postcode: customer.postcode,
            email: customer.email,
            telephone: customer.telephone,
            token: createToken(customer._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid Data Provided")
    }
})


//Error Handlers
app.use(notFound)
app.use(errorHandler)

