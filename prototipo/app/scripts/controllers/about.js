'use strict';

/**
 * @ngdoc function
 * @name prototipoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the prototipoApp
 */
angular.module('prototipoApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
