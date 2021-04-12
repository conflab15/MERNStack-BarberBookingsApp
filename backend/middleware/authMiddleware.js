//authorise/validate access to protected pages such as profile and admin

const jwt = require('jsonwebtoken')
const Customer = require('../models/CustomerModel')

const protect  = async (req, res, next) => {

    let token = req.headers.authorization

    try{
        if (token){
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
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