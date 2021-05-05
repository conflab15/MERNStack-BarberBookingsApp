const mongoose = require('mongoose')

//Function to connect the database to the application using .env secret variables. 
//Try catch will try and connect and pass out an error if it fails
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })

        console.log(`DB Connected @ Host: ${connect.connection.host}`)
    }
    catch(error){
        console.error(`Error: ${error.message}`)
        console.exit(1)
    }
}
module.exports = connectDB