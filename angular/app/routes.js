//Invocar modo 'strict' de JavaScript
'use strict';

var controllers = require('../app/index.server.controllers');

module.exports = function(app){

	app.route('/')
		.get(controllers.pages.list);

	app.route('/:username')
		.get(controllers.pages.list);	
}