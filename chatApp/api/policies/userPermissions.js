/**
 * userPermissions
 *
 * @module      :: Policy
 * @description :: Policy de asignación de permisos de usario
 *                 se debe de loguear con un usuario adminitrador`req.session.User.role = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // Si el usuario se authentifica como administrador
  // llama al siguiente middleware
  if (req.session.authenticated && req.session.User.role) {
    return next();
  } else { // Si el usuario no es administrador lo redirecciona al metodo ---> session/new  	
  	return res.json(400, 'Debe iniciar session como administrador');
  }  
};
