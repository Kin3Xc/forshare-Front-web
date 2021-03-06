/*
	Project: Forshare
	Developer: Team Oglit
	Description:
		Permite configurar las rutas de la aplicacion web
		desde aca se asiganan cada uno de los controladores
		asociados a cada vista de la aplicación
	Date: 13/10/2015
*/

var app = angular.module('forshare.services', [])


app.factory('Login', ['$http', '$localStorage', function($http, $localStorage){
	var baseUrl = "https://forshare-api.herokuapp.com";

	function changeUser(user) {
    angular.extend(currentUser, user);
  }

	function urlBase64Decode(str) {
      var output = str.replace('-', '+').replace('_', '/');
      switch (output.length % 4) {
          case 0:
              break;
          case 2:
              output += '==';
              break;
          case 3:
              output += '=';
              break;
          default:
              throw 'Illegal base64url string!';
      }
      return window.atob(output);
  }


	function getUserFromToken() {
      var token = $localStorage.token;
      var user = {};
      if (typeof token !== 'undefined') {
          var encoded = token.split('.')[1];
          user = JSON.parse(urlBase64Decode(encoded));
      }
      return user;
  }

	var currentUser = getUserFromToken();

	return {
		 save: function(data, success, error) {
				 $http.post(baseUrl + '/api/signup', data).success(success).error(error)
		 },
		 signin: function(data, success, error) {
				 $http.post(baseUrl + '/api/login', data).success(success).error(error)
		 },
		 me: function(success, error) {
				 $http.get(baseUrl + '/api/me').success(success).error(error)
		 },
		 logout: function(success) {
				 changeUser({});
				 delete $localStorage.token;
				 success();
		 }
 };

}]);
