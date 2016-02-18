//Invocar el modo JavaScript 'strict'
'use strict';

//Cargar el módulo Mongoose y el Objeto Schema
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;	

//Definir un nuevo 'Schema'
var noticiasSchema = new Schema({
	titulo : String,
	usuario : String	
});

//Crear el modelo 'noticias' a partir del 'noticiasSchema'
mongoose.model('noticias', noticiasSchema);