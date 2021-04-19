const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connect = await mongoose.connect('mongodb+srv://conflab15:Legobuilder15!@cluster0.dzdmf.mongodb.net/BarberWebApp?retryWrites=true&w=majority', {
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