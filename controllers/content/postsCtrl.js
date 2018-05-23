'use strict';

app.controller('postsCtrl', ['$scope', 'apiService', 'NgTableParams', '$filter', 'toastr',
 function($scope, apiService, NgTableParams, $filter, toastr){

    $scope.tableParams = new NgTableParams({
        count: 10
    }, {
        getData: function(params) {
          return apiService.getPosts()
            .then(function onSuccess(response){

                var filteredData = params.filter()  ?
                            $filter('filter')(response.data, params.filter()) :
                            response.data;

                if (filteredData.length == 0){
                    toastr.info('No data!', 'Info');   
                }
                else {
                    toastr.success('It\'s all right!', 'Success!');   
                }
                var orderedData = params.sorting() ?
                    $filter('orderBy')(filteredData, params.orderBy()) : response.data;
                var page = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(filteredData.length);

                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('tableCount', filteredData.length);
                    toastr.info(localStorage.getItem('tableCount'), 'Local storage - table total count');
                } else {
                    toastr.error('Your browser does not support web storage!', 'Error!');
                }
                return page;
            },
            function onError(response){

                var error = response.status + ': ' + response.statusText;
                toastr.error(error, 'Error!');
            });
        }
      });
}]);