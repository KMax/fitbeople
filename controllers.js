(function(angular) { 'use strict';
	var app = angular.module('fitapp.controllers', ['ngSPARQL', 'ngSPARQL.config']);

	app.controller('CalendarCtrl', function($scope, sparql, SPARQL_CONFIG) {
		$scope.today = 5;
		$scope.days = [
			{ label: "Monday", dishes: [{label: "Moussaka", kcal: 650}, {label: "Greek Salad", kcal: 250}, {label: "Stifado", kcal: 370}], 
				steps: 2156, kcal: 1291, total: 1270},
			{ label: "Tuesday", dishes: [{label: "Moussaka", kcal: 650}, {label: "Greek Salad", kcal: 250}, {label: "Stifado", kcal: 370}], 
				steps: 2156, kcal: 1291, total: 1270 },
			{ label: "Wednesday", dishes: [{label: "Moussaka", kcal: 650}, {label: "Greek Salad", kcal: 250}, {label: "Stifado", kcal: 370}], 
				steps: 2156, kcal: 1291, total: 1270 },
			{ label: "Thursday", dishes: [{label: "Moussaka", kcal: 650}, {label: "Greek Salad", kcal: 250}, {label: "Stifado", kcal: 370}], 
				steps: 2156, kcal: 1291, total: 1270 },
			{ label: "Friday", dishes: [{label: "Moussaka", kcal: 650}, {label: "Greek Salad", kcal: 250}, {label: "Stifado", kcal: 370}], 
				steps: 2156, kcal: 1291, total: 1270 },
			{ label: "Saturday", dishes: [], steps: 1569, kcal: 967, total: 200 },
			{ label: "Sunday", dishes: [], steps: 0, kcal: 0, total: 0 }
		];
		$scope.dishes = [];
		$scope.measurements = {};
		$scope.totalResults = function() {
			var day = $scope.days[$scope.today]	;
			return (day.total/day.kcal)*100 - 90;
		};
		$scope.addDish = function(day, dish) {
			if(day && dish) {
				day.dishes.push(dish.originalObject);
				day.total += parseFloat(dish.originalObject.kcal);
			} else {
				alert('Please, select a dish! Keep fit! :)');
			}
		};
		$scope.onRefresh = function() {
			sparql.select("SELECT ?label ?kcal {\
								?dish a food:Dish ;\
								rdfs:label ?label ;\
								food:energyPer100g ?kcal .\
							}"
			)
			.then(function(data) {
				$scope.dishes = data;
				var steps = Math.round(Math.random() * 20 + 20);
				var calories = Math.round(steps / 13);
				$scope.days[$scope.today].steps += steps;
				$scope.days[$scope.today].kcal += calories;
				alert("Loaded!");	
			});
		};
	});
	app.controller('PlanCtrl', function($scope) {
		
	});
})(angular);
