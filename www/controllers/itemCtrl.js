app
.controller('ItemCtrl', function($scope, $ionicModal, $location, $filter, $stateParams, MNDB) {
	$scope.Class = null;
	$scope.Classes = [];
	$scope.date = $filter('date')(new Date(), "yyyy-MM-dd");
	$scope.cost = 0;
	$scope.note = "";

	$ionicModal.fromTemplateUrl('selectClass.html', function(modal) {
    	$scope.modal = modal;
	}, {
		scope: $scope,
		animation: 'slide-in-up'
	});

	MNDB.selectClasses(onSelectClassQueryCallback);

	$scope.classname = function(){
		return $scope.Class === null ? "請選擇..." : $scope.Class.title;
	}

	$scope.clickBtn = function(btnId) {
		if(btnId >= 0 && btnId <= 9){
			$scope.cost = $scope.cost * 10 + btnId;
		}
		else if(btnId == "back"){
			//MNDB.clean();
			$scope.cost = Math.floor($scope.cost / 10);
		}
		else if(btnId == "enter"){
			if(checkValid()){
				MNDB.addItem($scope.Class.ckey, $scope.cost, $scope.note, Date.parse($scope.date));
				document.location.href = "#/tab/itemlist";
			}
		}
	};

	$scope.openSelectModal = function(){
		$scope.modal.show();
	};

	$scope.closeSelectModal = function(){
		$scope.modal.hide();
	};

	$scope.classChange = function(Class){
		$scope.Class = Class;
	};

	function onSelectClassQueryCallback(array){
		$scope.Classes = array;

		if($stateParams.action != "new"){
			console.log($stateParams.action);
			MNDB.selectItems(onSelectItemQueryCallback, {ikey: "=" + $stateParams.action});
		}
	}

	function onSelectItemQueryCallback(array){
		var item = array[0];
		$scope.date = $filter('date')(item.time, "yyyy-MM-dd");
		$scope.cost = item.cost;
		$scope.note = item.note;
		$scope.Class = getClass(item.ckey);
		$scope.$apply();
	}

	function getClass(classId){
		var Classes = $scope.Classes;
		for(var i in Classes){
			if(Classes[i].ckey == classId){
				console.log(Classes[i]);
				return Classes[i];
			}
		}
		return null;
	}

	function checkValid(){
		if(!$scope.date.match(/\d{4}-\d{2}-\d{2}/)){
			alert("時間有誤!!!");
			return false;
		}
		else if($scope.Class == null){
			alert("請選擇類別!!!");
			return false;
		}
		return true;
	}
});