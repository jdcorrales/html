/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	// Contiene la lógica de busqueda de todos los
	// usuarios registrados cargan la vista ---> user/index.ejs
	list : function (req, res, next)
	{
		// Busca todos los usuarios registrados
		User.find(function findAllUsers (err, users) {
			// Si hay un error en la busqueda llama al 
			// siguiente middleware enviandole el error
			if (err) {
				return res.json(400, 'Error al buscar el usuario');
			}	

			// Si no hay usuarios registrados llama al 
			// siguiente middleware			
			if (!users.length) {				
				return res.json(400, 'No hay usuarios registrados.')
			}
			

			// Renderiza la carga de datos a la 
			// vista ---> user/index.ejs
			// enviandole los usuarios registrados
			return res.json(users);
			
		});
	},

	// Contiene la lógica de busqueda de un usuario
	// Renderiza la carga de datos a la vista ---> user/show.ejs
	show : function (req, res, next) 
	{
		// Busca un usuario por su id el cual se obtiene por GET
		User.findOne(req.param('id'), function findOneUser (err, user) {
			// Si sucede un error en la busqueda llama al
			// siguiente middleware enviandole el error
			if (err) {
				return res.json(400, 'Ocurrio un error al intentar buscar el usuario.');
			}

			// Si no encuentra el usuario llama al siguiente
			// middleware 
			if(!user.length) {
				return res.json(101, 'Usuario no encontrado');
			}

			// Renderiza la carga de datos a la 
			// vista ---> user/show.ejs
			// enviandole los datos del usuario

			var dataUser = {
				id        : user.id,
				name      : user.name,
				last_name : user.last_name,
				username  : user.username,
				email     : user.email
			};

			return res.json(dataUser);
		});
	},

	// Contiene la logica de creación de un nuevo usuario
	// Cargando los datos del formulario de registro 
	create : function (req, res, next) 
	{		
		// Se crea un nuevo usuario obteniendo los datos 
		// con el metodo post del form singin ---> user/new.ejs
		User.create(req.params.all(), function createUser (err, user) {
			// Si hay un error redirecciona al form singin ---> user/new.ejs
			if (err) {				
				return res.json(400, 'El nombre de usuario se encuentra registrado');
			}

			// Si el usuario se creo de manera exitosa
			// pone la session en true y carga los
			// datos del usuario a la session
			req.session.authenticated = true;
			req.session.User = user;			

			//Cambia el estado del atributo ---> user.online
			user.online = true;
			user.save(function updateOnline (err, user) {
				// Si hay un error al actualizar el estado ---> user.online
				// redirecciona al metodo ---> session/new enviando el error
				if (err) {
					res.json(400, 'No se actualiso el estado de ingreso');
				}

				// Si el perfil del usuario es administrados
				// lo redirecciona a la administración de usuarios
				/*if (req.session.User.role) {
					return res.redirect('/user');
				}*/

				// Despues de crear al usuario correctamente
				// envia el objeto del usuario creado
				var dataUser = {
					id : user.id,
					username : user.username
				};

				return res.json(dataUser);
			});
		});
	},	

	// Contiene la logica para la actualización de los
	// datos del usuario
	update : function (req, res, next) 
	{	
		var dataUser = { 
			name: req.param('name'),
		  	last_name: req.param('last_name'),
		  	username: req.param('username'),
		  	email: req.param('email')
		};
		
		// Actualiza la información del usuario según el id del post
		User.update(req.param('id'), dataUser, function updateUser (err) {
			// Si hay un error en la actualización redirecciona a metodo
			// ---> user/edit
			if (err) {
				return res.json(400, 'Error al actualizar el usuario.');
			}

			// Si el usuario actualizado es el que esta logueado
			// Acualiza las variables de session del usuario						
			/*if(req.session.User.id == req.param('id')){
				User.findOne(req.param('id'), function findOneUser (err, user) {
					// Si sucede un error en la busqueda llama al 
					// siguiente middleware y envia el error
					if (err) {
						return res.json(400, 'Error en la busqueda del usuario.');
					}

					// Si no encuentra un usuario llama al siguiente
					// middleware
					if (!user) {
						return res.json(400, 'El usuario no esta en los registros.')
					}		
					//Actualiza las variables de session del usuario
					req.session.User = user;					
				});
			}*/

			// Si actualiza la información del usuario redirecciona al 
			// metodo ---> user/show
			var dataUser = {
				username: req.param('username'),
				id : req.param('id')
			};

			res.json(dataUser);
		});
	},

	// Contiene la logica para la eliminación de usuarios
	destroy : function (req, res, next) 
	{
		// Busca el usuario para comprobar su existencia 
		User.findOne(req.param('id'), function findOneUser(err, user) {
			// Si existe un error en la busqueda del usuario
			// llama el siguiente meddleware enviando el error
			if (err) {
				return next(err);
			}

			// Si el usuario no existe llama al siguiente 
			// middleware, enviando un mensaje de error
			if (!user.length) {
				return next({message : 'El usuario no existe.'});
			}

			//Elimina el usuario 
			User.destroy(req.param('id'), function destroyUser(err) {
				// Si hay un error en la eliminación del usuario
				// llama al siguiente middleware enviandole el mensaje
				// de error
				if (err) {
					return next(err);
				}

				// Redirecciona al medoto ---> user/index
				res.redirect('/user');
			});
		});
	},

	// Contiene la lógica para la edición de usuario
	// Renderiza la carga de datos a la vista ---> user/edit.ejs
	edit : function (req, res, next) 
	{
		// Busca la información del usuario por el id del GET
		User.findOne(req.param('id'), function findOneUser (err, user) {
			// Si sucede un error en la busqueda llama al 
			// siguiente middleware y envia el error
			if (err) {
				return next(err);
			}

			// Si no encuentra un usuario llama al siguiente
			// middleware
			if (!user.length) {
				return next();
			}		

			// Renderiza la carga de datos a la 
			// vista ---> user/edit
			// enviando los datos del usuario
			res.view({
				user : user
			});
		});
	},

	// Contiene la lógica para subscribir el  modelo ---> User al socket
	subscribe : function (req, res) {
		// Busca todos los usuarios existentes
		User.find(function findAllUsers (err, users) {
			if (err) {
				return next(err);
			}	
			User.watch(req.socket);
			// Subscribe el socket a la instacia de suarios registrados
			User.subscribe(req.socket, users);
			//User.subscribe(req, _.pluck(usersNamedLouie, 'id'))

			// Evita un error al presentar la pagina HTML
			// sobre el socket
			res.send(200);
		});
	},
};

