const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const bookRoute = require('./routes/books');

const app = express();

//parsing the request body to json 
app.use(bodyParser.json());

//registering routes
app.use(bookRoute);

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //specify certain domains/orgins ex)codepen.io, '*' is wildcard means all origins
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

//error handling middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message });
});

//databaseConnection-MongoDB
mongoose
    .connect('mongodb+srv://root:root123@library.pblks.mongodb.net/?retryWrites=true&w=majority')
    .then(result => {
        app.listen(8055);
        console.log('Connected to your database at MongoDB')
    })
    .catch(err => console.log(err));