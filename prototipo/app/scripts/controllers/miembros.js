'use strict';

/**
 * @ngdoc function
 * @name prototipoApp.controller:MiembrosCtrl
 * @description
 * # MiembrosCtrl
 * Controller of the prototipoApp
 */
angular.module('prototipoApp')
  	.controller('MiembrosCtrl', function ($scope, $http, $uibModal) {

  		$http.get("http://localhost:9000/miembros.json").success(function(data){  			
  			$scope.miembros = data;
   		});

      $scope.gridOptions = {
        data : 'miembros',
        columnDefs : [
          {field: 'no', displayName : 'N°'},
          {field : 'nombre', displayName : 'Nombre'},
          {field : 'fidelidad', displayName : 'Puntos de Fidelidad'},
          {field : 'fechaUnion', displayName : 'Fecha de Unión'},
          {field : 'tipoMiembro', displayName : 'Tipo de Miembro'}
        ],
        showGroupPanel : true,        
        enableCellSelection : true,
        enableRowSelection : true,
        enableCellEdit : true
      };

      $scope.showModal = function(){
        $scope.nuevoMiembro = {};
        
        var modalInstance = $uibModal.open({
          templateUrl : 'views/add-miembros.html',
          controller : 'AddNuevoMiembroCtrl',
          resolve : {
            nuevoMiembro : function(){
              return $scope.nuevoMiembro;
            }
          }
        });

        modalInstance.result.then(function(selectedItem){
          $scope.miembros.push({
            no : $scope.miembros.length + 1,
            nombre : $scope.nuevoMiembro.nombre,
            tipoMiembro : $scope.nuevoMiembro.tipoMiembro,
            fidelidad : $scope.nuevoMiembro.fidelidad,
            fechaUnion : $scope.nuevoMiembro.fechaUnion
          });
        });
      };
  	})
    .controller('AddNuevoMiembroCtrl', function ($scope, $uibModalInstance, nuevoMiembro) {
      
      $scope.nuevoMiembro = nuevoMiembro;
      $scope.salvarNuevoMiembro = function(){
        $uibModalInstance.close(nuevoMiembro);
      };

      $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
      };
    });
