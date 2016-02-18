/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

  // Si el usuario se authentifica correctamente
  // llama al siguiente middleware
  if (req.session.authenticated) {
    return next();
  } else { // Si el usuario no esta authenticado lo envia al metodo ---> session/new con el mensaje de error
  	req.session.User = {
      authenticated : false
    };
    return res.json(400, 'Debe iniciar session para continuar');
  }  
};
