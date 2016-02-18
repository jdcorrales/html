var mainApplicationModuleName = 'managerProject';

/**
*  Module
*
* Description
*/
var mainApplicationModule = angular.module(mainApplicationModuleName,
	[
		'ngRoute'		
	]);

//Deternima el prefijo '!' para usar Hash Bangs lo cual permite indexar las paginar AJAX
mainApplicationModule.config(['$locationProvider',
	function ($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

angular.element(document).ready(function () {
	angular.bootstrap(document, [mainApplicationModuleName]);
});