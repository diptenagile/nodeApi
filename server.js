var express = require('express');
var app = express();
var admin = express();

var mysql = require('mysql');

var bodyParser = require('body-parser');

var api = require('./api/crud_api');
// api(app);


// var connection = mysql.createConnection({
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('title', 'Hello.....');
app.use('/api',api);

// app.use(express.logger());
app.use('/public', express.static(__dirname + '/public/app'));


app.use('/admin', admin);
// api.locals = app.locals;

// app.locals.title = "my app";

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

// connection.connect(function (error){

// 	if(error){

// 		return;

// 	}else {
// 	}
// });	

admin.get('/', function (req, res) {

	console.log(admin.mountpath);
	res.send("Gm");
	// pool.getConnection(function(err, connection) {
		
	// 	if(err){
	// 		console.log("Error while connection to db "+ err);
	// 		return
			
	// 	}else {		
	// 		console.log("connected to db");

	// 		connection.query('SELECT * FROM category', function (err, data){
	// 			// console.log(data);
	// 			res.send(data);
	// 		});
	// 	}
	  
	// });
});


app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});
// 

var server = app.listen('5000', function(){

	console.log("app is running on: "+server.address().port);
	
});