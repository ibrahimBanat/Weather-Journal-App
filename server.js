// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log('server is running..')
    console.log(`server running on port: ${port}`)
}

//Get function
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
    projectData = [];
}

//post route  
app.post('/add', addData);

function addData (req, res) {
    console.log(req.body);
    newEntry = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    }
    projectData.push(newEntry);

}