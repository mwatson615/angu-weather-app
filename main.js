//other way of doing app module and config
angular
	.module('weatherApp', ['ngRoute'])
	.config(($routeProvider) => {
		$routeProvider
		.when('/', {
			controller: 'RootCtrl',
			templateUrl: '/partials/root.html'
		})
	})
	.controller('RootCtrl', function() {
		console.log("I'm a root")
	})
