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
    imageUrl:{
        type:String,
        required:true,
    }
})

const Haircut = mongoose.model('Haircut', HaircutSchema)
module.exports = Haircut