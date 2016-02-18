/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt = require('bcrypt');

module.exports = {
	
	// Renderiza la carga de la vista ---> homepage.ejs
	index : function (req, res) 
	{	
		res.view({
            user: JSON.stringify(req.session.User)
        });
	},
}