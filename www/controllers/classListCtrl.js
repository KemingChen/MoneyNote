app.controller('ClassListCtrl', function($scope, $ionicActionSheet, $ionicModal, MNDB) {
	var newClassBtn = {
		type: 'button-positive',
		content: '<i>新增</i>',
		tap: function(){
			$scope.modal.show();
		}
	}

	$scope.title = "";
	$scope.Classes = [];
	$scope.rightButtons = [newClassBtn];

	MNDB.selectClasses(onSelectQueryCallback);

	$ionicModal.fromTemplateUrl('class.html', function(modal) {
    	$scope.modal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});

	$scope.showSheet = function(iClass){
		$ionicActionSheet.show({
			buttons: [
				{ text: '編　輯' },
			],
	      	cancelText: '取　消',
	      	destructiveText: '刪　除',

			cancel: function() {},

			buttonClicked: function(index) {
	        	return true;
	      	},

			destructiveButtonClicked: function() {
				return true;
			}
	    });
	}

	$scope.closeModal = function (){
		$scope.modal.hide();
	}

	function onSelectQueryCallback(array){
		$scope.Classes = array;
		$scope.$apply();
	}
});