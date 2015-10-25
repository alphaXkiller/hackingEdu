var koa = require('koa');
var app = koa();
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var port = process.env.port || 3000;
var Router = require('koa-router')();
var router = require('./routes/index')(Router);
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();


// init databse
require('./dbConfig/db.js');

app.use(Router.routes());

app.use(bodyParser());

app.use(serve(__dirname + "/public"));

app.listen(appEnv.port, '0.0.0.0', function () {
	console.log("Listening to port " + appEnv.url);
})