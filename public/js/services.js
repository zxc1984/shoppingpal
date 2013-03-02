'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

angular.module('myApp.services',['ngResource']).factory('List', function($resource) {
		var List = $resource('/api/list/:_id', {
				__id: '@_id',
			}, {
				get:    {method:'GET',isArray:false},
				create: {method:'POST', isArray:false},
				update: {method:'PUT', isArray:false},
				remove: {method:'DELETE',isArray:false}
			}
		);

		//Category.prototype.add = function()
		return List;
	});

