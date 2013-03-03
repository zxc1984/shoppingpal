'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.List',['ngResource']).factory('List',['$resource', '$http', 
		function($resource, $http) {
			return $resource('/api/list/:_id', {
					__id: '@_id',
				}, {
					get:    {method:'GET',isArray:false},
					create: {method:'POST', isArray:false},
					update: {method:'PUT', isArray:false},
					remove: {method:'DELETE',isArray:false}
				});
	}
	]);

