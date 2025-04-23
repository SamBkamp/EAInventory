const db = require("./db-wrapper.js");
var SqlString = require('sqlstring');
const crypto = require("crypto");
const path = require("path");
const os = require("os");
const cookieParser = require("cookie-parser");
const fs = require('node:fs/promises');
const helper = require("./helpers.js");
//this so I don't have to recalculate hash each time TODO: stop??
var pw = process.env.NODE_LOGIN_PW;
const pwHash = crypto.createHash("sha256");
pwHash.update(pw);
var hashedPw = pwHash.digest("hex");


var getTanks = async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");
	return;
    }   
    try{
	var r = await db.sendQuery("SELECT `model`, `orders`, `sent` FROM `tanks`");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }    
};

var getOrders = async (req,res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");
	return;
    }

    try{
	var r = await db.sendQuery("SELECT orders.id, tanks.model, orders.quantity, orders.date, orders.notes FROM tanks INNER JOIN orders ON tanks.id=orders.model ORDER BY orders.date DESC");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");

	console.error(err);
    }
};

var getSend = async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");

	return;
    }

    try{
	var r = await db.sendQuery("SELECT sent.id, tanks.model, sent.quantity, sent.date, sent.notes FROM tanks INNER JOIN sent ON tanks.id=sent.model ORDER BY sent.date DESC");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");

	console.error(err);
    }
};

var getProducts = async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	res.send("auth failure");

	return;
    }

    try{
	var r = await db.sendQuery("SELECT `id`, `model` FROM `tanks`");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }
};

var getFmProducts = async (req, res)=>{

    try{
	var r = await db.sendQuery("SELECT code, name, (cost*markup) AS cost, stock FROM `FM_products` ORDER BY name");
	res.send(JSON.stringify(r));
	
    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }
};

var deleteOrderEntry =  async (req, res) => {
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	return 	res.send("auth failure");
    }

    try{
	var r = await db.sendQuery(SqlString.format("DELETE FROM ?? WHERE id=?", [req.body.db, req.body.id]));
	res.setHeader('content-type', 'text/JSON');
	res.send({"status":"success"});

    }catch(err){
	res.send("SQL ERROR");
	console.error(err);
    }
    
};

var addOrder = async (req, res)=>{
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
	var r = await db.sendQuery(q);
	console.log(r);
    }catch(err){	
	console.error(err);
	return res.send("ERROR: SQL");
    }    
    q  = "UPDATE `tanks` SET ?? = ??+? WHERE id=?";
    q = SqlString.format(q, [table, table, req.body.qty, req.body.prod]);

    try{
	var r = await db.sendQuery(q);
    }catch(err){
	console.error(err);
	return res.send("ERROR: SQL");
    }

    res.send("Success");
};

var dash = async (req, res)=>{
    if(!req.cookies.ident|| req.cookies.ident !== hashedPw){
	return res.redirect("/");
	
    }else{
	res.render("dash", {active:"inv"});
    }
};

var sent = async (req, res)=>{
    if(!req.cookies.ident|| req.cookies.ident !== hashedPw){
	return res.redirect("/");
	
    }else{
	//res.sendFile(path.join(process.cwd(), "code", "sent", "index.html"));
	res.render("sent", {active:"sent"});
    }
};

var orders = async (req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	return res.redirect("/");
    }else{
	//res.sendFile(path.join(process.cwd(), "code", "orders", "index.html"));
	res.render("orders", {active:"orders"});
    }
};

var fm = async (req, res)=>{
    var date;
    var q1, q2, q3;
    try{
	var q = await db.sendQuery(SqlString.format("SELECT value FROM config WHERE name =?", ["lastupdated"]));
	q1 = await db.sendQuery("SELECT SUM(stock) AS SUM FROM `FM_products`;");
	q2  = await db.sendQuery("SELECT SUM(cost * stock) AS cost FROM `FM_products`;");
	q3  = await db.sendQuery("SELECT SUM(cost * markup * stock) AS rev FROM `FM_products`;");
	console.log(q2);
	
	date = new Date(parseInt(q[0].value));
	var options = {
	    year: "numeric",
	    month: "long",
	    day: "numeric",
	    hour: "numeric",
	    minute: "numeric",
	    hour12: false,
	    timeZone: "Asia/Hong_Kong"
	};
	date = new Intl.DateTimeFormat("en-US", options).format(date);
    }catch (err){
	console.error(err);
	date = "ERROR";
    }
	
    
    
    if(!req.cookies.ident|| req.cookies.ident != hashedPw){
	res.render("fm", {active: "guest", date: date});
	//Guests
    }
    
    res.render("fm", {active: "fm", date:date, stockSum:q1[0].SUM, cost:helper.toFinNumber(q2[0].cost), rev:helper.toFinNumber(q3[0].rev)});
}

var root = async (req, res)=>{
    if(req.cookies.ident == hashedPw) return res.redirect("/dash");
    res.render("index");
};

var login = async (req, res)=>{
    if(!req.body.data) res.send("no password supplied");
    
    else if(req.body.data != pw) res.send("incorrect password");

    else{
	res.cookie("ident", hashedPw);
	res.send("sucess");
    }
};

var updateFmStock = async (req, res) => {
    res.setHeader('content-type', 'text/JSON');
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	return res.send({"error":"auth-error"});
    }
    req.body.amount = parseInt(req.body.amount);
    if(!req.body.amount && req.body.amount != 0) return res.send({"error":"data-error"});

    var queryType = "Changed by";    
    var stockText = req.body.amount;
    if(req.body.type == "a") stockText = "stock+"+req.body.amount;
    else queryType = "Set to";
    
    var q = SqlString.format("UPDATE `FM_products` SET stock="+stockText+" WHERE code=?", [req.body.code]);
    
    try{
	await db.sendQuery(q);
	var logMsg = `[${new Date(Date.now()).toLocaleString("en-GB")}] ${req.body.code} ${queryType} ${req.body.amount} from ${req.headers['x-forwarded-for']}`;
	console.log(logMsg);
	await fs.writeFile(path.join(process.cwd(),"logs", "product-change.log"), logMsg+os.EOL, {flag: 'a'});
	res.send({"success":"done"});
    }catch (err){
	console.error(err);
	res.send({"error":"DB error"});
    }
}

var updateVerifiedDate = async(req, res)=>{
    if(req.cookies.ident == undefined || req.cookies.ident != hashedPw){
	return res.send({"error":"auth-error"});
    }
    try{
	var d = new Date().getTime();
	var q = db.sendQuery(SqlString.format("UPDATE `config` SET value=? WHERE name='lastupdated'", [d]));
	console.log(q);
	return res.send({"success":d});
    }
    catch(err){
	console.error(err);
	return res.send({"error":"date couldn't be updated"});
    }
};
    

var erm = async (req, res)=>{
    res.send("hello world");
};


exports.getTanks = getTanks;
exports.getOrders = getOrders;
exports.getSend = getSend;
exports.getProducts = getProducts;
exports.addOrder = addOrder;
exports.dash = dash;
exports.sent = sent;
exports.orders = orders;
exports.root = root;
exports.login = login;
exports.erm = erm;
exports.fm = fm;
exports.getFmProducts = getFmProducts;
exports.updateFmStock = updateFmStock;
exports.updateVerifiedDate = updateVerifiedDate;
exports.deleteOrderEntry = deleteOrderEntry;
