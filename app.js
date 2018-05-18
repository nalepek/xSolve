'use strict';

var app = angular.module('app', ['ngRoute', 'mgcrea.ngStrap']);

app.config(function($routeProvider){
    $routeProvider
        .when('home', {
            templateUrl: 'partials/home.html',
            controller: 'homeCtrl'
        })
        
        .otherwise({
            redirectTo: 'home',
            controller: 'homeCtrl'
        });
});