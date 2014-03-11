google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(pieChart);
function pieChart() {
	var data = google.visualization.arrayToDataTable([
		['Task', 'Hours per Day'],
		['Work',     11],
		['Eat',      2],
		['Commute',  2],
		['Watch TV', 2],
		['Sleep',    7]
	]);
	var options = {
	title: 'My Daily Activities'
	};
	var chart = new google.visualization.PieChart(document.getElementById('piechart'));
	chart.draw(data, options);
}

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(lineChart);
function lineChart() {
	var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        var options = {
          title: 'Company Performance'
        };

        var chart = new google.visualization.LineChart(document.getElementById('linechart'));
        chart.draw(data, options);
}