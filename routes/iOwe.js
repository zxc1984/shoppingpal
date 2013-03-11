var databaseUrl = "test:test@ds051007.mongolab.com:51007/shoppal"; // "username:password@example.com/mydb"
var database = ["shoppal"]
var db = require("mongojs").connect(databaseUrl, database);

var collection = "iOwe";
var objectId = function (_id) {
    if (_id.length === 24 && parseInt(db.ObjectId(_id).getTimestamp().toISOString().slice(0,4), 10) >= 2010) {
        return db.ObjectId(_id);
    } 
    return _id;
}

//Function callback
var fn = function (req, res) {
    res.contentType('application/json');
    var fn = function (err, doc) { 
        if (err) { 
            if (err.message) {
                doc = {error : err.message} 
            } else {
                doc = {error : JSON.stringify(err)} 
            }
        }
        if (typeof doc === "number" || req.params.cmd === "distinct") { doc = {ok : doc}; } 
        res.send(doc); 
    };
    return fn;
};

exports.findAll = function(req, res) {
    var userId = JSON.parse(req.cookies.UserId);
    qw = {"userId":userId};
    db.collection(collection).find(qw).toArray(fn(req, res));
};


exports.find = function(req,res) {
    var id = req.params.id;
    qw = {"_id":objectId(id)};
    db.collection(collection).find(qw).toArray(fn(req, res));
};

// Create
exports.insert = function(req, res) {
    qw = req.body;
    db.collection(collection).insert(qw, {safe:true}, fn(req, res));
};

exports.update = function(req, res) {
    var id = req.params.id;
    var qw = req.body;
    db.collection(collection).update({"_id":objectId(id)}, qw, {safe:true}, fn(req, res));
};

exports.updateSpecificListItems = function(req,res) {
    //console.log(req);
     var id = req.params.id;
     console.log("iowe id "+ id);
     var item = req.body;
     console.log("iowe item "+ JSON.stringify(item));
     //console.log("Entry"+entry+"Selected ID" + JSON.stringify(item));
     var select = {"_id":objectId(id)};
     console.log(select);
     var qw = {$set:item};
    db.collection(collection).update(select, qw, {safe:true}, fn(req, res));
};

exports.delete = function(req, res) {
    var id = req.params.id;
    qw = {"_id":objectId(id)};
    db.collection(collection).remove(qw);
};


exports.query = function(req, res) {
    var item, sort = {}, qw = {};
    for (item in req.query) {
        req.query[item] = (typeof +req.query[item] === 'number' && isFinite(req.query[item]))
            ? parseFloat(req.query[item],10) 
            : req.query[item];
        if (item != 'limit' && item != 'skip' && item != 'sort' && item != 'order' && req.query[item] != "undefined" && req.query[item]) {
            qw[item] = req.query[item]; 
        }
    }  
    if (req.query.sort) { sort[req.query.sort] = (req.query.order === 'desc' || req.query.order === -1) ? -1 : 1; }
    db.collection(req.params.collection).find(qw).sort(sort).skip(req.query.skip).limit(req.query.limit).toArray(fn(req, res))
};
