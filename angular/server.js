process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express  = require('./config/express');

var app  = express();
var port = process.env.PORT || 3000;

app.listen(port);
module.exports = app;

console.log('Servidor ejecutándose en htt://localhost:' + port);

