

angular.module('managerProjectApp').config(['$routeProvider', 
	function ($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'app/views/client.html',
			controller: 'clientController'
		}).
		otherwise({ 
			redirectTo: '/' 
		});
	}
]);