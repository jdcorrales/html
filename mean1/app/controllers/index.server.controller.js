//Invocar modo 'strict' de JavaScript
'use strict';

//Crea un nuevo método controller 'render'
exports.render = function(req, res){
	
	/*if(req.session.lastVisit){
		console.log("datos de la visita: " + req.session.lastVisit);
	}

	req.session.lastVisit = new Date();*/
	//Usar el objeto 'response' para renderizar la view
	res.render('index', {
		title : 'Hola Mundo!',
		userFullName : req.user ? req.user.fullName : ''
	});
};