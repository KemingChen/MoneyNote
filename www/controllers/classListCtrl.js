app.controller('ClassListCtrl', function($scope, $ionicActionSheet, $ionicModal, MNDB) {
	var newClassBtn = {
		type: 'button-positive',
		content: '<i>新增</i>',
		tap: function(){
			$scope.modal.show();
		}
	}

	$scope.action = "new";
	$scope.Classes = [];
	$scope.rightButtons = [newClassBtn];
	$scope.data = {
		ckey: undefined,
		title: "",
		property: undefined,
	};
	$scope.kind = [
		{tag: "支出", property: 0},
		{tag: "收入", property: 1},
	];

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
				if(confirm('您確定要刪除此項目嗎?')){
					MNDB.delClass(iClass.ckey, onSelectQueryCallback);
				}
				return true;
			}
	    });
	}

	$scope.closeModal = function (){
		$scope.modal.hide();
	}

	$scope.confirm = function(){
		var data = $scope.data;
		var ignoreKey = $scope.action == "new" ? undefined : data.ckey;
		console.log(data);

		if(checkValid(ignoreKey)){
			if($scope.action == "new"){
				MNDB.addClass(data.title, data.property);
			}
			else{
				MDDB.uptClass(data.ckey, data.title, data.property);
			}
			$scope.modal.hide();
			$scope.Classes = [];
			MNDB.selectClasses(onSelectQueryCallback);
		}
	}

	$scope.kindChanged = function(kind){
		$scope.data.property = kind.property;
	}

	$scope.onTitleChanged = function(title){
		$scope.data.title = title;
	}

	function onSelectQueryCallback(array){
		$scope.Classes = array;
		$scope.$apply();
	}

	function checkValid(ignoreKey){
		var data = $scope.data;
		var Classes = $scope.Classes;

		for(var i in Classes){
			if(Classes[i].title == data.title){
				alert("類別名稱重複!!!");
				return false;
			}
		}

		if(data.property === undefined){
			alert("未選擇種類!!!");
			return false;
		}
		
		return true;
	}
});