//file for handling db connections and basic queries

const mysql = require("mysql2");
const SqlString = require("sqlstring");
let con;

var connectDB = (config)=>{
    con = mysql.createPool(config);

    con.query("SELECT 1+1", (error, results, fields)=>{
	if(error) throw error;

	console.log("connected to DB");
    });
    
}


var sendQuery = (q)=>{ //promise'd sql query
    return new Promise((resolve, reject) =>{
	con.query(q, (error, result, fields)=>{
	    if(error) return reject(error);
	    resolve(result);
	});
    });
}

exports.connectDB = connectDB;
exports.sendQuery = sendQuery;
