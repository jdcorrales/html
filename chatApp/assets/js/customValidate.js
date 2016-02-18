$(document).ready(function() {
	//Reglas de validación para formulario singin
	$('.form-singin').validate({
		rules : {
			name : {			  	
			  	required : true,  	  		
		  	},

		  	last_name : {		  		
		  		required : true
		  	},

		  	username : {		  		
		  		required : true,		  		
		  	},

		  	email : {		  		
		  		required : true,
		  		email : true
		  	},

		  	password : {
		  		minlength : 6,
		  		required : true
		  	},	  

		  	confirmation : {
		  		minlength : 6,
		  		required : true,
		  		equalTo : '#password'
		  	}
		},
		success : function (element) {
			element.text('correcto!').addClass('valid');
		}
	});
});