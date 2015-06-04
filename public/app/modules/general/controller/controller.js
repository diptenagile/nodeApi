angular.module('general').controller('generalCtrl', ['$scope', '$http', 'generalFactory', function ($scope, $http, generalFactory) {
	
	$scope.catData = [] ;

	generalFactory.getCat()
	.success(function (response, status){

		if(status === 200 && response.length > 0){
			$scope.catData = response;
			console.log($scope.catData);
		}
	})
	.error(function (error, status){
		alert("Error while getting data");
	});


	$scope.save = function (cat) {		

		return 'Error';          
		// $http.post('http://localhost:5000/api/add', cat);

	};


	$scope.addNewRow = function () {
		
		$scope.newRow = {'cat_id':'','name':''};
		$scope.catData.push($scope.newRow);	
	};

	$scope.add = function () {
		
		if($scope.catData.length > 0){
			var dataArray = {'cat_id':$scope.catData[index].category_id,'name':$scope.catData[index].name};
			generalFactory.editCat(dataArray)
			.success(function (response, status) {
				alert("saved");
			})
			.error(function (error, status) {
				alert("Error while saving...");
			});
		}

	};


}]);