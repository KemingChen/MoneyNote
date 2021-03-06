app.controller('ItemListCtrl', function($scope, $ionicActionSheet, MNDB) {
	var cleanDatabaseBtn = {
		type: 'button-positive',
		content: '<i class="ion-refresh"></i>',
		tap: function(){
			$scope.items = [];
			$scope.$apply();
			MNDB.clean(onChangeCallback);
		}
	}

	$scope.items = [];
	$scope.leftButtons = [cleanDatabaseBtn];
	$scope.rightButtons = [MNDB.getSettingBtn(onChangeCallback)];
	$scope.timeRange = MNDB.getTimeRangeTag;

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
				document.location.href = "#/tab/myItem/" + item.ikey;
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

	function onChangeCallback(){
		MNDB.selectItems(onSelectQueryCallback);
	}
});