'use strict';

angular.module('myApp.recordsSearch', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'records/search.html',
    controller: 'RecordsSearchCtrl'
  });
}])
.factory('SearchRecordsService', function($resource) {
  return $resource('https://getir-bitaksi-hackathon.herokuapp.com/searchRecords', {}, {
    query:{
        method:'POST'
    }
  });
})
.controller('RecordsSearchCtrl', ['$rootScope', '$scope', 'SearchRecordsService', 'NgTableParams', function($rootScope, $scope, SearchRecordsService, NgTableParams) {
  $rootScope.loading = false;
  $scope.records = []

  $scope.ranges = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 days': [moment().subtract(7, 'days'), moment()],
    'Last 30 days': [moment().subtract(30, 'days'), moment()],
    'This month': [moment().startOf('month'), moment().endOf('month')]
  };

  $scope.filter = {
    dates: {
      startDate: moment('2016-01-26'),
      endDate: moment('2017-02-02')
    },
    minCount: 2700,
    maxCount: 3000
  };

  $scope.tableParams = new NgTableParams({}, { dataset: $scope.records});

  $scope.fetchRecords = function() {
    $rootScope.loading = true;
    var result = SearchRecordsService.query({
      startDate: $scope.filter.dates.startDate.toISOString().slice(0,10),
      endDate: $scope.filter.dates.endDate.toISOString().slice(0,10),
      minCount: $scope.filter.minCount,
      maxCount: $scope.filter.maxCount
    }, function() {
      $rootScope.loading = false;
      if (result.code !== 0 || result.msg !== 'Success') {
        alert('Something went wrong.');
      } else {
        $scope.records = result.records;
        $scope.tableParams = new NgTableParams({}, { dataset: $scope.records});
      }
    });
  }
}]);