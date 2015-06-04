var mysql = require('mysql');

var pool = mysql.createPool({

  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'category'
	
});


exports.getRecords = function(sqlQuery, params, callback) {

  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sqlQuery, params, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};
