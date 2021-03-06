//Invocar el modo JavaScript 'strict'
'use strict';

//Cargar el módulo Mongoose y el Objeto Schema
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;	

//Definir un nuevo 'Schema'
var UserSchema = new Schema({
	nombres : String,
	apellidos : String,
	email : {
		type : String,
		//Validar el formato email
		match : [/.+\@.+\..+/,"Por favor, Ingrese un E-mail valido"]
	},
	usuario : { 
		type : String,
		//Confirmar un único index 'usuario'
		unique : true,
		//Validar existencia de valor 'usuario'
		required: 'El usuario es requerido',
		//Trim el campo 'usuario'
		trim : true
	},
	password : {
		type : String,
		//Validar el valor length de 'password'
		validate : [
			function(password){
				return password && password.length > 6;
			}, 'El password debe tener minimo 6 caracteres'
		]
	},
	salt : {
		type : String
	},
	provider : {
		type : String,
		//Validar existencia valor provider
		require : 'Provider es requerido'
	},
	providerId : String,
	providerData : {},
	created : {
		type : Date, 
		//Crear un valor 'created' por defecto
		default : Date.now
	}
});

//Configurar la proiedad virtual 'fullname'
UserSchema.virtual('fullName').get(function(){
	return this.nombres + ' ' + this.apellidos;
}).set(function(fullName){
	var splitName = fullName.split(' ');
	this.nombres = splitName[0] || '';
	this.apellidos = splitName[1] || '';
});

//Usar un middleware pre-save para hash la contraseña
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

//Crear un método instancia para hashing una contraseña
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

//Crea un método instancia para autenticar usuario
UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
	//return true;
};

//Encontrar posibles usuarios no usados
UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this;	

	//Añadir un sufijo 'username'
	var possibleUsername = username + (suffix || '');

	//Usar el método 'findOne' del model 'User' para encontrar un username único disponible
	_this.findOne({
		usuario : possibleUsername
	}, function(err, user){
		//Si ocurre un error llama al callback con un valor null, en otro caso encuentra un usuario único dicobible
		if (!err) {
			//Si un usuario único disponible fue encontrado llama al método callback, en otro caso llama al método 'findUniqueUsername' de nuevo con un nuevo sufijo
			if (!user) {
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else {
			callback(null);
		}
	});
};

//Configurar el 'userSchema' para usar getters y virtuals cuando se transforme a JSON



//Crear el modelo 'User' a partir del 'UserSchema'
mongoose.model('usuarios', UserSchema);
