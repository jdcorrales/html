//Invocar el modo JavaScript 'strict'
'use strict';

//Cargar el módulo MySql y la libreria de encrytar
var mysql = require('mysql'),
	crypto = require('crypto');
	

	//require('../config/mysql.js')(mysql);


//Metodo para consulra usuarios
db.query('select "Hola mundo"',
	function(err, results, fields){
		console.log(results);
		console.log(fields);
	}
);