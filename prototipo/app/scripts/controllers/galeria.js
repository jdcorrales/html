'use strict';

/**
 * @ngdoc function
 * @name prototipoApp.controller:GaleriaCtrl
 * @description
 * # GaleriaCtrl
 * Controller of the prototipoApp
 */
angular.module('prototipoApp')
  	.controller('GaleriaCtrl', function ($scope) {

	  	var pictures = $scope.pictures=[];

	  	var baseUrl = 'http://lorempixel.com/300/180/';

	  	var titles = ["Comida Sana", "Salud y trabajo", "Vida en la ciudad", "Mantenerse Activo", "Cuida tu aspecto", "¡¡Vida nocturna!!"];

	  	var keywords = ["food", "business", "city", "sports", "fashion", "nightlife"];

	  	var dummyText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi illo minus molestiae quod nisi natus rerum debitis neque praesentium beatae, alias porro nemo repudiandae explicabo iusto, ex quidem, fugit cumque.";

	  	$scope.addPics = function(i){
	  		pictures.push({
	  			url : baseUrl+keywords[i],
	  			title : titles[i],
	  			summary : dummyText
	  		});
	  	};

	  	for (var i = 0; i < 5; i++) {
	  		$scope.addPics(i);
	  	};

	  	$scope.rate = 0;
	  	$scope.max = 10;
	  	$scope.isReadonly = false;
  	});
