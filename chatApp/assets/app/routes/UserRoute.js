'use strict';
/**
* Chat Routes
*
* Description
*/
angular.module('UserModule').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/user/new', {
			templateUrl: '/app/views/user/new.html',
			controller: 'UserController'
		})
		.when('/user/edit/:id', {
			templateUrl: '/app/views/user/edit.html',
			controller: 'UserController'
		})
		.when('/user', {
			templateUrl: '/app/views/user/show.html',
			controller: 'UserController'
		})
		.when('/user/:id', {
			templateUrl: '/app/views/user/view.html',
			controller: 'UserController'
		})
		.otherwise({ 
			templateUrl: '/app/views/index.html',
			controller : 'SessionController'
		});
	}
]);