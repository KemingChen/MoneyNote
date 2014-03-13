var app = angular.module("MoneyNote", ['ionic', 'MoneyNote.services']);

app.config( function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: "templates/tab.html"
		})

		.state('tab.item', {
		    url: '/item',
		    views: {
		    	'item-tab' : {
		    		templateUrl: "templates/item.html",
					//controller: 'AddItemCtrl'
		    	}
			}
	  	})

		.state('tab.selectClass', {
			url: '/selectclass',
			views: {
				'additem-tab' : {
					templateUrl: "templates/selectClass.html",
					controller: 'SelectClassCtrl'
				}
			}
		})

	  	.state('tab.itemlist', {
			url: "/itemlist",
		    views: {
		    	'itemlist-tab' : {
					templateUrl: "templates/itemlist.html",
					controller: 'ItemListCtrl'
		    	}
			}
	    })

	    .state('tab.classlist', {
	        url: "/classlist",
		    views: {
		    	'classlist-tab' : {
		    		templateUrl: "templates/classlist.html",
				controller: 'ClassListCtrl'
		    	}
			}
	    })

	    .state('tab.report', {
	        url: "/report",
		    views: {
		    	'report-tab' : {
		    		templateUrl: "templates/report.html",
				controller: 'ReportCtrl'
		    	}
			}
	    });
	$urlRouterProvider.otherwise("/tab/itemlist");
});