const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDb = () =>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    const connection = mongoose.connection;

    connection.once('open', ()=>{
        console.log("DB Connected!");
    });
}

module.exports = ConnectDb;