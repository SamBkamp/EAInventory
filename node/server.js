const express = require("express");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const mysql = require("mysql2");
const SqlString = require('sqlstring');
const path = require("path");

var con = mysql.createPool({
    host     : 'db',
    user     : env.process.NODE_USER,
    password : env.process.NODE_PASSWORD,
    database : 'inventory',
    dateStrings : true,
    connectionLimit: 10
});


 
con.query("SELECT 1+1", (error, results, fields)=>{
    if(error) throw error;

    console.log("connected to db");
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static(__dirname + '/code'));
app.use('/styles', express.static(path.join(__dirname, 'code', 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'code', 'scripts')));

//this so I don't have to recalculate hash each time
var pw = "Jellyfish9@";
const pwHash = crypto.createHash("sha256");
pwHash.update(pw);
var hashedPw = pwHash.digest("hex");

app.get("/erm", (req, res)=>{
    res.send("hello world");
    
});

////:dash?/get-:data
app.post('/:dash?/get-tanks', async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");
	return;
    }   
    try{
	var r = await sendQuery("SELECT `model`, `orders`, `sent` FROM `tanks`");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }
    
});

app.post('/:dash?/get-orders', async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");
	return;
    }

    try{
	var r = await sendQuery("SELECT tanks.model, orders.quantity, orders.date, orders.notes FROM tanks INNER JOIN orders ON tanks.id=orders.model ORDER BY orders.date DESC");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");

	console.error(err);
    }
    

    
});

app.post('/:dash?/get-send', async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");

	return;
    }

    try{
	var r = await sendQuery("SELECT tanks.model, sent.quantity, sent.date, sent.notes FROM tanks INNER JOIN sent ON tanks.id=sent.model ORDER BY sent.date DESC");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");

	console.error(err);
    }
    

    
});


app.post('/:dash?/get-products', async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");

	return;
    }

    try{
	var r = await sendQuery("SELECT `id`, `model` FROM `tanks`");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }
    

    
});




app.post("/:dash?/add-order", async (req, res)=>{
    if(!req.cookies.ident|| req.cookies.ident != hashedPw){
	res.send("auth failure");
    }

    console.log(req.body.prod);
    if(!req.body.prod || !req.body.qty || !req.body.date || !req.body.dest) res.send("ERROR: Data Failure");

    
    var d = new Date(req.body.date);
    var d1 = new Date(); //just to get hours, seconds and minutes lol this is sketch
    //YYYY-MM-DD HH:MI:SS

    dString = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds(); 

    var table;
    if(req.body.dest == "send") table = "sent"
    else table = "orders"
	
    var q = "INSERT INTO ?? (`model`, `quantity`, `date`, `notes`) VALUES (?, ?, ?, ?)";
    q = SqlString.format(q, [table, req.body.prod, req.body.qty,  dString, req.body.note]);

    try{
	var r = await sendQuery(q);
	console.log(r);
    }catch(err){	
	console.error(err);
	return res.send("ERROR: SQL");
    }    
    q  = "UPDATE `tanks` SET ?? = ??+? WHERE id=?";
    q = SqlString.format(q, [table, table, req.body.qty, req.body.prod]);

    try{
	var r = await sendQuery(q);
    }catch(err){
	console.error(err);
	return res.send("ERROR: SQL");
    }

    res.send("Success");
});

app.get("/dash", (req, res)=>{
    if(!req.cookies.ident|| req.cookies.ident !== hashedPw){
	return res.send("auth failure");
	
    }else{
	res.sendFile(path.join(__dirname, "code", "dash", "index.html"));
    }
    
});


app.get("/sent", (req, res)=>{
    if(!req.cookies.ident|| req.cookies.ident !== hashedPw){
	return res.send("auth failure");
	
    }else{
	res.sendFile(path.join(__dirname, "code", "sent", "index.html"));
    }
    
});


app.get("/orders/", (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");
    }else{
	res.sendFile(path.join(__dirname, "code", "orders", "index.html"));
    }

});


app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "code", "index.html"));
});

app.post("/p/login", (req, res) =>{
    if(!req.body.data) res.send("no password supplied");
    
    else if(req.body.data != pw) res.send("incorrect password");

    else{
	res.cookie("ident", hashedPw);
	res.send("sucess");
    }
    
});


app.listen(81, ()=>{
    console.log("server is running on port 81");
});

function sendQuery(q){ //promise'd sql query
    return new Promise((resolve, reject) =>{
	con.query(q, (error, result, fields)=>{
	    if(error) return reject(error);
	    resolve(result);
	});
    });
}
