var app = angular.module("MoneyNote", ['ionic']);

app.config( function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tab', {
			url: '/',
			abstract: true,
			templateUrl: "templates/tab.html"
		})
		.state('tab.additem', {
		    url: 'additem',
			templateUrl: "templates/additem.html",
			controller: 'AddItemCtrl'
	  	})
	  	.state('tab.itemlist', {
			url: "itemlist",
			templateUrl: "templates/itemlist.html",
			controller: 'ItemListCtrl'
	    })
	    .state('tab.classlist', {
	        url: "classlist",
			templateUrl: "templates/classlist.html",
			controller: 'ClassListCtrl'
	    })
	    .state('tab.report', {
	        url: "report",
			templateUrl: "templates/report.html",
			controller: 'ReportCtrl'
	    });
	$urlRouterProvider.otherwise("/itemlist");
});