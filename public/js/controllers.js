/* Controllers */
var st = sidetap();

function AppCtrl($scope, $http, $location, $cookieStore) {
  
  $scope.unitOfMeasure = [{"singular":"Loaf","plural":"Loaves"},{"singular":"KG","plural":"KG(s)"},{"singular":"Box","plural":"Boxes"}];
  $scope.loading = false;
  $scope.alert = { show: false, msg: "test", className: 'success'};
  $scope.user = {"email" :"vincox@gmail.com", "password" : "123456"};
  $scope.typeahead = ["Select A Category","Groceries","Fresh and Frozen","Beverages","Snacks/Tidbits","Baby","Toiletries","Household Items","Others"];
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
    $scope.loading = true;
    $http.post('/api/users/login', user).success(function(data){
      if(data.result) {
        console.log("result received");
        setCookie("UserId",data._id,$cookieStore);
        setCookie("UserName",data.name,$cookieStore);
        setCookie("User",data, $cookieStore);
        $scope.loading = false;
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

 // $scope.shareType = "individual";
  $scope.classShareType = function(itemShareType,type) {
    if (type == itemShareType)
      return "active btn-primary";
    return "";
  }
  $scope.toggleShareType = function(item,type) {
    if (item.shareType) {
      if (item.shareType == 'individual')
        item.shareType = 'share';
      else
        item.shareType = 'individual';
    } 
    else
      item.shareType = type;
  }

  $scope.backToList = function() {
    removeCookie("ListDetail", $cookieStore);
    removeCookie("allItems", $cookieStore);
    removeCookie("ListItemDetail", $cookieStore);
    removeCookie("listSetting", $cookieStore);
    $location.path("/list");
  }
  $scope.closeAlert = function() {
    $scope.alert.show = false;
  }

  $scope.showAlert = function(msg,type) {
    $scope.alert.msg = "Saved";
    $scope.alert.className = "success";
    $scope.alert.show = true;
    setTimeout(function() { 
      $scope.$apply(function() {
        $scope.alert.show = false;
      });
    }, 3000);
  }
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];

function ListCtrl($scope, $http,$location, $cookieStore, List) {
  //$scope.loading = true;
  //http://localhost:3000/api/unitOfMeasure
  $scope.categories = [{name:'bread',value:'bread'},{name:'drinks',value:'drinks'},{name:'frozen shits',value:'frozen shits'}];

  var userId = getCookie('UserId',$cookieStore);
  if(userId == undefined) {
    $location.path("/login");
  }
  $scope.initList = function() {
    $scope.loading = true;
    $scope.lists = List.query({"_id":userId},function(data) {
      $scope.loading = false;
    });
  }
  $scope.initNewList = function() {
    $scope.listSetting = {name:'',users:[],items:[],numFriends:0,numItems:0,};
    var test = $('.firstBox');
    test[0].focus();
  }
   $scope.initNewListFriends = function() {
    listSetting = getCookie("listSetting", $cookieStore);
    $scope.listSetting = listSetting;
  }

  $scope.initListDetail = function() {
    var chosenList = getCookie("ListDetail", $cookieStore);
    if(chosenList == undefined) {
      $location.path("/list");
    }
    $scope.list_id = chosenList;
    $scope.loading = true;

    $http.get('/api/list/'+chosenList+'/items').success(function(data, status, headers, config) {
      $scope.listName = data[0].name;
      $scope.items = data[0].items;
      $scope.numItems = data[0].numItems;
      if($scope.numItems != $scope.items.length) {
        console.log("not equal" + $scope.numItems + $scope.items.length);
        $scope.numItems = $scope.items.length;
        list_id = getCookie("ListDetail", $cookieStore);
        $http.put("/api/list/"+list_id,{"numItems":$scope.numItems}).success(function(response) {
           if(response.ok == 1) {
            console.log("Successfully Updated");
           }else{
             console.log("Something went wrong");
           }
        });
      } else {
        console.log("equal");
      }
      $scope.loading = false;
    });
  }
  $scope.initListItemDetail = function() {
    var chosenItem = getCookie("ListItemDetail", $cookieStore);
    console.log("chosen" + JSON.stringify(chosenItem));

    if(chosenItem == undefined) {
      $location.path("/list/detail");
    }
   $scope.item = chosenItem.item;
   $scope.index = chosenItem.index;
   if (chosenItem.item.shareType) 
    $scope.item.shareType = chosenItem.item.shareType;
   else
    $scope.item.shareType = "individual";
   console.log($scope.shareType);
  }
  $scope.initListSettings = function() {
    list_id = getCookie("ListDetail", $cookieStore);
    $http.get("/api/list/"+list_id+"/settings/").success(function(response){
      $scope.listSetting = response[0];
      console.log(JSON.stringify($scope.listSetting));
    });

  }
  $scope.clearListName = function() {
    if ($scope.list)
      $scope.list.name = "";
  };
  $scope.ListDetails = function(list_id) {
    setCookie("ListDetail",list_id, $cookieStore);
    $location.path('/list/detail');
  }
  $scope.ListItemDetail = function(item,index) {
    console.log("index" + index);
    setCookie("ListItemDetail",{"item":item,"index":index}, $cookieStore);
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

  $scope.backToListDetail = function() {
    removeCookie("ListItemDetail", $cookieStore);
    $location.path("/list/detail");
  }

  $scope.saveListSetting = function(listSetting) {
    var qw = {"users":listSetting};
    list_id = getCookie("ListDetail", $cookieStore);
    $http.put("/api/list/"+list_id+"/settings/",listSetting).success(function(response) {
       if(response.ok == 1) {
        $scope.showAlert("Saved","success")
        console.log("Successfully Updated");
       }else{
         console.log("Something went wrong");
       }
       
    });

  }

  $scope.newListAddFriends= function(listSetting) {
    $location.path("/list/addFriends");
    setCookie("listSetting",listSetting, $cookieStore);
    //console.log(JSON.stringify($scope.listSetting));
  }

  $scope.createNewList= function(listSetting) {
    var userId = getCookie('UserId',$cookieStore);
    var userName = getCookie('UserName',$cookieStore);
    var user = getCookie('User', $cookieStore);
    console.log("mail" + JSON.stringify(user));
    var own = {"_id":userId,"name":userName,"email":user.email};
    listSetting.users.push(own);
    console.log(listSetting.users.length);
    listSetting.numFriends = listSetting.users.length;
    console.log(JSON.stringify(listSetting));
    $http.post("/api/list/",listSetting).success(function(response) {
      if(response.error) {
        console.log(response.error);
      } else{
        removeCookie("listSetting", $cookieStore);
        $location.path("/list");
      }
    });
  }

  $scope.addFriendToList = function(friendEmail) {
    var qw = {"email" : friendEmail,"name":"Unknown"};
   // $scope.listSetting.users.push(qw);
    console.log(JSON.stringify($scope.listSetting));
    $http.get("/api/users/"+friendEmail+"/email").success(function(data, status, headers, config) {
      console.log(JSON.stringify(data.length));
      if(data.length > 0) {
        $scope.listSetting.users.push(data[0]);
      }else{
        $scope.listSetting.users.push(qw);
      }
      
    });
    $scope.friendemail ="";
  }
  $scope.deleteFriendFromList = function(index) {
    $scope.listSetting.users.splice(index,1);
    console.log(JSON.stringify($scope.listSetting));
  }
  $scope.saveListItemDetail= function(item,index,shareType) {
    var qw = {};
    item.shareType = $scope.item.shareType;
    var name = 'items.'+ index;
    qw[name] = item;
    list_id = getCookie("ListDetail", $cookieStore);
    console.log(item);
    $http.put("/api/list/"+list_id+"/items/",qw).success(function(response) {
       if(response.ok == 1) {
        $scope.showAlert('Saved','success');
        console.log("Successfully Updated");
       }else{
        $scope.showAlert('Error!','error');
         console.log("Something went wrong");
       }
    });
  }

  $scope.deleteListItem= function(item,index) {
    var qw = {};
    var name = 'items.'+ index;
    qw[name] = 1;
    list_id = getCookie("ListDetail", $cookieStore);
    console.log(qw);
    $http.delete("/api/list/"+list_id+"/items/"+index).success(function(response) {
       if(response.ok == 1) {
        console.log("Successfully Deleted");
        removeCookie("ListItemDetail", $cookieStore);
        $location.path("/list/detail");
       }else{
         console.log("Something went wrong");
       }
    });
  }

  $scope.SelectShoppingLists = function() {
    $location.path("/shopping/");
  }

  $scope.StartShopping = function(list_id) {
    console.log(list_id)
    var selected = [list_id];
    $http.post("/api/Shopinglist/", selected).success(function(data, status, headers, config) {
      setCookie("allItems",data, $cookieStore);
      $location.path("/shopping/on");
     });
    //$location.path("/shopping/on");
  }

  $scope.getSharedStatus = function(status) {
    if (status) {
      if (status == "individual") 
        return "icon-user";
      else
        return "icon-group";
    }
    return "icon-user";
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

  $scope.delete = function(listSetting) {
    //console.log(list.name);
    List.remove({_id:listSetting._id},function(response){
    });
   $scope.lists = List.query();
   $location.path("/list");
  }
}
ListCtrl.$inject = ['$scope', '$http', '$location', '$cookieStore', 'List'];
function ItemCtrl($scope, $http,$location, $cookieStore) {
  $scope.selectedItems = [];
  $scope.isSelected = function(item) {
    if (item.selected == 1)
        return "icon-check";
    return "icon-check-empty";
  }
  $scope.ItemDetails = function() {
    $location.path('/list/1/additem/1');
  }
  $scope.ToggleSelect = function(item) {
    if (item.selected) {
      if (item.selected == 0) {
        $scope.selectedItems.push(item);
        item.selected = 1;
      } else {
        for (var i = 0; i < $scope.selectedItems.length; i++) {
          if ($scope.selectedItems[i]._id == item._id) {
            $scope.selectedItems.splice(i, 1);
            return;
          }
        } 
        item.selected = 0;
      }
    } else{
      item.selected = 1;
      $scope.selectedItems.push(item);
    }
      
  }

  $scope.getUnitOfMeasure = function(uom) {
    uom = parseInt(uom);
    return $scope.unitOfMeasure[uom].singular;
  } 

  $scope.initAddItem = function() {
    $http.get("/api/items/grouped").success(function(data, status, headers, config) {
      console.log(JSON.stringify(data));
      $scope.categories = Object.keys(data);
      console.log($scope.categories);
      $scope.items = data;
    });
  }

  $scope.initCreateNewItem = function() {
    $scope.item = {category:"Select A Category",unitOfMeasure:-1,name:'',price:''};
  }

  $scope.createNewItem = function(item) {
    console.log("JSON" + JSON.stringify(item));
    $http.post("/api/items/",item).success(function(response) {

    });
  }

  $scope.addItemToList = function() {
    list_id = getCookie("ListDetail", $cookieStore);
    console.log(list_id);
    console.log(JSON.stringify($scope.selectedItems));
    $http.post("/api/list/"+list_id+"/items", $scope.selectedItems).success(function(response){
      if(response.ok) {
        $scope.showAlert("Items Added Succesfully");
      }
    });
    
  }
}

function ExpenseCtrl($scope, $http, $location,$routeParams, $cookieStore) {

  var todayDate = new Date();
  var todayMonth = todayDate.getMonth() + 1;
  var todayDay = todayDate.getDate();
  var todayYear = todayDate.getFullYear();
  $scope.today = todayDay + '/' + todayMonth + '/' + todayYear;

  $scope.ExpenseDetail = function() {
    $location.path('/expense/details/1');
  }

  $scope.linkToTransHistory = function(id) {
    $location.path("/payment/transaction/" + id);
  }

  $scope.getTransactionDetails = function(){   
    var id = $routeParams.id;
    $http.get('/api/userExpense/' + id).success(function(data, status, headers, config) {
      $scope.transactionDetails = data;
      $scope.transPayer = data[0].payer.name;
      $scope.transPayee = data[0].payee.name;
      $scope.transDate = data[0].date;
      $scope.transItems = data[0].items;
      //console.log($scope.transItems);
      $scope.transItemsTotalAmount = data.total;
    });
  }

  $http.get('/api/userExpense').success(function(data, status, headers, config) {
    var userId = getCookie('UserId',$cookieStore);
    $scope.transactions = data;
    //console.log($scope.transactions[0].payer.userId);
        for (var i = 0; i < $scope.transactions.length; i++) {
          if ($scope.transactions[i].payer.userId != userId && $scope.transactions[i].payee.userId != userId){
            $scope.transactions.splice(i,1);
            i--;
          }
      }
       $scope.transactions.reverse();
  });
 
  /*  
  $http.get('/api/userExpense').success(function(data, status, headers, config) {
    $scope.userExpense = data;
    $scope.userExpenseItems = data[0].items;
  });
  */
  $http.get('/api/shoppingTrips').success(function(data, status, headers, config) {
    $scope.trips = data;
  });
    
  $http.get('/api/iOwe').success(function(data, status, headers, config) {
    //var selectedIOwe = getCookie("selectedIOwe", $cookieStore);

    $scope.iOweLists = data;

    //$scope.iOweListsId = data[selectedIOwe.index]._id;
    $scope.iOweListTotalAmount = 0;
    

    for (var i = 0; i < data.length; i++) {
      $scope.iOweLists[i].payee.amount = 0;
          for (var j = 0; j < data[i].items.length; j++){
            if (data[i].items[j].status == "unpaid"){
              $scope.iOweLists[i].payee.amount += data[i].items[j].price;
              //$scope.iOweListTotalAmount += data[i].items[j].price;
            }
          }
      }

      if (data.length > 0){
        for (var i = 0; i < data.length; i++) {
        //console.log(data);
        //console.log(data[i].items[0].name);
          if (data[i].items.length > 0){
            for (var j = 0; j < data[i].items.length; j++){
              //console.log("items " + data[i].items);
              if (data[i].items[j].status == "paid"){
                console.log("paid : " + data[i].items[j].name);
                data.splice(i,1);
                i--;
                break;
              }else{
                //console.log("unpaid : " + data[i].items[j].name);
                //$scope.iOweLists[i].payee.amount += data[i].items[j].price;
                $scope.iOweListTotalAmount += data[i].items[j].price;
              }
            }
          } 
        }
      }
      

  });

  $scope.linkToiOweDetails = function(list_id) {
    setCookie("iOwe_id",list_id, $cookieStore);
    $location.path("/payment/" + id);
  }

  $scope.getiOweDetails = function(){  
      var selectedIOwe = getCookie('selectedIOwe',$cookieStore);
      var id = selectedIOwe.id;
      $http.get('/api/iOwe/' + id).success(function(data, status, headers, config) {
      $scope.iOweItems = data[0].items;
      for (var i = 0; i < data[0].items.length; i++) {
          if ($scope.iOweItems[i].status == "paid"){
            $scope.iOweItems.splice(i,1);
            i--;
          }
      }

      $scope.iOweTotalAmount = 0;
        for (var i = 0; i < $scope.iOweItems.length; i++) {
            $scope.iOweTotalAmount += $scope.iOweItems[i].price;
        }

      $scope.iOweName = data[0].payee.name;
      $scope.iOwePeriod = data[0].period;
    });
  }

  $scope.selectedIOwe = function(id,item,index,amount,friendId) {
    setCookie("selectedIOwe",{"id":id,"item":item,"index":index}, $cookieStore);
    $scope.iOweListsId = id;
    setCookie("iOweFriendId",friendId, $cookieStore);
    //console.log("iOweListsId " + id);

    if (amount > 0){
      $location.path("/payment/" + id);
    }
    
  }

  $scope.confirmPayment = function() {
    var selectedIOwe = getCookie('selectedIOwe',$cookieStore);
    //console.log("CONFIRM: " + selectedIOwe.id);
    $location.path("/payment/confirmation/");
  }

  $scope.finalPaymentDetails = function(){
    var payment = getCookie("finalPayment", $cookieStore);
    $scope.finalPayee = payment.payee;
    $scope.finalAmount = payment.amount;
  }

  $scope.payNow = function(iOweItems){   

    var friendsOweItems = iOweItems;

    var selectedIOwe = getCookie('selectedIOwe',$cookieStore);
    var payer = "";
    var payee = "";
    var total = 0;
    var qw = {};
    var qw2 = {};
    var name = 'items';
    
    var qwFriendsOwe = {};
    var friendsOwePayee = ""
    var friendsOwePayer = ""

    for (var i = 0; i < iOweItems.length; i++) {
          payee = iOweItems[i].buyer; 
          payer = iOweItems[i].boughtFor;
          iOweItems[i].status = "paid";

          friendsOwePayer = iOweItems[i].buyer;
          friendsOwePayee = iOweItems[i].boughtFor;
          friendsOweItems[i].status = "paid";

          total += iOweItems[i].price;
     }

    

     $scope.iOwePayer = payer;
     $scope.iOwePayee = payee;

     setCookie("finalPayment",{"payee":payee,"amount":total}, $cookieStore);

    qw[name] = iOweItems;
    iOwe_id = $routeParams.id;

    qw2[name] = friendsOweItems;
    //console.log("iOweItems " + JSON.stringify(iOweItems));

    var userId = getCookie('UserId',$cookieStore);
    var todayDate = new Date();
    var todayMonth = todayDate.getMonth() + 1;
    var todayDay = todayDate.getDate();
    var todayYear = todayDate.getFullYear();
    var today = todayDay + '/' + todayMonth + '/' + todayYear;

    var newTransaction = {
      date:today,
      total:total,
      payer:{userId:userId,name:payer},
      payee:{userId:"5123925be4b029c335f08546",name:payee},
      items:iOweItems
    };

    var fOweLists = [];

    $http.put("/api/iOwe/"+iOwe_id,qw).success(function(response) {

        if(response.ok == 1) {
        console.log("Successfully Updated");
      
       }else{
         console.log("Something went wrong");
       }
    });  

    $http.put("/api/friendsOwe",qw2).success(function(response) {

            if(response.ok == 1) {
            console.log("Successfully Updated1");
          
           }else{
             console.log("Something went wrong1");
           }
    });

    $http.post("/api/userExpense/",newTransaction).success(function(response) {
      if(response.error) {
        console.log(response.error);
      }else{
        $location.path("/payment/" + iOwe_id + "/final");
      }
    });
    
  }

  $http.get('/api/friendsOwe').success(function(data, status, headers, config) {
    $scope.friendsOweLists = data;
    $scope.friendsOweListTotalAmount = 0;
    //setCookie("friendsOweLists",friendsOweLists, $cookieStore);
    for (var i = 0; i < data.length; i++) {
      console.log("RR" + data[i]._id);
      //console.log(data[i].items[0].name);
          for (var j = 0; j < data[i].items.length; j++){
            //console.log("items " + data[i].items);
            if (data[i].items[j].status == "paid"){
              console.log("paid : " + data[i].items[j].name); 
              $scope.friendsOweLists.splice(i,1);
              j--;
              i--;
              break;
            }else{

              console.log("unpaid : " + data[i].items[j].name);
              $scope.friendsOweListTotalAmount += data[i].items[j].price;
            }
          }
      }
  });

  $scope.linkToFriendsOweDetails = function(id) {
    $location.path("/payment/details/" + id);
  }

  $scope.getFriendsOweDetails = function(){
      var id = $routeParams.id;
      $http.get('/api/friendsOwe/' + id).success(function(data, status, headers, config) {
      $scope.friendsOweItems = data[0].items;
      $scope.friendsOweName = data[0].payer.name;
      $scope.friendsOweImageUrl = data[0].payer.url;
      $scope.friendsOweTotalAmount = 0;

      //console.log($scope.friendsOweItems);
      for (var i = 0; i < data[0].items.length; i++) {
          if ($scope.friendsOweItems[i].status == "paid"){
            $scope.friendsOweItems.splice(i,1);
            i--;
          }else{
            $scope.friendsOweTotalAmount += $scope.friendsOweItems[i].price;
          }
      }

    });
  } 
    
}

function ShoppingCtrl($scope, $http,$location,$cookieStore,List) {
  var userId = getCookie('UserId',$cookieStore);
  $scope.lists = [];
  $scope.selectedLists = [];
  $scope.selectedItems = [];
  $scope.items = [];
  if(userId == undefined) {
    $location.path("/login");
  }
  $scope.initList = function() {
    $scope.loading = true;
    $scope.lists = List.query({"_id":userId});
  }
  $scope.initListDetail = function() {
    //$scope.items = [{"id":"51239233e4b029c335f08541","name":"Gardenia White Bread","qty":1,"unitOfMeasure":0},{"_id":"5123925be4b029c335f08545","name":"Spin Washing Machine Powder","qty":5,"unitOfMeasure":1}];
    var allItems = getCookie("allItems", $cookieStore);
    var items = [];
    var test = {};
    for(var i = 0; i < allItems.length; i++) {
      for(var j = 0; j < allItems[i].items.length; j++) {
        //console.log(JSON.stringify(allItems[i].items));
        if(test[allItems[i].items[j]._id] == undefined) {
          test[allItems[i].items[j]._id] = {"price":0,"total":0,"qty":0,"_id":allItems[i].items[j]._id,"name":allItems[i].items[j].name,'unitOfMeasure':allItems[i].items[j].unitOfMeasure};
        }
        test[allItems[i].items[j]._id].qty = test[allItems[i].items[j]._id].qty + allItems[i].items[j].qty;
        if(test[allItems[i].items[j]._id].price < allItems[i].items[j].price) {
           test[allItems[i].items[j]._id].price = allItems[i].items[j].price;
        }
       
      }
    }
    for(var obj in test){
      items.push(test[obj]);
    }
    $scope.items = items;
  }
  $scope.listIsSelected = function(id) {
    for (var i = 0; i < $scope.selectedLists.length; i++) {
      if ($scope.selectedLists[i] == id) {
        return "icon-check";
      } 
    }
    return "icon-check-empty";
  }
  $scope.toggleSelectList = function(id) {

    for (var i = 0; i < $scope.selectedLists.length; i++) {
      if ($scope.selectedLists[i] == id) {
        $scope.selectedLists.splice(i, 1);
        return;
      }
    }
    $scope.selectedLists.push(id);
  }
  $scope.changeQuantityTest = function(item) {
    item.qty += 1;
  }
  $scope.itemIsSelected = function(item) {
    return item.selected
  }
  $scope.toggleSelectItem = function(item) {
   // console.log("item" + item);
    if (item.selected) {
      if (item.selected == 0) {
        item.selected = 1;
        $scope.selectedItems.push(item);
      }else{
        item.selected = 0;
        for (var i = 0; i < $scope.selectedItems.length; i++) {
          if ($scope.selectedItems[i]._id == item._id) {
            $scope.selectedItems.splice(i, 1);
            return;
          }
        } 
      }     
    } else {
      item.selected = 1;
      $scope.selectedItems.push(item);
    }
  }

  $scope.proceedToCheckout = function() {
   // console.log(JSON.stringify(items));
    console.log("Selected Items" + JSON.stringify($scope.selectedItems));
    setCookie("selectedItems",$scope.selectedItems, $cookieStore);
    $location.path("/shopping/checkout");
  }


  $scope.initShoppingCheckout = function() {

    $scope.items = getCookie("selectedItems", $cookieStore);
    $scope.total = 0;
    angular.forEach($scope.items,function(item){
      item.total = item.qty * item.price
    });
    console.log("checkoutitems " + JSON.stringify($scope.items));
  }

  $scope.checkoutNow = function(selectedItems){
    var userId = getCookie('UserId',$cookieStore);
    var userName = getCookie('UserName',$cookieStore);
    var checkoutItems = selectedItems;

    var todayDate = new Date();
    var todayMonth = todayDate.getMonth() + 1;
    var todayDay = todayDate.getDate();
    var todayYear = todayDate.getFullYear();
    var today = todayDay + '/' + todayMonth + '/' + todayYear;

     var myItems = [];
     var totalAmount = 0;
     for(var i=0;i<checkoutItems.length;i++)
      {
          var temp={};
          temp["name"]=checkoutItems[i].name;
          temp["buyer"]=userName;
          temp["boughtFor"]="Tom";
          temp["price"]=checkoutItems[i].price * checkoutItems[i].qty;
          
          temp["qty"]=checkoutItems[i].qty;
          temp["period"]=today;
          temp["paidDate"]='';
          temp["status"]="unpaid";
          totalAmount += checkoutItems[i].price * checkoutItems[i].qty;
         myItems.push(temp);

      }
     
     var newTrip = {
      userId: userId,
      name: userName,
      Location: "NTUC in Chinatown",
      amount: totalAmount,
      date:today
    };
       
     $http.post("/api/shoppingTrips/",newTrip).success(function(response) {
       if(response.error) {
         console.log(response.error);
       }
     });

     var friendsOwe = {
      userId: userId,
      payer:{
        userId:"51322a9a6ebde1f40b000001",
        name:"Tom",
        period:today,
        amount:totalAmount,
        url:"http://static.tumblr.com/d4075dae7f5b2e80449ef00d2cbff5de/zghl0gv/Mifmhvhaj/tumblr_static_snn0116tom---_1646312a_1_.jpg"
      },
      items:myItems
    };

    var iOwe = {
      userId: "51322a9a6ebde1f40b000001",
      payee:{
        userId:userId,
        name:userName,
        period:today,
        amount:totalAmount
      },
      items:myItems
    };

  $http.post("/api/iOwe/",iOwe).success(function(response) {
       if(response.error) {
         console.log(response.error);
       }
  });  
  
  $http.post("/api/friendsOwe/",friendsOwe).success(function(response) {
       if(response.error) {
         console.log(response.error);
       }else{
        $location.path("/list");
       }

  });
  
}
  $scope.getSelectedItemClass = function(item) {
    if (item.selected && item.selected == 1) {
      return "selected";
    }
    return "";
  }

  $scope.ItemDetails = function() {
    $location.path('/shopping/itemdetail/1');
  }

  $http.get('/api/shoppingTrips').success(function(data, status, headers, config) {
    var userId = getCookie('UserId',$cookieStore);
    $scope.trips = data;

    $scope.myTrips = function(item) {
        return item.userId == userId;
    }

    $scope.friendsTrips = function(item) {
        return item.userId != userId;
    }

  });

  $scope.shoppingMode = function() {
     console.log($scope.selectedLists);
     $http.post("/api/Shopinglist/",$scope.selectedLists).success(function(data, status, headers, config) {
      setCookie("allItems",data, $cookieStore);
      $location.path("/shopping/on");
     });
  }

  $scope.getTotal = function() {
    var total = 0;
     for(var i =0;i < $scope.items.length; i++) {
        total = ($scope.items[i].qty * $scope.items[i].price) + total;
     }
     return total;
  }

  $scope.backToShopping= function() {
    $location.path("/shopping/on")
  }

  $scope.adjust = function(item) {
    item.price = item.total / item.qty;
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

function getTodayDate(){
  
}