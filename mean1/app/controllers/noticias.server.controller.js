//Invocar modo 'strict' de JavaScript
'use strict';

//Cargar el modelo Mongoose 'Noticias'
var Noticias = require('mongoose').model('noticias');


//Crear un nuevo método controller 'list'
exports.list = function(req, res, next){

	//Usa el método static 'User' 'find' para recuperar la lista de usuarios
	Noticias.find({}, function (err, noticias) {
	  if (err) {
	  	return next(err);
	  } else {
	  	res.json(noticias);	  	
	  }
	});
}
