'use strict';

app.controller('commentsCtrl', ['$scope', 'apiService', '$filter', 'toastr',
 function($scope, apiService, $filter, toastr){

    $scope.data = [];
    $scope.filters = {};

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    $scope.limit = 5;
    $scope.beginLimit = 0;

    $scope.headerElements = [
        {
            id: "id",
            name: 'Id',
            filter: false
        },
        {
            id: "postId",
            name: 'Post Id',
            filter: false
        },
        {
            id: "name",
            name: 'Name',
            filter: true,
            filterQuery: ''
        },
        {
            id: "email",
            name: 'Email',
            filter: true,
            filterQuery: ''
        },
        {
            id: "body",
            name: 'Body',
            filter: true,
            filterQuery: ''
        }
    ];

    function getData() {
        return apiService.getComments()
            .then(function onSuccess(response){

                var data = response.data;
            
                $scope.filteredItems = $filter('filter')(data, $scope.filters);

                $scope.firstPage();
                $scope.groupToPages();

                if ($scope.filteredItems.length == 0){
                    toastr.info('No data!', 'Info');
                }
                else {
                    toastr.success('It\'s all right!', 'Success!');
                }
                if (typeof(Storage) !== 'undefined') {
                    localStorage.setItem('tableCount', $scope.filteredItems.length);
                    toastr.info(localStorage.getItem('tableCount'), 'Local storage - table total count');
                } else {
                    toastr.error('Your browser does not support web storage!', 'Error!');
                }
            },
            function onError(response){

                var error = response.status + ': ' + response.statusText;
                toastr.error(error, 'Error!');
            });
        };

    getData();

    $scope.sort = {
        column: 'id',
        ascending: true
    };

    $scope.headClass = function (column) {
        return column == $scope.sort.column ? column == $scope.sort.column && 'sort-' + $scope.sort.ascending : 'sort';
    };
    
    $scope.changeSort = function (column) {
        if ($scope.sort.column == column) {
            $scope.sort.ascending = !$scope.sort.ascending;
        } else {
            $scope.sort.column = column;
            $scope.sort.ascending = false;
        }
    };

    $scope.filterFn = function (element) {
        if (element.filterQuery !== ''){
            $scope.filters[element.id] = element.filterQuery;
        }
        else {
            if ($scope.filters.hasOwnProperty(element.id)){
                delete $scope.filters[element.id];
            }
        }

        getData();
    };        


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;

            var ind = $scope.beginLimit - 1;
            if ($scope.pagedItems.length - ind != $scope.limit){
                if ($scope.currentPage < Math.floor($scope.pagedItems.length - ($scope.limit * 0.5)) && $scope.beginLimit > 0) {
                    $scope.beginLimit--;
                }
            }
        } 
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;

            var ind = $scope.beginLimit + 1;
            if ($scope.pagedItems.length - ind > $scope.limit){
                if ($scope.currentPage > Math.floor($scope.limit * 0.5)){
                    $scope.beginLimit++;
                }
            }
        }
    };

    $scope.firstPage = function () {
        $scope.currentPage = 0;
        $scope.beginLimit = 0;
    };

    $scope.lastPage = function () {
        $scope.currentPage = $scope.pagedItems.length - 1;
        if ($scope.pagedItems.length >= $scope.limit){
            $scope.beginLimit = $scope.pagedItems.length - $scope.limit;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
        if ($scope.currentPage + Math.ceil($scope.currentPage * 0.5) < $scope.limit) {
            $scope.beginLimit = 0;
        }
        else {
            var ind = $scope.currentPage - Math.floor($scope.limit / 2);
            if ($scope.pagedItems.length - ind != $scope.limit)
                $scope.beginLimit = ind;
        }
    };

    $scope.changeItemsPerPage = function(){
        getData();
    };

}]);