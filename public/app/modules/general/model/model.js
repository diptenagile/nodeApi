angular.module('general',[]);

angular.module('general').factory('generalFactory', ['$http', function ($http){
	
	var base = "http://localhost:5000/api/";
	var generalFactory  = {};
	

	generalFactory.getCat = function () {

		return $http.get(base+'getData');
	};

	generalFactory.editCat = function (dataArray) {

		return $http.post(base+'edit', dataArray);
	};	

	return generalFactory;

}]);