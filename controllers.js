(function(angular) { 'use strict';
	var app = angular.module('fitapp.controllers', ['ngSPARQL', 'ngSPARQL.config']);

	app.controller('CalendarCtrl', function($scope, sparql, SPARQL_CONFIG, $window) {
		$scope.$on('$viewContentLoaded', function() {
			$scope.initmap();
		});
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
		$scope.totalResults = function(plantotal) {
			var addition = plantotal || 0;
			var day = $scope.days[$scope.today];
			var total = ((day.total + addition)/day.kcal)*100 - 90;
			$window.fitTotal = day.total;
			$window.kcal = day.kcal;
			return total;
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
		$scope.initmap = function() {
			var pois = [
				{
					name: "Noti Ammos",
				 	lon: 35.02885,
				 	lat: 24.7587,
				},
				{
					name: "Aristidis",
					lon: 35.02874,
				 	lat: 24.7587,
				},
				{
					name: "Bakery/Patisserie",
					lon: 35.02896,
				 	lat: 24.7589,
				},
				{
					name:"Shop",
					lon: 35.02885,
				 	lat: 24.7592,
				}
				];
				  
				  var food = [ 
					{
						name: "Baklava",
					 	kcal: 230,
					 	cost: "2.50",
					},
					{
						name: "Kadaifi",
						kcal: 150,
					 	cost: "1.60",
					},
					{
						name: "Focaccia",
						kcal: 310,
					 	cost: "2.00",
					},
					{
						name:"Chips",
						kcal: 140,
					 	cost: "1.50",
					}
				];  

				var var_location = new google.maps.LatLng(35.0290014,24.7595261);
					var var_location1 = new google.maps.LatLng(pois[0].lon,pois[0].lat);
					var var_location2 = new google.maps.LatLng(pois[1].lon,pois[1].lat);
					var var_location3 = new google.maps.LatLng(pois[2].lon,pois[2].lat);
					var var_location4 = new google.maps.LatLng(pois[3].lon,pois[3].lat);
					
					window.tot = 0;

				var var_mapoptions = {
				  center: var_location,
				  zoom: 18
				};

				var var_marker = new google.maps.Marker({
					position: var_location,
					map: var_map,
					icon: 'http://maps.google.com/mapfiles/kml/shapes/man.png',
					title:"You"});

				var contentString1 = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">'+ pois[0].name +'</h1>'+
				'<div id="bodyContent">'+
				'<ul><li>'+ food[0].name + ' Euro ' + food[0].cost + ' <input type="number" name="quantity" min="1" max="5" onchange="onIncrease(tot)"></li>' +
				'</ul>' +
				'</div>'+
				'</div>';
				
				window.onIncrease = function(tot) {
					tot+=food[0].kcal;
					alert(tot);
					alert(kcal);
					alert(fitTotal);
					document.getElementById("bar").setAttribute("style", "width:" + parseInt(((fitTotal + tot)/kcal)*100 - 90) + "%")	;
				};

				var contentString2 = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">'+ pois[1].name +'</h1>'+
				'<div id="bodyContent">'+
				'<ul><li>'+ food[0].name + ' Euro ' + food[0].cost + ' <input type="number" name="quantity" min="1" max="5"></li>'+
				'<li>'+ food[1].name + ' Euro ' + food[1].cost + ' <input type="number" name="quantity" min="1" max="5"></li>'+
				'</ul>'+
				'</div>'+
				'</div>';

				var contentString3 = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">'+ pois[2].name +'</h1>'+
				'<div id="bodyContent">'+
				'<ul><li>'+ food[2].name + ' Euro ' + food[2].cost + '<input type="number" name="quantity" min="1" max="5"></li></ul>'+
				'</div>'+
				'</div>';

				var contentString4 = '<div id="content">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h1 id="firstHeading" class="firstHeading">'+ pois[3].name +'</h1>'+
				'<div id="bodyContent">'+
				'<ul><li>'+ food[3].name + ' Euro ' + food[3].cost + ' <input type="number" name="quantity" min="1" max="5" ></li>'+
				'</ul>'+
				'</div>'+
				'</div>';

				var infowindow1 = new google.maps.InfoWindow({
				content: contentString1
				});
				var infowindow2 = new google.maps.InfoWindow({
				content: contentString2
				});
				var infowindow3 = new google.maps.InfoWindow({
				content: contentString3
				});
				var infowindow4 = new google.maps.InfoWindow({
				content: contentString4
				});

				var var_poi_marker1 = new google.maps.Marker({
					 position: var_location1,
					 map: var_map,
					 title: pois[0].name});
				var var_poi_marker2 = new google.maps.Marker({
					position: var_location2,
					map: var_map,
					title: pois[0].name});
				var var_poi_marker3 = new google.maps.Marker({
					position: var_location3,
					map: var_map,
					title: pois[0].name});
				var var_poi_marker4 = new google.maps.Marker({
					position: var_location4,
					map: var_map,
					title: pois[0].name});

				/*var i, var_poi_marker = [];
				for (i = 0; i < pois.length; i ++) {
					var_location1 = new google.maps.LatLng(pois[i].lat,pois[i].lon);
					var_poi_marker.push(new google.maps.Marker({
					 position: var_location1,
					 map: var_map,
					 title: pois[i].name})
					);
				}*/

				var var_map = new google.maps.Map(document.getElementById("map-container"),
					var_mapoptions);
	
				var_marker.setMap(var_map);    
				/*for (i = 0; i < pois.length; i ++) {
					var_poi_marker[i].setMap(var_map);
				}
				*/
				var_poi_marker1.setMap(var_map);
				var_poi_marker2.setMap(var_map);
				var_poi_marker3.setMap(var_map);
				var_poi_marker4.setMap(var_map);

				google.maps.event.addListener(var_poi_marker1, 'click', function() {
					infowindow1.open(var_map,var_poi_marker1);
					infowindow2.close();
					infowindow3.close();
					infowindow4.close();
				  });
				google.maps.event.addListener(var_poi_marker2, 'click', function() {
					infowindow2.open(var_map,var_poi_marker2);
					infowindow1.close();
					infowindow3.close();
					infowindow4.close();
				  });
				google.maps.event.addListener(var_poi_marker3, 'click', function() {
					infowindow3.open(var_map,var_poi_marker3);
					infowindow2.close();
					infowindow1.close();
					infowindow4.close();
				  });
				google.maps.event.addListener(var_poi_marker4, 'click', function() {
					infowindow4.open(var_map,var_poi_marker4);
					infowindow2.close();
					infowindow3.close();
					infowindow1.close();
				  });
				  
				google.maps.event.addListener(infowindow1, 'close', function(){
						$scope.totalResults(-tot);
				});
				google.maps.event.addListener(infowindow2, 'close', function(){
						$scope.totalResults(-tot);
				});
				google.maps.event.addListener(infowindow3, 'close', function(){
						$scope.totalResults(-tot);
				});
				google.maps.event.addListener(infowindow4, 'close', function(){
						$scope.totalResults(-tot);
				});
  
		};
	});
})(angular);
