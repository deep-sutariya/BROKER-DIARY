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
app.use(cors());

// Routes
app.use(require('./routes/AuthenticationRoutes'));
app.use(require('./routes/CardRoutes'));

require('dotenv').config()
const PORT = 5000;

app.listen(PORT,()=>{
    console.log("Listening on " + PORT);
})