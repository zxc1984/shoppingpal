
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var routes = require('./routes'),
list = require('./routes/list'),
item = require('./routes/item'),
user = require('./routes/user'),
shopping = require('./routes/shopping'),
expense = require('./routes/expense');
iOwe = require('./routes/iOwe');
friendsOwe = require('./routes/friendsOwe');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);
/*
app.get('/api/:collection',api.findAll);
app.get('/api/:collection/insert',api.insert);
app.get('/api/:collection/find/:filter/:key',api.findBy);
*/
//LIST API 
app.get('/api/list',list.findAll);
app.get('/api/list/:id',list.findUserList);

app.get('/api/list/:id/settings',list.getListSettings);
app.put('/api/list/:id/settings/',list.updateListSettings);

app.get('/api/list/:id/items',list.getListItems);
app.put('/api/list/:id/items/',list.updateSpecificListItems);
app.del('/api/list/:id/items/:entry',list.deleteSpecificListItems);

app.post('/api/list/',list.insert);
app.put('/api/list/update/:id',list.update);
app.del('/api/list/:id',list.delete);

//ItemS API
app.get('/api/items',item.findAll);
app.get('/api/list/:id',list.findUserList);
app.post('/api/list/',list.insert);
app.put('/api/list/:id',list.update);
app.del('/api/list/:id',list.delete);

//USER API 
app.get('/api/users',user.findAll);
//app.get('/api/users/:id',user.find);
//app.get('/api/users/:email',user.findByEmail);
app.post('/api/users/login',user.login)
app.post('/api/users/register',user.insert);
app.put('/api/users/update/:id',user.update);

//EXPENSE API
app.get('/api/userExpense',expense.findAll);
app.get('/api/userExpense/:id',expense.find);

//SHOPPING API
app.get('/api/shoppingTrips',shopping.findAll);
app.get('/api/shoppingTrips/:id',shopping.find);

//iOwe API
app.get('/api/iOwe',iOwe.findAll);
app.get('/api/iOwe/:id',iOwe.find);

//friendsOwe API
app.get('/api/friendsOwe',friendsOwe.findAll);
app.get('/api/friendsOwe/:id',friendsOwe.find);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
