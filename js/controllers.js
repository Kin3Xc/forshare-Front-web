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
app.controller('homeController',['$rootScope', '$scope', 'Login', function($rootScope, $scope, Login){

	Login.me(function(res) {
			$scope.perfil = res;
			if (!res.type) {
				console.log('No hay nadie logueado');
			}else {
				console.log(res.data);
			}

	}, function() {
			$rootScope.error = 'Failed to fetch details';
	});

	console.log('Home controller');
}]); // fin controller HOME


app.controller('loginController', ['$rootScope','$scope', '$location', '$localStorage', 'Login', function($rootScope, $scope, $location, $localStorage, Login){

	var vm = this;
	var obj_login = {};

	vm.login = function(){
		obj_login = {
			email: vm.email,
			password: vm.password
		};

		Login.signin(obj_login, function(res) {
			 if (res.type == false) {
					 alert(res.data)
			 } else {
					 $localStorage.token = res.data.token;
					 console.log(res.data);
					 //window.location = "/";
					 $location.path('/');
			 }
	 }, function() {
			 $rootScope.error = 'Failed to signin';
	 })

		console.log(obj_login);
	}


	vm.me = function() {
		 Login.me(function(res) {
				 $scope.perfil = res;
		 }, function() {
				 $rootScope.error = 'Failed to fetch details';
		 })
 };


	vm.logout = function() {
			 Login.logout(function() {
					 //window.location = "/"
					 $location.path('/');
			 }, function() {
					 alert("Failed to logout!");
			 });
	 };

	vm.token = $localStorage.token;

}]);



app.controller('signupController', ['$rootScope','$scope', '$location', '$localStorage', 'Login', function($rootScope, $scope, $location, $localStorage, Login){
	var vm = this;
	var obj_signup = {};

	vm.signup = function(){
		obj_signup = {
			nombre: vm.nombre,
			email: vm.email,
			password: vm.password
		};

		console.log(obj_signup);

	 Login.save(obj_signup, function(res) {
			 if (res.type == false) {
					 alert(res.data)
			 } else {
					 $localStorage.token = res.data.token;
					 //window.location = "/"
					 $location.path('/');
			 }
	 }, function() {
			 $rootScope.error = 'Failed to signup';
	 });


	}
}]);
