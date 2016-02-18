//Invocar modo 'strict' de JavaScript
'use strict';

//Cargar las dependencias de módulos
var passport = require('passport');
	//mongoose = require('mongoose');

//Definir el método de configuración de passport
module.exports = function(){
	//Carga el modelo 'User'
	//var User = mongoose.model('usuarios');

	//Usar el método 'serializeUser' para serializar la id del usuario
	passport.serializeUser(function(user, done){		
		done(null, user);
	});

	//Usa el modo 'deserializeUser' para cargar el documento user
	passport.deserializeUser(function(id, done){
		/*User.findOne({
			_id : id
		}, '-password -salt', function(err, user){
			done(err, user);
		});*/
	});

	//Cargar los archivos de configuración de estrategias de passport
	//require('./strategies/local.js')();
}