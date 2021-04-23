const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    } 
} , {
    timestamps:true
})

customerSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

customerSchema.methods.matchPassword = async function (enteredPw) {
    return await bcrypt.compare(enteredPw, this.password)
}

const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer