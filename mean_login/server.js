process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var mongoose = require('./config/mongoose'),
var mysql = require('./config/mysql'),
	express = require('./config/express'),
	passport = require('./config/passport');

//var db = mongoose();
var db = mysql();
var app = express();
var passport = passport();

app.listen(3000);
module.exports = app;

console.log('Servidor ejecutandose en http://localhost:3000/');