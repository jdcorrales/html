
/**
 *  User Schema
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

/**
 *  Define User Model
 *  @param {Object} Schema
 *  @return {Object}
 **/

//Invocar el modo JavaScript 'strict'
'use strict';

module.exports = function (schema) {

	var User = schema.define('users', {
	       id : { type : Schema.Number, unique: true, "null": false, index: true },
	       username : { type : Schema.String, limit: 20, unique: true, "null": false },           
	       password : { type : Schema.String, limit: 60, "null": false }           
	},{
	    primaryKeys: ["id"]
	});

	return User;
}