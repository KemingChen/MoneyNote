app.controller('ItemListCtrl', function($scope, $ionicActionSheet, MNDB) {
	$scope.items = [];
	
	MNDB.selectItems(onSelectQueryCallback);

	$scope.showSheet = function(item){
		$ionicActionSheet.show({
			buttons: [
				{ text: '編　輯' },
			],
	      	cancelText: '取　消',
	      	destructiveText: '刪　除',

			cancel: function() {},

			buttonClicked: function(index) {
				console.log(item.ikey);
				document.location.href = "#/tab/item/" + item.ikey;
	        	return true;
	      	},

			destructiveButtonClicked: function() {
				if(confirm('您確定要刪除此項目嗎?')){
					MNDB.delItem(item.ikey, onSelectQueryCallback);
				}
				return true;
			}
	    });
	}
	
	function onSelectQueryCallback(array){
		$scope.items = array;
		$scope.$apply();
	}
});