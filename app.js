
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express();
var routes = require('./routes'),
list = require('./routes/list'),
item = require('./routes/item'),
shopping = require('./routes/shopping'),
expense = require('./routes/expense');




// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
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
app.get('/api/list/:id',list.find);
app.post('/api/list/',list.insert);
app.put('/api/list/update/:id',list.update);
app.delete('/api/list/:id',list.delete);

app.get('/api/items',item.findAll);
app.get('/api/userExpense',expense.findAll);
app.get('/api/shoppingTrips',shopping.findAll);


// JSON API

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
