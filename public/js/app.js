'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/m_welcome', controller: MyCtrl1});
    $routeProvider.when('/login', {templateUrl: 'partials/m_login', controller: MyCtrl2});
    $routeProvider.when('/register', {templateUrl: 'partials/m_register', controller: MyCtrl2});
    $routeProvider.when('/forget-password', {templateUrl: 'partials/m_forgetPassword', controller: MyCtrl2});
    
    // List Scenario
    $routeProvider.when('/list', {templateUrl: 'partials/lists', controller: ListCtrl});
    $routeProvider.when('/list/create', {templateUrl: 'partials/listCreate', controller: ListCtrl});
    $routeProvider.when('/list/addFriends', {templateUrl: 'partials/listAddFriends', controller: ListCtrl});
    $routeProvider.when('/list/1', {templateUrl: 'partials/listDetails', controller: ListCtrl});
    $routeProvider.when('/list/1/itemdetail/1', {templateUrl: 'partials/listItemDetail', controller: ListCtrl});
    $routeProvider.when('/list/1/option', {templateUrl: 'partials/listSetting', controller: ListCtrl});
    
    // Add Items Scenario
    $routeProvider.when('/list/1/additem/', {templateUrl: 'partials/items', controller: ItemCtrl});
    $routeProvider.when('/list/1/additem/create', {templateUrl: 'partials/itemCreate', controller: ItemCtrl});
    $routeProvider.when('/list/1/additem/1', {templateUrl: 'partials/itemCreate', controller: ItemCtrl});

    // Shopping Scenario
    $routeProvider.when('/shopping', {templateUrl: 'partials/shopping', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/on', {templateUrl: 'partials/shopping', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/checkout', {templateUrl: 'partials/shoppingCheckout', controller: ShoppingCtrl});
    $routeProvider.when('/shopping/itemdetail/1', {templateUrl: 'partials/shoppingItemDetail', controller: ShoppingCtrl});

    // Expenditure Scenario
    $routeProvider.when('/expense', {templateUrl: 'partials/expenseSummary', controller: ExpenseCtrl});
    $routeProvider.when('/expense/friends', {templateUrl: 'partials/expenseFriends', controller: ExpenseCtrl});
    $routeProvider.when('/expense/details/1', {templateUrl: 'partials/expenseDetails', controller: ExpenseCtrl});

    // payment scenario
    $routeProvider.when('/payment/', {templateUrl: 'partials/paymentSummary', controller: PaymentCtrl});
    $routeProvider.when('/payment/new', {templateUrl: 'partials/paymentCreate', controller: PaymentCtrl});
    $routeProvider.when('/payment/confirmation', {templateUrl: 'partials/paymentConfirmation', controller: PaymentCtrl});
    $routeProvider.when('/payment/invoice', {templateUrl: 'partials/paymentDetails', controller: PaymentCtrl});
    $routeProvider.when('/payment/details/1', {templateUrl: 'partials/paymentDetails', controller: PaymentCtrl});


    // Default
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);