const db = require("./db-wrapper.js");
var SqlString = require('sqlstring');
const crypto = require("crypto");
const path = require("path");
const os = require("os");
const cookieParser = require("cookie-parser");
const fs = require('node:fs/promises');
//this so I don't have to recalculate hash each time TODO: stop??
var pw = "Jellyfish9@";
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
	var r = await db.sendQuery("SELECT tanks.model, orders.quantity, orders.date, orders.notes FROM tanks INNER JOIN orders ON tanks.id=orders.model ORDER BY orders.date DESC");
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
	var r = await db.sendQuery("SELECT tanks.model, sent.quantity, sent.date, sent.notes FROM tanks INNER JOIN sent ON tanks.id=sent.model ORDER BY sent.date DESC");
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
	return res.send("auth failure");
	
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
    if(!req.cookies.ident|| req.cookies.ident != hashedPw){
	res.render("fm", {active: "guest"});
	console.log("FM");
	//Guests
    }
    
    res.render("fm", {active: "fm"});
}

var root = async (req, res)=>{
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
