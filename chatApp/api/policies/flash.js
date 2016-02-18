/**
 * flash
 *
 * @module      :: Policy
 * @description :: Politica para el manejo de mensajes de error u otros
 *                 Se trabaja con la variable de session ---> req.session.flash
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {

	// Se crea la variable flash a nivel local como un objeto vacio
	res.locals.flash = {};

	// Si en la variable de session no existe el objeto flash 
	// continua al siguiente middleware
	if (!req.session.flash) {
		return next();
	}

	// Si el objeto flash existe en la variable de session 
	// lo clona a las variables locales
	res.locals.flash = _.clone(req.session.flash);

	// Borra el contenido del objeto flash de la session
	req.session.flash = {};

	//Continua al siguiente middleware
	next();
};