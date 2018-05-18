'use strict';

var app = angular.module('app', ['ngAnimate', 'ngRoute', 'mgcrea.ngStrap', 'smart-table']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.hashPrefix('');

    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        .when('/posts', {
            templateUrl: 'partials/content/posts.html',
            controller: 'postsCtrl'
        })
        
        .otherwise({
            redirectTo: 'home',
            controller: 'homeCtrl'
        });
}]);