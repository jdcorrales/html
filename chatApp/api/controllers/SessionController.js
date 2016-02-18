/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt = require('bcrypt');

module.exports = {
	
	// Renderiza la carga de la vista ---> session/new.ejs
	new : function (req, res) 
	{		
		res.view();
	},

	// Contiene la logica para la creación de sessiones
	create : function (req, res, next)	
	{
		// Valida la exixtencia del nombre de usuario y contraseña
		// de lo contrario redireccionan al metodo de ingreso
		// ---> session/new y envia el mensaje de error
		if (!(req.param('username') || req.param('password'))) {
			if(err) {
				req.session.flash = {
					err : {
						message : 'Dede de ingresar el usuario y la contraseña'
					}
				};
				return res.redirect('/');
			}
			
		}

		// Busca el usuario registrado con el username
		User.findOneByUsername(req.param('username')).exec(function (err, user) {

			// Si hay un error en la busqueda hace el 
			// llamado al siguiente middleware enviado el error
			if (err) {
				req.session.flash = {
					err : {
						message : 'Ocurrio un error en la busqueda del usuario.'
					}
				};
				return res.redirect('/');				
			}

			// Si no encuentra el usuario redirecciona al
			// metodo ---> session/new enviando el mensaje
			// de error
			if (!user) {	
				req.session.flash = {
					err : {
						message : 'Usuario y/o contraseña invalidas.'
					}
				};
				return res.redirect('/');
			}

			// Compara el password que se envia del formulario con el password consultado 
			// en la DB
			bcrypt.compare(req.param('password'), user.password, function (err, valid) {
				// Si existe un error al comparar las contraseñas
				// se llama al siguiente middleware enviandole el 
				// error
				if (err) {
					req.session.flash = {
						err : {
							message : 'Error en bcrypt compare.'
						}
					};
					return res.redirect('/');					
				}

				// Si las contraseñas no coinsiden
				// redirecciona al metodo ---> session/new
				// enviando el mensaje de error
				if (!valid) {	
					req.session.flash = {
						err : {
							message : 'Usuario y/o contraseña invalidas.'
						}
					};
					return res.redirect('/');
				}

				// Si la authenticación fue exitosa
				// pone la session en true y carga los
				// datos del usuario a la session
				req.session.authenticated = true;
				req.session.User = {
					id : user.id,
					name : user.name,
					last_name : user.last_name,
					username : user.username,
					email : user.email,
					role : user.role				
				};

				user.online = true;
				user.save(function updateOnline (err, user) {
					// Si hay un error al actualizar el estado ---> user.online
					// redirecciona al metodo ---> session/new enviando el error
					if (err) {
						req.session.flash = {
							err : {
								message : 'Error al actualizar los datos de session.'
							}
						};
						return res.redirect('/');
					}

					// Informa al socket al que esta subscrito 
					// que el usuario sea logueado
					/*User.publishUpdate(user.id, {
						loggedIn : true,
						id : user.id
					});*/

					/*User.publishUpdate(
						user.id, {
					    	loggedIn : true,
					    	id : user.id,
					    	online : user.online
					  	}, 
					  	req.socket
					);*/

					// Si el perfil del usuario es administrados
					// lo redirecciona a la administración de usuarios
					/*if (req.session.User.role) {
						return res.redirect('/user');
					}*/

					// Redirecciona al metodo -->user/show 
					// cargando el perfil del usuario
					//return res.redirect('/user/show/' + user.id);
					req.session.User.online = user.online;
					req.session.User.authenticated = true;
					return res.redirect('/');
				});				
			});
		});
	},

	// Contiene la logica para la destrucción de la sessión
	destroy : function (req, res) {
		// Actualiza el atributo ---> user.online = false
		if (req.session.authenticated) {
			User.update(req.session.User.id,{online : false}, function updateOnline (err) {
				// Destrulle las varibles de session
				req.session.destroy();

				// Si hay algun error en la actualización del atributo
				// redirecciona al metodo ---> session/new y envia al error
				if(err) {
					req.session.flash = {
						err : err
					};
				}

				// Redirecciona al metodo ---> session/new
				res.redirect('/');
			});
		} else {
			// Redirecciona al metodo ---> session/new
			res.redirect('/');
		}
	},
};

