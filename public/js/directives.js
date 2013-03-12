'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('diFadeInOut', function () {
		return {
			restrict: 'A',
			link: function (scope, element, attribs) {
				scope.$watch(attribs.diFadeIn, function (value) {
					if (value) {
						element.fadeIn();
					} else {
						element.fadeOut(); // hide immediately; don't fade out
					}
				});
			}
		};
	});