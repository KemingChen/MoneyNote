app.controller('ClassListCtrl', function($scope, MNDB) {
	$scope.Classes = [];

	MNDB.selectClasses(onSelectQueryCallback);

	function onSelectQueryCallback(array){
		$scope.Classes = array;
		$scope.$apply();
	}
});