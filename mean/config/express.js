var config = require('./config'),	
	session = require('express-session'),	
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	flash = require('connect-flash'),
	passport = require('passport');

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

	//Configurar el middleware 'session'
	app.use(cookieParser());
	app.use(session({
		saveUninitialized : true,
		resave : true,
		secret : config.sessionSecret
	}));

	//Configurar rl motor view de la aplicación y el directorio 'views'
	app.set('views', './app/views');
	app.set('view engine', 'ejs');

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//Cargar los archivos de enrutamiento
	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/users.server.routes.js')(app);
	require('../app/routes/noticias.server.routes.js')(app);

	//Configurar el servidor de archivos estáticos
	app.use(express.static('./public'));

	//Devolver la instancia de la aplicación Express
	return app;
}