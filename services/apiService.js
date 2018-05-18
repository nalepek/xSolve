'use strict';

app.service('apiService', ['$http', function($http){

    const apiUrl = 'https://jsonplaceholder.typicode.com/';

    var service  = {
        getPosts: getPosts
    };

    return service;

    function getPosts (){
        return $http({
            method: 'GET',
            url: apiUrl + 'posts'
        })
    };
}]);