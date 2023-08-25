const express = require('express');
const app = express();

// BodyParser Configuration
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Database Configuration
require('./db/config')();

// Cors Setup
const cors = require('cors');
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.use(require('./routes/AuthenticationRoutes'));

require('dotenv').config()
const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("Listening on " + PORT);
})