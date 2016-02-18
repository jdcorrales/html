var miApp = angular.module("miApp",[]);

miApp.controller('AlumnosController', ['$scope', function ($scope) {
	$scope.alumnos = [
		{nombre:"Juan", telefono:"12", curso:"2°"},
		{nombre:"Carlo", telefono:"13", curso:"3°"},
		{nombre:"Alexa", telefono:"14", curso:"4°"},
		{nombre:"Ana", telefono:"15", curso:"5°"}
	]; 

	$scope.Save = function(){
		$scope.alumnos.push({
			nombre: $scope.nuevoAlumno.nombre,
			telefono: $scope.nuevoAlumno.telefono,
			curso: $scope.nuevoAlumno.curso
		});

		$scope.formVisibility = false;
	}

	$scope.formVisibility = false;

	$scope.showForm = function(){
		$scope.formVisibility = true;		
	}
}]);
	

