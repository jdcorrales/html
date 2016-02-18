'use strict';
/**
* User Controller
*
* Description
*/


angular.module('UserModule').controller('UserController', 
	[
		'$scope', 
		'$http',
		'$location', 
		'$routeParams',
		'toastr',
		'CsrfFactory',
		'Notification',
		'SessionService',

		function ($scope, $http, $location, $routeParams, toastr, CsrfFactory, Notification, SessionService) {
			
			$scope.session = SessionService.user;			
			// Configura el estado inicial de la variable ---> loading del objeto signupForm en false
			$scope.form = {
				loading : false
			};

			$scope.submitSignupForm = function () {
				$scope.form.loading = true;				

				var config = {
	            	headers : {
	                	'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;',
	                	'X-CSRF-Token' : CsrfFactory._csrf
	            	}
	        	};

				$http.post('/user', {
					name : $scope.signupForm.name,
					last_name : $scope.signupForm.last_name,
					username : $scope.signupForm.username,
					email : $scope.signupForm.email,
					password : $scope.signupForm.password,
					confirmation : $scope.signupForm.confirmPassword
				},
					config
				)
				.then(function onSuccess(user) {					
					Notification.success('Usuario <b>'+ user.data.username +'</b> creado correctamente.');
					$location.path('/user/' + user.data.id);
				})
				.catch(function onError(error) {
					Notification.error({
						title: 'Error ' + error.status,
						message: error.data
					});					
				})
				.finally(function eitherWay () {					
					$scope.form.loading = false;
				});
			};

			$scope.getUserId = function () {
				$http.get('/user/' + $routeParams.id)
				.then(function onSuccess(user) {					
					$scope.user = {
						name      : user.data.name,
						last_name : user.data.last_name,
						username  : user.data.username,
						email     : user.data.email,
						id        : user.data.id
					};
				})
				.catch(function onError(error) {					
					Notification.error({
						title: 'Error ' + error.status,
						message: error.data
					});	
					$location.path('/');
				});				
			};

			$scope.getUserAll = function () {				
				$http.get('/user')
				.then(function onSuccess(users) {					
					$scope.users = users.data;
				})
				.catch(function onError(error) {					
					Notification.error({
						title: 'Error ' + error.status,
						message: error.data
					});	
					$location.path('/');
				});				
			};

			$scope.updateUser = function () {
				$scope.form.loading = true;
				var config = {
	            	headers : {
	                	'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8;',
	                	'X-CSRF-Token' : CsrfFactory._csrf
	            	}
	        	};

				$http.put('user/' + $routeParams.id, {
					name : $scope.user.name,
					last_name : $scope.user.last_name,
					username : $scope.user.username,
					email : $scope.user.email
				},
					config
				)
				.then(function onSuccess(user) {
					Notification.success('Usuario <b>'+ user.data.username +'</b> se ha actualizado.');
					$location.path('/user/' + user.data.id);
				})
				.catch(function onError(error) {
					Notification.error({
						title: 'Error ' + error.status,
						message: error.data
					});
				})
				.finally(function eitherWay () {
					$scope.form.loading = false;
				});
			};

			$scope.destroyUser = function (id) {			     	

				$http.get('user/delete/' + id)
				.then(function onSuccess(user) {
					Notification.success('Usuario eliminado.');
					$location.path('/user');
				})
				.catch(function onError(error) {
					Notification.error({
						title: 'Error ' + error.status,
						message: error.data
					});
				});
			};
		}
	]
);