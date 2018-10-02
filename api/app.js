const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');// a simple utility for backend to be aware of what sort of method has been requested

//custam made modules
const config = require('../config/keys.js');

mongoose.connect('mongodb://' + config.database.dbUser + ':' + config.database.dbPassword + '@ds115543.mlab.com:15543/mydatabase');

mongoose.connection
  .on('open', () => {
    console.log("Connected to the database");
  })
  .on('erorr', (error) => {
    console.log("Error: ", error);
  }
);

const app = express();

//custom made modules
const newsRoutes = require('./routes/news.js');
const adminAuthRoutes = require('./authorization/admin.js');

app.use(morgan('dev'));
app.use(bodyParser.json()); // for accepting json formats
app.use(bodyParser.urlencoded({extended: false}));

app.use('/news', newsRoutes);
app.use('/auth', adminAuthRoutes);

//custom made middlewares
app.use((req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Hello World"
  });
});

module.exports = app;
