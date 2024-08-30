const mongoose = require("mongoose");
require("dotenv").config();

const ConnectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MongoDB_Connection_String);
        console.log(`Server is connected to ${conn.connection.db.databaseName} db` )
    } catch (err) {
        console.log(`Db connection error ${err}`)
    }
}

module.exports = {ConnectDB};