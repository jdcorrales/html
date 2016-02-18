//Invocar modo 'strict' de JavaScript
'use strict';

//Carga el controller 'users'
var users = require('../../app/controllers/users.server.controller'),
	passport = require('passport');

//Definir el método routes module
module.exports = function(app){

	//Configura las rutas para signup
	app.route('/signup')
	.get(users.renderSignup)
	.post(users.signup);

	//Configura las rutas para signin
	app.route('/signin')	
	.get(users.renderSignin)
	.post(passport.authenticate('local' , {
		successRedirect : '/',
		failureRedirect : '/signin',
		failureFlash : true
	}));

	//Configurar la ruta 'signout'
	app.get('/signout', users.signout);

	//Configurar la ruta base para 'users'
	/*app.route('/users')
	.post(users.create)
	.get(users.list);

	app.route('/users/:userId')
	.get(users.read)
	.put(users.update)
	.delete(users.delete);

	app.param('userId', users.userByID);*/


}