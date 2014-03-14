app.controller('ItemListCtrl', function($scope, MNDB, google) {
	$scope.items = [];
	
	MNDB.selectItems(onSelectQueryCallback);

	function onSelectQueryCallback(array){
		$scope.items = array;
		$scope.$apply();
	}
});