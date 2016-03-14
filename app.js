// app.js

// Express app
var express = require('express');
var app = express();

// Modules
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var expressLess = require('express-less');
var compression = require('compression');

// Mount middleware
app.use('/css', expressLess(__dirname + '/less'));

// app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes (after static)
app.use('/', require('./routes/index'));	// Last

module.exports = app;
