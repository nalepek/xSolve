'use strict';

app.controller('postsCtrl', ['$scope', '$alert','apiService', function($scope, $alert, apiService){
    
    $scope.data = null;
    apiService.getPosts()
        .then(function onSuccess(response){

            $scope.data = response.data;

            $alert({
                title: 'Success!', 
                content: 'It\'s all right!', 
                placement: 'top', 
                type: 'success', 
                show: true,
                templateUrl: 'partials/alert.html',
                duration: 3
            });
        },
        function onError(response){

            var error = response.status + ': ' + response.statusText;
            $alert({
                title: 'Error!', 
                content: error, 
                placement: 'top', 
                type: 'danger', 
                show: true,
                templateUrl: 'partials/alert.html',
                duration: 3
            });
        });
}]);