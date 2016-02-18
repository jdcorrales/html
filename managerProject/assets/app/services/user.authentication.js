/**
*  Module Authentication
*
* Description
*/
angular.module('userApp').factory('Authentication', [
	function () {
	
		this.user = window.user;

		return {
			user : this.user
		};
	}
]);