const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    forename:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:true
    },
    addressline2:{
        type:String,
        required:true
    },
    town:{
        type:String,
        required:true
    },
    postcode:{
        type:String,
        required:true,
        length:7
    },
    email:{
        type:String,
        required:true
    },
})

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer