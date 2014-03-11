app.controller('AddItemCtrl',
	function($scope) {
		var obj = {};
		obj.date = "2014-03-11";
		obj.cost = "0";
		obj.note = "";
		obj.classname = "測試";
		$scope.obj = obj;
		
		$scope.btnClick = function(value) {
			var str = $scope.obj.cost;
			if(value >= 0 && value <= 9){
				str += value;
				str = str[0] == "0" ? str.substring(1) : str;
			}
			else if(value == "back"){
				str = str.substring(0, str.length - 1);
				str = str == "" ? "0" : str;
			}
			else if(value == "enter"){
				document.location.href = "#/itemList";
			}
			$scope.obj.cost = str;
		};

		function checkValue(){
			return true;
		}
	}
);