const mongoose = require("mongoose");

async function connectDB(){
    
    try{
        const connection  = await  mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connected to ${connection.connection.host} `);

    }catch(error){
        console.log(`Error in connecting to database, ${error.message}`);
    }

}
module.exports = connectDB;