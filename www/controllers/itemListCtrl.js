app.controller('ItemListCtrl', function($scope, MNDB) {
	MNDB.selectItems(onSelectQueryCallback);

	function onSelectQueryCallback(array){
		console.log(array);
	}
});