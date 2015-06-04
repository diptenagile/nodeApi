var app = angular.module('sampleApp',['general', 'ngRoute', 'xeditable']);


app.config(['$routeProvider','$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
	
	$httpProvider.defaults.useXDomain = true;
 	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$routeProvider
		.when('/general', {
			templateUrl: 'modules/general/view/view.html',
			controller: 'generalCtrl'
		})
		.otherwise({ redirectTo: '/general' });

}]);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});


app.controller('rootCtrl', ['$scope', function ($scope) {
	
}]);