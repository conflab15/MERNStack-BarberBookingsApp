const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    star_rating:{
        type:Number,
        required:true
    },
    author:{
        type: String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review