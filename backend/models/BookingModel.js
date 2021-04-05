const mongoose = require('mongoose') 

const bookingSchema = mongoose.Schema({
    haircut_id:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        required:true
    },
    total_price:{
        type:Number,
        required:true
    },
    customer_id:{
        type:String,
        required:true
    }
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking