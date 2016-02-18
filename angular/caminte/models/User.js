/**
 *  User schema
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/

/**
 *  Define User Model
 *  @param {Object} schema
 *  @return {Object}
 **/
module.exports = function(schema){
    var User = schema.define('user', {
           id : { type : schema.String },
           username : { type : schema.String },
           password : { type : schema.String }
    },{


    });
    return User;
};