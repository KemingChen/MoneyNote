google.load('visualization', '1', {
  packages: ['corechart']
});
 /*
google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['MoneyNote']);
});*/

app.controller('ReportCtrl', function($scope, MNDB, google) {
	var className=[];
	var allItems=[];
	
	MNDB.selectItems(selectItemsCallback);
	
	function selectItemsCallback(array)
	{
		allItems = array;
		console.log(array);
	}
	
	MNDB.selectClasses(selectClassesCallback);

	function selectClassesCallback(array)
	{
		className = array;
	}

	$scope.piechartHistory = [];
	$scope.piechart = function() {
	
		var pie = [];
		
		for (i = 0; i < className.length + 1; i++)
		{
			pie[i] = [];
			if(i != 0)
			{
				pie[i][0] = className[i - 1].title;
				pie[i][1] = 0;
			}
		}
		
		pie[0][0] = '類別';
		pie[0][1] = '花費';
		
		for(i = 0; i < allItems.length; i++)
		{
			for(j = 0; j < className.length + 1; j++)
			{
				if(allItems[i].title == pie[j][0])
				{
					pie[j][1] += allItems[i].cost;
				}
			}
		}
		
		$scope.piechartHistory = pie;
	};

	$scope.linechartHistory = [];
	$scope.linechart = function() {
		
		var line = [];
		var date = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
					'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
					'21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
					'31'];
		var today = new Date();
		var month = today.getMonth() + 1;
		var day = today.getDate();
		for(i = 0; i < day + 1; i++)
		{
			line[i] = [];
			if (i != 0)
			{
				line[i][0] = date[i - 1];
				line[i][1] = 0;
				line[i][2] = 0;
			}
		}
		line[0][0] = '日';
		line[0][1] = '支出';
		line[0][2] = '收入';
		for(i = 0; i < allItems.length; i++)
		{
			for(j = 0; j < line.length; j++)
			{
				var date = allItems[i].time.split("-");
				if(date[2] == line[j][0])
				{
					if(!allItems[i].property)
						line[j][1] += allItems[i].cost;
					else
						line[j][2] += allItems[i].cost;
				}
			}
		}
		console.log(line);
		$scope.linechartHistory = line;
	};
})
.directive('piechart', 
	function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '=data'
			},
			template: '<div class="piechart"></div>',
			link: function(scope, element, attrs) {
				var chart = new google.visualization.PieChart(element[0]);
				var options = {title: 'Company Performance'};
				scope.$watch('data',
					function(v) {
						var data = google.visualization.arrayToDataTable(v);
						chart.draw(data, options);
					}
				);
			}
		};
	}
)
.directive('linechart', 
	function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				data: '=data'
			},
			template: '<div class="linechart"></div>',
			link: function(scope, element, attrs) {
				var chart = new google.visualization.LineChart(element[0]);
				var options = {title: 'Company Performance'};
				scope.$watch('data',
					function(v) {
						var data = google.visualization.arrayToDataTable(v);
						chart.draw(data, options);
					}
				);
			}
		};
	}
);



