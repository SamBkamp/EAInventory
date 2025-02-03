const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./controllers/db-wrapper.js");
const router = require("./controllers/router.js");

const dbconf = {
    host     : 'db',
    user     : process.env.NODE_USER,
    password : process.env.NODE_PASSWORD,
    database : 'inventory',
    dateStrings : true,
    connectionLimit: 10
};

db.connectDB(dbconf);


const app = express();
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/styles', express.static(path.join(__dirname, 'code', 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'code', 'scripts')));
app.use("/", router);

app.listen(81, ()=>{
    console.log("server is running on port 81");
});

