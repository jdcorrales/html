//Invocar modo 'strict' de JavaScript
'use strict';

//Cargar el modelo Mongoose 'User'
var User = require('mongoose').model('usuarios'),
	passport = require('passport');

//Crear un nuevo método controller parar mensajes de error
var getErrorMessage = function(err){

	//Deficion de la variable de mesajes de error
	var message = '';

	//Si un error interno de MongoDB ocurre obtener el mensaje de error
	if(err.code){
		switch(err.code){
			//Si un error de index único ocurre obtener el mensaje de error
			case 11000 : 
			case 11001 :
				message = 'Usuario ya existe';
			break;
			//Si un error general ocurre configurar el mensaje de error
			default : 
				message = 'Se ha producido un error';
			break;
		}
	} else {
		//Grabar el primer mensaje de error de una lista de posibles errores
		for (var errName in err.errors) {
			if(err.errors[errName].message) message = err.errors[errName].message;
		};
	}

	//Dovolver el mensaje de error
	return message;
};

//Crear u nuevo método controller que realiza la página signin
exports.renderSignin = function(req, res, next){

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
	}
};

exports.renderSignup = function(req, res, next){	
	//Si el usuario no esta conectado renderizar la página signup, en otro caso redirecionar el usuario de vuelta a la página principal de la aplicación
	if (!req.user) {
		//Usa el objeto 'response' para renderizar la página signup
		res.render('signup', {
			//Configura la variable title de la página
			title : 'Sign-up Form',
			//Configura la variable del mensaje flash
			messages : req.flash('error')
		});
	} else {
		return res.redirect('/');
	}
};

//Crea un nuevo controller para crear nuevos usuarios
exports.signup = function(req, res, next){
	//Si user no esta conectado, crear y hacer login a un nuevo usuario, en otro caso redireccionar el user de vuelta a la pagina principal
	if (!req.user) {
		//Crear una instancia del modelo 'User'
		var user = User(req.body);
		var message = null;

		//Configurar la propiedad user provider
		user.provider = 'local';

		//Intenta salvar el nuevo documento user
		user.save(function(err){

			//Si ocurre un error, usa el mensaje flash para reportar el error
			if (err) {
				//Usa rl método de mensaje de errores para obtener el mensaje de error
				var message = getErrorMessage(err);


				//Configura los mensajes flash
				req.flash('error', message);

				//Redirecciona al usaurio de vuelta a la pagina signu
				return res.redirect('/signup');
			}

			//Si el usuario fue creado de modo correcto usa el método 'login' de passport para hacer login
			req.login(user, function(err){
				//Si ocurre un error de login moverse al siguiente middleware
				if (err) return next(err);

				//Redireccionar al usuario a la página de la aplicación principal
				return res.redirect('/');
			});
		});	
	} else {
		return res.redirect('/');
	}
};



//Crear un nuevo método controller 'create'
exports.create = function(req, res, next){

	//Crear una nueva instancia del modelo Mongoose 'User'
	var user = new User(req.body);

	//Usar el método 'save' de la instancia 'User' para salvar un nuevo documento user
	user.save(function(err){
		if (err){
			//Llamar al siguiente middleware con un mensaje de error
			return next(err);
		} else {
			//Usar el objeto 'response' para enviar una respuesta JSON			
			res.json(user);
		} 
	});
};

//Crear un nuevo método controller 'list'
exports.list = function(req, res){

	//Usa el método static 'User' 'find' para recuperar la lista de usuarios
	User.find({}, function (err, users) {
	  if (err) {
	  	return next(err);
	  } else {
	  	res.json(users);
	  }
	});	
};

//Crea un nuevo método controller 'read'
exports.read = function(req, res, next){
	//Usa el objeto 'response' para enviar una resuesta JSON
	res.json(req.user);
};

//Crear un nuevo método controller 'update'
exports.update = function(req, res, next){
	//Usa el método static 'findByIdAndUpdate' de 'User' para actualizar
	req.user.remove(function(err) {
		if (err) {
			//Llama al siguiente middleware con un mensaje de error
			return next(err);
		} else {
			//Usa el objeto 'response' para enviar una respuesta JSON
			res.json(req.user);
		}
	});
};


//Crear un nuevo método controller 'delete'
exports.delete = function(req, res, next){
	//Usa el método remove de la instancia 'User' para eliminar un documento
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
		if (err) {
			//Llama al siguiente middleware con un mensaje de error
			return next(err);
		} else {
			//Usa el objeto 'response' para enviar una respuesta JSON
			res.json(user);
		}
	});
};

//Crea un nuevo método controller 'userByID'
exports.userByID = function(req, res, next, id){
	//Usa el método static 'findOne' de 'User' para recuperar un usuario específico
	User.findOne({
		_id : id
	}, function(err, user){
		if (err) {
			//Llama al siguiente middleware con un mensaje de error
			return next(err);
		} else {
			//Configura la propiedad 'req.user'
			req.user = user;

			//Llama al siguiente middleware
			next();
		}
	});
};

exports.saveOAuthUserProfile = function(req, profile, done){
	//prueba  a encontrar un documento user que fue registrado usando el actual provider OAuth
	User.findOne({
		provider : profile.provider,
		providerId : profile.providerId
	}, function(err, user){
		//Si ha ocurrido un error continua al siguiente middleware
		if (err) {
			return done(err);
		} else {
			//Si un usuario no ha podido ser encontrado, crea un buevi user, en otro caso, continua al siguiente middleware
			if (!user) {
				//Configura una posible username base username
				var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

				//Encuentra un username único disponible
				User.findUniqueUsername(possibleUsername, null, function(availableUsername){
					//Configura el nombre de usuario disponible
					profile.usuario = availableUsername;

					//Crear el user
					user = new User(profile);

					//Intenta salvar el nuevo documento user
					user.save(function(err){
						//Continua al siguiente middleware
						return done(err, user);
					});
				});
			} else {
				//Continúa al siguiente middleware
				return done(err, user);
			}
		}
	});
};

//Crea un nuevo método controller para signing out
exports.signout = function(req, res){
	//Usa el método 'logout' de passport para hacer logout
	req.logout();

	//Redirecciona al usuario a la pagina principal
	res.redirect('/');
};