const mongoose = require('mongoose')

const HaircutSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true,
        default:5
    },
    imageUrl:{
        type:String,
        required:true,
    }
})

const Haircut = mongoose.model('Haircut', HaircutSchema)
module.exports = Haircut