'use strict';
/**
* User Controller
*
* Description
*/


angular.module('SessionModule').controller('SessionController', 
	[
		'$scope', 
		'$http',
		'$location', 
		'$routeParams',		
		'CsrfFactory',
		'Notification',
		'SessionService',

		function ($scope, $http, $location, $routeParams, CsrfFactory, Notification, SessionService) {

			$scope.session = SessionService.user;

			$scope.form = {
				loading : false
			};

			$scope.submitSinginForm = function () {
				$scope.form.loading = true;							
			};
		}
	]
);