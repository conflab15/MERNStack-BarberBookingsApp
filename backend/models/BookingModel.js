const mongoose = require('mongoose') 

const bookingSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    style:{
        type:String,
        required:true
    },
    bookingDate:{
        type:String,
        required:true
        
    },
    bookingTime:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true,
        default:0
    },
    isConfirmed:{
        type:Boolean,
        required:true,
        default:false
    },
    isComplete:{
        type:Boolean,
        required:true,
        default:false
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date
    }
},{
    timestamps:true
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking