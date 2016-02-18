//Invocar modo 'strict' de JavaScript
'use strict';

//Crear un nuevo método controller 'list'
exports.list = function(req, res ,next){	


	var  users = req.app.models.User;        

	var Query = users.all();
	//Query.where('published', true).desc('date');
	Query.run({}, function(err, post){
	   // your code here
	});



	//res.send(JSON.stringify(req.app));
	
}
