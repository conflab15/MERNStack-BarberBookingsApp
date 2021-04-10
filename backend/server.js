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
//Finding a specific booking for the current user... 
app.get('/api/bookings/day/:id', async(req, res)=>{

    const day = req.params.id
    const bookings = await Booking.find({bookingDate: day})

    const slotTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
    const bookedSlots = []

    for (var i=0; i<bookings.length; i++){
        bookedSlots.push(bookings[i].bookingTime)
    }

    var available = slotTimes.filter((items) => !bookedSlots.includes(items))

    res.json(available)

})

//Creating a new booking...
app.post('/api/bookings', protect, async(req, res)=>{
    
    console.log('Request to make booking')

    const {style, bookingDate, bookingTime, price} = req.body

    const loggedInUser = await User.findOne({_id:req.user._id})

    console.log(loggedInUser)

    if(!loggedInUser){
        res.status(401).json({message:'User not found!'})
    }

    const booking = await Booking.create({
        user: loggedInUser,
        style,
        price,
        bookingDate, 
        bookingTime
    })

    if(booking){
        res.status(201).json({
            _id: booking._id,
            user: booking.user.name,
            price: booking.price,
            bookingDate: booking.bookingDate,
            bookingTime: booking.bookTime,
            style
        })
    }
    else{
        res.status(400).json({message: 'Booking error - incorrect data!'})
        throw new Error('Invalid data')
    }
})

//Finding Users own Bookings
app.get('/api/bookings/mybookings', protect, async(req, res)=>{

    console.log(req.user)

    const mybookings = await Booking.find({user: req.user._id})

    if(mybookings){

        if(mybookings.length===0){
            res.json([])
        }
        else{
            res.json(mybookings)
        }
    }
})

//ADMINISTRATOR ROUTES
//Finding all bookings for the user...
app.get('/api/bookings', protect, adminCheck, async(req, res)=>{

    console.log('RRequesting all Bookings')

    const bookings = await Booking.find({})

    res.json(bookings)
})

//Updaing Bookings to confirm them for their clients...
app.put('/api/bookings/:id', protect, adminCheck, async(req, res)=>{

    console.log('Updating Bookings...')

    const booking = await Booking.findById(req.params.id)

    if (booking){
        booking.isConfirmed = true
        const updatedBooking = await booking.save()
        res.json(updatedBooking)
    }
    else{
        res.status(404).json({message:"We couldn't find this Booking!"})
        throw new Error("We couldn't find that booking!")
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

