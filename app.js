(function(angular){
	var app = angular.module('fitapp', ['fitapp.utils', 'fitapp.controllers', 'angucomplete', 'ngRoute']);

	app.config(function($routeProvider, $locationProvider) {
		$routeProvider.when('/', {
			templateUrl: 'main.html',
			//controller: 'CalendarCtrl'
		}).when('/plan', {
			templateUrl: 'plan.html',
			//controller: 'PlanCtrl'
		}).otherwise('/');
	});

	var sparqlConfig = angular.module('ngSPARQL.config', []);
	sparqlConfig.constant(
		'SPARQL_CONFIG', {
			PREFIXES: {
				'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
				'rdfs': 'http://www.w3.org/TR/rdf-schema/',
				'food': 'http://data.lirmm.fr/ontologies/food#'
			},
			ENDPOINTS: {
				ENDPOINT_1: "http://localhost:3030/ds/query"
			}
		}
	);
})(angular);
