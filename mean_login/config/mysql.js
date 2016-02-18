//Invocar el modo JavaScript 'strict'
'use strict';

//Carga las dependencias del módulo
var config = require('./config'),
	mysql = require('mysql');

//Definir el método de configuración de MySql
module.exports = function(){

	//Usar MySql para conectar a la DB
	var db = mysql.createConnection({
	  host     : config.dbMysql.host,
	  user     : config.dbMysql.username,
	  password : config.dbMysql.password,
	  database : config.dbMysql.database
	});

	db.connect(function(err) {
	  if (err) {
	    console.error('error de conección: ' + err.stack);
	    return;
	  }
	  console.log('conección exitosa id ' + db.threadId);
	});

	//Cargar el modelo 'los modelos'
	//require('../app/models/user.server.model');

	//Devolver la instancia de conexión a MySql
	return db;	
}