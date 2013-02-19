/* Controllers */
var st = sidetap();
function AppCtrl($scope, $http) {
  $http({method: 'GET', url: '/api/name'}).
  success(function(data, status, headers, config) {
    $scope.name = data.name;
  }).
  error(function(data, status, headers, config) {
    $scope.name = 'Error!'
  });
  $scope.menuClick = function() {
    st.toggle_nav();
  };
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function ListCtrl($scope, $http,$location) {
	$scope.clearListName = function() {
		if ($scope.list)
			$scope.list.name = "";
	};
  $scope.ListDetails = function() {
    $location.path('/list/update/');
  }

   $http.get('/api/list').success(function(data, status, headers, config) {
      $scope.lists = data;
    });
}
