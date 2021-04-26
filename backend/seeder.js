const mongoose = require('mongoose')
const dotenv = require('dotenv')

const haircuts = require('./data/haircuts')
const customers = require('./data/customers')
const reviews = require('./data/reviews')

const Customer = require('./models/CustomerModel')
const Haircut = require('./models/HaircutModel')
const Review = require('./models/ReviewModel')

const connectDB = require('./config/db')

//connects to db
dotenv.config()
connectDB()

const importData = async () => {

    try {
        await Haircut.deleteMany()
        await Customer.deleteMany()
        await Review.deleteMany()

        await Haircut.insertMany(haircuts)
        await Customer.insertMany(customers)
        await Review.insertMany(reviews)

        console.log('Data Import Successful')
        process.exit()
    }
    catch (error) {
        console.error(`Error: ${error}`)
        process.exit(1)
    }
}

importData()