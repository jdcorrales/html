angular.module('moduleApp').controller('clientController', ['$scope', 'Authentication',
	function ($scope, Authentication) {
		$scope.name = Authentication.user ? Authentication.user.username : 'Username Application';
	}
]);
