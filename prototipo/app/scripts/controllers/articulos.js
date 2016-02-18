'use strict';

/**
 * @ngdoc function
 * @name prototipoApp.controller:ArticulosCtrl
 * @description
 * # ArticulosCtrl
 * Controller of the prototipoApp
 */
angular.module('prototipoApp')
  	.controller('ArticulosCtrl', function ($scope) {
  	
  		$scope.oneAtATime = true;

	  	$scope.posts = [
	  		{
	  			title : "Alimentos buenos para la salud",
	  			content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae eius, fugiat corporis fugit temporibus minima saepe molestiae libero corrupti vel tenetur nostrum porro. Atque mollitia qui ad molestias reprehenderit, omnis."
	  		},
	  		{
	  			title : "Alimentos menos buenos para la salud",
	  			content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint in suscipit nostrum quibusdam corporis est autem doloribus, laborum distinctio! Assumenda iure commodi hic, doloremque facilis odit ullam similique nostrum laborum."
	  		},
	  		{
	  			title : "¡¡¡Limita tu cantidad de hidratos de carbono",
	  			content : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, exercitationem deleniti vel aliquid, facere eligendi possimus quas iusto amet illum dolor dolorum modi excepturi. Corporis repudiandae hic eum provident dolorum?"
	  		},
	  	];
  	});
