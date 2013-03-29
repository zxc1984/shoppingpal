'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.cookie','myApp.List','myApp.filters', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/m_welcome', controller: MyCtrl1});
    $routeProvider.when('/login', {templateUrl: 'partials/m_login', controller: MyCtrl2});
    $routeProvider.when('/register', {templateUrl: 'partials/m_register', controller: MyCtrl2});
    $routeProvider.when('/forget-password', {templateUrl: 'partials/m_forgetPassword', controller: MyCtrl2});
    
    // List Scenario
    $routeProvider.when('/list', {templateUrl: 'partials/lists', controller: ListCtrl});
    $routeProvider.when('/list/create', {templateUrl: 'partials/listCreate', controller: ListCtrl});
    $routeProvider.when('/list/addFriends', {templateUrl: 'partials/listAddFriends', controller: ListCtrl});
    $routeProvider.when('/list/detail', {templateUrl: 'partials/listDetails', controller: ListCtrl});
    $routeProvider.when('/list/detail/itemdetail/', {templateUrl: 'partials/listItemDetail', controller: ListCtrl});
    $routeProvider.when('/list/settings', {templateUrl: 'partials/listSetting', controller: ListCtrl});
    
    // Add Items Scenario
    $routeProvider.when('/list/additem/', {templateUrl: 'partials/items', controller: ItemCtrl});
    $routeProvider.when('/list/additem/create', {templateUrl: 'partials/itemCreate', controller: ItemCtrl});
    
    // Shopping Scenario
    $routeProvider.when('/shopping', {templateUrl: 'partials/shoppingChooseList', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/on', {templateUrl: 'partials/startShopping', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/checkout', {templateUrl: 'partials/shoppingCheckout', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/itemdetail/1', {templateUrl: 'partials/shoppingItemDetail', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/trips', {templateUrl: 'partials/shoppingTripHistory', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/my', {templateUrl: 'partials/shoppingTripMyHistory', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/friends', {templateUrl: 'partials/shoppingTripFriendHistory', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/trips/:id', {templateUrl: 'partials/shoppingHistoryDetail', controller: ShoppingCtrl});

    // Expenditure Scenario
    $routeProvider.when('/expense', {templateUrl: 'partials/expenseSummary', controller: ExpenseCtrl});
    $routeProvider.when('/expense/friends', {templateUrl: 'partials/expenseFriends', controller: ExpenseCtrl});
    $routeProvider.when('/expense/details/1', {templateUrl: 'partials/expenseDetails', controller: ExpenseCtrl});

    // payment scenario
    $routeProvider.when('/payment/', {templateUrl: 'partials/paymentSummary', controller: PaymentCtrl});
    $routeProvider.when('/payment/:id', {templateUrl: 'partials/paymentCreate', controller: ExpenseCtrl});
    $routeProvider.when('/payment/confirmation/', {templateUrl: 'partials/paymentConfirmation', controller: ExpenseCtrl});
    $routeProvider.when('/payment/details/:id', {templateUrl: 'partials/paymentDetails', controller: ExpenseCtrl});
    $routeProvider.when('/payment/:id/final', {templateUrl: 'partials/paymentFinal', controller: ExpenseCtrl});
    $routeProvider.when('/payment/transaction/:id', {templateUrl: 'partials/transactionHistory', controller: ExpenseCtrl});

    // Default
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);