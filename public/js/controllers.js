/* Controllers */
var st = sidetap();
function AppCtrl($scope, $http, $location) {
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
  $scope.loadRegisterPage = function() {
    $location.path('/register');
  };
  $scope.loadLoginPage = function() {
    $location.path('/login');
  };
  $scope.register = function() {
    $location.path('/list/');
  };
  $scope.login = function() {
    $location.path('/list/');
  };

}

function UtilCtrl() {
  $scope.clearListName = function() {
    if ($scope.list)
      $scope.list.name = "";
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
    $location.path('/list/1');
  }
  $scope.ListItemDetail = function() {
    $location.path('/list/1/itemdetail/1');
  }
}
function ItemCtrl($scope, $http,$location) {
  $scope.ItemDetails = function() {
    $location.path('/list/1/additem/1');
  }
}
function ExpenseCtrl($scope, $http, $location) {
  $scope.ExpenseDetail = function() {
    $location.path('/expense/details/1');
  }
}
