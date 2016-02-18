//Invocar modo 'strict' de JavaScript
/*'use strict';

//Cargar el modelo Mongoose 'User'
var User = require('mongoose').model('usuarios'),
	passport = require('passport');


//Metodo para login de los usuarios
exports.renderSignin = function(req, res, next){

	console.log('hola mundo ...!');

	/*
	//Si el usuario no esta conectado renderizar la página signin, en otro caso redirecionar el usuario de vuelta a la página principal de la aplicación
	if (!req.user) {
		//Usa el objeto 'response' para renderizar la página signin
		res.render('signin', {
			//Configura la variable title de la página
			title : 'Sign-in Form',
			//Configura la variable del mensaje flash
			messages : req.flash('error') || req.flash('info')
		});
	} else {
		return res.redirect('/');
	}*/
//};