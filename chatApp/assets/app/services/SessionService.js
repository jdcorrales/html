/**
* Session Services
*
* Description
*/
angular.module('SessionModule').factory('SessionService', [
	function () {		
		this.user = window.user;
		return {
			user : this.user
		};
	}
]);