module.exports= function(app) {

    app.get('/api/dashboard', function(req, res) {
        return res.send("hello");
    });

     app.get('/list/insert', list.insert);
}

 
