app.controller('ItemListCtrl', function($scope, MNDB) {
	$scope.Items = [];
	
	MNDB.selectItems(onSelectQueryCallback);

	function onSelectQueryCallback(array){
		$scope.Items = array;
	}
});