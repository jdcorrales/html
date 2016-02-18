/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema : true,
	// Declaración de los atributos del modelo de usuario
	attributes: {
	  	name : {
		  	type :'string',
		  	required : true,  	  		
	  	},

	  	last_name : {
	  		type : 'string',
	  		required : true
	  	},

	  	username : {
	  		type : 'string',
	  		required : true,
	  		unique : true
	  		
	  	},

	  	email : {
	  		type : 'string',
	  		email : true,
	  		required : true  		
	  	},

	  	role : {
	  		type : 'boolean',
	  		defaultsTo : false
	  	},

	  	online : {
	  		type : 'boolean',
	  		defaultsTo : false
	  	},

	  	password : {
	  		type : 'string',
	  		required : true
	  	},	  

	  	// Eliminar variables no declaradas en el modelo de datos
	  	toJSON : function () {
	  		var obj = this.toObject();
	  		delete obj.confirmation;
	  		delete obj._csrf;
	  		return obj;
	  	},
	},
	// Antes de crear el usurio validad la exixtencia del password, la confirmación del password 
	// y realiza la encrypción del password
	beforeCreate : function (values, next) 
  	{ 
  		// Valida la exixtencia del password, la confirmación y que ambos se correspondan
	    if (!values.password || !values.confirmation || values.password != values.confirmation) {
	    	//Si falla la validación continua al siguiente middleare 
	    	// enviando el mensaje de error
	      	return next({
	        	err : 'Error al comparar las contraseñas.'
	      	});
	    }	    

	    // Encrypa el password y lo almacena en la tabla user
	    require('bcrypt').hash(values.password, 10, function encryptedPassword (err, encryptedpassword) {      
	    	if (err) {
	    		return next(err);
	    	}
	    	values.password = encryptedpassword;
	    	//values.online = true;gengh
	    	next();
	    });
  	}
};

