var express = require('express'),	
	models = require('./models');
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	path = require('path');   

//Definir el metodo de configuración de Express
module.exports = function(){

	//Crear una nueva isntancia de la aplicación Express
	var app = express();

	//Usar la variable 'NODE_ENV' para activar los middleware 'morgan' logger o 'compress'
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if(process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	//Usar las funciones middleware 'body-parser' y 'method-override'
	app.use(bodyParser.urlencoded({
		extended : true
	}));

	app.use(bodyParser.json());
	app.use(methodOverride());

	//Configurar rl motor view de la aplicación y el directorio 'views'
	//app.set('views', './app/views');
	app.set('views', path.join(__dirname, '../app/views'));
	app.set('view engine', 'ejs');

	//Cargar archivo de enrutamiento
	require('../app/routes.js')(app);	

	//Inicializar la carga de los models	
   	models.init(app);

	return app;
}