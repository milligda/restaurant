// require the dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// set up the Express app
var app = express();
PORT = 3002;

// Set up the Express app to handle the data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// set up the variables
var reservations = [
    {
        name: "dan",
        number: "1231231234",
        email: "milligda@something.com",
        id: 1
    },
    {
        name: "karishma",
        number: "1231231234",
        email: "karishma@something.com",
        id: 2
    },
    {
        name: "jasmine",
        number: "1231231234",
        email: "jasmine@something.com",
        id: 3
    },
];
var tableMax = 5;
var waitList = [];


// ROUTES ------------------------------

// route to the home page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// route to the tables page
app.get('/tables', function(req, res) { 
    // res.writeHead(200, {"Content-Type": "text/html"})
        res.sendFile(path.join(__dirname, "public/tables.html"));
});

// route to the reservation form page
app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, "public/reserve.html"));
});

// route to the list of reservations made page
app.get('/api/reservations', function(req, res) {
    return res.json(reservations);
});

// route to get the waitlist
app.get('/api/waitlist', function (req, res) {
    return res.json(waitList);
});

// route to make a new reservation
app.post('/api/reservations', function(req, res) {
    
    var newReservation = req.body; 
    newReservation.id = Math.floor(Math.random() *10000);

    var getTable = false;
    
    console.log(newReservation);

    if (reservations.length >= tableMax) {
        waitList.push(newReservation);

        res.json(getTable);

    } else {
        reservations.push(newReservation);    

        getTable = true;
        res.json(getTable);
    }
});


// SERVER -----------------------------

// start the server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
