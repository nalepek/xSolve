'use strict';

app.service('apiService', ['$http', function($http){

    const apiUrl = 'https://jsonplaceholder.typicode.com/';

    var service  = {
        getPosts: getPosts,
        getComments: getComments
    };

    return service;

    function getPosts (){
        return $http({
            method: 'GET',
            url: apiUrl + 'posts'
        })
    };

    function getComments (){
        return $http({
            method: 'GET',
            url: apiUrl + 'comments'
        })
    };
}]);