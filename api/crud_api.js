var express = require('express');
var app = express();

var db = require('../config/db');

app.locals = require('../config/global.js');

// var mysql = require('mysql');


module.exports = (function () {

	var api = express.Router();

	api.get('/getData', function (reqs, res, next) {

		if(reqs.query.parent && reqs.query.cat_id){

			console.log(reqs.query);
			db.getRecords('SELECT * FROM category WHERE parent = ? AND category_id = ?', [reqs.query.parent, reqs.query.cat_id], function (status, data){

				
				if(status === false){
					console.log(data);

					res.send(data);
				}

				next(new Error('failed to load user'));
			});
		}else {
			res.status(400);
			res.send({"code":400,"message":"Error while getting data."});
		}
		// connection.query('SELECT * FROM category', function (err, data){
		// 	// console.log(data);
		// });
	});

	api.post('/postData',function (req, res){

		console.log(app.locals.title);
		// console.log(req.body.yu);
		if(req.body.parent_id && req.body.cat_id){

			db.getRecords('SELECT * FROM category WHERE parent = ? AND category_id = ?', [req.body.parent_id, req.body.cat_id], function (status, data){

				if(status === false){
					console.log(data);

					res.json(data);  
				}

			});

		}else {

			res.status(400);
			res.send({"code":400,"message":"Error while getting data."});
		}

	});

	return api;

})();

