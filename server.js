// server.js

// set up ========================
var express  = require('express');
var app      = express(); 						        // create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================
//for local db
//var db = mongoose.connection;

//db.on('error', console.error);
//db.once('open', function() {
    // Create your schemas and models here.
//});

//mongodb://<user>:<pass>@mongo.onmodulus.net:27017/key
//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	    // connect to tutorial mongoDB database on modulus.io
mongoose.connect('mongodb://admin:admin@mongo.onmodulus.net:27017/e6Myqupo'); 	// connect to my mongoDB database on modulus.io
//mongoose.connect('mongodb://localhost/test');                                     //connect to the test database that MongoDB defaults to when you start up the shell

app.configure(function() {
    app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')); 				        // log every request to the console
    //get rid of deprecation warnings :)
    //app.use(express.bodyParser()); 				        // pull information from html in POST
    app.use(express.json());                                // express 3.0 way to pull information from thml in POST
    app.use(express.urlencoded());
    app.use(express.methodOverride()); 				        // simulate DELETE and PUT
});

//=============Todo Model=============
// define schema =================
var todoSchema = new mongoose.Schema({
    text: { type: String }
});

// Compile a 'Todo' model using the todoSchema as the structure.
// Mongoose also creates a MongoDB collection called 'Todos' for these documents.
var Todo = mongoose.model('Todo', todoSchema);

//var Todo = mongoose.model('Todo', {
//    text : String
//});


//=============RESTful API Routes=============
// routes ======================================================================

// api ---------------------------------------------------------------------
// get all todos
app.get('/api/todos', function(req, res) {

    // use mongoose to get all todos in the database
    Todo.find(function(err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(todos); // return all todos in JSON format
    });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    Todo.create({
        text : req.body.text,
        done : false
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
    Todo.remove({
        _id : req.params.todo_id
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        Todo.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });
});

//=============Defining Frontend Route=============
// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT);
//app.listen(8080);
console.log("App listening on port 8080");
