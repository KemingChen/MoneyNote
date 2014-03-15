app
.controller('ItemCtrl', function ($scope, $ionicModal, $location, $filter, $stateParams, MNDB) {
	var cancelBtn = {
		type: 'button-positive',
		content: '<i>取消</i>',
		tap: function(e) {
			document.location.href = "#/tab/itemlist";
		}
	};

	var finishBtn = {
		type: 'button-positive',
		content: '<i>' + ($stateParams.action == "new" ? "新增" : "修改") + '</i>',
		tap: function(){
			$scope.clickBtn("enter");
		}
	}

	$scope.Class = null;
	$scope.Classes = [];
	$scope.date = $filter('date')(new Date(), "yyyy-MM-dd");
	$scope.cost = 0;
	$scope.note = "";
	$scope.action = $stateParams.action;
	$scope.leftButtons = [];
	$scope.rightButtons = [finishBtn];

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
		console.log($scope.note);
		if(btnId >= 0 && btnId <= 9){
			$scope.cost = $scope.cost * 10 + btnId;
		}
		else if(btnId == "back"){
			//MNDB.clean();
			$scope.cost = Math.floor($scope.cost / 10);
		}
		else if(btnId == "dbZero"){
			$scope.cost = $scope.cost * 100;
		}
		else if(btnId == "enter"){
			console.log("check");
			if(checkValid()){
				console.log([$scope.cost, $scope.note, $scope.date]);
				if($scope.action == "new"){
					MNDB.addItem($scope.Class.ckey, $scope.cost, $scope.note, Date.parse($scope.date));
				}
				else{
					MNDB.updItem($scope.ikey, $scope.Class.ckey, $scope.cost, $scope.note, Date.parse($scope.date));
				}
				document.location.href = "#/tab/itemlist";
			}
		}
		else if(btnId == "cancel"){
			document.location.href = "#/tab/itemlist";
		}
	};

	$scope.openSelectModal = function(){
		$scope.modal.show();
	};

	$scope.closeSelectModal = function(){
		$scope.modal.hide();
	};

	$scope.classChanged = function(Class){
		$scope.Class = Class;
	};

	$scope.onNoteChanged = function (value){
		console.log(value);
		$scope.note = value;
	}

	$scope.onDateChanged = function (value){
		console.log(value);
		$scope.date = value;
	}

	function onSelectClassQueryCallback(array){
		$scope.Classes = array;

		console.log($scope.action);
		if($scope.action != "new"){
			console.log("Find Item");
			$scope.leftButtons.push(cancelBtn);
			MNDB.selectItems(onSelectItemQueryCallback, {ikey: "=" + $scope.action});
		}
	}

	function onSelectItemQueryCallback(array){
		var item = array[0];
		$scope.ikey = item.ikey;
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
				//console.log(Classes[i]);
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