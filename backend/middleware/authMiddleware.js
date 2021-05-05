const jwt = require('jsonwebtoken')
const Customer = require('../models/CustomerModel')

//Here the jwt package will create a request header with an authorisation token to authenticate the active user to access sensitive routes to and from the API

const protect  = async (req, res, next) => {

    let token = req.headers.authorization

    try{
        if (token){
       const decoded = jwt.verify(token, process.env.JWT_SECRET) //Create a token using the secret varialble in the .env
       console.log(decoded)
       req.customer = await Customer.findById(decoded.id).select('-password')
       }
        if (!token){
       res.status(401)
       throw new Error('Not Authorised - No Token Found')
       }
       console.log(req.customer)
       next()
   }
   catch(error){
       console.error(error)
       res.status(401)
       throw new Error("Authorisation Failed - Token Expired")
   }
   
}

module.exports = protect