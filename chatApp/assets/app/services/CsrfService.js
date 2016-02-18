/**
* Csrf Services
*
* Description
*/
angular.module('CsrfModule').factory('CsrfFactory', [
	function () {		
		this._csrf = window._csrf;
		return {
			_csrf : this._csrf
		};
	}
]);