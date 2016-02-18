/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt'),
	ucfirst = require('ucfirst');

module.exports = {

	index : function (req, res, next) 
	{
		res.view('user/index',{
			user : null
		});
	},

	register : function (req, res, next)
	{
		res.view();
	},

	create : function (req, res, next)
	{
		var userData = {
			name : req.param('name'),
			last_name : req.param('last_name'),
			username : req.param('username'),
			email : req.param('email'),
			password : req.param('password'),
			passwordconfirmation : req.param('passwordconfirmation')
		};

		User.create(userData, function (err, user) {
			if (err) {				
				req.session.flash = {
					err : err
				};
				return res.redirect('user/new');
			}

			var token_session = bcrypt.genSaltSync(user.id);					
			req.session.authenticated = true;				
			req.session.User = {
				username : user.username,
				token_session : bcrypt.hashSync("B4c0/\/", token_session),
				id : user.id
			};			
			return res.view('project/index');
		});
	},

	login : function (req, res, next)
	{
		res.view();
	},

	session : function (req, res, next)
	{
		var username = req.param('username');
		var password = req.param('password');

		if (!username || !password) {

	      var noUsernameOrPasswordErr =  [{
	        message : 'Debe de ingresar un usuario y una contraseña'
	      }];

	      req.session.flash = {
	        err : noUsernameOrPasswordErr
	      };
	      return  res.redirect('/user/login'); 
	    }
	    
	    User.findOne({username : username}).exec(function (err, user){

	        if (err) {          
	          
	          req.session.flash = {
		        err : err
		      };

		      return  res.redirect('/user/login'); 
	        }

        	if (!user) {
          		var noUserFounded = [{
            		message : 'Usuario o Contraseña incorrectas.'
          		}];          

          		req.session.flash = {
		        	err : noUserFounded
		      	};

		      	return  res.redirect('/user/login'); 
        	}        
        	
        	bcrypt.compare(password, user.password, function (err, respuesta) {

          		if (!respuesta){
            		var passwordDoNotMatchError = [{
              			message : 'Usuario o Contraseña incorrectas.'
            		}];           

	            	req.session.flash = {
			        	err : passwordDoNotMatchError
			      	};

			      	return  res.redirect('/user/login'); 
	          	}
          		

	          	var token_session = bcrypt.genSaltSync(user.id);					
				req.session.authenticated = true;				
				req.session.User = {
					username : user.username,
					token_session : bcrypt.hashSync("B4c0/\/", token_session),
					id : user.id
				};
				
				res.view('user/index',{
					user : req.session.User
				});
        	});
      	});
	},

	manager : function (req, res, next)
	{
		User.findOne(req.session.User.id).exec(function (err, user){

	        if (err) {          
	          
	          req.session.flash = {
		        err : err
		      };

		      return  res.redirect('/user/login'); 
	        }

	        var user = {
	        	name : ucfirst(user.name+' '+user.last_name),
	        	username : user.username,
	        	email : user.email
	        }

			res.view({user});
	    });
	},

	logaout : function (req, res, next) 
	{
		req.session.destroy();
		return res.redirect('/');
	}
};

 