const mongoose = require('mongoose')

const haircutSchema = mongoose.Schema({
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
},{
    timestamps:true
})

const Haircut = mongoose.model('Haircut', haircutSchema)
module.exports = Haircut