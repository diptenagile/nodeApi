var express = require('express');
var app = express();

var db = require('../config/db');

app.locals = require('../config/global.js');

// var mysql = require('mysql');


module.exports = (function () {

	var api = express.Router();

	api.post('/add', function (req, res, next){

		// console.log(req.body);
		if(req.body.name){

			db.getRecords('SELECT * FROM category WHERE name = ? ', [req.body.name], function (error, data){

				if(error === false){
					// res.json(data);

					if(data.length === 0){

						db.getRecords('INSERT INTO category VALUES ("",?,0)', [req.body.name], function (error, data){

							if(error === false){
								console.log(data);

								res.status(200);
								res.send(data);  
							}

						});

					}else {

						db.getRecords('UPDATE category SET  name = ? WHERE category_id = ?', [req.body.name, data[0].category_id], function (status, data){

							
							if(status === false){
								
								res.status(200);
								res.send("Error");
							}

							
						});
						// res.status(409);
						// res.json({"code":409,"message":"Record already exist."})
					}
				}
			});


		}else {

			res.status(400);
			res.send({"code":400,"message":"Missing parameter."});
		}

	});

	api.post('/edit', function (reqs, res, next){

		if(reqs.body.cat_id && reqs.body.name ){

			console.log(reqs.query);
			db.getRecords('UPDATE category SET  name = ? WHERE category_id = ?', [reqs.body.name, reqs.body.cat_id], function (status, data){

				
				if(status === false){
					console.log(data);

					res.send(data);
				}

				
			});
		}else {
			res.status(400);
			res.send({"code":400,"message":"Error while getting data."});
		}


	});

	api.get('/getData', function (reqs, res, next) {

	
		db.getRecords('SELECT * FROM category', [], function (status, data){

			
			if(status === false){
				// console.log(data);

				res.send(data);
			}

			// next(new Error('failed to load user'));
		});
		
		// connection.query('SELECT * FROM category', function (err, data){
		// 	// console.log(data);
		// });
	});

	api.post('/delete',function (req, res){

		// console.log(req.body);
		// console.log(req.body.yu);
		if(req.body.cat_id){

			db.getRecords('DELETE FROM category WHERE category_id = ?', [req.body.cat_id], function (status, data){

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

	api.post('/fetchData',function (req, res){

		// console.log(req.body);
		// console.log(req.body.yu);
		if(req.body.parent_id && req.body.cat_id){

			db.getRecords('SELECT * FROM category WHERE category_id = ?', [req.body.cat_id], function (status, data){

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

