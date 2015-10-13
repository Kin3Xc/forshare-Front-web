/*
	Project: Forshare
	Developer: Team Oglit
	Description:
		Permite configurar las rutas de la aplicacion web
		desde aca se asiganan cada uno de los controladores
		asociados a cada vista de la aplicación
	Date: 13/10/2015
*/

// modulo principal de la aplicación
var app = angular.module('forshare', ['forshare.controllers', 'forshare.services', 'ngStorage']);

// configuración de las rutas para la aplicación web
app.config(function($stateProvider, $urlRouterProvider ,$locationProvider, $httpProvider){


	// defino las rutas de la app
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home/index.tpl.html',
			controller: 'homeController'
		})

		.state('login', {
			url: '/login',
			templateUrl: 'views/home/login.tpl.html',
			controller: 'loginController',
			controllerAs: 'login'
		})

		.state('register',{
			url: '/register',
			templateUrl: 'views/home/register.tpl.html',
			controller: 'signupController',
			controllerAs: 'signup'
		});

		$urlRouterProvider.otherwise('/');
		//$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
			return {
			        'request': function (config) {
			            config.headers = config.headers || {};
			            if ($localStorage.token) {
			                config.headers.Authorization = 'Bearer ' + $localStorage.token;
			            }
			            return config;
			        },
			        'responseError': function(response) {
			            if(response.status === 401 || response.status === 403) {
			                $location.path('/login');
			            }
			            return $q.reject(response);
			        }
			    };
		}]);


});
