var express = require('express');
var app = express();
var mysql = require('mysql');

var bodyParser = require('body-parser');

var api = require('./api/crud_api');
// api(app);


// var connection = mysql.createConnection({
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use('/api',api);

app.use('/public', express.static(__dirname + '/public'));
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

app.get('/', function (req, res) {
	res.send("Good morning...");
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



var server = app.listen('5000', function(){

	console.log("app is running on: "+server.address().port);
	
});