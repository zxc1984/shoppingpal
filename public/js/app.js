'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {templateUrl: 'partials/partial1', controller: MyCtrl1});
    $routeProvider.when('/view2', {templateUrl: 'partials/partial2', controller: MyCtrl2});
    $routeProvider.when('/list', {templateUrl: 'partials/lists', controller: ListCtrl});
    $routeProvider.when('/list/create', {templateUrl: 'partials/listCreate', controller: ListCtrl});
    $routeProvider.when('/list/addFriends', {templateUrl: 'partials/listAddFriends', controller: ListCtrl});
    $routeProvider.when('/list/update', {templateUrl: 'partials/listUpdate', controller: ListCtrl});
    $routeProvider.otherwise({redirectTo: '/list'});
    $locationProvider.html5Mode(true);
  }]);