//authorise/validate access to protected pages such as profile and admin

const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const protect  = async (req, res, next) => {

    let token = req.headers.authorization

    try{
        if (token){
       const decoded = jwt.verify(token, process.env.JWT_SECRET)
       console.log(decoded)
       req.user = await User.findById(decoded.id).select('-password')
       }
        if (!token){
       res.status(401)
       throw new Error('Not Authorised - No Token Found')
       }
       console.log(req.user)
       next()
   }
   catch(error){
       console.error(error)
       res.status(401)
       throw new Error("Authorisation Failed - Token Expired")
   }
   
}

module.exports = protect