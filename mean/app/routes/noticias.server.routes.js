//Invocar modo 'strict' de JavaScript
'use strict';

//Carga el controller 'users'
var noticias = require('../../app/controllers/noticias.server.controller');

//Definir el método routes module
module.exports = function(app){
	//Configurar la ruta base para 'noticias'
	app.route('/noticias')	
	.get(noticias.list);
}