//other way of doing app module and config
angular
	.module('weatherApp', ['ngRoute'])
	.config(($routeProvider) => {
		$routeProvider
		.when('/', {
			controller: 'RootCtrl',
			templateUrl: '/partials/root.html',
		})
		.when('/weather/:zipcode', {
			controller: 'WeatherCtrl',
			templateUrl: '/partials/weather.html',
		})
	})
	.controller('RootCtrl', function($scope, $location) {
		$scope.getWeather = () => $location.url(`/weather/${$scope.zip}`)
			//change the url
			// location.href = `/#!/weather/${$scope.zip}` //is vanilla js window object for location
	})
	.controller('WeatherCtrl', function($http, $scope, $routeParams, weatherFactory) {
		// getWeather();
	// })

	weatherFactory
	.getWeather($routeParams.zipcode)
	.then((weather) => {
		$scope.temperature = weather.temp
		$scope.city = weather.city
	})
})
.factory('weatherFactory', ($http) => {
		return {
			getWeather (zipcode) {
				return $http
				.get(`http://api.wunderground.com/api/c64509a2bf94e375/conditions/q/${zipcode}.json`)
				.then((response) => ({
					temp: response.data.current_observation.temp_f,
					city: response.data.current_observation.display_location.full,
				})
			)
			},
		}
	})
