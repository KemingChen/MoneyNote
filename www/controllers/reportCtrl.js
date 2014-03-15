google.load('visualization', '1', {
  packages: ['corechart']
});
 /*
google.setOnLoadCallback(function() {
  angular.bootstrap(document.body, ['MoneyNote']);
});*/

app.controller('ReportCtrl',
	function($scope, MNDB, google) {
		$scope.piechartHistory = [];
		$scope.piechart = function() {
			var x = [
				['className', 'count']
			];
			var piechartHistory = [
				{
					className: '1月',
					count: 20
				},
				{
					className: '2月',
					count: 200
				},
				{
					className: '3月',
					count: 50
				},
				{
					className: '4月',
					count: 150
				}
			];
			angular.forEach(piechartHistory,
				function(record, key) {
					x.push([
						record.className,
						record.count
					]);
				}
			);
			$scope.piechartHistory = x;
		};
		
		$scope.linechartHistory = [];
		$scope.linechart = function() {
			var x = [
				['month', 'count']
			];
			var linechartHistory = [
				{
					month: '1月',
					count: 20
				},
				{
					month: '2月',
					count: 200
				},
				{
					month: '3月',
					count: 50
				},
				{
					month: '4月',
					count: 150
				}
			];
			angular.forEach(linechartHistory,
				function(record, key) {
					x.push([
						record.month,
						record.count
					]);
				}
			);
			$scope.linechartHistory = x;
		};
	}	
)
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



