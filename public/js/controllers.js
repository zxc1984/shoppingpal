/* Controllers */
var st = sidetap();

function AppCtrl($scope, $http, $location, $cookieStore) {
  
  $scope.loading = false;
  $scope.user = {"email" :"vincox@gmail.com", "password" : "123456"};
   $scope.logout = function() {
    removeCookie("UserId",$cookieStore);
    $location.path("/");
  };
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
    $http.post('/api/users/register', user).success(function(data){
      $location.path("/login");
    });
    //$location.path('/list/');
  };
  $scope.login = function(user) {
    $http.post('/api/users/login', user).success(function(data){
      if(data.result) {
        setCookie("UserId",data._id,$cookieStore);
        $location.path("/list");
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

function ListCtrl($scope, $http,$location, $cookieStore, List) {
  //$scope.loading = true;
  //http://localhost:3000/api/unitOfMeasure
  $scope.unitOfMeasure = [{"singular":"loaf","plural":"loaves"},{"singular":"KG","plural":"KGs"}];
  var userId = getCookie('UserId',$cookieStore);
  if(userId == undefined) {
    $location.path("/login");
  }

  $scope.friends = [{email:'Kevin@shoppalapp.com',status:'pending'},{email:'vincox@shoppalapp.com',status:'pending'},{email:'Jagdish@shoppalapp.com',status:'accepted'}];
  $scope.typeahead = ["Groceries","Fresh and Frozen","Beverages","Snacks/Tidbits","Baby","Toiletries","Household Items","Others"]
  $scope.initList = function() {
    $scope.loading = true;
    $scope.lists = List.query({"_id":userId});
  }
  $scope.initNewList = function() {
    $scope.newlist = {name:''};
    var test = $('.firstBox');
    test[0].focus();
  }

  $scope.initListDetail = function() {
    var chosenList = getCookie("ListDetail", $cookieStore);
    if(chosenList == undefined) {
      $location.path("/list");
    }
    $scope.loading = true;

    $http.get('/api/list/'+chosenList+'/items').success(function(data, status, headers, config) {
      $scope.listName = data[0].name;
      $scope.items = data[0].items;
      $scope.loading = false;
    });
  }
  $scope.initListItemDetail = function() {
    var chosenItem = getCookie("ListItemDetail", $cookieStore);
    console.log("chosen" + chosenItem);

    if(chosenItem == undefined) {
      $location.path("/list/detail");
    }
   $scope.item = chosenItem;
  }
  $scope.clearListName = function() {
    if ($scope.list)
      $scope.list.name = "";
  };
  $scope.ListDetails = function(list_id) {
    setCookie("ListDetail",list_id, $cookieStore);
    $location.path('/list/detail');
  }
  $scope.ListItemDetail = function(item) {
    setCookie("ListItemDetail",item, $cookieStore);
    $location.path('/list/detail/itemdetail/');
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

  $scope.backToList = function() {
    removeCookie("ListDetail", $cookieStore);
    $location.path("/list");
  }
  $scope.backToListDetail = function() {
    removeCookie("ListItemDetail", $cookieStore);
    $location.path("/list/detail");
  }

  $scope.saveListItemDetail= function(item) {
    console.log("Saved item" + JSON.stringify(item));
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
ListCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'List'];
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
angular.module('myApp.cookie', ['ngCookies']);
function getCookie(cookie_name, $cookieStore) {
   var cookieValue = $cookieStore.get(cookie_name);
   return cookieValue;
}

function setCookie(cookie_name, value, $cookieStore) {
  $cookieStore.put(cookie_name, value);
}

function removeCookie(cookie_name,$cookieStore) {
  $cookieStore.remove(cookie_name);
}