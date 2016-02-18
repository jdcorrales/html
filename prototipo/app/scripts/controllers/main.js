'use strict';

/**
 * @ngdoc function
 * @name prototipoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the prototipoApp
 */
angular.module('prototipoApp')
	.controller('MainCtrl', function ($scope) {	
		

    	var baseUrl = 'http://lorempixel.com/960/450/';
    	
    	$scope.setInterval = 5000;
    	//Modelo para el carousel
	    $scope.slides = [
	    	{
	    		title : 'Aprende a mantenerte en forma',
	    		image : baseUrl+'sports/',
	    		text : '¡As algún deporte todos los días!'
	    	},
	    	{
	    		title : 'Buena alimentación',
	    		image : baseUrl+'food/',
	    		text : '¡La importancia de frutas y verduras en tu dieta!'
	    	},
	    	{
	    		title : 'En contacto con la naturaleza',
	    		image : baseUrl+'nature/',
	    		text : '¡Mantente en armonía con la naturaleza!'
	    	}
	    ];

	    //Modelo ara los bloques de contenido
	    var baseUrl = 'http://lorempixel.com/200/200/';
	    $scope.contenido = [
	    	{
	    		img : baseUrl+'people',
	    		title : 'Sobre Nosotros',
	    		sumario : 'Somos una empresa comprometida con la vida sana'
	    	},
	    	{
	    		img : baseUrl+'business',
	    		title : 'Nuestros Servicios',
	    		sumario : 'Ofrecemos asesoría profesional para mantenerte sano, bien alimentado y saludable'
	    	},
	    	{
	    		img : baseUrl+'transport',
	    		title : 'Contáctenos',
	    		sumario : '#333, Buena vida Online, Centro Comercial, Durance, Zip-432167'
	    	}
	    ];
  	});
