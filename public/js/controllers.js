/* Controllers */
var st = sidetap();
var userId = "123";
function AppCtrl($scope, $http, $location) {
  $scope.loading = false;
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
  $scope.register = function(user) {
    $scope.loading = true;
    console.log(user.email + user.name + user.password);
    $http.post('/api/users/register', user).success(function(data){
      console.log(data._id);
    });
    //$location.path('/list/');
  };
  $scope.login = function(user) {
    console.log(user.email + user.name + user.password);
    $http.post('/api/users/login', user).success(function(data){
      if(data.result) {
        console.log("logged in" + data._id);
        userId = data._id;
        $location.path("/list");
      } else {
        console.log("no such user");
      }
    });
  };
  $scope.textCountLeft = function(length,limit) {
    return parseInt(limit) - parseInt(length);
  }
  $scope.clearText = function(expr) {
    if (expr)
      expr = "";
  };
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function ListCtrl(List,$scope, $http,$location) {
  //$scope.loading = true;
  $scope.friends = [{email:'Kevin@shoppalapp.com',status:'pending'},{email:'vincox@shoppalapp.com',status:'pending'},{email:'Jagdish@shoppalapp.com',status:'accepted'}];
  $scope.typeahead = ["Groceries","Fresh and Frozen","Beverages","Snacks/Tidbits","Baby","Toiletries","Household Items","Others"]
  $scope.initList = function() {
    console.log(userId);
    $scope.lists = List.query();
    $scope.loading = true;
    /*
    List.get({_id:userId},function(response){
      $scope.lists = response;
    });
*/
  }
  $scope.initNewList = function() {
    $scope.newlist = {name:''};
    var test = $('.firstBox');
    test[0].focus();
  }

  $scope.initListDetail = function() {
    $scope.loading = true;
    $http.get('/api/items').success(function(data, status, headers, config) {
      $scope.items = data;
      $scope.loading = false;
    });
  }
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
  $scope.noList=function() {
    if ($scope.lists)
      return ($scope.lists.length == 0) && ($scope.loading == false);
    return false;
  }
  $scope.getStatusClass = function(status) {
    if (status == "accepted")
    {
      return "label-success";
    }
  }

   /*
  $scope.create = function($event) {
    Item.create({object:c});   
  }
  
  $scope.update = function($event,category) {
    var $choices = $($event.target).closest('.modal').find('.chzn-choices li');
    category.products = [];
    $.each ($choices, function(index,value) {
      if (value.className != "search-field") {
        category.products.push($scope.products[parseInt(value.childNodes[1].rel) - 1]);
      }
    });
    var self = this;
    Category.update({id:category.id,object:category},function(response){
      self.closeModal($event);
      //self.refresh('category updated');
      showLoader('category updated','whitesmoke','#222',2);
    });
  }

  */

  $scope.delete = function($event,list) {
    //console.log(list.name);
    List.remove({_id:list._id},function(response){
    });
   $scope.lists = List.query();
  }
}

ListCtrl.$inject = ['List','$scope','$http','$location'];

function ItemCtrl($scope, $http,$location) {
  $scope.ItemDetails = function() {
    $location.path('/list/1/additem/1');
  }
}
function ExpenseCtrl($scope, $http, $location) {
  $scope.ExpenseDetail = function() {
    $location.path('/expense/details/1');
  }
   $http.get('/api/userExpense').success(function(data, status, headers, config) {
    $scope.userExpense = data;
  });
    $http.get('/api/shoppingTrips').success(function(data, status, headers, config) {
    $scope.trips = data;
  });
   
}

function ShoppingCtrl($scope, $http,$location) {
  $http.get('/api/items').success(function(data, status, headers, config) {
    $scope.items = data;
  });
  $scope.ItemDetails = function() {
    $location.path('/shopping/itemdetail/1');
  }
}

function PaymentCtrl($scope, $http, $location) {
  
}
