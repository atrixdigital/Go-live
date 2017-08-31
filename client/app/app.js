var app = angular.module('myApp', ['firebase','LocalStorageModule','ngRoute','ngAnimate','ui.bootstrap']);


app.run(function ($rootScope,$location) {

	 $rootScope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
	
})




