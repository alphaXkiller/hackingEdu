var koa = require('koa');
var app = koa();
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var port = process.env.port || 3000;
var watson = require('watson-developer-cloud');
var fs = require('fs');
var Router = require('koa-router')();
var router = require('./routes/index')(Router);

var textToSpeech = watson.text_to_speech({
	username: 'cd8c307b-2707-4a7c-a63d-c8c3957a0e5e',
	password: 'ogOpRc4d0rV4',
	version: 	'v1'
});

var params = {
	text: "Hello from IBM Watson",
	voice: "en-US_MichaelVoice",
	accept: 'audio/wav'
};

textToSpeech.synthesize(params).pipe(fs.createWriteStream('output.wav'));

// init databse
require('./dbConfig/db.js');

app.use(Router.routes());

app.use(bodyParser());

app.use(serve(__dirname + "/public"));

app.listen(port, function () {
	console.log("Listening to port" + port);
})