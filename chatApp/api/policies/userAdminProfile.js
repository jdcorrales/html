/**
 * userAdminProfile
 *
 * @module      :: Policy
 * @description :: Politica de administracion del perfil de usario 
 *                 debe coincidir el usuario del GET con el de la session
 *                 o ser usuario adminitrador`req.session.User.role = true;`
 *                 para ver, editar o eliminar el usuario
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

	var sessionUserMatchesId = req.session.User.id == req.param('id');
	var isAdmin              = req.session.User.role;
	
	// Si el usuario no es administrador
	// o la session no es igual al id del GET
	// redirecciona al metodo ---> session/new y envia el mensaje de error	
  	if (!(sessionUserMatchesId || isAdmin)) {  		
    	return res.json(400, 'Debe iniciar session como administrador');
  	}  	
};
