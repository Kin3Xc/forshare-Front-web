/*
	Project: Forshare
	Developer: Team Oglit
	Description:
		Permite configurar las rutas de la aplicacion web
		desde aca se asiganan cada uno de los controladores
		asociados a cada vista de la aplicación
	Date: 13/10/2015
*/

// modulo principal para los controladores de la aplicación
var app = angular.module('forshare.controllers', ['ui.router']);

// controlador HOME
app.controller('homeController',['$scope', function($scope){
	console.log('Home controller');
}]); // fin controller HOME


app.controller('loginController', ['$scope', '$http', function($scope, $http){
	console.log('Login Controller');

	var vm = this;
	var obj_login = {};

	vm.login = function(){
		obj_login = {
			email: vm.email,
			password: vm.password
		};
		console.log(obj_login);

		$http.post('https://forshare-api.herokuapp.com/api/login')
			.success(function(data){
				console.log(data);
			})
			.error(function(err){
				console.log('Error '+ err);
			});
	}


}]);
