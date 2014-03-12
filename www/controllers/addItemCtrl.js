app
.controller('AddItemCtrl', function($scope, $ionicModal, $filter, MNDB) {
	$scope.Classes = [{title: "undefine"}];
	$scope.classId = 0;
	$scope.date = $filter('date')(new Date(), "yyyy-MM-dd");
	$scope.cost = 0;
	$scope.note = "";

	$ionicModal.fromTemplateUrl('selectClass.html', function(modal) {
    	$scope.modal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});

	MNDB.selectClasses(selectClassCallback);

	$scope.clickBtn = function(btnId) {
		if(btnId >= 0 && btnId <= 9){
			$scope.cost = $scope.cost * 10 + btnId;
		}
		else if(btnId == "back"){
			$scope.cost = Math.floor($scope.cost / 10);
		}
		else if(btnId == "enter"){
			//$scope.modal.show();
		}
	};

	$scope.openSelectModal = function(){
		$scope.modal.show();
	};
	$scope.closeSelectModal = function(){
		$scope.modal.hide();
	};

	function selectClassCallback(array){
		$scope.Classes = array;
		$scope.$apply();
	}

	function checkValue(){
		return true;
	}
});