var koa = require('koa');
var app = koa();
var bodyParser = require('koa-bodyparser');
var serve = require('koa-static');
var port = process.env.port || 3000;
var Router = require('koa-router')();
var router = require('./routes/index')(Router);
var watson = require('watson-developer-cloud');
var fs = require('fs');

var textToSpeech = watson.text_to_speech({
	username: 'ab05588c-3b05-4191-b89c-505ec7a54bd5',
	password: 'HV45jhEDMob2',
	version: 	'v1'
});

var params = {
	text: "Hello from IBM Watson",
	voice: "en-US_MichaelVoice",
	accept: 'audio/wav'
};

textToSpeech.synthesize(params).pipe(fs.createWriteStream('public/media/output.wav'));

// init databse
require('./dbConfig/db.js');

app.use(Router.routes());

app.use(bodyParser());

app.use(serve(__dirname + "/public"));

app.listen(port, function () {
	console.log("Listening to port" + port);
})