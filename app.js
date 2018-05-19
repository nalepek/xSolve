'use strict';

var app = angular.module('app', ['ngAnimate', 'ngRoute', 'mgcrea.ngStrap', 'ngTable', 'toastr']);

app.config(['$routeProvider', '$locationProvider', 'toastrConfig', function($routeProvider, $locationProvider, toastrConfig){

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
        

        angular.extend(toastrConfig, {
            //toast container
            autoDismiss: true,
            containerId: 'toast-container',
            maxOpened: 2,    
            newestOnTop: true,
            positionClass: 'toast-top-right',
            preventDuplicates: false,
            preventOpenDuplicates: false,
            target: 'body',

            //toastr layout
            closeButton: true,
            timeOut: 1000,
          });
}]);